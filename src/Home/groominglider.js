import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { list } from "../controllers/store/storeController";
import SkeltonList from "../components/SkeltonEffect/list";
import { ASSETS_BASE_URL } from "../config/constants";
import RatingsStar from "../components/RatingsStar";


const GroomingSlider = () => {
  const [GroomingList, setGroomingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState();
  const [categoryId, setCategortId] = useState('');
  const [showRequest, setShowRequest] = useState("");
  const handleShowRequest = (value) => {
    setShowRequest(value);
  }


  /*********************************************************
  *  This function is use to fetch grooming store list
  *********************************************************/
  const getList = async () => {
    setGroomingList([]);
    try {
      const longitude = localStorage.getItem('LONGITUDE');
      const latitude = localStorage.getItem('LATITUDE');
      const storedData = JSON.parse(localStorage.getItem("serviceListData"));
      const groomingIds = storedData.data.find((item) => item.slug === "grooming");
      setCategortId(groomingIds?._id);

      const options = {
        type: "",
        condition: {
          ...(showRequest ? { status: showRequest } : null),
        },
        filter: {},
        longitude: longitude,
        latitude: latitude,
        category: groomingIds?._id,
        select: {},
        sort: { "_id": -1 }
      }
      const listData = await list(options);
      if (listData?.status === true) {
        setGroomingList(listData.result);
      }
    } catch (error) {
      console.error("Failed to fetch service list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /*********************************************************
  *  This function is load when page load and with dependency update
 *********************************************************/
  useEffect(() => {
    getList();
  }, [currentPage])

  var settings = {
    dots: false,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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
      {GroomingList?.length > 0 ? (
        <Slider {...settings}>
          {GroomingList.map((item, index) => (
            <div className="slide-item" key={index}>
              <div className="grooming_board">
                <div className="grooming_board_cardbox">
                  <div className="offer_discount">
                    <h1>{item.discountPercentage || '20%'}</h1>
                    <p>off</p>
                  </div>
                  <Link to="/services/grooming">
                    <img src={`${ASSETS_BASE_URL}${item.image}`} alt={item.name} />
                  </Link>
                  <RatingsStar rating={item?.ratings} />
                </div>
                <div className="">
                  <h1 className="location_heading">{item?.storeData?.shop_name || 'Pet Avenue'}</h1>
                  <div className="location_creation">
                    <Link to={`https://www.google.com/maps/dir/?api=1&destination=${GroomingList?.latitude},${GroomingList?.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer">
                      <FaLocationDot id="location" style={{ marginRight: '8px' }} />
                      <p>{item?.address?.length > 30
                        ? `${item.address.substring(0, 30)}...`
                        : item?.address}</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <SkeltonList />
      )}
    </>
  )
}

export default GroomingSlider;



