import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoLocationSharp } from "react-icons/io5";
import { recent_booking} from "../../components/Images";
const Bookingslider = () => {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        margin:10,

    };

    return (
        <div className="slick-slider">

            <Slider {...settings}>
                <div>

                    <div className="card_box">
                        <div className="d-flex recent_info">
                            <div>
                              <img src={recent_booking}></img>
                            </div>
                            <div>
                                <p>3 Dec, 2024, At 02:00PM</p>
                                <h2>Standard Groming...</h2>
                                <button>Pick Up & Drop</button>
                            </div>
                        </div>
                        <div className="d-flex location_avenue">
                            <div>
                            <img src={recent_booking}></img>
                            </div>
                            <div>
                                <p>Pet Avenue</p>
                                <h2><IoLocationSharp /> Dubai Al Warsan 3, Birds and...</h2>
                               
                            </div>
                        </div>
                    </div>
                 
                </div>
                <div>
                <div className="card_box">
                        <div className="d-flex recent_info">
                            <div>
                              <img src={recent_booking}></img>
                            </div>
                            <div>
                                <p>3 Dec, 2024, At 02:00PM</p>
                                <h2>Standard Groming...</h2>
                                <button>Pick Up & Drop</button>
                            </div>
                        </div>
                        <div className="d-flex location_avenue">
                            <div>
                            <img src={recent_booking}></img>
                            </div>
                            <div>
                                <p>Pet Avenue</p>
                                <h2><IoLocationSharp /> Dubai Al Warsan 3, Birds and...</h2>
                               
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                <div className="card_box">
                        <div className="d-flex recent_info">
                            <div>
                              <img src={recent_booking}></img>
                            </div>
                            <div>
                                <p>3 Dec, 2024, At 02:00PM</p>
                                <h2>Standard Groming...</h2>
                                <button>Pick Up & Drop</button>
                            </div>
                        </div>
                        <div className="d-flex location_avenue">
                            <div>
                            <img src={recent_booking}></img>
                            </div>
                            <div>
                                <p>Pet Avenue</p>
                                <h2><IoLocationSharp /> Dubai Al Warsan 3, Birds and...</h2>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    );
};

export default Bookingslider;
