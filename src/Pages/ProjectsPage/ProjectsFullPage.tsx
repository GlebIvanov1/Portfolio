import fullpage from "fullpage.js";
import React, { useEffect } from "react";
import Projects from "./Projects";

const ProjectsFullPageScroll: React.FC = () => {
    useEffect(() => {
        new fullpage("#fullpage", {
        autoScrolling: true,
        scrollHorizontally: true,
        navigation: true,
        anchors: ["projectFirstPage"],
        scrollingSpeed: 800,
        });

        return () => fullpage.destroy("all");
    }, []);

    return (
        <div id="fullpage">
            <div className="section projectFirstPage"><Projects /></div>
        </div>
    );
};

export default ProjectsFullPageScroll;
