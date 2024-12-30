import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import SkeltonList from "../../../components/SkeltonEffect/list";
import { ASSETS_BASE_URL } from "../../../config/constants";
import { list } from "../../../controllers/services/friendlyController";
import { shortDescription } from "../../../controllers/common";
import RatingsStar from '../../../components/RatingsStar';

const FriendlyListing = () => {
    const [FriendlyList, setFriendlyList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [LIMIT, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [SKIP, setSkip] = useState(0);
    const targetRef = useRef(null);
    const [showRequest, setShowRequest] = useState("");
    const handleShowRequest = (value) => {
        setShowRequest(value);
    }

    /*********************************************************
    *  This function is use to fetch dog friendly list
    *********************************************************/
    const dogFriendlyList = async () => {
        setFriendlyList([]);
        setIsLoading(true);
        try {
            setIsLoading(true);
            const longitude = localStorage.getItem('LONGITUDE');
            const latitude = localStorage.getItem('LATITUDE');
            const storedData = JSON.parse(localStorage.getItem("serviceListData"))
            const friendlyIds = storedData.data.find((item) => item.slug === "friendly")
            const options = {
                type: "",
                condition: {
                    ...(showRequest ? { status: showRequest } : null),
                },
                latitude: latitude,
                longitude: longitude,
                select: {
                    title: true,
                    about: true,
                    photos: true,
                    ratings: true,
                    longitude: true,
                    latitude: true,
                    status: true,
                    parks: true,
                    restaurant: true,
                    cafe: true,
                    beach: true,
                    image: true,
                    center_facilities: true,
                },
                filter: {
                    in_store: "N"
                },
                category: friendlyIds?._id,
                sort: { "_id": -1 },
                skip: SKIP ? SKIP : 0,
                limit: LIMIT ? LIMIT : 10
            }
            const listData = await list(options);
            if (listData?.status === true) {
                setFriendlyList(listData.result);
            }
        } catch (error) {
            console.error("Failed to fetch adoption shop list:", error);
        } finally {
            setIsLoading(false);
        }
    };

    /*********************************************************
    *This function is load when page load and with dependency update
    *********************************************************/
    useEffect(() => {
        dogFriendlyList();
        targetRef.current.scrollIntoView({
            behavior: 'smooth',
        });
        document.title = "Frisbee website || Dog friendly list"
    }, [currentPage]);



    return (
        <>
            <div className="pet_listing_innersection row" ref={targetRef}>
                {FriendlyList?.length > 0 ? (FriendlyList.map((item, index) => (
                    <div className="col-md-4" key={index}>
                        <div className="grooming_board mx-0">
                            <Link to={`/services/friendly/${item?._id}`}>
                                <div className="grooming_board_cardbox">
                                    <div className="offer_discount">
                                        <h1>20%</h1> <p>off</p>
                                    </div>
                                    <img src={`${ASSETS_BASE_URL}${item.image}`} alt={item.name} />
                                    <RatingsStar rating={item?.ratings} />
                                </div>
                                <div className="pet_info">
                                    <h1 className="location_heading">{item.title}</h1>
                                    <p className="pet_details mx-0">{shortDescription(item.about, 50)}</p>
                                    <div className="location_creation">
                                        <Link to="">
                                            <FaLocationDot id="location" />
                                            <p className="locationvenue"> Dubai Al Warsan 3, Birds...</p>
                                        </Link>
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
export default FriendlyListing;

