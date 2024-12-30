import { useEffect, useState, useRef } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { FaLocationDot, FaWhatsapp, FaPhone } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import Appdownaload from "../../../Home/Appdowanload";
import Petslider from "./Petslider";
import { list } from "../../../controllers/services/friendlyController";
import { ASSETS_BASE_URL } from "../../../config/constants";
import RatingsStar from "../../../components/RatingsStar";

const FriendlyDetails = () => {
    const [Friendly, setFriendly] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [showRequest, setShowRequest] = useState("");
    const [categoryId, setCategortId] = useState('');
    const { id } = useParams();
    const homeRef = useRef();
    const handleShowRequest = (value) => {
        setShowRequest(value);
    };

    /*********************************************************
   *  This function is use to fetch adoption dog list
   *********************************************************/
    const getDetails = async () => {
        setFriendly([]);
        try {
            const latitude = localStorage.getItem("LATITUDE");
            const longitude = localStorage.getItem("LONGITUDE");
            const storedData = JSON.parse(localStorage.getItem("serviceListData"));
            const friendlyIds = storedData.data.find((item) => item.slug === "friendly");
            setCategortId(friendlyIds?._id);
            const options = {
                type: "single",
                condition: {
                    ...(showRequest ? { status: showRequest } : null),
                    ...(id ? { _id: id } : null),
                },
                filter: {
                    in_store: "N"
                },
                longitude: longitude,
                latitude: latitude,
                category: friendlyIds?._id,
                select: {},
                sort: { "_id": -1 },
            }
            const listData = await list(options);
            if (listData?.status === true) {
                setFriendly(listData.result);
            }
        } catch (error) {
            console.error("Failed to fetch service list:", error);
        } finally {
            setIsLoading(false);
        }
    };

    /*********************************************************
    *This function is load when page load and with dependency update
    *********************************************************/
    useEffect(() => {
        getDetails();
        homeRef.current.scrollIntoView({
            behavior: 'smooth',
        });
    }, [currentPage, id])

    return (
        <>
            <Header></Header>
            <div className="adopt_dogdetails" ref={homeRef}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="">

                                <div className="grooming_board_cardbox">
                                    <div className="offer_discount">
                                        <h1>20%</h1> <p>off</p>
                                    </div>
                                    <img src={`${ASSETS_BASE_URL}${Friendly?.image}`} alt={Friendly?.name || "Dog"} style={{ height: '327' }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="">
                                <RatingsStar rating={Friendly?.ratings} />
                                <div className="adoptionstore_details">

                                    <div>
                                        <h1>The Pet’s Cafe</h1>
                                        <p> <FaLocationDot id="location" /> Dubai Al Warsan 3, Birds and Pets Market</p>
                                        <ul className="connect_btn mt-2">
                                            <button className="whatsapp_icon"><Link to="https://wa.me/+971563288773" target="__blank"><FaWhatsapp/>Connect On Whatsapp</Link></button>
                                            <button className="call"><Link to="tel:+971563288773"><FaPhone/>Connect On Call</Link></button>
                                        </ul>

                                    </div>
                                </div>
                                <h2 className="galler_heading">About Cafe</h2>
                                <p class="mx-0 mb-0"><span class="shop_info">Working Days : </span> 5 Days (Mon, Tue, Wed, Thr , Fri, Sat )</p><p class="mx-0"><span class="shop_info">Working Hours : </span> 08:00 AM - 18:00 PM</p>
                                <p className="inner_sec mt-1">{Friendly?.about}</p>

                                <div>
                                    <h1 className="galler_heading">Cafe Gallery</h1>

                                    <ul className="cafe_gallery">
                                        {Friendly && Friendly.photos && Friendly.photos.length > 0 ? (
                                            Friendly.photos.map((photo, index) => (
                                                    <li key={index}>
                                                        <img src={`${ASSETS_BASE_URL}${photo}`} alt={Friendly.name || "Dog"} />
                                                    </li>
                                            ))
                                        ) : (
                                            <li>No photos available</li>
                                        )}
                                    </ul>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="app_dowanlad">
                <Appdownaload></Appdownaload>
            </div>


            <div className="container adopt_detailes">
                <div className="row my-3">
                    <div className="col-md-9 grooming_info">
                        <div className="features_grooming ">
                            <h1 className="main_heading" >Our   <span>Dog Friendly</span> List</h1>
                            <p className="sub_heading" >It is a long established fact that a reader will be distracted by the readable content</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pet_slidercontainer">
                <Petslider id={id} />
            </div>
            <Footer></Footer>
        </>
    )
}
export default FriendlyDetails;