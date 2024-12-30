import React, { useState,useEffect } from "react";
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import Header from "../Header";
import Footer from "../Footer";
import { Link, useNavigate } from "react-router-dom";
import {addressdataList,addaddressdata} from "../../controllers/store/shopController";
import "../../services/AllServices/PetShop/productslider.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MapComponent from "../../services/Map/MapComponent.js";
import LocationMap from "../../services/Map/LocationMap.js";

function Addnew_address() {
  const navigate = useNavigate();
  const orderData = JSON.parse(sessionStorage.getItem("orderData"));
  const USER_INFO = JSON.parse(sessionStorage.getItem("USER-INFO"));
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [AddressListData, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    building_name: "",
    apartment_no: "", // Assuming a default version
    address: "",
    city: "",
    longitude : "",
   latitude : "",
    isDefault: "",
    ipAddress: ":01",
    version: "0.0.1",
    platform: "Web",
  });
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    let formErrors = {};
    if (!formData.firstname) formErrors.firstname = "First Name is required";
    if (!formData.lastname) formErrors.lastname = "Last Name is required";
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.phone) formErrors.phone = "Phone No is required";
    if (!formData.building_name) formErrors.building_name = "Building Name is required";
    if (!formData.apartment_no) formErrors.apartment_no = "Apartment No is required";
    if (!formData.address) formErrors.address = "Address is required";
    if (!formData.city) formErrors.city = "City is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const store_process = () => {
    navigate("/delivery-process-item-deatils");
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
          if (listData.result.length > 0) {
            setSelectedAddress(listData.result[0]._id); // Set the first address as selected
          }
        }
    } catch (error) {
        console.log("Failed to fetch groomoing shop list: ", error)
    }
}

const handleSubmitaddress = async (e) => {
  const updatedFormData = {
    ...formData,
    latitude: addNewAddress?.latitude || "", // Add latitude
    longitude: addNewAddress?.longitude || "", // Add longitude
  };

  e.preventDefault();
  if (validateForm()) {
    const response = await addaddressdata(updatedFormData);
  
    if (response.status) {
      toast.success("Address added successfully!", { position: "top-right" });
      addressList();
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        building_name: "",
        apartment_no: "",
        address: "",
        city: "",
        latitude: "",
        longitude: "",
      });
    }
  } else {
    // alert("Please fill all required fields.");
  }
};
const handleOrder = () => {
  // Find the selected address data
  const selectedAddressData = AddressListData.find(address => address._id === selectedAddress);
  
  if (selectedAddressData) {
    // Store the selected address data in session storage
    sessionStorage.setItem("addressData", JSON.stringify(selectedAddressData));
  } else {
    // Handle the case where no address is selected (optional)
    console.log("No address selected");
  }

  // Redirect to the delivery personal details page
  navigate("/delivery-process-item-deatils");
};

const capitalizeFirstLetter = (str) => {
  // Check if the input is a string
  if (typeof str !== 'string') return ''; // If not a string, return an empty string
  // Capitalize the first letter and concatenate with the rest of the string
  return str.charAt(0).toUpperCase() + str.slice(1);
};

useEffect(() => {
  addressList(); // Fetch the address list

  const currentlocation = JSON.parse(sessionStorage.getItem("currentlocation"));

  if (currentlocation && currentlocation.address) {
      // Create a formatted address string by concatenating available address fields
      const formattedAddress = [
          currentlocation.address.town,
          currentlocation.address.state_district,
          currentlocation.address.state,
          currentlocation.address.county,
          currentlocation.address.postcode
      ]
      .filter(Boolean) // Remove any undefined or null values
      .join(", "); // Join with a comma and space

      // Update the formData state with the formatted address
      setFormData(prevData => ({
          ...prevData,
          address: formattedAddress || '' // Assign formatted address or empty string
      }));
  }

  document.title = "Frisbee website || Grooming store list";
}, []);

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
              {/* <button className="add_new_address">Add A New Address</button> */}

            </div>
            {/* {AddressListData.length < 5 && ( */}
  <div className="addnew_address my-4">
    <form>
      <div className="row">
        <div className="col-md-4">
          <input
            type="text"
            placeholder="First Name"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            className="form-field"
          />
          {errors.firstname && <span style={{ color: 'red' }}>{errors.firstname}</span>}
        </div>
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Last Name"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            className="form-field"
          />
          {errors.lastname && <span style={{ color: 'red' }}>{errors.lastname}</span>}
        </div>
        <div className="col-md-4">
          <input
            type="tel"
            placeholder="Phone No"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="form-field"
          />
          {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
        </div>
        <div className="col-md-8">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-field"
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>
        <div className="col-md-4">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="form-field"
          />
          {errors.city && <span style={{ color: 'red' }}>{errors.city}</span>}
        </div>
        <div className="col-md-6">
          <input
            type="number"
            name="latitude"
            value={addNewAddress?.latitude}
            onChange={handleInputChange}
            placeholder="Address latitude"
            className="form-field"
          />
          {errors.latitude && <p style={{ color: "red" }}>{errors.latitude}</p>}
        </div>
        <div className="col-md-6">
          <input
            type="number"
            name="longitude"
            value={addNewAddress?.longitude}
            onChange={handleInputChange}
            placeholder="Address longitude"
            className="form-field"
          />
          {errors.longitude && <p style={{ color: "red" }}>{errors.longitude}</p>}
        </div>
        <MapComponent setAddNewAddress={setAddNewAddress} />
        <div className="col-md-16">
          <LocationMap latitude={addNewAddress?.latitude} longitude={addNewAddress?.longitude} setAddNewAddress={setAddNewAddress} />
        </div>
        <div className="col-md-12">
          <input
            type="text"
            placeholder="Building Name"
            name="building_name"
            onChange={handleInputChange}
            value={formData.building_name}
            className="form-field"
          />
          {errors.building_name && <span style={{ color: 'red' }}>{errors.building_name}</span>}
        </div>
        <div className="col-md-12">
          <input
            type="text"
            placeholder="Apartment / Villa Name"
            name="apartment_no"
            onChange={handleInputChange}
            value={formData.apartment_no}
            className="form-field"
          />
          {errors.apartment_no && <span style={{ color: 'red' }}>{errors.apartment_no}</span>}
        </div>
        <div className="col-md-12">
          <div className="save_btn">
            <input type="radio" />
            <p className="save_info">Save your information for future checkouts.</p>
          </div>
          <button type="button" className="add_new_address" onClick={handleSubmitaddress}>Submit</button>
        </div>
      </div>
    </form>
  </div>
{/* )} */}

            {AddressListData.length > 0 ? (
              AddressListData.map((address, index) => (
                <div className="addnew_address mb-3" key={address._id}>
                  <div>
                  <input
          type="radio"
          name="address"
          checked={selectedAddress === address._id}
          onChange={() => setSelectedAddress(address._id)}
        />
                    <span>Address {index + 1}</span>
                  </div>
                  <p>
              {capitalizeFirstLetter(address.firstname)} {capitalizeFirstLetter(address.lastname)},
              {capitalizeFirstLetter(address.phone)}, {capitalizeFirstLetter(address.email)}<br />
              {capitalizeFirstLetter(address.apartment_no)}, {capitalizeFirstLetter(address.building_name)},
              {capitalizeFirstLetter(address.address)}, {capitalizeFirstLetter(address.city)}
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
                      <td>Subtotal :- </td>
                      <td className="text-end">{orderData.subtotal} AED</td>
                    </tr>
                    <tr>
                      <td>Shipping Charge :-</td>
                      <td className="text-end text-danger">{orderData.shippingCharge} AED</td>
                    </tr>
                    <tr>
                      <td>Total :-</td>
                      <td className="text-end">AED {orderData.subtotal + orderData.shippingCharge}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row mb-4 mt-4 font-weight-bold store_process_payement_deatils_heading_child_div store_process_deatils_price">
                <div className="col">Amount Due :-</div>
                <div className="col text-end">AED {orderData.subtotal + orderData.shippingCharge}</div>
              </div>
              <div className="login_user_otp_for_bottom_button">
                <Link to="/delivery-process-item-deatils">
                  <button className="btn btn-danger btn-lg mb-3 user_otp_first" onClick={handleOrder}>
                    Proceed to Order
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Addnew_address;
