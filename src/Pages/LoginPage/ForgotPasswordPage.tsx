import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import styles from './styles.module.scss';

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const redirect = useNavigate();
    const auth = getAuth();

    const verifyEmail = async () => { 
        try {
            sendPasswordResetEmail(auth, email).then(() => {
                alert('Reset password verification send. If email verification doesn\'t send, maybe you didn\'t register on our site.');
                setEmail('');
                redirect('/Login')
            });
        } catch (e: any) {
            alert(`Error: ${e.code}`);
        }
    }
    return (
        <>
            <div className={styles.ForgotPasswordPageWrapper}>
                <a href="/Login" className={styles.Back}>Back</a>

                <div className={styles.Wrapper}>
                    <h1 className={styles.title}>Update password</h1>

                    <p>Enter your email</p>
                    <input value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type="email" placeholder="Enter your email" />

                    <button onClick={verifyEmail}>Submit</button>
                </div>
            </div>
        </>
    )
}

export default ForgotPasswordPage;