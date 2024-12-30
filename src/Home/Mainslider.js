import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { mainslider } from "../components/Images";
import { left_side } from "../components/Images";
import { list } from "../controllers/cms/banner"
import { ASSETS_BASE_URL } from "../config/constants";
import SkeltonList from "../components/SkeltonEffect/list";


const Mainslider = () => {
  const [bannerList, setBannerList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  /*********************************************************
  *  This function is use to fetch services category list
  *********************************************************/
  const getList = async () => {
    setBannerList([]);
    setIsLoading(true);
    try {
      const listData = await list();
      if (listData?.status === true) {
        setBannerList(listData?.result);
      }
    } catch (error) {
      console.log("failed to fetch banner list:", error);
    } finally {
      setIsLoading(false);
    }
  }

  /*********************************************************
    *  This function is load when page load and with dependency update
    *********************************************************/
  useEffect(() => {
    getList();
  }, [currentPage])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <Slider {...settings}>
        {bannerList?.length > 0 ? (bannerList.map((item, index) => (
          <div className="slide-item" key={index}>
            <img src={`${ASSETS_BASE_URL}${item?.image}`} alt={item.name} />
            <div className="main_slidercontent"> 
            <p>Making  <span className="your">your</span></p>
             <h1>DOGS <sapn className="happy">HAPPY!</sapn> </h1>
             <h1 className="animation_text">DOGS <sapn className="happy">HAPPY!</sapn> </h1>
             </div>
          </div>
        ))
        ) : (
          <SkeltonList />
        )}
      </Slider>
    </>
  )
}
export default Mainslider;



