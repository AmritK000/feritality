import React from "react";
import Header from "../Header";
import "../StoreProcess/storeProcess.css";
import animationData from "../StoreProcess/storeLottieAnimation.json";
import Lottie from "react-lottie";
import { Link,useNavigate } from "react-router-dom";
import Footer from "../Footer";

// Function to calculate tomorrow's date
const getTomorrowDate = () => {
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
 
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return tomorrow.toLocaleDateString('en-US', options);
};

function DeliveryProcessFinalDetails() {
  const navigate = useNavigate();
  const USER_INFO = JSON.parse(sessionStorage.getItem("USER-INFO"));
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const estimatedDeliveryDate = getTomorrowDate(); // Call the function to get tomorrow's date
  const handlehome = async () => {
    navigate("/");
  };
  const capitalizeFirstLetter = (str) => {
    // Check if the input is a string
    if (typeof str !== 'string') return ''; // If not a string, return an empty string
    // Capitalize the first letter and concatenate with the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  return (
    <>
      <Header></Header>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="p-4 text-white d-flex flex-column justify-content-center">
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
                <h4 className="mt-4 store_process_estimate_date">
                  Estimate Delivery Date:
                </h4>
                <div className="bg-light p-2 mt-2 store_process_date_section">
                  <span>{estimatedDeliveryDate}</span> {/* Display tomorrow's date */}
                </div>
                <p className="mt-4 store_process_we_will_posted">
                  We will keep you posted about the status of the order via SMS.
                  We will send you the exact payment amount when the order is
                  ready for delivery.
                </p>
                <div className="login_user_otp_for_bottom_button">
                  <button className="btn btn-outline-danger mb-3 user_otp_second">
                    View Order Details
                  </button>
                  <button className="btn btn-danger btn-lg  user_otp_first" onClick={handlehome}>
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 p-4">
            <div className=" d-flex flex-column justify-content-center store_process_mobile_sec">
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
                <img src="/frisbeeImage/store_bottom_image.png" alt="app"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default DeliveryProcessFinalDetails;
