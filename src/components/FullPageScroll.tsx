import React, { useEffect } from "react";
import fullpage from "fullpage.js";
import Home from "../Pages/Home";
import FavoriteWorks from "./FavoriteWorks";
import Contact from "./Contact";

const FullPageScroll: React.FC = () => {
  useEffect(() => {
    new fullpage("#fullpage", {
      autoScrolling: true,
      scrollHorizontally: true,
      navigation: true,
      anchors: ["home", "works", "contact"],
      scrollingSpeed: 800,
    });

    

    // return () => fullpage.destroy("all");
  }, []);

  return (
    <div id="fullpage">
      <div className="section home"><Home  /></div>
      <div className="section work"><FavoriteWorks /></div>
      <div className="section contact"><Contact /></div>
    </div>
  );
};

export default FullPageScroll;
