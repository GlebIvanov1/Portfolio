import React from "react";
import { useSelector } from "react-redux";
import { useIsLogin } from "../../Hooks";
import styles from './styles.module.scss';
import DefaultUserImg from '/img/person-circle.svg';

interface openMenuType {
    closeMenu: () => void;
}

const openMenu: React.FC<openMenuType> = ({closeMenu}) => {
    const isLogin = useIsLogin();
    const file = useSelector((state: any) => state.setting.userInputValue);

    return (
        <>
            <div className={`OpenMenuWrapper ${styles.OpenMenuWrapper}`}>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={closeMenu} width="30" height="30" fill="currentColor" className="closeMenu" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>

                <h2>Pages</h2>

                <a href="/projects" className={styles.MenuOpenProjectWrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#111" viewBox="0 0 16 16"><path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0M1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5"/></svg>

                    <a href={'/projects'} className={styles.MenuOpenProject} style={{width: '90px'}}>My projects</a>
                </a>

                <a href="#contact" className={`${styles.MenuOpenProjectWrapper} ${styles.ContactWrapper}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#111" viewBox="0 0 16 16"><path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/></svg>

                    <a className='Contact' href={'#contact'} style={{width: '60px'}}>Contact Us</a>
                </a>

                <div className={styles.menuOpenLoginWrapper}>
                    <a href={'/Login'} className={styles.menuOpenLogin} style={{width: '114px', display: isLogin ? 'none' : ''}}>Login | Register</a>
                </div>

                {isLogin && 
                    <a href="/Settings" className={styles.menuOpenProfile}>
                        <img className={styles.menuUserImg} width={file ? 55 : 30} height={file ? 53 : 27} src={file ? file : DefaultUserImg} alt='userImg'/>
                    </a>
                }   
            </div>
        </>
    )
}

export default openMenu;