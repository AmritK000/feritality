import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { testimonial_img } from "../components/Images";
import React, { useEffect, useState } from "react";
const Testimonial = ()=>{
    const [activeIndex, setActiveIndex] = useState(0);
    var settings = {
        dots: false,
        arrow:true,
        infinite: true,
        speed: 500,
        slidesToShow: 2.3,
        slidesToScroll: 1,
        Margin:'10',
        Padding: '10',
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
                centerMode:false,
              }
            }
          ],
        centerMode:true,
        beforeChange: (current, next) => setActiveIndex(next),
        
      };
      useEffect(() => {
        const slides = document.querySelectorAll('.slide-item');
        slides.forEach((slide, index) => {
            if (index === activeIndex || index === activeIndex + 1) {
                slide.classList.remove('inactive');
            } else {
                slide.classList.add('inactive');
            }
        });
    }, [activeIndex]);
      return(
        <>
          <Slider {...settings}>
          
          <div className="slide-item">
             <div className="slider_testinominal">
                <div>
                    <img src={testimonial_img} className="testimonial_img_pet"/>
                    <p className="pet_photo">Pet photo</p>
                </div>
                <div>
                <div className="add_review">
                    <ul>
                        <li><FaStar /></li>
                        <li><FaStar /></li>
                        <li><FaStar /></li>
                        <li><FaStar /></li>
                        <li><FaRegStarHalfStroke /></li>
                    </ul>
                    <span>4.2</span>
                </div>
                    <p>Boasting an ultra-lightweight nylon and longue saison lining, the Gloas down jacket is designed to provide supreme warmth, without being...<span>READ MORE</span></p>
                    <h1>Harpreet Kaur</h1>
                    <p className="location_name">dubai, UAE</p>
                </div>
             </div>
           </div>
           <div className="slide-item">
           <div   className="slider_testinominal">
                <div>
                <img src={testimonial_img}  className="testimonial_img_pet" />
                    <p className="pet_photo">Pet photo</p>
                </div>
                <div>
                <div className="add_review">
                    <ul>
                        <li><FaStar /></li>
                        <li><FaStar /></li>
                        <li><FaStar /></li>
                        <li><FaStar /></li>
                        <li><FaRegStarHalfStroke /></li>
                    </ul>
                    <span>4.2</span>
                </div>
                    <p>Boasting an ultra-lightweight nylon and longue saison lining, the Gloas down jacket is designed to provide supreme warmth, without being...<span>READ MORE</span></p>
                    <h1>Harpreet Kaur</h1>
                    <p className="location_name">dubai, UAE</p>
                </div>
             </div>
           </div>
           <div className="slide-item">
           <div  className="slider_testinominal">
                <div>
                <img src={testimonial_img} className="testimonial_img_pet" />
                    <p className="pet_photo">Pet photo</p>
                </div>
                <div>
                <div className="add_review">
                    <ul>
                        <li><FaStar /></li>
                        <li><FaStar /></li>
                        <li><FaStar /></li>
                        <li><FaStar /></li>
                        <li><FaRegStarHalfStroke /></li>
                    </ul>
                    <span>4.2</span>
                </div>
                    <p>Boasting an ultra-lightweight nylon and longue saison lining, the Gloas down jacket is designed to provide supreme warmth, without being...<span>READ MORE</span></p>
                    <h1>Harpreet Kaur</h1>
                    <p className="location_name">dubai, UAE</p>
                </div>
             </div>
           </div>
           <div className="slide-item">
           <div  className="slider_testinominal">
                <div>
                <img src={testimonial_img} className="testimonial_img_pet" />
                <p className="pet_photo">Pet photo</p>
                </div>
                <div>
                <div className="add_review">
                    <ul>
                        <li><FaStar /></li>
                        <li><FaStar /></li>
                        <li><FaStar /></li>
                        <li><FaStar /></li>
                        <li><FaRegStarHalfStroke /></li>
                    </ul>
                    <span>4.2</span>
                </div>
                    <p>Boasting an ultra-lightweight nylon and longue saison lining, the Gloas down jacket is designed to provide supreme warmth, without being...<span>READ MORE</span></p>
                    <h1>Harpreet Kaur</h1>
                    <p className="location_name">dubai, UAE</p>
                </div>
             </div>
           </div>
         
          
         
   </Slider>
        </>
      )
}

export default Testimonial;
