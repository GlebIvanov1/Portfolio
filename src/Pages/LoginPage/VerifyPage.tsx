import { getAuth, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { decrementVerifyCooldown, setVerifyColdown } from "../../redux/slices/VerifyPageSlice";
import styles from './styles.module.scss';


const VerifyPage: React.FC = () => {
    const redirect = useNavigate();
    const auth = getAuth();
    const verifyColdown = useSelector((state: any) => state.verifyPage.verifyColdown);
    const dispatch = useDispatch();
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user?.emailVerified) {
                redirect('/#home'); 
                dispatch(setVerifyColdown(0));
            }
        });

        return unsubscribe;
    }, [])

    useEffect(() => {
        if(verifyColdown <= 0 && intervalRef.current){
            window.clearInterval(intervalRef.current);
            dispatch(setVerifyColdown(0));
            intervalRef.current = null
        }
    }, [verifyColdown])
    

    const initialaseInterval = () => {
        if(intervalRef.current !== null) return;

        intervalRef.current = window.setInterval(() => {
            dispatch(decrementVerifyCooldown());
        }, 1000)
    }

    const reloadFunc = () => {
        const user = auth.currentUser;

        if(user){
            user?.reload().then(() => {
                if(user?.emailVerified){
                    redirect('/#home')
                }
            })
        }
    }
    

    const sendVerifyAgain = async () => {
        const user = auth.currentUser;

        if(user && verifyColdown === 0){
            try{
                await sendEmailVerification(user);
                alert('Verify message send again.');
                dispatch(setVerifyColdown(60));
                initialaseInterval();
            } catch (e: any) {
                alert(`Error: ${e.code}. Plese try again later.`);
            }
        }
    }
    
    return (
        <>
            <div className={styles.VerifyWrapper}>
                <h1 className={styles.VerifyPageTitle}>Verify your email</h1>
                <button className={styles.VerifyButton} onClick={reloadFunc}>I verified</button>
                <p className={styles.VerifyInfo}>Check your email address and find the confirmation email. If it's not there, look at the spam folder. Or send the email again using the button at the bottom.</p>
                <p className={styles.sendMessageAgain} style={{cursor: verifyColdown !== 0 ? 'not-allowed' : 'pointer', color: verifyColdown !== 0 ? '#0202fd5c' : '#0000FF'}} onClick={sendVerifyAgain}>{verifyColdown !== 0 && verifyColdown} Send verify message again</p>
            </div>
        </>
    )
}

export default VerifyPage;