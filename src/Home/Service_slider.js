import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { list } from "../controllers/services/servicesCategory"
import { ASSETS_BASE_URL } from "../config/constants";
import SkeltonList from "../components/SkeltonEffect/list";
import { useNavigate } from 'react-router-dom';

const Service_slider = ({ onCategoryChange }) => {
        const [ServiceList, setServiceList] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [currentPage, setCurrentPage] = useState(1);
        const navigate = useNavigate();

        /*********************************************************
        *  This function is use to fetch services category list
        *********************************************************/
        const CACHE_EXPIRY = 5 * 60 * 1000;//5minutes
        const getList = async () => {
                setServiceList([])
                const cachedData = JSON.parse(localStorage.getItem('serviceListData'));
                const now = new Date().getTime();
                if (cachedData?.data && cachedData?.data?.length > 0 && cachedData && now - cachedData.timestamp < CACHE_EXPIRY) {
                        setServiceList(cachedData.data);
                } else {
                        setServiceList([]);
                        setIsLoading(true);
                        try {
                                const listData = await list();
                                if (listData?.status === true) {
                                        setIsLoading(false);
                                        const cacheData = {
                                                data: listData?.result,
                                                timestamp: now,
                                        };
                                        setServiceList(listData.result);
                                        localStorage.setItem('serviceListData', JSON.stringify(cacheData));
                                }
                        } catch (error) {
                                console.error("Failed to fetch service list:", error);
                        } finally {
                                setIsLoading(false);
                        }
                }
        }


        const handleNavigation = (slug) => {
                navigate(`/services/${slug}`);
        }


        const handleshopItemClick = (item) => {
                navigate("/shop", { state: { itemId: item } });
                localStorage.setItem('selectedSlug', item._id);
                if (typeof onCategoryChange === 'function') {
                        onCategoryChange(item);
                } else {
                        console.warn('onCategoryChange is not a function');
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
                        }]
        };

        return (
                <>
                        {ServiceList?.length > 0 ? (
                                <Slider {...settings}>
                                        {ServiceList.map((item, index) => (
                                                <div className="slide-item"
                                                        key={index}
                                                        onClick={() => item?.slug === 'shop' ? handleshopItemClick(item) : handleNavigation(item.slug)}
                                                        style={{ cursor: 'pointer' }}
                                                >
                                                        <img src={`${ASSETS_BASE_URL}${item?.image}`} alt={item.name} />
                                                        <p>{item.name}</p>
                                                </div>
                                        ))}
                                </Slider>
                        ) : (
                                <SkeltonList />
                        )}
                </>
        )
}
export default Service_slider;
