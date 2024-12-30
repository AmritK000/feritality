import React from "react";
import { Placeholder } from "react-bootstrap";
import Slider from "react-slick";


const SkeltonEffect = () => {
  var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    margin: '10px',
    padding: '0',
    cssEase: 'linear',
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }
    ]
};
  return (
    <>
     <Slider {...settings}>
      {[...Array(7)].map((_, index) => (
        <div className="slide-item" key={index}>
          <Placeholder as="div" animation="wave">
            <div className="placeholder-img-wrapper">
              <Placeholder className="placeholder-img" />
            </div>
            <Placeholder xs={6} className="placeholder-text" />
          </Placeholder>
        </div>
      ))}
       </Slider>
    </>
  );
};

export default SkeltonEffect;

