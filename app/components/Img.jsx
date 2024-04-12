import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Img = ({ src, className }) => {
    // const handleThumbnailError = (event) => {
    //     // Handle thumbnail loading error
    //     event.target.src = '/error1.webp'; // Replace with the path to your error image
    //   };
    
    return (
        <LazyLoadImage
            className={className || ""}
            alt=""
            // onError={handleThumbnailError}
            effect="blur"
            src={src}
        />
    );
};

export default Img;