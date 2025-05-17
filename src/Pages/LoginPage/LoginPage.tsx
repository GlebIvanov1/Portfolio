import { Alert } from 'antd';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUser } from "../../redux/slices/userSlice";
import styles from './styles.module.scss';

const LoginPage: React.FC = () => {
    const [isEng, setIsEng] = useState(true);
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const auth = getAuth();
    const redirect = useNavigate();
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const Register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}: any) => {
                setEmail('');
                setPassword('');
                
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken
                })) 

                redirect('/#home')
            })
            .catch((error: any) => {
                setError(error.code);
                setTimeout(() => {
                    setError('')
                }, 7000)
            });
    }

    const Login = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}: any) => {
                setEmail('');
                setPassword('');
                
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken
                }))

                redirect('/#home')
            })
            .catch((error) => {
                setError(error.code);
                setTimeout(() => {
                    setError('')
                }, 7000)
        });
    }

    return (
        <>
            {error && <Alert className={styles.Alert} closable type="error" message={error} banner />}
            <div className={styles.LoginPageWrapper}>
                <a href="/#home" className={styles.back}>{isEng ? 'Back' : 'Вернуться'}</a>

                <h1 style={{marginLeft: isRegister && !isEng ? '100px' : ''}}>{isRegister ? isEng ? 'Register' : 'Регистрация' : isEng ? "Login" : 'Войти'}</h1>

                <div className={styles.Lang}>
                    <span onClick={() => setIsEng(true)} style={{fontWeight: isEng ? '600' : '', transform: isEng ? 'translateY(-10px)' : ''}} className={styles.Eng}>Eng</span>
                    <span onClick={() => setIsEng(!isEng)}>/</span>
                    <span onClick={() => setIsEng(false)} style={{fontWeight: !isEng ? '600' : '', transform: !isEng ? 'translateY(-10px)' : ''}} className={styles.Ru}>Ru</span>
                </div>

                <div className={styles.inputWrapper}>
                    <input value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} className={styles.Email} type="email" placeholder="Email" /> 
                    <input value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} className={styles.Paswword} type="password" placeholder="Paswword" />
                    <a href="">{isEng ? 'Forget your password?' : 'Забыли пароль?'}</a>
                    <p style={{top: isRegister ? '89%' : '81%', marginLeft: !isRegister && !isEng ? '30px' : ''}} className={styles.SetRegister} onClick={() => setIsRegister(!isRegister)}>
                        {isRegister ? isEng ? 'Login' : 'Войти' : isEng ? 'Register' : 'Зарегистрироваться' }
                    </p>
                </div>

                <div onClick={isRegister ? Register : Login} className={styles.submit}>{isRegister ? isEng ? 'Register' : 'Зарегистрироваться' : isEng ? "Login" : 'Войти'}</div>
            </div>
        </>
    )
}

export default LoginPage;