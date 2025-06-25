import { getAuth, sendEmailVerification, signOut } from "firebase/auth";
import { child, get, getDatabase, ref, set } from "firebase/database";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import DefaultUserImg from '../../../public/img/person-circle.svg';
import { useIsLogin, useOptimizeImage } from "../../Hooks";
import { userInputValueSet } from "../../redux/slices/settingsSlice";
import { setUser } from "../../redux/slices/userSlice";
import { decrementVerifyCooldown, setVerifyColdown, setVerifyPageOpen } from "../../redux/slices/VerifyPageSlice";
import ResetPasswordPage from "./ResetPasswordPage";
import styles from './styles.module.scss';

const SettingsPage: React.FC = () => {
    const auth = getAuth();
    const db = getDatabase();
    const dbRef = ref(getDatabase())
    const uid = useSelector((state: any) => state.user.id);
    const email = useSelector((state: any) => state.user.email);
    const [userImg, setUserImg] = useState('');
    const userInputValue = useSelector((state: any) => state.setting.userInputValue)
    const dispatch = useDispatch(); 
    const redirect = useNavigate();
    const user: any = auth?.currentUser;
    const isLogin = useIsLogin();
    const intervalRef = useRef<number | null>(null);
    const verifyColdown = useSelector((state: any) => state.verifyPage.verifyColdown);
    const [resetPasswordPage, setResetPasswordPage] = useState(false);

    useEffect(() => {
        const fetchProfileImg = async () => {
            try{
                await get(child(dbRef, 'users/' + uid + '/')).then((snapshot) => {
                    setUserImg(snapshot.val()?.profilePicture || '');
                })
            } catch (e) {
                console.error(e);
            } 
        }

        fetchProfileImg();
    }, [userInputValue, userImg, uid])

    useEffect(() => {
        if(verifyColdown <= 0 && intervalRef.current){
            window.clearInterval(intervalRef.current);
            dispatch(setVerifyColdown(0));
            intervalRef.current = null;
        }
    }, [verifyColdown])

    const InputOnChage = async (e: ChangeEvent<HTMLInputElement>) => {    
        if (e.target.files && e.target.files[0]) {
            try{
                const file = e.target.files[0];
                const previewUrl = URL.createObjectURL(file);

                const optimiziedBase64 = await useOptimizeImage(file);

                dispatch(userInputValueSet(optimiziedBase64));

                set(ref(db, 'users/' + uid), {
                    profilePicture: optimiziedBase64
                })

                URL.revokeObjectURL(previewUrl);
            } catch (e) {
                console.error('Image optimization failed: ', e)
            }
        }
    }
    

    const signOutFunction = () => {
        const confirmSignOut = confirm('Are you realy want to sign out?');

        if(confirmSignOut){
            signOut(auth);
            dispatch(setUser({
                    email: '',
                    id: '',
                    token: ''
            }))
            redirect('/#home')
        }
    }

     const verifyPageOpen = async () => {
        try{
            dispatch(setVerifyColdown(0));
            redirect('/Login');
            dispatch(setVerifyPageOpen(true));
            await sendEmailVerification(user);
            dispatch(setVerifyColdown(60));

            if(intervalRef.current !== null) return;
            
            intervalRef.current = window.setInterval(() => {
                dispatch(decrementVerifyCooldown());
            }, 1000)
        } catch (e: any) {
            alert(`Error: ${e.code}. Please try again later`);
            dispatch(setVerifyColdown(60));

            if(intervalRef.current !== null) return;
            
            intervalRef.current = window.setInterval(() => {
                dispatch(decrementVerifyCooldown());
            }, 1000)
        }
    }

    const resetPassword = () => {
        const resetPasswordConfirm = confirm('Are you sure you wanna change your password?');

        if(resetPasswordConfirm) {
            setResetPasswordPage(true);
        }
    }
    
    return (
        <>
            {resetPasswordPage && <ResetPasswordPage close={() => setResetPasswordPage(false)} />}
            <div className={styles.SettingsWrapper} style={{display: resetPasswordPage ? 'none' : ''}}>
                <h1>Settings</h1>
                <a className={styles.Back} href="/#home">Back</a>

                <div className={styles.settings}>
                    <input id={`fileInput`} accept="image/png, image/webp, image/jpeg" onChange={(e: ChangeEvent<HTMLInputElement>) => InputOnChage(e)} type="file" />

                    <div className={styles.previewWrapper}>
                        <p className={styles.emailPreview}>{email}</p>
                        
                        <div className={styles.changeImgWrapper}>
                            <label className={styles.UploadImgLabel} htmlFor={'fileInput'}>
                                <img src={userImg || DefaultUserImg} width={userImg ? 50 : 40} height={userImg ? 45 : 35} alt="userImg" />
                            </label>
                        </div>
                    </div>

                    <div className={styles.settingsSectionsWrapper}>
                        <div className={styles.accountSection}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#ddd" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/></svg>
                            
                            <p>Account</p>

                            <div className={styles.accountSectionInfo}>
                                <label className={styles.UploadImgLabel} htmlFor="fileInput">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#ddd" viewBox="0 0 16 16"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/></svg>
                                    <p>Change Profile Image</p>
                                </label>

                                <div className={styles.ChangePassword} onClick={user?.emailVerified ? resetPassword : () => alert('Please verify your email to continue.')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#ddd" viewBox="0 0 16 16"><path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5"/><path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg>
                                    <p>Change Password</p>
                                </div>                                                              

                                {isLogin && !user?.emailVerified &&
                                    <div className={styles.verifyYourEmail} onClick={verifyPageOpen}>
                                        <svg onClick={verifyPageOpen} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#FAAD14" className={styles.Exclamation} viewBox="0 0 16 16"><path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0z"/></svg>
                                        <svg onClick={verifyPageOpen} xmlns="http://www.w3.org/2000/svg" className={styles.emailSvg} width="26" height="26" fill="#FAAD14" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/></svg>
                                        <p onClick={verifyPageOpen}>Verify your email</p>
                                    </div>
                                }
                            </div>  
                        </div>
                    </div>
                    
                    <button onClick={signOutFunction}>Sign out</button>
                </div>
            </div>
        </>
    )
};

export default SettingsPage;