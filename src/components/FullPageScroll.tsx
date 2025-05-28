import fullpage from "fullpage.js";
import React, { lazy, useEffect } from "react";

const Home = lazy(() => import('../Pages/Home'));
const FavoriteWorks = lazy(() => import('./FavoriteWorks'));
const Contact = lazy(() => import('./Contact'));

const FullPageScroll: React.FC = () => {
    useEffect(() => {
      new fullpage("#fullpage", {
        autoScrolling: true,
        scrollHorizontally: true,
        navigation: true,
        anchors: ["home", "works", "contact"],
        scrollingSpeed: 800,
      });
    }, []);

    return (
      <div id="fullpage">
        <div className="section home"><Home/></div>
        <div className="section work"><FavoriteWorks /></div>
        <div className="section contact"><Contact /></div>
      </div>
    );
};

export default FullPageScroll;
