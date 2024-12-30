import React, { useEffect, useState, useRef } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { FaStar, FaRegStarHalfStroke, FaLocationDot, FaWhatsapp, FaPhone } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { dog_listone, dog_listsecond, doglist_three, dog_listfour, icon_first, icon_second, icon_third } from "../../../components/Images";
import { GoDotFill } from "react-icons/go";
import Appdownaload from "../../../Home/Appdowanload";
import { ASSETS_BASE_URL } from "../../../config/constants";
import { list } from "../../../controllers/services/adoptionController";
import RatingsStar from "../../../components/RatingsStar";
import moment from 'moment';
import { ListEffectSkelton } from "../../../components/SkeltonEffect/ListEffectSkelton";
import Slider from "react-slick";

const AdoptionDogDetail = () => {
    const homeRef = useRef();
    const [DogDetails, setDogDetails] = useState([]);
    const [dogList, setDogList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [LIMIT, setLimit] = useState(10);
    const [SKIP, setSkip] = useState(0);
    const [showRequest, setShowRequest] = useState("");
    const { id } = useParams();
    const storedData = JSON.parse(localStorage.getItem("serviceListData"))
    const adoptionIds = storedData.data.find((item) => item.slug === "adoption")
    const [petId, setPetId] = useState(id || "");

    /*********************************************************
    *  This function is use to fetch adoption dog list
    *********************************************************/
    const getDetails = async () => {
        setDogDetails([]);
        try {
            const latitude = localStorage.getItem("LATITUDE");
            const longitude = localStorage.getItem("LONGITUDE");
            // setCategortId(groomingIds?._id);
            const options = {
                type: "single",
                condition: {
                    ...(showRequest ? { status: showRequest } : null),
                    // ...(id ? { _id: id } : null),
                    ...(petId ? { _id: petId } : id),
                },
                longitude: longitude,
                latitude: latitude,
                category: adoptionIds?._id,
                select: {},
                sort: { "_id": -1 },
                skip: SKIP ? SKIP : 0,
                limit: LIMIT ? LIMIT : 10
            }
            const listData = await list(options);
            if (listData?.status === true) {
                setDogDetails(listData.result);
            }
        } catch (error) {
            console.error("Failed to fetch service list:", error);
        } finally {
            setIsLoading(false);
        }
    };

    /*********************************************************
    *  This function is use to fetch adoption dog list
    *********************************************************/
    const getList = async () => {
        setDogList([]);
        try {
            const options = {
                type: "",
                condition: {
                    ...(showRequest ? { status: showRequest } : null),
                    store : DogDetails?.store?._id
                },
                select: {},
                sort: { "_id": -1 },
                skip: SKIP ? SKIP : 0,
                limit: LIMIT ? LIMIT : 10
            }
            const listData = await list(options);
            if (listData?.status === true) {
                setDogList(listData.result);
            }
        } catch (error) {
            console.error("Failed to fetch dog list:", error);
        } finally {
            setIsLoading(false);
        }
    };


    /*********************************************************
    *This function is load when page load and with dependency update
    *********************************************************/
    useEffect(() => {
        getDetails()
        
    }, [currentPage, petId])


    useEffect(()=>{
        getList();
    },[])

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

    const handlePetChange = (id) => {
        try {
            setPetId(id);
            homeRef.current.scrollIntoView({
                behavior: 'smooth',
              });
        } catch (error) {    
        }
    }

    return (
        <>
            <Header></Header>
            <div className="adopt_dogdetails" ref={homeRef}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="grooming_board">
                                <div className="adoptionstore_details">
                                    <div>
                                        <img src={`${ASSETS_BASE_URL}${DogDetails?.image}`} alt={DogDetails?.name || "Dog"} />
                                    </div>
                                    <div>
                                        <h1>{DogDetails?.pet_name || 'Skudo'}</h1>
                                        <p className="aoption_para_a_main_div">
                                            <Link to={`https://www.google.com/maps/dir/?api=1&destination=${DogDetails?.branch?.latitude},${DogDetails?.branch?.longitude}`}
                                                target="_blank"
                                                rel="noopener noreferrer">
                                                <FaLocationDot id="location" />
                                                {DogDetails?.branch?.address || "Location"}
                                            </Link>
                                        </p>
                                        <ul className="dogdetails_info">
                                            <li>
                                                <div>
                                                    <img src={icon_first} />
                                                </div>
                                                <div className="doginfo_dtailsinnersection">
                                                    <p>Breed</p>
                                                    <h1>{DogDetails.breed || 'Breed'}</h1>
                                                </div>

                                            </li>
                                            <li>
                                                <div>
                                                    <img src={icon_second} />
                                                </div>
                                                <div>
                                                    <p> Age</p>
                                                    <h1>{DogDetails.dob ? calculateAge(DogDetails.dob) : "Age"}</h1>
                                                </div>
                                            </li>
                                            <li>
                                                <div>
                                                    <img src={icon_third} />
                                                </div>
                                                <div>
                                                    <p> Gender</p>
                                                    <h1>{DogDetails?.gender || "Gender"}</h1>
                                                </div>
                                            </li>
                                        </ul>

                                        <ul className="connect_btn">
                                            <button className="whatsapp_icon"><Link to="https://wa.me/+971563288773" target="__blank"><FaWhatsapp /> Connect On Whatsapp</Link></button>
                                            <button className="call"><Link to="tel:+971563288773"><FaPhone /> Connect On Call</Link></button>
                                        </ul>
                                        <button className="adopt_now">Adopt Now</button>
                                    </div>
                                </div>
                                <p className="inner_sec mt-3">{DogDetails?.description || "Dog description here..."}</p>
                                <div className="character_stics">
                                    <h2>Physical Characteristics</h2>
                                </div>
                                <p className="inner_sec mt-3">{DogDetails?.about}</p>
                            </div>
                        </div>
                        <div className="col-md-3 px-0">
                            <div className="grooming_board">

                                <div className="grooming_board_cardbox">
                                    <div className="offer_discount">
                                        <h1>20%</h1> <p>off</p>
                                    </div>
                                    <img src={`${ASSETS_BASE_URL}${DogDetails?.image}`} alt={DogDetails?.name || "Dog"} />
                                    <div className="add_review">
                                        <RatingsStar rating={DogDetails?.ratings} />
                                    </div>
                                </div>
                                <div className="">
                                    <h1 className="location_heading">{DogDetails?.store?.shop_name}</h1>
                                    <div className="location_creation">
                                        <p className="delivery_info">
                                            {DogDetails?.store?.opentime && DogDetails?.store?.closetime
                                                ? `${moment(DogDetails.store.opentime, 'HH:mm').format('hh:mm')} AM - ${moment(DogDetails.store.closetime, 'HH:mm').format('hh:mm')} PM`
                                                : "Opening hours not available"}
                                        </p>
                                        <Link to={`https://www.google.com/maps/dir/?api=1&destination=${DogDetails?.branch?.latitude},${DogDetails?.branch?.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            <FaLocationDot id="location" />
                                            <div className="direction_details">

                                                <p>{DogDetails?.branch?.address}</p>
                                                <p className="get_direction"> Get Direction</p>
                                            </div>

                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="app_dowanlad">
                <Appdownaload></Appdownaload>
            </div>

            {/* {console.log("DogDetailsvvvvvvvv", DogDetails)} */}
            <div className="container adopt_detailes">
                <div className="row my-3">
                    <div className="col-md-9 grooming_info">
                        <div className="features_grooming ">
                            <h1 className="main_heading" >Our   <span>Dog’s </span> List</h1>
                            {/* <p className="sub_heading" >It is a long established fact that a reader will be distracted by the readable content</p> */}
                        </div>
                    </div>
                </div>
                <div className="row">
                    {dogList?.length > 0 ? (
                        <Slider {...settings}>
                            {dogList.map((item, index) => (
                                <div className="col-md-3" key={index} onClick={()=>handlePetChange(item?._id)}>
                                    <div className="grooming_board">
                                        {/* <div className="grooming_board" onClick={setPetId(item?._id)}> */}
                                        <div className="grooming_board_cardbox">
                                            <img src={`${ASSETS_BASE_URL}${item.image}`} alt={item.image} />
                                        </div>
                                        <div className="">
                                            <h1 className="location_heading">{item?.pet_name}</h1>
                                            <div className="location_creation">
                                                <p className="time_adoptionpet">{item?.dob ? calculateAge(item?.dob) : "Age"}</p>
                                                <p className="time_adoptionpet">{item?.breed} <span><GoDotFill id="dots" /> </span> {item?.gender}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <ListEffectSkelton />
                    )}
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}
export default AdoptionDogDetail
    ;