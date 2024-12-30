import React, { useEffect, useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { ASSETS_BASE_URL } from "../../../config/constants";
import RatingsStar from "../../../components/RatingsStar";
import { list } from "../../../controllers/store/storeController";
import SkeltonList from "../../../components/SkeltonEffect/list";
import { ListEffectSkelton } from "../../../components/SkeltonEffect/ListEffectSkelton";
import moment from 'moment';


const DayCareListing = () => {
    const [ShopList, setShopList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [LIMIT, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [SKIP, setSkip] = useState(0);
    const [categoryId, setCategortId] = useState('');
    const targetRef = useRef(null);
    const [showRequest, setShowRequest] = useState("");
    const handleShowRequest = (value) => {
        setShowRequest(value);
    };

    /*********************************************************
    *  This function is use to fetch adoption center list
    *********************************************************/
    const dayCareShopList = async () => {
        setShopList([]);
        setIsLoading(true);
        try {
            const longitude = localStorage.getItem('LONGITUDE');
            const latitude = localStorage.getItem('LATITUDE');
            const storedData = JSON.parse(localStorage.getItem("serviceListData"))
            const dayCareIds = storedData.data.find((item) => item.slug === "day-care")
            setCategortId(dayCareIds?._id);

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
                category: dayCareIds?._id,
                select: {},
                page: currentPage,
                sort: { "_id": -1 },
                skip: SKIP ? SKIP : 0,
                limit: LIMIT ? LIMIT : 10
            }
            const listData = await list(options);
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
    useEffect(() => {
        dayCareShopList();
        targetRef.current.scrollIntoView({
            behavior: 'smooth',
        });
        document.title = "Frisbee website || DayCare store list"
    }, [currentPage])

    return (
        <>
            <div className="row" ref={targetRef} >
                <div className="col-md-12">
                    {ShopList?.length > 0 ? (ShopList.map((item, index) => (
                        <>
                            <div className="avenue_pet" key={index}>

                                <div className="pet_avenue">
                                    <img src={`${ASSETS_BASE_URL}${item.image}`} alt={item.name} />
                                    <p>20% OFF</p>
                                </div>
                                <div className="rightside_list">
                                    <div className="add_review">
                                        <RatingsStar rating={item?.ratings} />
                                    </div>

                                    <h1 className="my-0">{item?.storeData?.shop_name}</h1>
                                    <p className="mx-0">{item?.storeData?.short_details?.length > 60 ? `${item?.storeData?.short_details?.substring(0, 60)}...` : item?.storeData?.short_details}</p>
                                    <div>
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
                                    <Link to={`/services/day-care/${item?._id} `}>
                                        <button>Book Now</button>
                                    </Link>
                                </div>

                            </div>
                        </>
                    ))
                    ) : (
                        <ListEffectSkelton />
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
export default DayCareListing;