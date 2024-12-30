import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { Link } from "react-router-dom";
import { booking_details as previousBooking } from "../../../controllers/services/groomingController"
import SkeltonList from "../../../components/SkeltonEffect/list";

import { ASSETS_BASE_URL } from "../../../config/constants";
import RatingsStar from "../../../components/RatingsStar";

const BookedServiceslider = () => {
  const [bookingDetails, setBookingDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showRequest, setShowRequest] = useState("");
  const targetRef = useRef(null);
  const handleShowRequest = (value) => {
    setShowRequest(value);
  };

  /*********************************************************
   *  This function is use to fetch adoption center list
  *********************************************************/
  const bookingList = async () => {
    setBookingDetails([]);
    setIsLoading(true);
    try {
      const options = {
        type: "",
        condition: {},
        select: {},
        sort: { "_id": -1 },
        page: 1
      }
      const listData = await previousBooking(options); 
      if (listData?.status === true) {
        setBookingDetails(listData.result)
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Failed to fetch prvious grooming details list: ", error)
    }
  }

  /*********************************************************
   *  This function is load when page load and with dependency update
  *********************************************************/
  useEffect(() => {
    bookingList();
    document.title = "Frisbee website || Grooming previous booking list"
  }, [currentPage])

  var settings = {
    dots: false,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    Margin: '10',
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
        }
      }
    ]
  };

  return (
    <>
      {bookingDetails?.length > 0 ? (<>
      <div className="features_grooming ">
        <h1 className="main_heading" >Previous Booked Services</h1>
      </div>
        <Slider {...settings}>
          {bookingDetails.map((item, index) => (
            <div className="slide-item" key={index}>
              <div className="grooming_board booked_services">
                <div className="grooming_board_cardbox">
                  <img src={`${ASSETS_BASE_URL}${item?.shopId?.image}`} alt={item?.shopId?.name} />
                  <div className="add_review">
                    <RatingsStar rating={item?.shopId?.rating} />
                  </div>
                </div>
                <div>
                  <h1 className="location_heading">{item?.shopId?.shop_name || 'Shop name not available'}</h1>
                  <div className="location_creation">
                    <Link to="/">
                      <p className="mx-0">{item?.shopId?.address}</p>
                      <p className="mx-0">AED {item?.bookingdetails[0]?.services?.price}</p>
                    </Link>
                    <button className="adopt_now">Repeat Service</button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </Slider> </>
      ) : isLoading ? <SkeltonList/> : ''}
    </>
  )
}
export default BookedServiceslider;