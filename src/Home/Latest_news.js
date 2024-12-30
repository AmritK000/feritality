// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import { FaRegStarHalfStroke } from "react-icons/fa6";
// import { Link } from "react-router-dom";
// import { Latestnews } from "../components/Images";

// const Latest_news = () => {
//     var settings = {
//         dots: false,
//         arrow: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         Margin: '10',
//         Padding: '10',
//         cssEase: 'linear',
//         responsive: [
//             {
//               breakpoint: 1024,
//               settings: {
//                 slidesToShow: 3,
//                 slidesToScroll: 1,
//               }
//             },
//             {
//               breakpoint: 768, 
//               settings: {
//                 slidesToShow: 1,
//                 slidesToScroll: 1,
//               }
//             }
//           ]
//     };
//     return (
//         <>
//             <Slider {...settings}>

//                 <div className="slide-item">
//                     <div className="grooming_board">

//                         <div className="grooming_board_cardbox">

//                             <img src={Latestnews} />

//                         </div>
//                         <div className="">
//                             <h1 className="location_heading">How to take Better Care </h1>
//                             <div className="location_creation">

//                             <Link to="">
//                                     <p className="mx-0">Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit...<span>READ MORE </span></p>
//                                 </Link>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//                 <div className="slide-item">
//                     <div className="grooming_board">

//                         <div className="grooming_board_cardbox">

//                             <img src={Latestnews} />

//                         </div>
//                         <div className="">
//                             <h1 className="location_heading">How to take Better Care </h1>
//                             <div className="location_creation">
//                             <Link to="">
//                                     <p className="mx-0">Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit...<span>READ MORE </span></p>
//                                 </Link>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//                 <div className="slide-item">
//                     <div className="grooming_board">

//                         <div className="grooming_board_cardbox">
//                             <img src={Latestnews} />
//                         </div>
//                         <div className="">
//                             <h1 className="location_heading">How to take Better Care </h1>
//                             <div className="location_creation">
//                             <Link to="">
//                                     <p className="mx-0">Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit...<span>READ MORE </span></p>
//                                 </Link>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//                 <div className="slide-item">
//                     <div className="grooming_board">

//                         <div className="grooming_board_cardbox">
//                             <img src={Latestnews} />

//                         </div>
//                         <div className="">
//                             <h1 className="location_heading">How to take Better Care </h1>
//                             <div className="location_creation">
//                                 <Link to="">
//                                     <p className="mx-0">Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit...<span>READ MORE </span></p>
//                                 </Link>
//                             </div>

//                         </div>
//                     </div>

//                 </div>



//             </Slider>
//         </>
//     )
// }

// export default Latest_news;


/////////////////////////
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Latestnews } from "../components/Images"; // Assuming this is a placeholder image
import { list } from "../controllers/cms/blogController";
import { ASSETS_BASE_URL } from "../config/constants";
const Latest_news = () => {
  const [ALLLISTDATA, setListData] = useState([]);

  const settings = {
    dots: false,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    margin: '10px',
    padding: '10px',
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

  const getList = async () => {
    try {
      setListData([]);
      const options = {
        type: "",
        condition: {},
        select: {},
        sort: { status: 1, _id: -1 },
        skip: 0,
        limit: 10,
      };
      const listData = await list(options);

      if (listData.status === true) {
        if (listData.result.length > 0) {
          setListData(listData.result);
        } else {
          setListData([]);
        }
      } else {
        setListData([]);
      }
    } catch (error) {
      console.error("Error fetching list data:", error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <Slider {...settings}>
        {ALLLISTDATA.map((item, index) => (
          <div className="slide-item" key={index}>
            <div className="grooming_board">
              <div className="grooming_board_cardbox">
                <img 
                  src={item.image ? `${ASSETS_BASE_URL}${item.image}` : Latestnews} 
                  alt={item.title || "Latest News"} 
                  width="100%" 
                />
              </div>
              <div className="">
                {/* <h1 className="location_heading">{item.title}</h1> */}
                <h1 className="location_heading">{item?.title?.length > 45 ? `${item?.title?.substring(0, 45)}...` : item?.title }</h1>
                <div className="location_creation">
                  <Link to={`/blog/${item._id}`}>
                    <p className="mx-0">
                      {item.content.slice(0, 80)}...<span>READ MORE</span>
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Latest_news;
