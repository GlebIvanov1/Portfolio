import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import KworkLogo from '../../public/img/kworkLogo.png?url';
import ContactButton from "./ContactButton";
import GithubLogo from '/img/github.svg?url';

const Contact: React.FC = () => {
    const date = new Date();
    const email = useSelector((state: any) => state.setting.email);
    const phone = useSelector((state: any) => state.setting.phone);
    const [pageActive, setPageActive] = useState(false);
    const [hash, setHash] = useState(location.hash);;

    setInterval(() => {
        setHash(location.hash);
    }, 1)

    useEffect(() => {
        if(hash === '#contact'){
            setPageActive(true);
        } else{
            setTimeout(() => setPageActive(false), 400)
        }
    }, [hash])
    
    return (
        <>
            <div className="ContactWrapper" id="contacts">
                <h1 className="title" style={{display: !pageActive ? 'none' : 'block'}}>Contact Me</h1>
                <h2 className="description" style={{display: !pageActive ? 'none' : 'block'}}>If you are looking for a front-end developer, I am currently available to be hired.</h2>

                <div className="ContactButtonWrapper" style={{display: !pageActive ? 'none' : 'block'}}>
                    <ContactButton />
                </div>
            </div>
            
            <div className="footer">
                <p style={{display: !pageActive ? 'none' : 'block'}}>Made by Gleb Ivanov - Copyright {date.getFullYear()}</p>

                <div className="icons">
                    <a href={`mailto: ${email}`}>
                        <svg width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" fill=""/></svg>
                    </a>
                    <a href={`tel:${phone}`}>
                        <svg width={25} height={25} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
                    </a>
                    <a className="githubLogoFooter" href="https://github.com/CypherTeamWeb" target="_blank">
                        <img width={25} height={25} src={GithubLogo} alt="GithubLogog" />
                    </a>
                    <a href="https://kwork.ru/user/glebivanov-frontend" target="_blank">
                        <img width={27} height={27} src={KworkLogo} alt="KworkLogo" />
                    </a>
                </div>
            </div>
        </>
    )
}

export default Contact;