import { EmailAuthProvider, getAuth, reauthenticateWithCredential, sendPasswordResetEmail, signOut } from "firebase/auth";
import React, { ChangeEvent, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUser } from "../../redux/slices/userSlice";
import styles from './styles.module.scss';

interface ResetPasswordPageType {
    close: () => void;
}

const ResetPasswordPage: React.FC<ResetPasswordPageType> = ({close}) => {
    const auth = getAuth();
    const [currentPassword, setCurrentPassword] = useState('');
    const [user]: any = useAuthState(auth);
    const redirect = useNavigate();
    const dispatch = useDispatch();

    const changePassword = async () => {
        try{
            const credintial = EmailAuthProvider.credential(user?.email, currentPassword);
            await reauthenticateWithCredential(user, credintial);

            await sendPasswordResetEmail(auth, user?.email).then(() => {
                alert('Email verification send.');
                
                signOut(auth);
                
                dispatch(setUser({
                    email: '',
                    id: '',
                    token: ''
                }));

                redirect('/Login');
            }).catch((e) => {
                alert(e.code);
            });
        } catch (e: any) {
            alert(`The password is incorrect. Error code: ${e.code}`);
            setCurrentPassword('');
        }
    }
    
    return (
        <>
            <p onClick={close} className={styles.Back}>Back</p>
            <div className={styles.ResetPasswordPageWrapper}>
                <p className={styles.Title}>Change password</p>

                <div className={styles.CurrentPasswordWrapper}>
                    <p className={styles.InputTitle}>Current password</p>
                    <input required type="password" value={currentPassword} onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)} />
                </div>

                <button onClick={changePassword}>Confirm</button>
            </div> 
       </>
    )
}

export default ResetPasswordPage;