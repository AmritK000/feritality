import React, { useState,useEffect } from "react";
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import Header from "../Header";
import Lottie from "react-lottie";
import locationAnimation from "./locationAnimation.json";
import Footer from "../Footer";
import { Link, useNavigate } from "react-router-dom";
import {addressdataList} from "../../controllers/store/shopController";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Deliverypersonaldetail() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);
  const [AddressListData, setAddressList] = useState([]);
  const orderData = JSON.parse(sessionStorage.getItem("orderData"));
  const USER_INFO = JSON.parse(sessionStorage.getItem("USER-INFO"));
  const [selectedAddress, setSelectedAddress] = useState(null);

  const deliveryLocationAnimation = {
    loop: true,
    autoplay: true,
    animationData: locationAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const store_process = () => {
    navigate("/addnew-address");
  };
  const addressList = async () => {
    setAddressList([]);
    try {
        const options = {
            type: "",
            condition : { 
                userData : USER_INFO._id,
                status : "A"
            },
           populate  : { 
              key : "",
              select: " "
          },
             select: {},
            sort: { "_id": -1 },
        }
        const listData = await addressdataList(options);
        if (listData?.status === true) {
          setAddressList(listData.result);
          setSelectedAddress(listData.result[0]._id); 
        }
    } catch (error) {
        console.log("Failed to fetch groomoing shop list: ", error)
    }
}
const handleOpenorderModal = () => {
  const selectedAddressData = AddressListData.find(address => address._id === selectedAddress);
  
  if (selectedAddressData) {
    sessionStorage.setItem("addressData", JSON.stringify(selectedAddressData));
    navigate("/delivery-process-item-deatils");
  } else {
    toast.error("Please add or select an address.");
  }
 
};
const current_address = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        localStorage.setItem("LATITUDE", latitude);
        localStorage.setItem("LONGITUDE", longitude);
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then((response) => response.json())
          .then((data) => {
            sessionStorage.setItem("currentlocation", JSON.stringify(data));
            navigate("/addnew-address");
          })
          .catch((error) => {
            console.error("Error fetching location data:", error);
          });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  } else {
  }
};
const capitalizeFirstLetter = (str) => {
  // Check if the input is a string
  if (typeof str !== 'string') return ''; // If not a string, return an empty string
  // Capitalize the first letter and concatenate with the rest of the string
  return str.charAt(0).toUpperCase() + str.slice(1);
};
  useEffect(() => {
    addressList();
    document.title = "Frisbee website || Grooming store list"
}, [])
  return (
    <>
      <Header></Header>
      <div className="container my-4 mt-5">
        <div className="row">
          <div className="col-md-9">
            <ol className="steps_store_personal_deatils">
              <li className="step1 current progress_bar_first_step">
                <span className="progress_bar_first_step_span">
                  Personal Details
                </span>
              </li>
              <li className="step1 current progress_bar_first_step_second">
                <span className="progress_bar_first_step_second_span">
                  Checkout
                </span>
              </li>
              <li className="step1 current progress_bar_first_step_third">
                <span className="progress_bar_first_step_third_span">
                  Payment
                </span>
              </li>
            </ol>
            <div className="store_process_payement_deatils_heading mt-2">
              <h6>You are logged in as:</h6>
            </div>
            <div className=" p-2 rounded user-info-container store_process_heading_name_main_div">
              <div className="row align-items-center">
                <div className="col-12 col-md-4 d-flex align-items-center mb-3 mb-md-0 store_process_heading_name">
                  <FaUser className="me-2" />
                  <span>{capitalizeFirstLetter(USER_INFO.name)}</span>
                </div>
                <div className="col-12 col-md-4 d-flex align-items-center mb-3 mb-md-0 store_process_heading_name">
                  <FaPhone className="me-2" />
                  <span>{USER_INFO.country_code}-{USER_INFO.phone}</span>
                </div>
                <div className="col-12 col-md-4 d-flex align-items-center store_process_heading_name">
                  <FaEnvelope className="me-2" />
                  <span>{capitalizeFirstLetter(USER_INFO.email)}</span>
                </div>
              </div>
            </div>
            <div className="store_process_payement_deatils_heading mt-4">
              <h6>Select delivery Options</h6>
              <hr></hr>
            </div>
            <div>
             {AddressListData.length < 5 && ( 
              <button className="add_new_address" onClick={handleOpenModal}>Add A New Address</button>
            )} 
            </div>
           {AddressListData.length > 0 ? (
              AddressListData.map((address, index) => (
                <div className="addnew_address mb-3" key={address._id}>
                  <div>
                    <input type="radio" name="address" checked={selectedAddress === address._id}
                     onChange={() => setSelectedAddress(address._id)} />
                    <span>Address {index + 1}</span>
                  </div>
                  <p>
                  {capitalizeFirstLetter(address.firstname)} {capitalizeFirstLetter(address.lastname)}, {address.phone}, {capitalizeFirstLetter(address.email)}
                  {capitalizeFirstLetter(address.address)} {capitalizeFirstLetter(address.building_name)} {capitalizeFirstLetter(address.apartment_no)} {capitalizeFirstLetter(address.city)}
                  </p>
                </div>
              ))
            ) : (
              <p>No addresses available. Please add a new address.</p>
            )}
            
          </div>
          <div className="col-md-3">
            <div className="store_process_card_name">
              <span className="font-weight-bold">Payment Details</span>
            </div>
            <div className="payment-details store_process_payement_deatils_heading mt-2">
              <h6>Payment Details</h6>
              <div className="store_process_payment_details_heading_child_div">
                <table className="table  bg-light">
                  <tbody>
                    <tr>
                      <td>Detail</td>
                      <td className="text-end">Price</td>
                    </tr>
                    <tr>
                      <td>Subtotal :-</td>
                      <td className="text-end">{orderData.subtotal} AED</td>
                    </tr>
                    <tr>
                      <td>Total :-</td>
                      <td className="text-end">AED {orderData.subtotal}</td>
                    </tr>
                    <tr>
                      <td>Shipping Charge :-</td>
                      <td className="text-end">{orderData.shippingCharge} AED</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row mb-4 mt-4 font-weight-bold store_process_payement_deatils_heading_child_div store_process_deatils_price">
                <div className="col">Amount Due :- </div>
                <div className="col text-end">
                AED {(parseFloat(orderData.subtotal) + parseFloat(orderData.shippingCharge)).toFixed(2)}
              </div>
              </div>
              <div className="login_user_otp_for_bottom_button">
                <Link to="/delivery-process-item-deatils">
                  <button className="btn btn-danger btn-lg mb-3 user_otp_first" onClick={handleOpenorderModal}>
                    Proceed to Order
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="modal-dialog modal-dialog-centered login_modal_popup"
            style={{ maxWidth: "30%" }}
          >
            <div className="modal-content">
              <div className="modal-body text-center position-relative delivery_store_pop_up_div">
                <div className="delivery_location_svg">
                  <Lottie
                    options={deliveryLocationAnimation}
                    height={100}
                    width={100}
                  />
                  <h5 className="mt-4">Your Want To</h5>
                  <h5 className="text-danger">Add New Delivery Address.</h5>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <div className="login_user_otp_for_bottom_button">
                    <button className="btn btn-outline-danger mb-3 user_otp_second" onClick={current_address}>
                      Use Current Location
                    </button>
                    <button className="btn btn-danger btn-lg  user_otp_first" onClick={store_process}>
                      Add Address Manually
                    </button>
                  </div>
                </div>
              </div>
              <div className="position-absolute user_login_top_right_cross_btn">
                <button className="top-0 end-0 m-3" onClick={handleCloseModal}>
                  x
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer></Footer>
    </>
  );
}

export default Deliverypersonaldetail;
