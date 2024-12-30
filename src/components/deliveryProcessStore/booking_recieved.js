import React, { useState,useEffect,useMemo } from "react";
import Header from "../Header";
import "../StoreProcess/storeProcess.css";
import animationData from "../StoreProcess/storeLottieAnimation.json";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import { useNavigate ,useLocation} from 'react-router-dom';
import {orderchangestatus,orderpaymentstatus} from "../../controllers/store/shopController";



function Booking_recieved() {
    // const cartdata = JSON.parse(localStorage.getItem('shopname')) || [];
    // const ordercompletedata = JSON.parse(localStorage.getItem('orderDataComplete')) || [];
     const USER_INFO = JSON.parse(sessionStorage.getItem("USER-INFO"));

    const ordercompletedata = JSON.parse(sessionStorage.getItem("orderDataComplete"));
    const cartdata = JSON.parse(sessionStorage.getItem("shopname"));
    const treat = JSON.parse(sessionStorage.getItem("treat"));

   
    const location = useLocation();
    const itemorder = location.state?.orderDataComplete || ordercompletedata;;
    const itemshopname = location.state?.shopname || cartdata;
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    const navigate = useNavigate();

    const handleNavigate = () => {
        sessionStorage.removeItem("shopname");
         sessionStorage.removeItem("orderDataComplete");
        
        // // Remove cart data from localStorage
         localStorage.removeItem("shopname");
         sessionStorage.removeItem("changeorderresult");
         sessionStorage.removeItem("transaction");
         sessionStorage.removeItem("chargeId");
         sessionStorage.removeItem("treat");
        navigate('/');
    };
    const capitalizeFirstLetter = (str) => {
        if (typeof str !== 'string') return ''; 
        return str.charAt(0).toUpperCase() + str.slice(1);
      };
      
const verifyPayment = async (chargeId) => {
    try {
      const options = {
        chargeId: chargeId,
      };
        const response = await orderpaymentstatus(options);
        const data = response.res.data;
      if (data.status === "CAPTURED") {
        const changeorderresult = JSON.parse(sessionStorage.getItem("changeorderresult"));
         const transaction = JSON.parse(sessionStorage.getItem("transaction"));
        handleChangeOrder(changeorderresult,transaction,{
            ...data,
            status: "Success", 
            paymentStatus: "Success" 
          });
      } else {
        // alert("Payment failed or incomplete.");
        const changeorderresult = JSON.parse(sessionStorage.getItem("changeorderresult"));
        const transaction = JSON.parse(sessionStorage.getItem("transaction"));
        handleChangeOrder(changeorderresult, transaction, {
          ...data,
          status: "Pending", 
          paymentStatus: "Failed" 
        });
      }
    } catch (error) {
      console.error("Error verifying the payment:", error.message);
    }
  };
  const handleChangeOrder = async (changeorderresult, transaction, data) => {
    try {
      const options = {
        orderId: changeorderresult.order._id,
        status: data.status, // Use status from data
        paymentStatus: data.paymentStatus, 
        // txnnumber : "tok_P1Ke582410437vHE23RC3839",
        txnnumber : transaction,
        paidBy : "Online Payment",
        // txnRespounse : {}
        txnRespounse: JSON.stringify(data)
      };
      // Complete the order
       const response = await orderchangestatus(options);
      if (response.status) {
        
      }
    } catch (error) {
      // Handle errors and provide feedback
      console.error(error.message);
    }
  };
  useEffect(() => {
    
    const chargeId = JSON.parse(sessionStorage.getItem("chargeId"));
    if (chargeId) {
        verifyPayment(chargeId);
      }
    
  }, []);
    return (
        <div>
            <Header></Header>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-4">
                        <div className="text-white d-flex flex-column justify-content-center">
                            <div
                                style={{ backgroundColor: "#C73633" }}
                                className="frisbee_main_section_div"
                            >
                                <div className="frisbee_main_section_div_child">
                                    <span>Get Expert</span>
                                    <span className="login_professional_servies">
                                        Professional Services
                                    </span>
                                    <span>At Your Door Step.</span>
                                </div>
                                <img
                                    src="/frisbeeImage/login.png"
                                    alt="Service"
                                    className="img-fluid mt-3 rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 d-flex flex-column justify-content-center">
                        <div className="p-4 d-flex flex-column justify-content-center">
                            <div className="text-center store_process_final_main_div">
                                <div className="store_process_icon_and_success_div">
                                    <div className="checkmark-icon store_check_mark_section">
                                        <Lottie options={defaultOptions} />
                                    </div>
                                    <div className="store_process_success_div">
                                        <span
                                            className=" mt-3"
                                            style={{
                                                fontFamily: "Poppins, sans-serif",
                                                fontWeight: 500,
                                                fontSize: "21px",
                                                color: "#e1251b",
                                            }}
                                        >
                                            Hi {capitalizeFirstLetter(USER_INFO.name)}!
                                        </span>
                                        <p
                                            className="store_process_final_details"
                                            style={{
                                                fontFamily: "Poppins, sans-serif",
                                                fontWeight: 400,
                                                fontSize: "14px",
                                                color: "#8e8686",
                                            }}
                                        >
                                            Your order is <br /> successfully placed
                                        </p>
                                    </div>
                                </div>

                                <h3 className="booking_recived_main_heading">Booking Details</h3>
                                <div class="card info-card p-3 shadow-sm booking_recieved_main_sec">
                                    <div class="d-flex justify-content-between">
                                        <span className="booking_deatils_store_name">Store name :</span>
                                        <span className="booking_deatils_pet_planet">{itemshopname}</span>
                                    </div>
                                    {/* <hr /> */}
                                    {/* <div class="d-flex justify-content-between">
                                        <span className="booking_deatils_store_name">Service Type :</span>
                                        <span className="booking_deatils_pet_planet">Shop</span>
                                    </div> */}
                                    <hr />
                                    <div class="d-flex justify-content-between">
                                        <span className="booking_deatils_store_name">Date :</span>
                                        <span className="booking_deatils_pet_planet">{currentDate}</span>
                                    </div>
                                    <hr />
                                    <div class="d-flex justify-content-between">
                                        <span className="booking_deatils_store_name"> Time :</span>
                                        <span className="booking_deatils_pet_planet">{currentTime}</span>
                                    </div>
                                    <hr />
                                    <div class="d-flex justify-content-between">
                                        <span className="booking_deatils_store_name">Price :</span>
                                        <span className="booking_deatils_pet_planet"> AED {parseFloat(itemorder?.paidAmount || 0).toFixed(2)}</span>
                                    </div>
                                    <hr />
                                    <div>
                                    {/* {itemorder.treats > 0 && (
                                        <div className="d-flex justify-content-between">
                                        <span className="booking_deatils_store_name">Treats :</span>
                                        <span className="booking_deatils_pet_planet">+{itemorder.treats}</span>
                                        </div>
                                    )} */}
                                     {treat > 0 && (
                                        <div className="d-flex justify-content-between">
                                        <span className="booking_deatils_store_name">Treats :</span>
                                        <span className="booking_deatils_pet_planet">+{treat}</span>
                                        </div>
                                    )}
                                    </div>

                                </div>


                                <div className="login_user_otp_for_bottom_button">
                                    <button className="btn btn-outline-danger mb-3 user_otp_second">
                                        View More Details
                                    </button>
                                    <button className="btn btn-danger btn-lg  user_otp_first" onClick={handleNavigate}>
                                        Back to Home
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className=" d-flex flex-column justify-content-center store_process_mobile_sec p-2">
                            <div className="dowanloadapp_section_for_heading">
                                <h1>Download the app</h1>
                                <p>
                                    Book{" "}
                                    <span className="store_process_professional_expert">
                                        {" "}
                                        professional Experts{" "}
                                    </span>
                                    <br /> from your phone.
                                </p>
                                <div className="store_process_google_app_store">
                                    <div>
                                        <Link to="/">
                                            <img src="/frisbeeImage/btns 2.png" alt="appstore" />
                                        </Link>
                                        <Link to="/">
                                            <img src="/frisbeeImage/btns 1.png" alt="googleplay" />
                                        </Link>
                                    </div>
                                    <div>
                                        <img
                                            src="/frisbeeImage/frisbee_logo.png"
                                            alt="frisbee_logo"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="store_process_app_pic">
                                <img src="/frisbeeImage/store_bottom_image.png"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Booking_recieved