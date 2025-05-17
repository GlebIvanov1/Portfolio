import React from "react";
import styles from './styles.module.scss';
import ProjectsJson from '../../config/Projects.json';
import { ProjectType } from "../../components/FeaturedWorkCard";
import ProjectsCard from "./ProjectsCard";

const Projects: React.FC = () => {

    return (
        <>
            <div className={styles.ProjectsWrapper}>
                <a className={styles.Back} href={'/#home'}>Back</a>
                <h1 className={styles.title}>My projects</h1>

                <div className={styles.CardsWrapper}>
                    {ProjectsJson.map((obj: ProjectType) => (
                        <>
                            <ProjectsCard id={obj.id} description={obj.description} WebSiteLink={obj.WebSiteLink} GithubLink={obj.WebSiteLink} title={obj.title} img={obj.img} shortDescription={obj.shortDescription} featuredWork={obj.featuredWork} />
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Projects;