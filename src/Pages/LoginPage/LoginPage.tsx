import { Alert } from 'antd';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setUser } from "../../redux/slices/userSlice";
import { decrementVerifyCooldown, setVerifyColdown } from '../../redux/slices/VerifyPageSlice';
import styles from './styles.module.scss';
import VerifyPage from './VerifyPage';

const LoginPage: React.FC = () => {
    const [isEng, setIsEng] = useState(true);
    const [isRegister, setIsRegister] = useState(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const auth = getAuth();
    const redirect = useNavigate();
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const [user, SetUser] = useState<any>();
    const [verifyPage, setVerifyPage] = useState(false);
    const [emailVerified, setEmailVerified] = useState();
    const intervalRef = useRef<number | null>(null);
    const verifyColdown = useSelector((state: any) => state.verifyPage.verifyColdown);

    useEffect(() => {
        auth.onAuthStateChanged((user: any) => {
            user?.reload().then(() => {
                setEmailVerified(user?.emailVerified);
            })
            SetUser(user);
        });
    }, [user?.emailVerified, emailVerified])

    useEffect(() => {
        if(user?.emailVerified || emailVerified){
            setEmail('');
            setPassword('');
            redirect('/#home');
        }
    }, [user?.emailVerified])

    useEffect(() => {
        if(verifyColdown <= 0 && intervalRef.current){
            window.clearInterval(intervalRef.current);
            dispatch(setVerifyColdown(0));
            intervalRef.current = null
        }
    }, [verifyColdown])

    const Register = async () => {
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            if(userCredential.user){
                setVerifyPage(true);
                await sendEmailVerification(userCredential.user);
                dispatch(setVerifyColdown(60));

                if(intervalRef.current !== null) return;

                intervalRef.current = window.setInterval(() => {
                    dispatch(decrementVerifyCooldown());
                }, 1000)
            }

            if(user?.emailVerified || emailVerified){
                alert('Email has been successfully confirmed!');
                setVerifyPage(false);
                setEmail('');
                setPassword('');
                redirect('/#home');
            }
        } catch (e: any) {
            alert(e.code == 'auth/weak-password' ? 'Weak password, create a stronger one.' : `Error: ${e.code}. Plese try again later.`);
        }
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
            <div className={styles.LoginPageWrapper} style={{display: verifyPage ? 'none' : ''}}>
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
                    {!isRegister && <a href="">{isEng ? 'Forget your password?' : 'Забыли пароль?'}</a>}
                    <p style={{top: isRegister ? '110%' : '81%', marginLeft: !isRegister && !isEng ? '30px' : ''}} className={styles.SetRegister} onClick={() => setIsRegister(!isRegister)}>
                        {isRegister ? isEng ? 'Login' : 'Войти' : isEng ? 'Register' : 'Зарегистрироваться' }
                    </p>
                </div>

                <div onClick={isRegister ? Register : Login} className={styles.submit}>{isRegister ? isEng ? 'Register' : 'Зарегистрироваться' : isEng ? "Login" : 'Войти'}</div>
            </div>

            {verifyPage && <VerifyPage />}
        </>
    )
}

export default LoginPage;