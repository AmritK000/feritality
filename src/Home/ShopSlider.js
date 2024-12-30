import React, { useEffect, useState, useRef } from "react";
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


const ShopSlider = () => {
  const [ShopList, setShopList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState();
  const targetRef = useRef(null);
  const [showRequest, setShowRequest] = useState("");
  const handleShowRequest = (value) => {
    setShowRequest(value);
  }



  /*********************************************************
  *  This function is use to fetch grooming store list
  *********************************************************/
  const getList = async () => {
    setShopList([]);
    try {
      const longitude = localStorage.getItem('LONGITUDE');
      const latitude = localStorage.getItem('LATITUDE');
      const storedData = JSON.parse(localStorage.getItem("serviceListData"));
      const shopIds = storedData.data.find((item) => item.slug === "shop")

      const options = {
        type: "",
        condition: {
          ...(showRequest ? { status: showRequest } : null),

        },
        filter: {
          in_store: "N"
        },
        longitude: longitude,
        latitude: latitude,
        category: shopIds?._id,
        select: {},
        sort: { "_id": -1 },
      }
      const listData = await list(options);
      // console.log("listData", listData)
      if (listData?.status === true) {
        setShopList(listData.result);
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
    document.title = 'Frisbee website || Shop slider'
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
      {ShopList?.length > 0 ? (
        <Slider {...settings}>
          {ShopList.map((item, index) => (
            <div className="slide-item" key={index}>
              <div className="grooming_board">
                <div className="grooming_board_cardbox">
                  <Link to="/services/shop">
                    <img src={`${ASSETS_BASE_URL}${item.image}`} alt={item.name} />
                    <RatingsStar rating={item?.ratings} />
                  </Link>
                </div>
                <div className="">
                  <h1 className="location_heading">{item?.storeData?.shop_name || 'Pet Avenue'}</h1>
                  <div className="location_creation">
                    <Link to={`https://www.google.com/maps/dir/?api=1&destination=${ShopList?.latitude},${ShopList?.longitude}`}
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

export default ShopSlider;
