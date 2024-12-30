import React, { useState,useEffect } from "react";
import Header from "../Header";
import "./storeProcess.css";
import animationData from "./storeLottieAnimation.json";
import Lottie from "react-lottie";
import { Link, useLocation,useNavigate } from "react-router-dom";
import Footer from "../Footer";
import moment from 'moment';
import {orderpaymentstatus} from "../../controllers/store/shopController";
import { changeStatus } from "../../controllers/booking/traningBooking"
import {changeStatus as changegrommingStatus} from "../../controllers/booking/groomingBooking";
import {changeStatus as changeboardingStatus} from "../../controllers/services/boardingController";
import {changeStatus as changedaycareStatus} from "../../controllers/services/dayCareController";
import {changeStatus as changeveterinaryStatus} from "../../controllers/services/veterinaryController";

function Booking_recieved() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const trainingresult = JSON.parse(sessionStorage.getItem("checkoutData"));
    const [bookingSummary, setBookingSummary] = useState(state || trainingresult);
    const userInfo = JSON.parse(sessionStorage.getItem("USER-INFO"));
    const currentDate = moment().format('DD/MM/YYYY');
    const currentTime = moment().format('h:mm A');
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    
    const capitalizeFirstLetter = (str) => {
        // Check if the input is a string
        
        if (typeof str !== 'string') return ''; // If not a string, return an empty string
        // Capitalize the first letter and concatenate with the rest of the string
        return str.charAt(0).toUpperCase() + str.slice(1);
      };
           
const verifyPayment = async (chargeId) => {
    try {
      const options = {
        chargeId: chargeId,
      };
        const response = await orderpaymentstatus(options);
        const data = response.res.data;
        const traningchargeId = JSON.parse(sessionStorage.getItem("chargeId"));
        const grommingchargeId = JSON.parse(sessionStorage.getItem("grommingchargeId"));
        const boardingchargeId = JSON.parse(sessionStorage.getItem("boardingchargeId"));
        const daycarechargeId = JSON.parse(sessionStorage.getItem("daycarechargeId"));
        const veterinarychargeId = JSON.parse(sessionStorage.getItem("veterinarychargeId"));
        if(traningchargeId){
                if (data.status === "CAPTURED") {
                    const changeorderresult = JSON.parse(sessionStorage.getItem("result"));
                    const transaction = JSON.parse(sessionStorage.getItem("transaction"));
                    handleChangeOrder(changeorderresult,transaction,{
                        ...data,
                        status: "Pending", 
                        paymentStatus: "Success" 
                    });
                } else {
                    // alert("Payment failed or incomplete.");
                    const changeorderresult = JSON.parse(sessionStorage.getItem("result"));
                    const transaction = JSON.parse(sessionStorage.getItem("transaction"));
                    handleChangeOrder(changeorderresult, transaction, {
                    ...data,
                    status: "Failed", 
                    paymentStatus: "Failed" 
                    });
                }
    }else if(grommingchargeId){
        if (data.status === "CAPTURED") {
            const changeorderresult = JSON.parse(sessionStorage.getItem("grommingresult"));
            const transaction = JSON.parse(sessionStorage.getItem("grommingtransaction"));
            handlegrommingChangeOrder(changeorderresult,transaction,{
                ...data,
                status: "Pending", 
                paymentStatus: "Success" 
            });
        } else {
            const changeorderresult = JSON.parse(sessionStorage.getItem("grommingresult"));
            const transaction = JSON.parse(sessionStorage.getItem("grommingtransaction"));
            handlegrommingChangeOrder(changeorderresult, transaction, {
            ...data,
            status: "Failed", 
            paymentStatus: "Failed" 
            });
        }
    }else if(boardingchargeId){
        if (data.status === "CAPTURED") {
            const changeorderresult = JSON.parse(sessionStorage.getItem("boardingresult"));
            const transaction = JSON.parse(sessionStorage.getItem("boardingtransaction"));
            handleboardingChangeOrder(changeorderresult,transaction,{
                ...data,
                status: "Pending", 
                paymentStatus: "Success" 
            });
        } else {
            const changeorderresult = JSON.parse(sessionStorage.getItem("boardingresult"));
            const transaction = JSON.parse(sessionStorage.getItem("boardingtransaction"));
            handleboardingChangeOrder(changeorderresult, transaction, {
            ...data,
            status: "Failed", 
            paymentStatus: "Failed" 
            });
        }
    }else if(daycarechargeId){
        if (data.status === "CAPTURED") {
            const changeorderresult = JSON.parse(sessionStorage.getItem("daycareresult"));
            const transaction = JSON.parse(sessionStorage.getItem("daycaretransaction"));
            handledaycareChangeOrder(changeorderresult,transaction,{
                ...data,
                status: "Pending", 
                paymentStatus: "Success" 
            });
        } else {
            const changeorderresult = JSON.parse(sessionStorage.getItem("daycareresult"));
            const transaction = JSON.parse(sessionStorage.getItem("daycaretransaction"));
            handledaycareChangeOrder(changeorderresult, transaction, {
            ...data,
            status: "Failed", 
            paymentStatus: "Failed" 
            });
        }
    }else if(veterinarychargeId){
        if (data.status === "CAPTURED") {
            const changeorderresult = JSON.parse(sessionStorage.getItem("veterinaryresult"));
            const transaction = JSON.parse(sessionStorage.getItem("veterinarytransaction"));
            handleveterinaryChangeOrder(changeorderresult,transaction,{
                ...data,
                status: "Pending", 
                paymentStatus: "Success" 
            });
        } else {
            const changeorderresult = JSON.parse(sessionStorage.getItem("veterinaryresult"));
            const transaction = JSON.parse(sessionStorage.getItem("veterinarytransaction"));
            handleveterinaryChangeOrder(changeorderresult, transaction, {
            ...data,
            status: "Failed", 
            paymentStatus: "Failed" 
            });
        }
    }
    } catch (error) {
      console.error("Error verifying the payment:", error.message);
    }
  };
  const handleChangeOrder = async (changeorderresult, transaction, data) => {
    try {
      const options = {
        bookingId: changeorderresult.order._id,
        status: data.status, // Use status from data
        paymentStatus: data.paymentStatus, 
        // txnnumber : "tok_P1Ke582410437vHE23RC3839",
        txnnumber : transaction,
        paidBy : "Online Payment",
        // txnRespounse : {}
        txnRespounse: JSON.stringify(data)
      };
      // Complete the order
       const response = await changeStatus(options);
      if (response.status) {
        
      }
    } catch (error) {
      // Handle errors and provide feedback
      console.error(error.message);
    }
  };

  const handlegrommingChangeOrder = async (changeorderresult, transaction, data) => {
    try {
      const options = {
        bookingId: changeorderresult.order?._id,
        paymentStatus:data.paymentStatus,
        status: 'Pending',
        txnnumber:transaction,
        paidBy: "Online Payment",
        txnRespounse: JSON.stringify(data)
    }
      // Complete the order
       const response = await changegrommingStatus(options);
      if (response.status) {
        
      }
    } catch (error) {
      // Handle errors and provide feedback
      console.error(error.message);
    }
  };
  const handleboardingChangeOrder = async (changeorderresult, transaction, data) => {
    try {
      const options = {
        bookingId: changeorderresult.bookingDetailsData[0].booking_id,
        paymentStatus:data.paymentStatus,
        status: 'Pending',
        txnnumber:transaction,
        paidBy: "Online Payment",
        txnRespounse: JSON.stringify(data)
    }
      // Complete the order
       const response = await changeboardingStatus(options);
      if (response.status) {
        
      }
    } catch (error) {
      // Handle errors and provide feedback
      console.error(error.message);
    }
  };
  const handledaycareChangeOrder = async (changeorderresult, transaction, data) => {
    try {
      const options = {
        bookingId: changeorderresult.bookingDetailsData[0].booking_id,
        paymentStatus:data.paymentStatus,
        status: 'Pending',
        txnnumber:transaction,
        paidBy: "Online Payment",
        txnRespounse: JSON.stringify(data)
    }
      // Complete the order
       const response = await changedaycareStatus(options);
      if (response.status) {
        
      }
    } catch (error) {
      // Handle errors and provide feedback
      console.error(error.message);
    }
  };
  const handleveterinaryChangeOrder = async (changeorderresult, transaction, data) => {
    try {
      const options = {
        bookingId: changeorderresult.order?._id,
        paymentStatus:data.paymentStatus,
        status: 'Pending',
        txnnumber:transaction,
        paidBy: "Online Payment",
        txnRespounse: JSON.stringify(data)
    }
      // Complete the order
       const response = await changeveterinaryStatus(options);
      if (response.status) {
        
      }
    } catch (error) {
      // Handle errors and provide feedback
      console.error(error.message);
    }
  };
  const handleNavigate = () => {
    sessionStorage.removeItem("result");
     sessionStorage.removeItem("transaction");
    
    // // Remove cart data from localStorage
     localStorage.removeItem("checkoutData");
     sessionStorage.removeItem("chargeId");
     sessionStorage.removeItem("treat");
     sessionStorage.removeItem("grommingchargeId");
     sessionStorage.removeItem("boardingchargeId");
     sessionStorage.removeItem("daycarechargeId");
     sessionStorage.removeItem("veterinarychargeId");
     sessionStorage.removeItem("grommingresult");
     sessionStorage.removeItem("grommingtransaction");
     sessionStorage.removeItem("boardingresult");
     sessionStorage.removeItem("boardingtransaction");
     sessionStorage.removeItem("daycareresult");
     sessionStorage.removeItem("daycaretransaction");
     sessionStorage.removeItem("veterinaryresult");
     sessionStorage.removeItem("veterinarytransaction");
    navigate('/');
};
      useEffect(() => {
    
        const chargeId = JSON.parse(sessionStorage.getItem("chargeId"));
        const grommingchargeId = JSON.parse(sessionStorage.getItem("grommingchargeId"));
        const boardingchargeId = JSON.parse(sessionStorage.getItem("boardingchargeId"));
        const daycarechargeId = JSON.parse(sessionStorage.getItem("daycarechargeId"));
        const veterinarychargeId = JSON.parse(sessionStorage.getItem("veterinarychargeId"));
        if (chargeId) {
            verifyPayment(chargeId);
          }
          if (grommingchargeId) {
            verifyPayment(grommingchargeId);
          }
          if (boardingchargeId) {
            verifyPayment(boardingchargeId);
          }
          if (daycarechargeId) {
            verifyPayment(daycarechargeId);
          }
          if (veterinarychargeId) {
            verifyPayment(veterinarychargeId);
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
                                            {capitalizeFirstLetter(userInfo?.name)}
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
                                        <span className="booking_deatils_pet_planet">{bookingSummary?.checkoutFormData?.servicesId?.store?.shop_name}</span>
                                    </div>
                                    <hr />
                                    <div class="d-flex justify-content-between">
                                        <span className="booking_deatils_store_name">Service Type :</span>
                                        <span className="booking_deatils_pet_planet">{bookingSummary?.checkoutFormData?.servicesId?.category?.name}</span>
                                    </div>
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
                                        <span className="booking_deatils_pet_planet">{Number(bookingSummary?.totalamount).toFixed(2)}</span>
                                    </div>
                                    <hr />
                                    {bookingSummary.treat > 0 && (
                                        <div className="d-flex justify-content-between">
                                        <span className="booking_deatils_store_name">Treats :</span>
                                        <span className="booking_deatils_pet_planet">+{Number(bookingSummary.treat)}</span>
                                        </div>
                                    )}
                                    {bookingSummary.treats > 0 && (
                                        <div className="d-flex justify-content-between">
                                        <span className="booking_deatils_store_name">Treats :</span>
                                        <span className="booking_deatils_pet_planet">+{Number(bookingSummary.treats)}</span>
                                        </div>
                                    )}
                                </div>


                                <div className="login_user_otp_for_bottom_button">
                                <Link to="/user/dashboard">
                                    <button className="btn btn-outline-danger mb-3 user_otp_second">
                                        View More Details
                                        
                                    </button>
                                    </Link>
                                    <Link to="/">
                                        <button className="btn btn-danger btn-lg  user_otp_first" onClick={handleNavigate}>
                                            Back to Home
                                        </button>
                                    </Link>
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
