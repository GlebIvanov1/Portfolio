import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { useIsLogin } from "../../Hooks";
import { isLoadingSet, userInputValueSet } from "../../redux/slices/settingsSlice";
import OpenMenu from './OpenMenu';
import styles from './styles.module.scss';
import DefaultUserImg from '/img/person-circle.svg';

const Header: React.FC = () => { 
    const uid = useSelector((state: any) => state.user.id);
    const dbRef = ref(getDatabase());
    const file = useSelector((state: any) => state.setting.userInputValue);
    const dispatch = useDispatch();
    const isLogin = useIsLogin();
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        dispatch(isLoadingSet(true));
        get(child(dbRef, `users/${uid}`)).then((snapshot) => {
            if(snapshot.exists()){
                dispatch(userInputValueSet(snapshot.val().profilePicture));
            } else{
                console.log('No data availble');
            }
        }).catch(() => {
            dispatch(userInputValueSet(''));
        })
        dispatch(isLoadingSet(false));
    }, [file])

    const menuOpen = () => {
        setOpenMenu(true);
    }

    return (
        <>
            <div className={styles.HeaderWrapper}>
                <Link className={styles.Logo} to='/'>Portfolio</Link>

                <div className={styles.Links}>
                    <a href={'/projects'} style={{width: '90px'}}>My projects</a>
                    <a className='Contact' href={'#contact'} style={{width: '60px'}}>Contact</a>
                    <a href={'/Login'} style={{width: '114px', display: isLogin ? 'none' : ''}}>Login | Register</a>
                    
                    {isLogin && 
                        <a href="/Settings">
                            <img src={file ? file : DefaultUserImg} className={styles.userImg} style={{marginRight: !file ? '15px' : ''}} width={file ? 49 : 30} height={file ? 46 : 27} alt='userImg'/>
                        </a>
                    }
                </div>

                <div onClick={menuOpen} className={styles.MenuWrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" fill='#fff'/></svg>
                </div>
            </div>

            {openMenu && <OpenMenu closeMenu={() => setOpenMenu(false)} />}
        </>
    )
}

export default Header;