import React, { useEffect, useState } from "react";
import { FaStar, FaRegStarHalfStroke, FaLocationDot } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Appdownaload from "../../../Home/Appdowanload";
import BookedServiceslider from "./BookedServiceslider";
import { list } from "../../../controllers/store/storeController";
import { details as vetrinary_services } from "../../../controllers/services/veterinaryController";
import { ASSETS_BASE_URL } from "../../../config/constants";
import RatingsStar from "../../../components/RatingsStar";
import { shortDescription, getWorkingDays } from "../../../controllers/common";
import InnerServiceSidebar from "../../../components/InnerServiceSidebar";
import moment from 'moment';
import BookingPopup from "./BookingPopup"
import { ListEffectSkelton } from "../../../components/SkeltonEffect/ListEffectSkelton";


const VetrinaryStoredetails = () => {
    const token = sessionStorage.getItem("TOKEN");
    const [loginPopupShow, setLoginPopupShow] = useState(false);
    const togglelLoginPopupShow = () => {
        setLoginPopupShow(!loginPopupShow);
    }
    const [StoreDetails, setStoreDetails] = useState([]);
    const [popUp, setPopUp] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [LIMIT, setLimit] = useState(10);
    const [SKIP, setSkip] = useState(0);
    const [showRequest, setShowRequest] = useState("");
    const [categoryId, setCategortId] = useState('');
    const [storeId, setStoreId] = useState('');
    const [branchId, setBranchtId] = useState('');
    const [servicesId, setServicesId] = useState('');
    const { id, } = useParams();
   
    const handleShowRequest = (value) => {
        setShowRequest(value);
    };

    /*********************************************************
   *  This function is use to fetch adoption dog list
   *********************************************************/
    const getDetails = async () => {
        setStoreDetails([]);
        try {
            const latitude = localStorage.getItem("LATITUDE");
            const longitude = localStorage.getItem("LONGITUDE");
            const storedData = JSON.parse(localStorage.getItem("serviceListData"));
            const vetrinaryIds = storedData.data.find((item) => item.slug === "veterinary");
            setCategortId(vetrinaryIds?._id);
            // console.log("vetrinaryIds vetrinaryIds", vetrinaryIds)
            const options = {
                type: "single",
                condition: {
                    ...(showRequest ? { status: showRequest } : null),
                    ...(id ? { _id: id } : null),
                },
                filter: {
                    in_store: ""
                },
                longitude: longitude,
                latitude: latitude,
                category: vetrinaryIds?._id,
                select: {},
                sort: { "_id": -1 },
                skip: SKIP ? SKIP : 0,
                limit: LIMIT ? LIMIT : 10
            }
            const listData = await list(options);
            if (listData?.status === true) {
                setStoreDetails(listData.result);
                setBranchtId(listData?.result?._id);
                setStoreId(listData?.result?.storeData?._id);

                if (listData.result?.storeData?._id && listData.result?._id) {
                    const vetrinaryOptions = {
                        type: "",
                        condition: {
                            store: listData.result.storeData._id,
                            branch: listData.result._id,
                            category: vetrinaryIds?._id,
                            ...(showRequest ? { status: showRequest } : null),
                        },
                        select: {},
                        sort: { "_id": -1 },
                        page: 1
                    };
                    const vetrinaryData = await vetrinary_services(vetrinaryOptions);
                    if (vetrinaryData?.status === true) {
                        setStoreDetails(prevDetails => ({
                            ...prevDetails,
                            vetrinaryServices: vetrinaryData.result
                        }));
                    } else {
                        console.log("Failed to fetch dayCare services");
                    }
                }
            }
        } catch (error) {
            console.log("Failed to fetch service list:", error);
        } finally {
            setIsLoading(false);
        }
    };

    /*********************************************************
    *This function is used to show order now Pop for InStore and Pick&Drop
    *********************************************************/
   const orderNow_popShow = (item) => {
    setServicesId(item);
    setPopUp(!popUp);
   }

   const closePopUp = () => {
    setPopUp(false);
};

    /*********************************************************
    *This function is load when page load and with dependency update
    *********************************************************/
    useEffect(() => {
        getDetails();
    }, [currentPage])

    return (
        <>
            <Header isLoginShow={loginPopupShow}/>
            <div className="adoption_info">
                <div className="container mt-5">
                    <div className="row my-4">
                        <div className="col-md-2 px-0">
                            <div className="pet_avenue">
                                <img src={`${ASSETS_BASE_URL}${StoreDetails?.storeData?.image}`} alt={StoreDetails?.name} width={`100px`} />
                                <p>20% OFF</p>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="rightside_list">
                                <div className="add_review">
                                    <RatingsStar rating={StoreDetails?.ratings} />
                                </div>
                                <h1>{StoreDetails?.branch_name}</h1>
                                <p className="mx-0">{shortDescription?.title}</p>
                                {/* <p className="mx-0">{shortDescription(StoreDetails?.title,200)}</p> */}
                                <div>
                                    <p className="mx-0"><Link to={`https://www.google.com/maps/dir/?api=1&destination=${StoreDetails?.latitude},${StoreDetails?.longitude}`}
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        <FaLocationDot id="location" />
                                    </Link>
                                        {StoreDetails?.address}</p>
                                    <p className="mx-0"><span className="shop_info">Working Days  : </span> {getWorkingDays(StoreDetails?.storeData?.store_time)}</p>
                                    <p className="mx-0"><span className="shop_info">Working Hours : </span>{StoreDetails?.storeData?.opentime && StoreDetails?.storeData?.closetime
                                        ? `${moment(StoreDetails?.storeData?.opentime, 'HH:mm').format('hh:mm')}AM - ${moment(StoreDetails?.storeData?.closetime, 'HH:mm').format('hh:mm')} PM` : "Opening hours not available"} </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 px-0">
                            <button className="textend"><Link to={`https://www.google.com/maps/dir/?api=1&destination=${StoreDetails?.latitude},${StoreDetails?.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer">Get Direction</Link></button>
                        </div>
                        <div className="col-md-12 px-0">
                            <h1>Description</h1>
                            <p>{StoreDetails?.storeData?.short_details}</p>
                        </div>
                        {(StoreDetails?.center_facilities && StoreDetails?.center_facilities.length > 0) && (
                            <div className="col-md-12 px-0">
                                <h1>Centre Facilities:</h1>
                                <ul className="ceter_fac">
                                    {StoreDetails?.center_facilities.map((facility, index) => (
                                        <li key={index}>{index + 1}. {facility}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                    </div>
                </div>
            </div>
           {/* Vetrinary services section */}
            <div className="">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <InnerServiceSidebar slug="veterinary" vendorData={StoreDetails?.vendorData}  storeId={StoreDetails?._id} StoreDetails = {StoreDetails} category ={categoryId}/>
                        </div>
                        <div className="col-md-9 grooming_info">
                            <BookedServiceslider />
                            <div className="features_grooming ">
                                <h1 className="main_heading" ><span>Vetrinary </span> Service</h1>
                                <p className="sub_heading">It is a long established fact that a reader will be distracted by the readable content</p>
                            </div>

                            {StoreDetails?.vetrinaryServices?.length > 0 ? (
                                StoreDetails.vetrinaryServices.map((item, index) => (
                                    <div className="avenue_pet" key={index}>
                                        <Link to={false}>
                                            <div className="pet_avenue">
                                                <img src={`${ASSETS_BASE_URL}${item.image}`} alt={item.name} />
                                            </div>
                                            <div className="rightside_list">
                                                <div className="add_review">
                                                    <RatingsStar rating={item?.store?.rating} />
                                                </div>
                                                <h1 className="my-0">{item?.name}</h1>
                                                <p className="mx-0">{shortDescription(item?.details, 100)}</p>

                                                <div className="connect_btn">
                                                    {item?.store?.in_store === "Y" && (
                                                        <button className="adopt_now"><Link to="/">In Store</Link></button>
                                                    )}
                                                    {item?.store?.pick_drop === "Y" && (
                                                        <button className="adopt_now"><Link to="/">Pick Up</Link></button>
                                                    )}
                                                    {item?.store?.type_mobile === "Y" && (
                                                        <button className="adopt_now"><Link to="/">Mobile</Link></button>
                                                    )}
                                                </div>
                                                <p> AED {item?.price}  <span><strike>{item?.store?.title}</strike></span></p>
                                                <div>
                                                </div>
                                            </div>
                                            <div>
                                                {!token?(
                                                    <button type="button" className="booknow_service" onClick={()=>togglelLoginPopupShow()}>
                                                        Order Now
                                                    </button>
                                                ):(
                                                    <button type="button" className="booknow_service" onClick={()=>orderNow_popShow(item)}>
                                                        Order Now
                                                    </button>
                                                )}
                                            </div>
                                        </Link>
                                    </div>

                                ))
                            ) : (
                                <ListEffectSkelton />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {popUp && <BookingPopup closePopUp={closePopUp} 
            storeTime={StoreDetails?.storeData?.store_time} 
            groomingFulfillment={StoreDetails?.groomingFulfillment} 
            storeId = {storeId}
            branchId = {branchId}
            categoryId = {categoryId}
            servicesId = {servicesId}
            />}
            <div className="app_dowanlad">
                <Appdownaload></Appdownaload>
            </div>
            <Footer />
        </>
    )
}
export default VetrinaryStoredetails;