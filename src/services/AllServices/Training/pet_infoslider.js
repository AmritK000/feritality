import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { petDetails } from "../../../controllers/common";
import { ASSETS_BASE_URL } from "../../../config/constants";
import { Link } from "react-router-dom";
import { ListEffectSkelton } from "../../../components/SkeltonEffect/ListEffectSkelton";
import { calculateAge } from "../../../util/common";

const Pet_infoslider = ({petData, setPetData,petDetail}) => {
  // const [petDetail, setpetDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showRequest, setShowRequest] = useState("");
  const [selectedPetData, setSelectedPetData] = useState(petData);
  const targetRef = useRef(null);

  const handleShowRequest = (value) => {
    setShowRequest(value);
  };

  /*********************************************************
   *  This function is use to fetch adoption center list
  *********************************************************/
  // const bookingList = async () => {
  //   setpetDetails([]);
  //   setIsLoading(true);
  //   try {
  //     const options = {
  //       type: "",
  //       condition: {},
  //       select: {},
  //       sort: { "_id": -1 },
  //       page: 1,
  //       populate: {
  //         key: "",
  //         select: " "
  //       }
  //     }
  //     const listData = await petDetails(options);
  //     if (listData?.status === true) {
  //       setpetDetails(listData.result)
  //     }
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log("Failed to fetch pet details list: ", error)
  //   }
  // }

  /*********************************************************
   *  This function is load when page load and with dependency update
  *********************************************************/
  useEffect(() => {
    // bookingList();
    document.title = "Frisbee website || pet details list"
  }, [currentPage]);

 const selectPetProfile = (item) =>{
  setSelectedPetData(item);
  setPetData(item);
 }


  var settings = {
    dots: false,
    arrow: true,
    infinite: false,
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
      {petDetail?.length > 0 ? (<>
        <Slider {...settings}>
          {petDetail.map((item, index) => (
            <div className="slide-item" key={index}>
              <div className="grooming_board booked_services">
                <div className="grooming_board_cardbox">
                  {selectedPetData?._id === item._id && (
                    <p>Selected</p>
                  )}
                  <img src={`${ASSETS_BASE_URL}${item.image}`} alt={item.name} />
                </div>
                <div>
                  <h1 className="location_heading">{item.name}</h1>
                  <div className="location_creation">
                    <Link to={false}  onClick={()=>selectPetProfile(item)}>
                      <p className="mx-0"><span>Age</span> : {item.dob ? calculateAge(item.dob):  '1 year 8 months'}</p>
                      <p className="mx-0"><span>Gender</span>  : {item.gender}</p>
                      <p className="mx-0"><span>Breed</span> : {item.breed}</p>
                      <p className="mx-0"><span>Location</span> :{item.city}</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </>
      ) : isLoading ? <ListEffectSkelton /> : ''}
    </>
  )
}

export default Pet_infoslider;


