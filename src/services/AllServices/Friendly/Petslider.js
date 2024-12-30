import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { FaLocationDot } from "react-icons/fa6";
import { ASSETS_BASE_URL } from "../../../config/constants";
import { Link } from "react-router-dom";
import { list } from "../../../controllers/services/friendlyController";
import SkeltonList from "../../../components/SkeltonEffect/list";
import RatingsStar from '../../../components/RatingsStar';

const Petslider = () => {
    const homeRef = useRef();
    const [dogList, setDogList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [showRequest, setShowRequest] = useState("");
    // const { id } = useParams();
    const [categoryId, setCategortId] = useState('');
    const handleShowRequest = (value) => {
        setShowRequest(value);
    };

    /*********************************************************
    *  This function is use to fetch adoption dog list
    *********************************************************/
    const getList = async () => {
        setDogList([]);
        try {
            const latitude = localStorage.getItem("LATITUDE");
            const longitude = localStorage.getItem("LONGITUDE");
            const options = {
                type: "",
                condition: {
                    ...(showRequest ? { status: showRequest } : null),
                },
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
                longitude: longitude,
                latitude: latitude,
                sort: { "_id": -1 },
                filter: {},
                page: 1
            }
            const listData = await list(options);
            if (listData?.status === true) {
                setDogList(listData.result);
            }
        } catch (error) {
            console.error("Failed to dog list:", error);
        } finally {
            setIsLoading(false);
        }
    };

    /*********************************************************
      *This function is load when page load and with dependency update
      *********************************************************/
    useEffect(() => {
        getList();
    }, [currentPage])


    var settings = {
        dots: false,
        arrow: true,
        arrow: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        Margin: '10',
        Padding: '10',
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
    return (
        <>
            {dogList?.length > 0 ? (
                <Slider {...settings}>
                    {dogList.map((item, index) => (
                        <div className="slide-item" key={index}>
                            <div className="grooming_board mx-0">
                            <Link to={`/services/friendly/${item?._id}`}>
                                <div className="grooming_board_cardbox">
                                    <img src={`${ASSETS_BASE_URL}${item.image}`} alt={item.image} />
                                    <div className="add_review">
                                        <RatingsStar rating={item?.ratings} />
                                    </div>
                                </div>
                                <div className="pet_info">
                                    <h1 className="location_heading">{item?.title}</h1>
                                    <p className="pet_details mx-0">{item?.about.length > 80 ? `${item?.about?.substring(0, 80)}...` : item?.about}</p>
                                    <div className="location_creation">

                                        <p className="mx-0"><Link to={`https://www.google.com/maps/dir/?api=1&destination=${item?.latitude},${item?.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            <FaLocationDot id="location" />
                                            Dubai Al Warsan 3, Birds...
                                        </Link></p>
                                        {/* {item?.address}</p> */}
                                    </div>
                                </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </Slider>
            ) : (
                <SkeltonList />
            )}
        </>
    )
}

export default Petslider;
