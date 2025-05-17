import React, { useEffect, useState } from "react";
import FeaturedWorkCard from "./FeaturedWorkCard";

const FavoriteWorks: React.FC = () => {
    const [pageActive, setPageActive] = useState(false);
    const [hash, setHash] = useState(location.hash);;

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
    return (
        <>
            <div id="work" className="FavoriteWorksWrapper">
                <h1 style={{display: !pageActive ? "none" : 'block'}} className="title">Featured Work</h1>

                <FeaturedWorkCard />
            </div>
        </>
    )
}

export default FavoriteWorks;