import React, { lazy, useEffect, useState } from 'react';
import ContactButton from '../components/ContactButton';

const Header = lazy(() => import('../components/Header/Header'));

const Home: React.FC = () => {
    const [pageActive, setPageActive] = useState(true);
    const [hash, setHash] = useState(location.hash); 
    
    setInterval(() => {
        setHash(location.hash);
    }, 1);
    
    useEffect(() => {
        if(hash === '#home' && hash){
            setPageActive(true);
        }
    }, [hash]);

    return (
        <>
            <div className="HomeWrapper">   
                <Header />
  
                <main>
                    <div className="info">
                        <h1 className="title" style={{display: !pageActive ? 'none' : 'block'}}>Hi, i am Gleb Ivanov</h1>
                        <h3 className="work" style={{display: !pageActive ? 'none' : 'block'}}>I am an Frontend developer. I help businesses and companies reach their goals.</h3>
                        
                        <div style={{display: !pageActive ? 'none' : 'block'}} className='ContactButtonWrapper'>
                            <ContactButton />
                        </div>
                    </div>

                    <div className='ImageWrapper'>
                        <img style={{display: !pageActive ? 'none' : 'block'}} src="/img/photo.jpg" alt="" />
                    </div>
                </main>

                <a className='ToWorks' href='#works'>
                    <svg style={{display: !pageActive ? 'none' : 'block'}} xmlns="http://www.w3.org/2000/svg" width="25" fill="#ddd" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/></svg>              
                    <p style={{display: !pageActive ? 'none' : 'block'}}>Featured Work</p>
                </a>
            </div>
        </>
    )
}

export default Home;