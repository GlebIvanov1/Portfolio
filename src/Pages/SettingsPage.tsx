import { getAuth, signOut } from "firebase/auth";
import { child, get, getDatabase, ref, set } from "firebase/database";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultUserImg from '../../public/img/person-circle.svg';
import { userInputValueSet } from "../redux/slices/settingsSlice";

interface SettingsPageType {
    onClose: () => void;
}

const SettingsPage: React.FC<SettingsPageType> = ({ onClose }) => {
    const auth = getAuth();
    const db = getDatabase();
    const dbRef = ref(getDatabase())
    const uid = useSelector((state: any) => state.user.id);
    const email = useSelector((state: any) => state.user.email);
    const [userImg, setUserImg] = useState('');
    const userInputValue = useSelector((state: any) => state.setting.userInputValue)
    const dispatch = useDispatch(); 

    useEffect(() => {
        get(child(dbRef, 'users/' + uid + '/')).then((snapshot) => {
            setUserImg(snapshot.val().profilePicture);
        })
    }, [userInputValue, userImg])

    const InputOnChage = (e: ChangeEvent<HTMLInputElement>) => {    
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const base64 = e.target?.result as string
                dispatch(userInputValueSet(base64));

                set(ref(db, 'users/' + uid), {
                    profilePicture: base64
                })
            }

            reader.readAsDataURL(e.target.files[0]);
        }
    }
    

    const signOutFunction = () => {
        const confirmSignOut = confirm('Are you realy want to sign out?');

        if(confirmSignOut){
            signOut(auth);
            onClose();
        }
    }
    
    return (
        <>
            <div className='SettingsWrapper'>
                <h1>Settings</h1>
                <a className="Back" href="/#home">Back</a>

                <div className="settings">
                    <input id="file-input" onChange={(e: ChangeEvent<HTMLInputElement>) => InputOnChage(e)} type="file" />

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