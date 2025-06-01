import { getAuth, signOut } from "firebase/auth";
import { child, get, getDatabase, ref, set } from "firebase/database";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import DefaultUserImg from '../../public/img/person-circle.svg';
import { useOptimizeImage } from "../Hooks";
import { userInputValueSet } from "../redux/slices/settingsSlice";
import { setUser } from "../redux/slices/userSlice";

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
    
    return (
        <>
            <div className='SettingsWrapper'>
                <h1>Settings</h1>
                <a className="Back" href="/#home">Back</a>

                <div className="settings">
                    <input id="file-input" accept="image/png, image/webp, image/jpeg" onChange={(e: ChangeEvent<HTMLInputElement>) => InputOnChage(e)} type="file" />

                    <p className="emailPreview">{email}</p>
                        
                    <div className="changeImgWrapper">
                        <label className='UploadImgLabel' htmlFor="file-input">
                            <img src={userImg || DefaultUserImg} width={userImg ? 50 : 40} height={userImg ? 45 : 35} alt="userImg" />
                        </label>
                    </div>

                    <div className="settingsSectionsWrapper">
                        <div className="accountSection">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#ddd" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/></svg>
                            
                            <p>Account</p>

                            <div className="accountSectionInfo">
                                <label className='UploadImgLabel' htmlFor="file-input">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#ddd" viewBox="0 0 16 16"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/></svg>
                                    <p>Change Profile Image</p>
                                </label>
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