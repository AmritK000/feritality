import React from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./productslider.css";
import {ASSETS_BASE_URL} from "../../../config/constants";

// import { productsliderfirst, productslidersecond, productsliderthird, productsliderfourth } from "../components/Images";
//import { productsliderfirst, productslidersecond, productsliderthird, productsliderfourth } from "../../../components/Images";

// const images = [
//   {
//     original: productsliderfirst,   
//     thumbnail: productsliderfirst, 
//     description:"20% Off", 
//   },
//   {
//     original: productslidersecond,  
//     thumbnail: productslidersecond, 
//     description:"20% Off", 
//   },
//   {
//     original: productsliderthird,   
//     thumbnail: productsliderthird,  
//   },
//   {
//     original: productsliderfourth,  
//     thumbnail: productsliderfourth, 
//     description:"20% Off ", 
//   },
// ];

function Productslider({ image }) {
  const images = [
    {
      original: `${ASSETS_BASE_URL}${image}`,  // Correctly use the image prop with the base URL
      thumbnail: `${ASSETS_BASE_URL}${image}`,  // Use the image prop for the thumbnail as well
      description: "20% Off",
    },
    // You can add more images or use the passed prop to create a dynamic gallery
  ];
  return (
    <div className="gallery">
      <ImageGallery 
        showPlayButton={false} 
        slideDuration={1000} 
        autoPlay={false}
        showFullscreenButton={false}
        showNav={false} 
        items={images} 
      />
    </div>
  );
}

export default Productslider;
