import fullpage from "fullpage.js";
import React, { useEffect } from "react";
import FullCardCommentsSection from './FullCardCommentsSection.tsx';
import ProjectsFullCard from "./ProjectFullCard";

const FullCardFullPage: React.FC = () => {
    useEffect(() => {
        new fullpage("#fullpage", {
        autoScrolling: true,
        scrollHorizontally: true,
        navigation: true,
        anchors: ["FullCardMain", 'Comments'],
        scrollingSpeed: 800,
        });

        return () => fullpage.destroy("all");
    }, []);

    return (
        <div id="fullpage">
            <div className="section FullCardMain"><ProjectsFullCard /></div>
            <div className="section Comments"><FullCardCommentsSection /></div>
        </div>
    );
};

export default FullCardFullPage;
