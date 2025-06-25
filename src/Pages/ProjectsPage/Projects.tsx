import React from "react";
import { ProjectType } from "../../components/FeaturedWorkCard";
import ProjectsJson from '../../config/Projects.json';
import ProjectsCard from "./ProjectsCard";
import styles from './styles.module.scss';

const Projects: React.FC = () => {

    return (
        <>
            <div className={styles.ProjectsWrapper} style={{zIndex: '1000 !important'}}>
                <a className={styles.Back} href={'/#home'}>Back</a>
                <h1 className={styles.title}>My projects</h1>

                <div className={styles.CardsWrapper}>
                    {ProjectsJson.map((obj: ProjectType, index) => (
                        <>
                            <ProjectsCard key={index} id={obj.id} description={obj.description} WebSiteLink={obj.WebSiteLink} GithubLink={obj.WebSiteLink} title={obj.title} img={obj.img} shortDescription={obj.shortDescription} featuredWork={obj.featuredWork} />
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Projects;