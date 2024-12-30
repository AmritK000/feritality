import React, { useEffect, useState } from "react";
import "./adoption.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Link, useParams, useNavigate } from "react-router-dom";
import {  FaLocationDot } from "react-icons/fa6";
import Appdownaload from "../../../Home/Appdowanload";
import { GoDotFill } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import SkeltonList from "../../../components/SkeltonEffect/list";
import { list } from "../../../controllers/services/adoptionController";
import { list as storeInfo } from "../../../controllers/store/storeController";
import RatingsStar from "../../../components/RatingsStar";
import { ASSETS_BASE_URL } from "../../../config/constants";
import Latest_news from "../../../Home/Latest_news";
import { shortDescription, getWorkingDays } from "../../../controllers/common";
import moment from 'moment';

const AdoptionDetail = () => {
    const [StoreDetails, setStoreDetails] = useState([]);
    const [AdoptionList, setAdoptionList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [LIMIT, setLimit] = useState(10);
    const [SKIP, setSkip] = useState(0);

    const [categoryId, setCategortId] = useState('');
    const [storeId, setStoreId] = useState('');
    const [branchId, setBranchtId] = useState('');

    const { id } = useParams();
    const [showRequest, setShowRequest] = useState("");
    const handleShowRequest = (value) => {
        setShowRequest(value);
    }

    /*********************************************************
   *  This function is use to fetch adoption dog list
   *********************************************************/
    const getDetails = async () => {
        setStoreDetails([]);
        try {
            const latitude = localStorage.getItem("LATITUDE");
            const longitude = localStorage.getItem("LONGITUDE");
            const storedData = JSON.parse(localStorage.getItem("serviceListData"));
            const adoptionIds = storedData.data.find((item) => item.slug === "adoption");
            setCategortId(adoptionIds?._id);

            const options = {
                type: "single",
                condition: {
                    ...(showRequest ? { status: showRequest } : null),
                    ...(id ? { _id: id } : null),
                },
                longitude: longitude,
                latitude: latitude,
                category: adoptionIds?._id,
                select: {},
                sort: { "_id": -1 },
                skip: SKIP ? SKIP : 0,
                limit: LIMIT ? LIMIT : 10
            }
            const listData = await storeInfo(options);
            if (listData?.status === true) {
                setStoreDetails(listData.result);
                setBranchtId(listData?.result?._id);
                setStoreId(listData?.result?.storeData?._id);

                if (listData.result?.storeData?._id && listData.result?._id) {
                    const listOptions = {
                        type: "",
                        condition: {
                            store: listData.result.storeData._id,
                            branch: listData.result._id,
                            category: adoptionIds?._id,
                            ...(showRequest ? { status: showRequest } : null),
                        },
                        select: {},
                        sort: { "_id": -1 },
                        page: 1
                    };
                    const adoptionData = await list(listOptions);
                    if (adoptionData?.status === true) {
                        setAdoptionList(adoptionData.result);
                    } else {
                        console.log("Failed to fetch grooming services");
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
    *This function is load when page load and with dependency update
    *********************************************************/
    useEffect(() => {
        getDetails();
    }, [currentPage])

    /*********************************************************
    *This function is used to calculate dog current age by calculating its dob
    *********************************************************/
    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const now = new Date();
        let years = now.getFullYear() - birthDate.getFullYear()
        let months = now.getMonth() - birthDate.getMonth()
        if (months < 0) {
            years--;
            months += 12
        }
        if (years === 0) {
            return `${months} month${months > 1 ? 's' : ''}`;
        }   
        return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`;
    };

    return (
        <>
            <Header />
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
                                    <RatingsStar rating={AdoptionList?.ratings} />
                                </div>
                                <h1>{StoreDetails?.branch_name}</h1>
                                <p className="mx-0">{shortDescription?.title}</p>
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

            <div className="container adopt_detailes">
                <div className="row my-3">
                    <div className="col-md-9 grooming_info">
                        <div className="features_grooming ">
                            <h1 className="main_heading" >Our <span>Dog’s </span> List</h1>
                            {/* <p className="sub_heading" >It is a long established fact that a reader will be distracted by the readable content</p> */}
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="view_btn">
                            <input placeholder="Search here....." />
                            <button className="search_btn"><CiSearch /></button>
                        </div>
                    </div>
                </div>
                <div className="row" >
                    {AdoptionList?.length > 0 ? (
                        AdoptionList.map((item, index) => (
                            <div className="col-md-3" key={index}>
                                <div className="grooming_board">
                                    <Link to={`/services/adoption/detail/${item._id}`} >
                                        <div className="grooming_board_cardbox">
                                            <img src={`${ASSETS_BASE_URL}${item?.image}`} alt={item.name} width={`100px`} />
                                        </div>
                                        <div className="">
                                            <h1 className="location_heading">{item?.pet_name || 'Skudo'}</h1>
                                            <div className="location_creation">
                                                <p className="time_adoptionpet">{item.dob ? calculateAge(item.dob) : '1 year 8 months'}</p>
                                                <p className="time_adoptionpet">{item?.breed} <span><GoDotFill id="dots" /> </span> {item.gender}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <SkeltonList />
                    )}
                </div>
            </div>

            <div className="app_dowanlad">
                <Appdownaload></Appdownaload>
            </div>
            <div className="container">
                <div className="row my-3">
                    <div className="col-md-10 grooming_info">
                        <div className="features_grooming ">
                            <h1 className="main_heading" >Latest <span>News </span></h1>
                            <p className="sub_heading" >It is a long established fact that a reader will be distracted by the readable content</p>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="view_btn">
                            <button className="view_all new_insights"><Link to="/">View All Insights</Link></button>
                        </div>

                    </div>
                    <div className="col-md-12 my-3">
                        <Latest_news />
                    </div>
                </div>
            </div>


            <Footer />
        </>
    )
}
export default AdoptionDetail;