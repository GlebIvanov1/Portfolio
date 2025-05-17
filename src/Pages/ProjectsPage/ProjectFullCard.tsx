import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { ProjectType } from "../../components/FeaturedWorkCard";
import ProjectsJson from '../../config/Projects.json';
import { setId } from "../../redux/slices/ProjectsSlice";
import styles from './styles.module.scss';
import GithubLogo from '/img/whiteGithub.svg';

const ProjectsFullCard: React.FC = () => {
    const {id} = useParams();
    const [items, setItems] = useState<ProjectType[]>([]);
    const [imgActive, setImgActive] = useState(0);
    const dispath = useDispatch();

    useEffect(() => {
        setItems(ProjectsJson.filter((obj: ProjectType) => obj.id === Number(id)));
    }, [])

    useEffect(() => {
        dispath(setId(id))
    }, [items])

    const ArrowLeft = (img: string[]) => {
        if(imgActive !== 0){
            setImgActive((prev: number) => prev - 1)
        } else {
            setImgActive(img.length - 1)
        }
    }

    const ArrowRight = (img: string[]) => {
        if(imgActive !== img.length - 1){
            setImgActive((prev: number) => prev + 1);
        } else {
            setImgActive(0);
        }
    }

    return (
        <>
            <div className={styles.FullCardWrapper}>
                <a href="/#home" className={styles.back}>Back</a>
                {items.map((obj, index: number) => (
                    <>
                        <div key={index} className={styles.FullCard}>
                            <h1 key={obj.title} className={styles.title}>{obj.title}</h1>
                            
                            <div className={styles.imgWrapper}>
                                <svg onClick={() => ArrowLeft(obj.img)} xmlns="http://www.w3.org/2000/svg" style={{transform: 'rotate(180deg)'}} width="30" height="30" fill="currentColor" className={styles.ArrowLeft} viewBox="0 0 16 16"><path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" fill="#d1d1d1"/></svg>
                                <img className={styles.CardImg} src={obj.img[imgActive]} key={imgActive} alt="img" />
                                <svg onClick={() => ArrowRight(obj.img)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className={styles.Right} viewBox="0 0 16 16"><path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" fill="#d1d1d1"/></svg>
                            </div>
                            
                            <div className={styles.info}>
                                <p key={obj.description}>{obj.description}</p>
                                <div className={styles.Buttons}>
                                    <a href={obj.WebSiteLink} target="_blank" className={styles.website}>
                                        <svg width={30} height={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" fill="#fff"/></svg>
                                        <span>Link to WebSite</span>
                                    </a>
                                    <a href={obj.GithubLink} target="_blank" className={styles.github}>
                                        <span>GitHub</span>
                                        <img width={45} height={45} src={GithubLogo} alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default ProjectsFullCard;