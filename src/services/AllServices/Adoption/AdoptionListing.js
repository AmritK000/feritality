import React, { useEffect, useRef, useState } from "react";
import { FaStar, FaRegStarHalfStroke, FaLocationDot } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { list } from "../../../controllers/store/storeController";
import SkeltonList from "../../../components/SkeltonEffect/list";
import { ASSETS_BASE_URL } from "../../../config/constants";
import RatingsStar from "../../../components/RatingsStar";
import moment from 'moment';

const AdoptionListing = () => {
    const [ShopList, setShopList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategortId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [LIMIT, setLimit] = useState(10);
    const [SKIP, setSkip] = useState(0);
    const targetRef = useRef(null);
    const [showRequest, setShowRequest] = useState("");
    const handleShowRequest = (value) => {
        setShowRequest(value);
    }

    /*********************************************************
    *  This function is use to fetch adoption center list
    *********************************************************/
    const adoptionShopList = async () => {
        setShopList([]);
        setIsLoading(true);
        try {
            const longitude = localStorage.getItem('LONGITUDE');
            const latitude = localStorage.getItem('LATITUDE');
            const storedData = JSON.parse(localStorage.getItem("serviceListData"));
            const adoptionIds = storedData.data.find((item) => item.slug === "adoption");
            setCategortId(adoptionIds?._id);
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
                category: adoptionIds?._id,
                select: {},
                sort: { "_id": -1 },
                page: currentPage,
                skip: SKIP ? SKIP : 0,
                limit: LIMIT ? LIMIT : 10
            }
            const listData = await list(options);
            if (listData?.status === true) {
                setShopList(listData.result);
                setTotalPages(listData.totalPage);
            }
        } catch (error) {
            console.log("Failed to fetch adoption shop list:", error);
        } finally {
            setIsLoading(false);
        }
    };

    /*********************************************************
     *  This function is load when page load and with dependency update
    *********************************************************/
    useEffect(() => {
        adoptionShopList();
        targetRef.current.scrollIntoView({
            behavior: 'smooth',
        });
        document.title = "Frisbee website || Adoption store list"
    }, [currentPage])


    return (
        <>
            <div className="row" ref={targetRef} >
                <div className="col-md-12">
                    {ShopList?.length > 0 ? (ShopList.map((item, index) => (
                        <>
                            <div className="avenue_pet" key={index}>
                                {/* {console.log("Alalal", item?.latitude)} */}
                                {/* <Link to={`/Adoption_detail/${item?.storeData?._id} `}> */}
                                <div className="pet_avenue">
                                    <img src={`${ASSETS_BASE_URL}${item.image}`} alt={item.name} />
                                    <p>20% OFF</p>
                                </div>
                                <div className="rightside_list">
                                    <RatingsStar rating={item?.ratings} />
                                    <h1 className="my-0">{item?.storeData?.shop_name}</h1>
                                    <p className="mx-0">{item?.storeData?.short_details?.length > 60 ? `${item?.storeData?.short_details?.substring(0, 60)}...` : item?.storeData?.short_details}</p>
                                    <div>
                                        {/* <p className="mx-0"><span className="shop_info">{item?.storeData?.city}</span>{item?.storeData?.opentime && item?.storeData?.closetime
                                            ? `${moment(item?.storeData?.opentime, 'HH:mm').format('hh:mm')}AM - ${moment(item?.storeData?.closetime, 'HH:mm').format('hh:mm')} PM` : "Opening hours not available"} </p> */}
                                        {/* <p className="mx-0"><FaLocationDot id="location" />{item?.storeData?.address?.length > 60 ? `${item?.storeData?.address.substring(0, 60)}...` : item?.storeData?.address}</p> */}
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
                                    <Link to={`/services/adoption/${item?._id}`}>
                                        <button>Book Now</button>
                                    </Link>
                                </div>
                            </div>
                        </>
                    ))
                    ) : (
                        <SkeltonList />
                    )}
                </div>
            </div>
            {/* Pagination Controls */}
            <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="pagination-btn"
                >
                    &lt;
                </button>
                <span className="pagination-current">
                    {currentPage}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="pagination-btn"
                >
                    &gt;
                </button>
            </div>
        </>
    )
}
export default AdoptionListing;



