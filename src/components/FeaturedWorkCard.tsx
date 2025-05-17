import React, { useEffect, useState } from "react";
import Project from '../config/Projects.json';
import { useIsLogin } from "../Hooks";

export type ProjectType = {
    title: string;
    img: string[];
    shortDescription: string;
    id: number;
    description: string;
    WebSiteLink: string;
    GithubLink: string;
    featuredWork?: boolean;
}

const FeaturedWorkCard: React.FC = () => {
    const [item, setItem] = useState<ProjectType[]>([]);
    const [pageActive, setPageActive] = useState(false);
    const [hash, setHash] = useState(location.hash);
    const isLogin = useIsLogin();
    
    setInterval(() => {
        setHash(location.hash);
    }, 1)
    
    useEffect(() => {
        if(hash === '#works'){
            setPageActive(true);
        } else{
            setTimeout(() => setPageActive(false), 400)
        }
    }, [hash])

    useEffect(() => {
        setItem(Project.filter((obj: ProjectType) => obj.featuredWork))
    }, [])
    return (
        <>
            <div className="FeaturedWorkCardWrapper">
                {item.map((obj) => (
                    <>
                        <div className="ImgWrapper">
                            <img src={obj.img[0]} alt="" />
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="gold" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>
                        </div>
                        <div className="SideWrapper">
                            <h2 style={{display: !pageActive ? 'none' : 'block'}} className="Title">{obj.title}</h2>
                            <p style={{display: !pageActive ? 'none' : 'block'}} className="shortDescription">{obj.shortDescription}</p>

                            <a href={isLogin ? `/projects/${obj.id}` : '/Login'} style={{display: !pageActive ? 'none' : 'block'}} className="SeeMoreWrapper">
                                <a href={isLogin ? `/projects/${obj.id}` : '/Login'}>See more</a>
                            </a>
                        </div>
                    </>
                ))} 
            </div>
        </>
    )
}

export default FeaturedWorkCard;