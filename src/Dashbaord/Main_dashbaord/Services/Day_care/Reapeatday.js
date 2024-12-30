import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../../Topnvbar";
import { Pet_Profile, recent_booking } from "../../../../components/Images";
import { PiArrowArcLeftFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";
import Addnotes from "../addnotes";
import Dashbaordsidebar from "../../../sidebar";
import { bookingList } from "../../../../controllers/services/dayCareController";
import { ASSETS_BASE_URL } from "../../../../config/constants";
import Pagination from "@mui/material/Pagination";


const Reapeatday = () => {
    const location = useLocation();
    const { id, isPickUp } = location.state || {};
    const [data, setData] = useState([]);
    const [reschedule, setReschedule] = useState('');
    const type = isPickUp === "Y" ? true : false;
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [SKIP, setSkip] = useState(0);
    const [LIMIT, setLimit] = useState(10);
    const targetRef = useRef(null);

    const rescheduleEvent = () => {
        setReschedule(true);
    };

    const getBookingData = async () => {
        try {
            const options = {
                type: "single",
                condition: { _id: id },
                select: {},
                sort: { _id: -1 },
                page: currentPage,
                skip: SKIP ? SKIP : 0,
                limit: LIMIT ? LIMIT : 10,
            };
            const listData = await bookingList(options);
            if (listData.status) {
                console.log(listData.result, "listdatasdasdas here");
                setData(listData.result);
                setTotalPages(listData?.totalPage || 1);
            } else {
                setData([]);
            }
        } catch (error) {
            console.error("Error fetching list:", error);
            setData([]);
        }
    };

    /*********************************************************
    *  This function is for handle page change
    *********************************************************/
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
        setSkip((newPage - 1) * LIMIT);
        targetRef.current.scrollIntoView({
            behavior: "smooth",
        });
    };

    useEffect(() => {
        getBookingData();
    }, [currentPage]);

    return (
        <>
            <Navbar />
            <Dashbaordsidebar />
            <div className="main_wrapper">
                <div className="container-fluid">
                    <div className="order_deatils">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="d-flex">
                                    <Link to="/" className="arrow_btn"><PiArrowArcLeftFill /></Link>
                                    <div>
                                        <p className="order_id"><strong>Order Id </strong>: {data?.booking_seq_id} </p>
                                        <p className="order_id"> <strong>Order Date & Time  </strong>:  {new Date(data?.createdAt).toLocaleDateString("en-GB")}.  {new Date(data?.createdAt).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                                    </div>

                                </div>

                            </div>
                            <div className="col-md-6">
                                <div className="down_loads_btns">
                                    <button className="canel_btn">Download Receipt</button>
                                    <button className="reshdule">Re-schedule</button>
                                    <button className="canel_btn">Cancel</button>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row petforms mx-1 my-2">
                                    <div className="col-md-3 px-0">
                                        <div className="pet_reviews">
                                            <img src={recent_booking}></img>
                                            <span>4.2 <FaStar className="star" /></span>
                                        </div>

                                    </div>
                                    <div className="col-md-9">
                                        <h4 className="pet_avenues">{data?.bookingdetails?.[0]?.services?.name} | Dog (All Sizes)...</h4>
                                        <h4 className="my-1 service_provide">(Without Haircut/Shave)...</h4>
                                        <p className="mb-0 mt-1">AED {data?.bookingdetails?.[0]?.services?.price}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row petforms mx-1 my-2">
                                    <div className="col-md-3 px-0">

                                        <div className="pet_reviews">
                                            <img src={`${ASSETS_BASE_URL}${data?.shopId?.image}`}></img>

                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <h4 className="pet_avenues">{data?.shopId?.shop_name}</h4>
                                        <div className="d-flex">

                                            <h2 className="my-1 location_avenuess"> <HiLocationMarker className="location mx-2" />
                                                {data?.shopId?.address}</h2>


                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isPickUp == 'Y' && (
                                <div className="col-md-12 ">
                                    <div className="row book_deatils mx-2 my-2">
                                        <div className="col-md-4 px-0">
                                            <h2>Booking Details</h2>
                                        </div>
                                        <div className="col-md-8 px-0">
                                            <ul className="order_timelist">
                                                <li><p ><span>Type: </span>  Pick & Drop</p></li>
                                                <li><p><span>Date: </span>{new Date(data?.createdAt).toLocaleDateString("en-GB")}</p></li>
                                                <li><p><span>Time: </span> {new Date(data?.createdAt).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true })}</p></li>
                                                <li><p className="process_pending">
                                                    <span>Status: </span>{data?.status}
                                                </p></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                            }
                            {type == 'In-Store' && (
                                <div className="col-md-12 ">
                                    <div className="row book_deatils mx-2 my-2">
                                        <div className="col-md-4 px-0">
                                            <h2>Reschedule Details</h2>
                                        </div>
                                        <div className="col-md-8 px-0">
                                            <ul className="order_timelist">
                                                <li><p><span>Date: </span> 12/02/2024</p></li>
                                                <li><p><span>Time: </span> 9:00 AM</p></li>
                                                <li><p className="process_com">
                                                    <span>Status: </span>Accepted
                                                </p></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                            }
                            <div className="col-md-12">
                                <div className="order_deatils py-0 px-0">
                                    <div className="row book_deatils mx-2 my-2">
                                        <div className="col-md-2 px-0">
                                            <h2 className="both_details">Pickup & Drop
                                                Details, Timings</h2>
                                        </div>
                                        <div className="col-md-10 px-0">
                                            <ul className="order_timelist">
                                                <li><p ><span>Pickup way : </span> {data?.pick_drop_type}</p></li>
                                                <li><p><span>Pickup location : </span>{data?.pickup_notes}</p></li>
                                                <li><p><span>Pickup time from user location: </span> {data?.oneWayPickUpLocationTime}</p></li>

                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row mx-2 my-2">
                                        <div className="col-md-12">
                                            <h2 className="both_details mb-2">Pickup & Drop
                                                Details, Timings</h2>
                                        </div>
                                        <div className="book_deatils">
                                            <p className="mb-0 both_details_add">{data?.userData?.name}, {data?.userData?.country_code}-{data?.userData?.phone}, {data?.ownerInfo?.address}</p>
                                        </div>
                                    </div>

                                    <div className="row mx-2 my-2">
                                        <div className="col-md-12">
                                            <h2 className="both_details mb-2">To Location</h2>
                                        </div>
                                        <div className="book_deatils">
                                            <p className="mb-0 both_details_add">{data?.shopId?.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div >

                    <div className="row mt-3">
                        <div className="col-md-8">
                            <div className="order_deatils">
                                <h2>Pet Details</h2>
                                <div className=" mt-2 pet_detailsinfo">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <img src={recent_booking}></img>
                                        </div>
                                        <div className="col-md-4">
                                            <h2>{data?.petInfo?.name}</h2>
                                            <p className="my-2">Age :  <span className="mx-2"> 1 year 8 months</span></p>
                                            <p className="my-2">Gender : <span className="mx-2">Male</span></p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="my-2">Breed : <span className="mx-2">{data?.petInfo?.breed}</span></p>
                                            <p className="my-2">Location :<span className="mx-2"> Dubai</span></p>
                                        </div>
                                    </div>

                                </div>


                            </div>
                            <div className="order_deatils mt-3">
                                <div className="row">
                                    <div className="col-md-4">
                                        <h2 className="pt-2">Repeat Days Details</h2>
                                    </div>
                                    <div className="col-md-8 ">
                                        <ul className="datewise py-0 px-0">
                                            <li className="mx-2"><span>Start Date :</span><p>12/02/2024</p></li>
                                            <li><span>End Date : </span><p>12/02/2024</p></li>
                                        </ul>


                                    </div>

                                    <div className="col-md-12 mt-2 py-1">
                                        <div className="repeat_selected_days">
                                            <p className="mb-0">Repeat Days</p>
                                            <ul>
                                                <li>MON</li>
                                                <li>SUN</li>
                                                <li>TUES</li>
                                                <li>WED</li>
                                                <li>FRI</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Addnotes></Addnotes>
                        </div>
                        <div className="col-md-4 px-0">
                            <div className="order_deatils">
                                <h2>Payment Details</h2>
                                <div className="payment_details mt-2">
                                    <ul className="pt-0">
                                        <li><span>detail</span><p>Price</p></li>
                                        <li><span>Subtotal</span><p>AED {data?.bookingdetails?.[0]?.services.price} </p></li>
                                        <li><span>Pick & Drop charges</span><p>AED{(data?.total - data?.bookingdetails?.[0]?.services?.price - (data?.treats_discount || 0)).toFixed(2)}</p></li>
                                        <li><span>Tier Discount</span><p className="decrease">-AED {data?.discount}</p></li>
                                        <li><span>Total</span><p>AED {data?.total}</p></li>
                                        <li><span>Treats used ({data?.treats || 0})</span><p>- {data?.treats_discount || 0}</p></li>
                                    </ul>

                                    <ul className="mt-2 pt-0">
                                        <li><span>Amount Due</span><p>AED {data?.total}</p></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reapeatday;
