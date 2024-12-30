import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../../Topnvbar";
import { Pet_Profile, recent_booking, product_pic } from "../../../../components/Images";
import { PiArrowArcLeftFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { FaBone } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import Addnotes from "../addnotes";
import Dashbaordsidebar from "../../../sidebar";
const Shopdetail = () => {
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
                            <div className="col-md-12 ">
                                <div className="row book_deatils mx-2 my-2">
                                    <div className="col-md-4 px-0">
                                        <h2>Booking Details</h2>
                                    </div>
                                    <div className="col-md-8">
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
                            <div className="order_deatils mt-3 py-2">

                                <div className="row">
                                    <div className="col-md-12">
                                        <h2>Ordered Items</h2>
                                        <div className="pet_detailsinfo my-2">
                                        <div className="d-flex">
                                            <div className="listing_leftimg">
                                                <div className="numberproduct">
                                                    <img src={product_pic} alt="groomingimg" className="productimges" />

                                                </div>

                                            </div>
                                            <div className="listingrightside">
                                                <div >
                                                    <ul className="rating_stars">
                                                        <li><FaStar className="star" /></li>
                                                        <li><FaStar className="star" /></li>
                                                        <li><FaStar className="star" /></li>
                                                        <li><FaStar className="star" /></li>
                                                        <li><h2 className="rating_reviwesvalues">4.5</h2></li>
                                                    </ul>
                                                    <h2 className="my-2">Pedigree Beef Chunks in Gravy Wet Dog Food</h2>
                                                     <div className="d-flex">
                                                        <button className="half_qnty">500g</button>
                                                        <button className="full_qty">1kg</button>
                                                     </div>
                                                </div>

                                            </div>
                                            <div className="shop_addedproduct">
                                                <h2>AED 50</h2>
                                                <p><span>Qty : </span> 01</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pet_detailsinfo my-2">
                                        <div className="d-flex">
                                            <div className="listing_leftimg">
                                                <div className="numberproduct">
                                                    <img src={product_pic} alt="groomingimg" className="productimges" />

                                                </div>

                                            </div>
                                            <div className="listingrightside">
                                                <div >
                                                    <ul className="rating_stars">
                                                        <li><FaStar className="star" /></li>
                                                        <li><FaStar className="star" /></li>
                                                        <li><FaStar className="star" /></li>
                                                        <li><FaStar className="star" /></li>
                                                        <li><h2 className="rating_reviwesvalues">4.5</h2></li>
                                                    </ul>
                                                    <h2 className="my-2">Pedigree Beef Chunks in Gravy Wet Dog Food</h2>
                                                     <div className="d-flex">
                                                        <button className="half_qnty">500g</button>
                                                        <button className="full_qty">1kg</button>
                                                     </div>
                                                </div>

                                            </div>
                                            <div className="shop_addedproduct">
                                                <h2>AED 50</h2>
                                                <p><span>Qty : </span> 01</p>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>


                            </div>


                        </div>
                        <div className="col-md-4 px-0">
                            <div className="shoplist_info">
                            <FaBone className="bones"/><br></br>
                                You will earn 4.00 frisbee <br></br>treats in this order!
                            </div>
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

export default Shopdetail;