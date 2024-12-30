import React, { useEffect, useRef, useState } from "react";
import { ASSETS_BASE_URL } from "../../../config/constants";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ShopBanner from "./ShopBanner";
import GroomingDownload from "../Grooming/GroomingDownload"
import Sidebar from "../../../components/sidebar";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import { grooimg_firstimg } from "../../../components/Images";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { shopList } from "../../../controllers/store/shopController";
import { ListEffectSkelton } from "../../../components/SkeltonEffect/ListEffectSkelton";
import RatingsStar from "../../../components/RatingsStar";

const Pet_Shop = () => {
    const [ShopListData, setShopList] = useState([]);
    const location = useLocation();

    const [itemstate, setItemState] = useState({});

    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [LIMIT, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [SKIP, setSkip] = useState(0);
    const targetRef = useRef(null);
    const [showRequest, setShowRequest] = useState("");
    const handleShowRequest = (value) => {
        setShowRequest(value);
    };
    /*********************************************************
  *  This function is use to fetch adoption center list
  *********************************************************/
    const serviceShopList = async () => {
        setShopList([]);
        setIsLoading(true);
        try {
            // const longitude = localStorage.getItem('LONGITUDE');
            // const latitude = localStorage.getItem('LATITUDE');
            const longitude = "77.35990816429644";
            const latitude = "28.60934521184752";

            const groomingIds = itemstate._id;
            const options = {
                type: "",
                condition: {
                    ...(showRequest ? { status: showRequest } : null),
                },
                filter: {
                    in_store: "Y",
                    delivery: "Y"
                },
                longitude: longitude,
                latitude: latitude,
                category: groomingIds,
                // select: {},
                sort: { "_id": -1 },
                page: currentPage,
                skip: SKIP ? SKIP : 0,
                limit: LIMIT ? LIMIT : 10
            }
            const listData = await shopList(options);
            if (listData?.status === true) {
                setShopList(listData.result);
            }
        } catch (error) {
            console.log("Failed to fetch groomoing shop list: ", error)
        }
    }

    /*********************************************************
     *  This function is load when page load and with dependency update
    *********************************************************/
    const handleCategoryChange = (itemId) => {
        const updatedItem = itemId;
        setItemState(updatedItem);
    };

    useEffect(() => {
        serviceShopList();
        document.title = "Frisbee website || Grooming store list"
    }, [currentPage, itemstate])
    useEffect(() => {
        const pathName = location.pathname;
        if (pathName.includes('/shop')) {
            const storedData = JSON.parse(localStorage.getItem("serviceListData"))
            const groomingIds = storedData.data.find((item) => item.slug === "shop");
            if (groomingIds) {
                setItemState(groomingIds);
            }
        }
    }, []);

    return (
        <>
            <Header />
            <div className="inner_mainbanner">
                <ShopBanner></ShopBanner>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar category={itemstate} onCategoryChange={handleCategoryChange} />
                    </div>
                    <div className="col-md-9 grooming_info">
                        <div className="features_grooming ">
                            <h1 className="main_heading">
                                Our <span>{itemstate.name !== 'Shop' ? itemstate.name : 'Shop'}</span> {itemstate.name !== 'Shop' && 'Shop'}
                            </h1>

                            <p className="sub_heading">{itemstate.details}</p>
                        </div>
                        {ShopListData?.length > 0 ? (
                            ShopListData.map((item, index) => {

                                const workingDays = item?.storeData?.store_time?.filter(day => day.status === 'Open') || [];

                                // Find the earliest open time and the latest close time
                                const earliestOpenTime = workingDays.reduce(
                                    (earliest, day) => (day.open_time < earliest ? day.open_time : earliest),
                                    workingDays[0]?.open_time
                                );
                                const latestCloseTime = workingDays.reduce(
                                    (latest, day) => (day.close_time > latest ? day.close_time : latest),
                                    workingDays[0]?.close_time
                                );

                                // Function to convert 24-hour time to 12-hour AM/PM format
                                const formatTime = (time) => {
                                    const [hour, minute] = time.split(':');
                                    const hourInt = parseInt(hour, 10);
                                    const period = hourInt >= 12 ? 'PM' : 'AM';
                                    const formattedHour = hourInt % 12 || 12; // Convert hour to 12-hour format, 0 is converted to 12
                                    return `${formattedHour}:${minute} ${period}`;
                                };

                                // Create the formatted working hours string
                                const workingHours = `${formatTime(earliestOpenTime)} - ${formatTime(latestCloseTime)}`;

                                return (
                                    <div className="avenue_pet">

                                        <div className="pet_avenue" key={index}>
                                            <img src={`${ASSETS_BASE_URL}${item.image}`} alt={item.name} />
                                            <p>20% OFF</p>

                                        </div>
                                        <div className="rightside_list">
                                            <RatingsStar rating={item?.ratings} />
                                            <h1 className="my-0">{item?.storeData?.shop_name}</h1>
                                            <p className="mx-0">
                                                {item?.storeData?.short_details?.length > 60
                                                    ? `${item?.storeData?.short_details?.substring(0, 60)}...`
                                                    : item?.storeData?.short_details}
                                            </p>
                                            <div>
                                                <p className="mx-0">
                                                    <span className="shop_info">In-Store | Delivery </span>
                                                    Open ( {workingHours} )
                                                </p>
                                                {/* <p className="mx-0">
                                                    <FaLocationDot id="location" />
                                                    {item?.storeData?.address?.length > 60
                                                        ? `${item?.storeData?.address.substring(0, 60)}...`
                                                        : item?.storeData?.address}
                                                </p> */}
                                                <a
                                                    href={`https://www.google.com/maps/dir/?api=1&destination=${item?.latitude},${item?.longitude}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <p className="mx-0">
                                                        <FaLocationDot id="location" />
                                                        {item?.storeData?.address?.length > 60 ? `${item?.storeData?.address.substring(0, 60)}...` : item?.storeData?.address}
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div>
                                            <Link to={`/shop/shopDetail`} state={{ item, categoryId: itemstate._id }}>
                                                <button>Order Now</button>
                                            </Link>
                                        </div>

                                    </div>
                                );
                            })
                        ) : (
                            <ListEffectSkelton />
                        )}



                    </div>
                </div>
            </div>
            <div className="grooming_download" id="groomingdownload_info">
                <GroomingDownload></GroomingDownload>
            </div>



            <Footer />
        </>
    )
}
export default Pet_Shop;