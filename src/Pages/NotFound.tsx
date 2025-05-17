import React from "react";

const NotFound: React.FC = () => {
    return (
        <>
            <div className="NotFoundWrapper">
                    <h1>Page not found</h1>
                    <p>Looks like the page you are searching for does not exist.</p>
                    <a href="/#home" className="back">Back</a>
            </div>
        </>
    )
}

export default NotFound;