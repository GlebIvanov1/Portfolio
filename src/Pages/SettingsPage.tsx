import { getAuth, signOut } from "firebase/auth";
import { child, get, getDatabase, ref, set } from "firebase/database";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import DefaultUserImg from '../../public/img/person-circle.svg';
import { useOptimizeImage } from "../Hooks";
import { userInputValueSet } from "../redux/slices/settingsSlice";

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
                    
                    
                    <button onClick={signOutFunction}>Sign out</button>
                </div>
            </div>
        </>
    )
};

export default SettingsPage;