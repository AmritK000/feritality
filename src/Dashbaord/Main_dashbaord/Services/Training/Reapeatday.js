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
const Reapeatday = () => {
    const location = useLocation();
    const { type } = location.state || {};
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
                                        <p className="order_id"><strong>Order Id </strong>: ORDER4625624562556 </p>
                                        <p className="order_id"> <strong>Order Date & Time  </strong>:  19/02/2024. 02:00:56 PM</p>
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
                                        <h4 className="pet_avenues">Standard Groming | Dog (All Sizes)...</h4>
                                        <h4 className="my-1 service_provide">(Without Haircut/Shave)...</h4>
                                        <p className="mb-0 mt-1">AED 50.00</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row petforms mx-1 my-2">
                                    <div className="col-md-3 px-0">

                                        <div className="pet_reviews">
                                            <img src={recent_booking}></img>

                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <ul className="rating_stars">
                                            <li><FaStar className="star" /></li>
                                            <li><FaStar className="star" /></li>
                                            <li><FaStar className="star" /></li>
                                            <li><FaStar className="star" /></li>
                                            <li><h2 className="rating_reviwesvalues">4.5</h2></li>
                                        </ul>

                                        <h4 className="pet_avenues">Pet Avenue</h4>
                                        <div className="d-flex">

                                            <h2 className="my-1 location_avenuess"> <HiLocationMarker className="location mx-2" />
                                                Dubai Al Warsan 3, Birds and...</h2>


                                        </div>
                                    </div>
                                </div>
                            </div>
                            {type == 'Pick up & Drop' && (
                                <div className="col-md-12 ">
                                    <div className="row book_deatils mx-2 my-2">
                                        <div className="col-md-4 px-0">
                                            <h2>Booking Details</h2>
                                        </div>
                                        <div className="col-md-8 px-0">
                                            <ul className="order_timelist">
                                                <li><p ><span>Type: </span>  {type}</p></li>
                                                <li><p><span>Date: </span> 12/02/2024</p></li>
                                                <li><p><span>Time: </span> 9:00 AM</p></li>
                                                <li><p className="process_pending">
                                                    <span>Status: </span>cancelled
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
                                                <li><p ><span>Pickup way : </span> One - Side</p></li>
                                                <li><p><span>Pickup location : </span>User location to centre</p></li>
                                                <li><p><span>Pickup time from user location: </span> 9:00 AM</p></li>

                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row mx-2 my-2">
                                        <div className="col-md-12">
                                            <h2 className="both_details mb-2">Pickup & Drop
                                                Details, Timings</h2>
                                        </div>
                                        <div className="book_deatils">
                                            <p className="mb-0 both_details_add">Rufus, +971-XX-1234567, dineatadm@address.com,C-20/1, C Block, Phase 2, Industrial Area, Sector 62, Noida, Uttar Pradesh 201301</p>
                                        </div>
                                    </div>

                                    <div className="row mx-2 my-2">
                                        <div className="col-md-12">
                                            <h2 className="both_details mb-2">To Location</h2>
                                        </div>
                                        <div className="book_deatils">
                                            <p className="mb-0 both_details_add">Pet Avenue Store Center</p>
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
                                            <h2>Skudo</h2>
                                            <p className="my-2">Age :  <span className="mx-2"> 1 year 8 months</span></p>
                                            <p className="my-2">Gender : <span className="mx-2">Male</span></p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="my-2">Breed : <span className="mx-2"> Mixed</span></p>
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
                                        <li><span>Subtotal</span><p>50 AED </p></li>
                                        <li><span>Tier Discount</span><p className="decrease">-AED 0.86</p></li>
                                        <li><span>Total</span><p>AED 49.14</p></li>
                                        <li><span>Treats used (100)</span><p>-1</p></li>
                                    </ul>

                                    <ul className="mt-2 pt-0">
                                        <li><span>Amount Due</span><p>AED 39.14</p></li>
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