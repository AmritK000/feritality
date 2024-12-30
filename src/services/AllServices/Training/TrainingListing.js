import React, { useEffect, useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { ASSETS_BASE_URL } from "../../../config/constants";
import RatingsStar from "../../../components/RatingsStar";
import { list } from "../../../controllers/store/storeController";
import SkeltonList from "../../../components/SkeltonEffect/list";
import moment from 'moment';

const TrainingListing = () => {
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
    const trainingShopList = async () => {
        setShopList([]);
        setIsLoading(true);
        try {
            const longitude = localStorage.getItem('LONGITUDE');
            const latitude = localStorage.getItem('LATITUDE');
            const storedData = JSON.parse(localStorage.getItem("serviceListData"))
            const trainingIds = storedData.data.find((item) => item.slug ==="training")
            setCategortId(trainingIds?._id);

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
                category: trainingIds?._id,
                select: {},
                sort: { "_id": -1 },
                page: currentPage, 
                skip: SKIP ? SKIP : 0,
                limit: LIMIT ? LIMIT : 10
            }
            const listData = await list(options);
            if (listData?.status === true) {
                setShopList(listData.result);
            }
        } catch (error) {
            console.log("Failed to fetch training shop list: ", error)
        }
    }

    /*********************************************************
     *  This function is load when page load and with dependency update
    *********************************************************/
    useEffect(() => {
        trainingShopList();
        targetRef.current.scrollIntoView({
            behavior: 'smooth',
        });
        document.title = "Frisbee website || Training store list"
    }, [currentPage])

    return (
        <>
        <div className="row" ref={targetRef}>
            <div className="col-md-12">
            {ShopList?.length > 0 ? (ShopList.map((item, index) => {
    const shopNameUrl = item?.storeData?.shop_name?.replace(/\s+/g, '_'); // Convert spaces to underscores
    return (
        <div className="avenue_pet" key={index}>
            <Link to={`/services/training/${shopNameUrl}`} state={{ item:item._id,shopNameUrl:shopNameUrl }}>
                <div className="pet_avenue">
                    <img src={`${ASSETS_BASE_URL}${item.image}`} alt={item.name} />
                    <p>20% OFF</p>
                </div>
                <div className="rightside_list">
                    <RatingsStar rating={item?.ratings} />
                    <h1 className="my-0">{item?.storeData?.shop_name}</h1>
                    <p className="mx-0">
                        {item?.storeData?.short_details?.length > 60 
                            ? `${item?.storeData?.short_details?.substring(0, 60)}...`
                            : item?.storeData?.short_details
                        }
                    </p>
                    <div>
                        <p className="mx-0">
                            <FaLocationDot id="location" />
                            {item?.storeData?.address?.length > 60 
                                ? `${item?.storeData?.address.substring(0, 60)}...`
                                : item?.storeData?.address
                            }
                        </p>
                    </div>
                </div>
                <div>
                    <button>Book Now</button>
                </div>
            </Link>
        </div>
    );
})) : (
    <SkeltonList />
)}

            </div>
        </div>
    </>
    )
}
export default TrainingListing;