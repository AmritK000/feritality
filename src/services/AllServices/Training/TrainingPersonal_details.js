import React, { useState, useRef, useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Header from "../../../components/Header";
import { breedList, addEditAddress, addressList } from "../../../controllers/accounts/Account.js";
import { MdCall } from "react-icons/md";
import Pet_infoslider from "./pet_infoslider";
import { GoPlus } from "react-icons/go";
import Footer from "../../../components/Footer";
import { petDetails } from "../../../controllers/common";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ASSETS_BASE_URL } from "../../../config/constants";
import RatingsStar from "../../../components/RatingsStar.js";
import moment from "moment/moment.js";
import { postRequest } from "../../../controllers/API.js";
import { API_BASE_URL } from "../../../config/constants.js";
import { fetchIpAddress } from '../../../controllers/API.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { timeSlot } from "../../../controllers/services/trainingController.js";
import Cookies from "js-cookie"; 
import { getAdminInfo } from "../../../controllers/booking/traningBooking.js";
import MapComponent from "../../Map/MapComponent.js";
import LocationMap from "../../Map/LocationMap.js";


function TrainingPersonal_details() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [show_petdetail, setshow_petdetail] = useState(false);
  const fileInputRef = useRef([]);
  const location = useLocation();
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [addNewAddressinstitute, setAddNewAddressinstitute] = useState(false);
  const { state } = location;
  const checkoutData = JSON.parse(sessionStorage.getItem("checkoutData"));
  const [isPickDropToggled, setIsPickDropToggled] = useState(false);
  // const [checkoutData, setCheckoutData] = useState(state || '');
  const [toastshow, setToastShow] = useState(false);
  const [toastmsg, setToastMsg] = useState('');
  const [imagePreviews, setImagePreviews] = useState([null]);
  const [profiles, setProfiles] = useState([{ name: '', dob: '', breed: '', gender: '', city: '' }]);
  const [images, setImages] = useState({});
  const [breeds, setBreeds] = useState([]);
  const [AddressList, setAddressList] = useState([]);
  const [errors, setErrors] = useState({});
  const userInfo = JSON.parse(sessionStorage.getItem("USER-INFO"));
  const [selectedAddress, setSelectedAddress] = useState(null);
 
  const [petData, setPetData] = useState("");
  const [petDetail,setpetDetails ] = useState([]);
  const [userinfo, setUserinfo] = useState([]);
  const [bookingData, setBookingData] = useState(null);
  const [showPickDrop, setshowPickDrop] = useState(false);
  const [toggle, set_toggle] = useState(true);
  const [pickupType, setpickupType] = useState("User location to centre");
  const [add_newaddress, setadd_newaddress] = useState(false);
  const [ADMININFO, setAdminInfo] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [sec_oggle, setsec_toggle] = useState(false);
  const [twoWay, setTwoWay] = useState(false);
  const [pickupTime, setPickupTime] = useState("");
  const [isRepeatToggled, setIsRepeatToggled] = useState(false);
  const [dropTime, setDropTime] = useState("");
  const [selectedSide, setSelectedSide] = useState('one-side'); // State to track selected button
  const [filteredDropTimes, setFilteredDropTimes] = useState([]);



  const handleClick = (index) => {
    fileInputRef.current[index].click();
  };
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
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProfiles = [...profiles];
    updatedProfiles[index][name] = value;
    setProfiles(updatedProfiles);

    // Clear any existing errors for this field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [index]: { ...prevErrors[index], [name]: '' },
    }));
  };

  // Handle image input (outside the form)
  const handleImageChange = (index, e) => {
    const file = e.target.files[0];

    const updatedPreviews = [...imagePreviews];
    updatedPreviews[index] = URL.createObjectURL(file);
    setImagePreviews(updatedPreviews);

    setImages((prevImages) => ({
      ...prevImages,
      [index]: file,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [index]: { ...prevErrors[index], image: '' },
    }));
  };

  const getList = async () => {
    try {
      const options = {
        condition: {},
        select: { name: 1 },
        sort: { _id: -1 },
      };
      const listData = await breedList(options);
      if (listData.status && Array.isArray(listData.result)) {
        setBreeds(listData.result.map((breed) => breed.name));
      } else {
        setBreeds([]);
      }
    } catch (error) {
      console.error("Error fetching breeds:", error);
      setBreeds([]);
    }
  };

  const addresslist = async () => {
    try {
      const options = {
        type: "",
        condition: {
          userData: userInfo?._id,
          status: "A"
        },
        select: {},
        sort: { _id: -1 },
        populate: {
          key: "",
          select: ""
        }
      };
      const listData = await addressList(options);
      if (listData.status && Array.isArray(listData.result)) {
        setAddressList(listData?.result)
         setSelectedAddress(listData.result[0]._id); 
      } else {

      }
    } catch (error) {
      console.error("Error fetching breeds:", error);
      setAddressList([]);
    }
  };


  /*********************************************************
    *  This function is use to validateForm for pet details
    *********************************************************/
  const validateForm = (validatedata, index) => {
    let formIsValid = true;
    const newErrors = { ...errors[index] };

    if (!validatedata.name) {
      formIsValid = false;
      newErrors.name = "Pet Name is required.";
    }

    if (!validatedata.dob) {
      formIsValid = false;
      newErrors.dob = "Date of Birth is required.";
    }

    if (!validatedata.breed) {
      formIsValid = false;
      newErrors.breed = "Breed is required.";
    }

    if (!validatedata.gender) {
      formIsValid = false;
      newErrors.gender = "Gender is required.";
    }

    if (!validatedata.city) {
      formIsValid = false;
      newErrors.city = "Location is required.";
    }

    if (!images[index]) {
      formIsValid = false;
      newErrors.image = "Pet Picture is required.";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [index]: newErrors,
    }));
    return formIsValid;
  };
  const capitalizeFirstLetter = (str) => {
    // Check if the input is a string
    if (typeof str !== 'string') return ''; // If not a string, return an empty string
    // Capitalize the first letter and concatenate with the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    profiles.forEach((profile, index) => {
      const isValid = validateForm(profile, index);
      if (!isValid) hasError = true;
    });

    if (hasError) return;
    const ipAddress = await fetchIpAddress();
    let profileAdded = 0;

    for (let i = 0; i < profiles.length; i++) {
      const formData = new FormData();
      formData.append('name', profiles[i].name);
      formData.append('dob', profiles[i].dob);
      formData.append('breed', profiles[i].breed);
      formData.append('gender', profiles[i].gender);
      formData.append('city', profiles[i].city);
      formData.append('ipAddress', ipAddress);
      formData.append('platform', 'web');
      if (images[i]) {
        formData.append('image', images[i]);
      }
      try {
        const postData = {
          url: API_BASE_URL + "users/create-pet-profile",
          postData: formData,
        };

        const response = await postRequest(postData);
        if (response.status === true || response.status === 200) {
          bookingList();
          profileAdded++;
          toast.success('Pet profile created successfully!')
        }
      } catch (error) {
        console.error(`Error submitting profile ${i + 1}: `, error);
      }
    }

    if (profileAdded > 0) {
      setToastMsg(`${profileAdded} out of ${profiles.length} pet profile added!`);
      toast.success('Pet profile created successfully!')
      setProfiles()
    } else {
      setToastMsg(`Failed to add pet profile!`);
      setToastShow(true);
    }
  };

  const handleRepeatToggle = () => {
    setIsRepeatToggled(!isRepeatToggled);
  }; //end
  const store_process = () => {
    // At Home Service Validation
    if (checkoutData?.serviceType === "Home") {
      if (!selectedAddress) {
        toast.error('Please select an address to proceed');
        return;
      } else if (!petData || petData.length === 0) {
        toast.error('Select a pet to continue!');
        return;
      }
    }
  
    // At Institute Service Validation
    if (checkoutData?.serviceType === "Institute" && showPickDrop) {
      if (!selectedAddress) {
        toast.error('Please select an address to proceed');
        return;
      } else if (!petData || petData.length === 0) {
        toast.error('Select a pet to continue!');
        return;
      }else if (isPickDropToggled) {
        if (!pickupTime || pickupTime.length === 0) {
          toast.error('Please select a pickup time to continue!');
           alert("Please select a pickup time to continue!"); // Alert message
          return;
        }else if (pickupType === "") {
          toast.error('Please select either "User location to centre" or "Centre to user location" to proceed');
          return;
        }
      }else if (isPickDropToggled && twoWay === true) {
        if (!dropTime || dropTime.length === 0) {
          toast.error('Please select a drop time to continue!');
           alert("Please select a drop time to continue!"); // Alert message
          return;
        }
      }
    }
    // Additional validation for "At Institute" without Pick & Drop
    if (checkoutData?.serviceType === "Institute") {
      if (!petData || petData.length === 0) {
        toast.error('Select a pet to continue!');
        return;
      }
    }
  
    // Fetch selected address details
    const selectedAddressData = AddressList.find(address => address._id === selectedAddress);
  
    // Prepare checkout data
    const checkoutData1 = {
      petData,
      checkoutData,
      selectedAddressData,
      isPickDropToggled,
      isRepeatToggled,
      pickupType,
      pickupTime,
      dropTime,
      twoWay,
    };
  
  
    // Store the data in sessionStorage
    sessionStorage.setItem("checkoutData1", JSON.stringify(checkoutData1));
  
    // Navigate to the next page
    navigate("/traningchackout_detail");
  };
  

  // const store_process = () => {
  //   // At Home Service Validation
  //   if (checkoutData?.serviceType === "At Home") {
  //     if (!selectedAddress) {
  //       toast.error('Please select an address to proceed');
  //       return;
  //     } else if (!petData || petData.length === 0) {
  //       toast.error('Select a pet to continue!');
  //       return;
  //     }
  //   }
  
  //   // At Institute Service Validation
  //   if (checkoutData?.serviceType === "At Institute" && showPickDrop) {
  //     console.log("Checking Pick & Drop service...");
  //     console.log("isPickDropToggled", isPickDropToggled);
  //     console.log("pickupType", pickupType);
  //     console.log("pickupTime", pickupTime);
  //     console.log("pickupTime length", pickupTime ? pickupTime.length : 0); // Check length safely
  //     console.log("checkoutData?.serviceType", checkoutData?.serviceType);
  //     console.log("showPickDrop", showPickDrop);
  //     if (isPickDropToggled === true) {
  //       if (!pickupTime || pickupTime.length === 0) { // Check if pickupTime is falsy or has length 0
  //         toast.error('Please select a pickup time to proceed');
  //         return;
  //       }
    
  //       // Additional validation for pickupType
  //       if (pickupType === "") {
  //         toast.error('Please select either "User location to centre" or "Centre to user location" to proceed');
  //         return;
  //       }
  //     }
  //     // Pick & Drop Validation
  //     if (!selectedAddress) {
  //       toast.error('Please select an address to proceed');
  //       return;
  //     } else if (!petData || petData.length === 0) {
  //       toast.error('Select a pet to continue!');
  //       return;
  //     } 
    
  //     // Ensure pickupTime is validated only when isPickDropToggled is true
     
  //   }
    
  //   if (checkoutData?.serviceType === "At Institute") {
  //     if (!petData || petData.length === 0) {
  //       toast.error('Select a pet to continue!');
  //       return;
  //     }
  //   }
   
  //   // Fetch selected address details
  //   const selectedAddressData = AddressList.find(address => address._id === selectedAddress);
  
  //   // Prepare checkout data
  //   const checkoutData1 = {
  //     petData,
  //     checkoutData,
  //     selectedAddressData,
  //     isPickDropToggled,
  //     isRepeatToggled,
  //     pickupType,
  //     pickupTime,
  //     dropTime,
  //     twoWay,
  //   };
  
  //   console.log("checkoutData1", checkoutData1);
  
  //   // Store the data in sessionStorage
  //   sessionStorage.setItem("checkoutData1", JSON.stringify(checkoutData1));
  
  //   // Navigate to the next page
  //   navigate("/traningchackout_detail");
  // };
  
  
  
  const add_morehandle = () => {
    setshow_petdetail(true);
  }


  /*********************************************************
  *  This function is use to validate address form data before submit
  *********************************************************/
  const validateFormData = async (formData, index) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberRegex = /^[0-9]+$/;

    if (
      formData.get("firstname") === "undefined" ||
      formData.get("firstname") === null ||
      formData.get("firstname").trim() === ""
    ) {
      setErrors((preError) => ({
        ...preError,
        firstname: "First Name is required",
      }));
      return false;
    } else if (
      formData.get("lastname") === "undefined" ||
      formData.get("lastname") === null ||
      formData.get("lastname").trim() === ""
    ) {
      setErrors((preError) => ({
        ...preError,
        lastname: "Last name is required",
      }));
      return false;
    } else if (
      formData.get("phone") === "undefined" ||
      formData.get("phone") === null ||
      formData.get("phone").trim() === "" ||
      !numberRegex.test(formData.get("phone"))
    ) {
      if (formData.get("phone").trim() === "") {
        setErrors((preError) => ({
          ...preError,
          phone: "Phone number is required",
        }));
      } else {
        setErrors((preError) => ({
          ...preError,
          phone: "Enter a valid mobile number",
        }));
      }
      return false;
    } else if (
      formData.get("email") === "undefined" ||
      formData.get("email") === null ||
      formData.get("email").trim() === "" ||
      !emailRegex.test(formData.get("email"))
    ) {
      if (formData.get("email").trim() === "") {
        setErrors((preError) => ({
          ...preError,
          email: "Email address is required",
        }));
      } else {
        setErrors((prevError) => ({
          ...prevError,
          email: "Enter a valid email address",
        }));
      }
      return false;
    } else if (
      formData.get("city") === "undefined" ||
      formData.get("city") === null ||
      formData.get("city").trim() === ""
    ) {
      setErrors((preError) => ({
        ...preError,
        city: "City is required",
      }))
      return false;
    } else if (
      formData.get("latitude") === "undefined" ||
      formData.get("latitude") === null ||
      formData.get("latitude").trim() === ""
    ) {
      setErrors((preError) => ({
        ...preError,
        city: "latitude is required",
      }))
      return false;
    } else if (
      formData.get("longitude") === "undefined" ||
      formData.get("longitude") === null ||
      formData.get("longitude").trim() === ""
    ) {
      setErrors((preError) => ({
        ...preError,
        city: "longitude is required",
      }))
      return false;
    } else if (
      formData.get("address") === "undefined" ||
      formData.get("address") === null ||
      formData.get("address").trim() === ""
    ) {
      setErrors((preError) => ({
        ...preError,
        address: "Address is required",
      }))
      return false;
    } else if (
      formData.get("building_name") === "undefined" ||
      formData.get("building_name") === null ||
      formData.get("building_name").trim() === ""
    ) {
      setErrors((preError) => ({
        ...preError,
        building_name: "Building Name is required",
      }))
      return false;
    } else if (
      formData.get("apartment_no") === "undefined" ||
      formData.get("apartment_no") === null ||
      formData.get("apartment_no").trim() === ""
    ) {
      setErrors((preError) => ({
        ...preError,
        apartment_no: "Apartment Number is required",
      }))
      return false;
    } else {
      return true;
    }
  }; //End


  /*********************************************************
    *  This function is use to add_newaddreesheandle for pick and drop
    *********************************************************/
  const add_newaddreesheandle = () => {
    setAddNewAddress(true);
  }
  const add_newaddreesheandleinstitute = () => {
    setAddNewAddressinstitute(true);
  }
  const handleDropTimeChange = (event) => {
    setDropTime(event.target.value); // Store drop time
  };
  /*********************************************************
    *  This function is use to handleChnage for add Address
    *********************************************************/
  
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
 
  /*********************************************************
    *  This function is use to handleChnage for add Address
    *********************************************************/
 

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData(e.target);
      
      // Fetch the user's IP address
      const ipAddress = await fetchIpAddress();
      
      // Prepare the updatedFormData with latitude and longitude
      const updatedFormData = {
        ...Object.fromEntries(form.entries()), // Convert FormData to a plain object
        latitude: addNewAddress?.latitude || "", // Add latitude
        longitude: addNewAddress?.longitude || "", // Add longitude
      };
      
      
      // Validate the updated form data
      const isValidate = await validateFormData(form);
      
      if (isValidate) {
        // Add IP address to the updated form data
        updatedFormData.ipAddress = ipAddress;
  
        // Call the addEditAddress function with the updated form data
        const res = await addEditAddress(updatedFormData);
        
        if (res.status === true) {
          setAddNewAddress(res?.result);
          addresslist();
          toast.success('Address saved successfully!');
          
          // Reset the form data
          setAddNewAddress(false);
          setFormData({
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            city: '',
            latitude: '',
            longitude: '',
            building_name: '',
            apartment_no: ''
          });
        } else {
          console.error("Error adding/editing address");
        }
      }
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
    }
  };
  

  const handleAddressSelect = (e, address) => {
    setSelectedAddress(address); 
  }
  const bookingList = async () => {
    setpetDetails([]);
    try {
      const options = {
        type: "",
        condition: {},
        select: {},
        sort: { "_id": -1 },
        page: 1,
        populate: {
          key: "",
          select: " "
        }
      }
      const listData = await petDetails(options);
      if (listData?.status === true) {
        setpetDetails(listData.result)
      }
      // setIsLoading(false);
    } catch (error) {
      console.log("Failed to fetch pet details list: ", error)
    }
  }
  useEffect(() => {
    getList();
    bookingList();
    addresslist();
  }, []);

  const handlePickDropToggle = () => {
    setIsPickDropToggled(!isPickDropToggled);
  }; //end

  const handlePickDrop = () => {
    setshowPickDrop(!showPickDrop);
  }; //end


  const one_sidehandle = () => {
    setSelectedSide('one-side');
    set_toggle(true);
    setsec_toggle(false);
  }; //end

  const second_sidehandle = () => {
    setSelectedSide('two-side');
    if (twoWay) {
      setTwoWay(false);
    } else {
      setTwoWay(true);
    }
    setsec_toggle(true);
    set_toggle(false);
  }; //end

  const handlePickupTypeChange = (event) => {
    setpickupType(event.target.value);
  }; //end

  const handleAddressChange = (index) => {
    setSelectedAddress(ADMININFO[index]);
  }; //end
  const handlePickupTimeChange = (event) => {
    const selectedPickupTime = event.target.value;
    setPickupTime(event.target.value);
    const filteredTimes = availableTimes.filter(item => moment(item.time, 'h:mm A').isAfter(moment(selectedPickupTime, 'h:mm A')));
    setFilteredDropTimes(filteredTimes);
    // Reset drop time if the current drop time is no longer valid
    if (!filteredTimes.some(item => item.time === dropTime)) {
      setDropTime('');
    }
  }; //end
   /*********************************************************
   *  This function is use to fetch appointment time
   *********************************************************/
   const getAppointment = async () => {
    try {
      const selectedDay = moment(checkoutData.selectedDate).format('dddd').toLowerCase(); // Get the day of the week
      // Find the store's opening and closing time for the selected day
      const storeDay = checkoutData.servicesId.store.store_time.find(dayObj => dayObj.day.toLowerCase() === selectedDay);
  
        const options = {
          openTime: storeDay.open_time,  // Store's opening time for the day
          closeTime: storeDay.close_time // Store's closing time for the day
        };
      const appointmentTime = await timeSlot(options);
      if (appointmentTime?.status === true) {

        
       
        setAvailableTimes(appointmentTime?.result || []);
      } else {
        setAvailableTimes([]);
      }
    } catch (error) {
      console.log("Failed to fetch appointment time", error);
      setAvailableTimes([]);
    }
  }; //end
  useEffect(() => {
    if (checkoutData) {
      getAppointment();
    }
 
  }, [checkoutData]); //end
  useEffect(() => {
    const userinfo = JSON.parse(sessionStorage.getItem("USER-INFO"));
    setUserinfo(userinfo);
    if (userinfo) {
      const currentUser = userinfo._id;
      const fetchAdminInfo = async () => {
        try {
          const data = await getAdminInfo({
            condition: { userData: currentUser },
          });

          if (data.status && data.result.length > 0) {
            setAdminInfo(data.result);
          }
        } catch (error) {
          console.error("Error fetching admin info:", error);
        }
      };

      fetchAdminInfo();
      getList();
      const savedPet = Cookies.get("selectedPet");
      if (savedPet) {
        setPetData(JSON.parse(atob(savedPet)));
      }
      const savedBookingData = Cookies.get("bookingData");
      if (savedBookingData) {
        setBookingData(JSON.parse(atob(savedBookingData)));
      }
    }
  }, []); //end
  return (
    <>
      <Header />
      <div className="container my-4 mt-5">
        <div className="row">
          <div className="col-md-8">
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

            <div className="pet_details_info">
              <div className="add_new_info">
                <p>Pet Details</p>
                <button className="add_new_pet" onClick={add_morehandle}>Add New Pet</button>
              </div>
              <div className="pet_slides">
                <Pet_infoslider
                  petData={petData}
                  setPetData={setPetData}
                  petDetail={petDetail}
                />
              </div>
            </div>


            {(show_petdetail || petData.length === 0) && (
              <>
                {profiles?.map((profile, index) => (
                  <div key={index} className="create_pet_profile_main_section mt-4">
                    <div className="row cretae_pet_profile_form_div_sec">
                      <div className="col-lg-9">
                        <h4>Add Pets Details</h4>
                        <form onSubmit={(e) => handleSubmit(e, index)}>
                          <div className="row mb-3">
                            <div className="col-md-6 mb-3 mb-md-0 create_pet_for_profile_input">
                              <input
                                type="text"
                                className="form-control store_input_field_field_for_Create_pet"
                                placeholder="Pet Name"
                                name="name"
                                onChange={(e) => handleChange(index, e)}
                                value={profile?.name || ""}
                              />
                              {errors[index]?.name && (
                                <span className="text-danger">
                                  {errors[index].name}
                                </span>
                              )}
                            </div>
                            <div className="col-md-6 create_pet_for_profile_input">
                              <input
                                type="date"
                                className="form-control store_input_field_field_for_Create_pet"
                                placeholder="Pet Age"
                                name="dob"
                                onChange={(e) => handleChange(index, e)}
                                value={profile?.dob || ""}
                              />
                              {errors[index]?.dob && (
                                <span className="text-danger">
                                  {errors[index].dob}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-md-6 mb-3 mb-md-0 create_pet_for_profile_input">
                              <select
                                className="form-control store_input_field_field_for_Create_pet"
                                name="breed"
                                onChange={(e) => handleChange(index, e)}
                                value={profile?.breed || ""}
                              >
                                <option value="">Select Breed</option>
                                {breeds.map((breed, i) => (
                                  <option key={i} value={breed}>
                                    {breed}
                                  </option>
                                ))}
                              </select>
                              {errors[index]?.breed && (
                                <span className="text-danger">
                                  {errors[index].breed}
                                </span>
                              )}
                            </div>
                            <div className="col-md-6 create_pet_for_profile_input">
                              <select
                                name="gender"
                                onChange={(e) => handleChange(index, e)}
                                className="form-control store_input_field_field_for_Create_pet"
                                value={profile?.gender || ""}
                              >
                                <option value="">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                              {errors[index]?.gender && (
                                <span className="text-danger">
                                  {errors[index].gender}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-12 create_pet_for_profile_input">
                              <input
                                type="text"
                                className="form-control store_input_field_field_for_Create_pet"
                                placeholder="Location"
                                name="city"
                                onChange={(e) => handleChange(index, e)}
                                value={profile?.city || ""}
                              />
                              {errors[index]?.city && (
                                <span className="text-danger">
                                  {errors[index].city}
                                </span>
                              )}
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="col-lg-3">
                        <div className="upload_container d-flex justify-content-center align-items-center">
                          <div
                            className="upload_box d-flex flex-column justify-content-center align-items-center"
                            onClick={() => handleClick(index)}
                          >
                            <input
                              type="file"
                              ref={(el) => (fileInputRef.current[index] = el)}
                              name="image"
                              accept="image/*"
                              onChange={(e) => handleImageChange(index, e)}
                              style={{ display: "none" }}
                            />
                            {imagePreviews[index] ? (
                              <img
                                src={imagePreviews[index]}
                                alt="Pet"
                                className="img-fluid mt-3 rounded-lg"
                                style={{
                                  maxHeight: "150px",
                                  maxWidth: "100%",
                                }}
                              />
                            ) : (
                              <>
                                <div className="upload_icon">
                                  <GoPlus className="upload_icon" />
                                </div>
                                <div className="upload_text">
                                  Upload <br />
                                  Pet Picture
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        {errors[index]?.image && (
                          <span className="text-danger">
                            {errors[index].image}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="login_user_otp_for_bottom_button_create_pet">
                  {/* <button
                    onClick={addProfile}
                    className="btn btn-outline-danger user_otp_second"
                  >
                    + Add More Pets
                  </button> */}
                  <button onClick={handleSubmit} className="btn btn-danger btn-lg  user_otp_first">
                    Submit
                  </button>
                  <ToastContainer />
                </div>
              </>
            )}

            <div className="pet_details_info mt-4">
              <p>Pet Owner Details</p>
              <div className="more_info">
                <div>
                    <li><span><FaLocationDot /></span><p>{userInfo.address || "C-25 MiQB Building , Sector 58, Noida, Uttar Pradesh 201309"}</p></li>
                    <h1>{capitalizeFirstLetter(userInfo?.name)}</h1>
                  <ul>
                    <li><span><MdCall /></span><p>{userInfo.phone}</p></li>
                    <li><span><FaEnvelope></FaEnvelope></span><p>{userInfo.email}</p></li>
                    <li><span><FaLocationDot /></span><p>{(userInfo.address) || "C-25 MiQB Building , Sector 58, Noida, Uttar Pradesh 201309"}</p></li>
                    {/* <li><span><FaLocationDot /></span>  <p className="mx-0"><Link to={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
                      target="_blank"
                      rel="noopener noreferrer">
                    </Link>
                      {userInfo?.address  || "C-25 MiQB Building , Sector 58, Noida, Uttar Pradesh 201309"}</p></li> */}
                  </ul>
                </div>

              </div>
            </div>


            {checkoutData?.serviceType === "Home" && (
              <>
                <div className="store_process_payement_deatils_heading mt-4">
                  <div className="d-flex justify-content">
                    <div>
                      <h6 className="mb-0 mt-2">Select Pick up & drop Address</h6>
                    </div>
                    <div>
                    {AddressList.length < 5 && (
                      <button className="add_new_address mb-0" onClick={add_newaddreesheandle}>Add A New Address</button>
                    )}
                    </div>
                  </div>
                </div>
                {addNewAddress &&
                   <div className="addnew_address my-4" id="saveNewAddress">
                   <form onSubmit={handleSubmit2}>
                     <div className="row">
                       <div className="col-md-4">
                         <input type="text" name="firstname"   value={formData.firstname} onChange={handleChange2} placeholder="First Name" className="form-field"></input>
                         {errors.firstname ? (<p style={{ color: "red" }}>{errors.firstname}</p>) : ("")}
                       </div>
                       <div className="col-md-4">
                         <input type="text" name="lastname"   value={formData.lastname}  onChange={handleChange2} placeholder="Last Name" className="form-field"></input>
                         {errors.lastname ? (<p style={{ color: "red" }}>{errors.lastname}</p>) : ("")}
                       </div>
                       <div className="col-md-4">
                         <input type="tel" name="phone"   value={formData.phone} onChange={handleChange2} placeholder="Mobile Number" className="form-field"></input>
                         {errors.phone ? (<p style={{ color: "red" }}>{errors.phone}</p>) : ("")}
                       </div>
                       <div className="col-md-8">
                         <input type="email" name="email"   value={formData.email} onChange={handleChange2} placeholder="Email Address" className="form-field"></input>
                         {errors.email ? (<p style={{ color: "red" }}>{errors.email}</p>) : ("")}
                       </div>
                      
                       <div className="col-md-4" >
                         <input type="text" name="city"   value={formData.city}   onChange={handleChange2} placeholder="City" className="form-field"></input>
                         {errors.city ? (<p style={{ color: "red" }}>{errors.city}</p>) : ("")}
                       </div>
                       <div className="col-md-6" >
                         <input type="number" name="latitude" value={addNewAddress?.latitude} onChange={handleChange2} placeholder="Address latitude" className="form-field"></input>
                         {errors.latitude ? (<p style={{ color: "red" }}>{errors.latitude}</p>) : ("")}
                       </div>
                       <div className="col-md-6" >
                         <input type="number" name="longitude" value={addNewAddress?.longitude} onChange={handleChange2} placeholder="Address longitude" className="form-field"></input>
                         {errors.longitude ? (<p style={{ color: "red" }}>{errors.longitude}</p>) : ("")}
                       </div>
                       <MapComponent setAddNewAddress={setAddNewAddress} />
                       <div className="col-md-16">
                         <LocationMap latitude={addNewAddress?.latitude} longitude={addNewAddress?.longitude} setAddNewAddress={setAddNewAddress} />
                       </div>
                       <div className="col-md-12">
                         <input type="text" name="building_name" onChange={handleChange2} value={formData.building_name} placeholder="Building Name" className="form-field"></input>
                         {errors.building_name ? (<p style={{ color: "red" }}>{errors.building_name}</p>) : ("")}
                       </div>
                       <div className="col-md-12">
                         <input type="text" name="apartment_no" onChange={handleChange2} value={formData.apartment_no} placeholder="Apartment / Villa Name" className="form-field"></input>
                         {errors.apartment_no ? (<p style={{ color: "red" }}>{errors.apartment_no}</p>) : ("")}
                       </div>
                       <div className="col-md-12">
                         <div className="login_user_otp_for_bottom_button_create_pet">
                           <button
                             type="submit"
                             className="btn btn-danger btn-lg user_otp_first"
                           >
                             Submit
                           </button>
                          
                         </div>
                       
                       </div>
                     </div>
                     <ToastContainer />
                   </form>
                 </div>
                }
                {AddressList.length > 0 ? (
                  AddressList.map((item, index) => (
                    <div className="addnew_address mb-3" id="addressList" key={index}>
                      <div>
                       
                         <input type="radio" name="address" checked={selectedAddress === item._id}
                          onChange={() => setSelectedAddress(item._id)} />
                        <span>{`Address ${index + 1}`}</span>
                      </div>
                      <p>{`${capitalizeFirstLetter(item.firstname)} ${capitalizeFirstLetter(item.lastname)}, ${item.phone}, ${item.email}, ${capitalizeFirstLetter(item.apartment_no)}, ${capitalizeFirstLetter(item.building_name)},  ${capitalizeFirstLetter(item.address)} ${capitalizeFirstLetter(item.city)},`}</p>
                    </div>
                  ))
                ) : (
                  // <p>No addresses available</p>
                  ""
                )}
              </>
            )}


              {checkoutData?.serviceType === "Institute" && (
                <div className="pet_details_info mt-4">
                    <div className="d-flex justify-content">
                      <p>Need Pickup & Drop</p>
                      <div className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={isPickDropToggled}
                          name="pickDrop"
                          onClick={() => {
                            handlePickDropToggle();
                            handlePickDrop();
                          }}
                          className="toggle-switch-checkbox"
                          id={`toggle-pick-drop`}
                        />
                        <label
                          className="toggle-switch-label"
                          htmlFor={`toggle-pick-drop`}
                        >
                          <span className="toggle-switch-inner" />
                          <span className="toggle-switch-switch" />
                        </label>
                      </div>
                    </div>
                    {showPickDrop && (
                      <div pet_details_info mt-4>
                        <hr className="mt-0"></hr>
                        <div className="d-flex justify-content">
                          <p>Select Pickup Way</p>
                          <div>
                          <button
        className="one_sides"
        onClick={one_sidehandle}
        style={{
          backgroundColor: selectedSide === 'one-side' ? 'red' : 'white', // Red if selected, white if not
          color: selectedSide === 'one-side' ? 'white' : 'black', // Ensure text color visibility
        }}
      >
                              One - Side
                            </button>
                            <button
        className="one_sides"
        onClick={second_sidehandle}
        style={{
          backgroundColor: selectedSide === 'two-side' ? 'red' : 'white', // Red if selected, white if not
          color: selectedSide === 'two-side' ? 'white' : 'black', // Ensure text color visibility
        }}
      >
                              Two - Side
                            </button>
                          </div>
                        </div>
      
                        {toggle && (
                          <>
                            <div className="location_es">
                              <div className="location_Center">
                                <input
                                  type="radio"
                                  name="location_option"
                                  value="User location to centre"
                                  onChange={handlePickupTypeChange}
                                  checked={pickupType === "User location to centre"}
                                />
                                <p>User location to centre</p>
                              </div>
                              <div className="location_Center">
                                <input
                                  type="radio"
                                  name="location_option"
                                  value="Centre to user location"
                                  onChange={handlePickupTypeChange}
                                  checked={pickupType === "Centre to user location"}
                                />
                                <p>Centre to user location</p>
                              </div>
                            </div>
      
                            <div className="store_process_payement_deatils_heading mt-4">
                              <div className="d-flex justify-content">
                                <div>
                                  <h6 className="mb-0 mt-2">
                                    Select Pick up & drop Address
                                  </h6>
                                </div>
                                <div>
                                 {AddressList.length < 5 && ( 
                                  <button
                                    className="add_new_address mb-0"
                                    onClick={add_newaddreesheandleinstitute}
                                  >
                                    Add A New Address
                                  </button>
                                 )} 
                                </div>
                              </div>
      
                              <hr></hr>
                            </div>
      
                            {addNewAddressinstitute && (
                              <>
                               <div className="addnew_address my-4" id="saveNewAddress">
                   <form onSubmit={handleSubmit2}>
                     <div className="row">
                       <div className="col-md-4">
                         <input type="text" name="firstname" onChange={handleChange2} placeholder="First Name" className="form-field"></input>
                         {errors.firstname ? (<p style={{ color: "red" }}>{errors.firstname}</p>) : ("")}
                       </div>
                       <div className="col-md-4">
                         <input type="text" name="lastname" onChange={handleChange2} placeholder="Last Name" className="form-field"></input>
                         {errors.lastname ? (<p style={{ color: "red" }}>{errors.lastname}</p>) : ("")}
                       </div>
                       <div className="col-md-4">
                         <input type="tel" name="phone" onChange={handleChange2} placeholder="Mobile Number" className="form-field"></input>
                         {errors.phone ? (<p style={{ color: "red" }}>{errors.phone}</p>) : ("")}
                       </div>
                       <div className="col-md-8">
                         <input type="email" name="email" onChange={handleChange2} placeholder="Email Address" className="form-field"></input>
                         {errors.email ? (<p style={{ color: "red" }}>{errors.email}</p>) : ("")}
                       </div>
                     
                       <div className="col-md-4" >
                         <input type="text" name="city" value={addNewAddress?.city}  onChange={handleChange2} placeholder="City" className="form-field"></input>
                         {errors.city ? (<p style={{ color: "red" }}>{errors.city}</p>) : ("")}
                       </div>
                       <div className="col-md-6" >
                         <input type="number" name="latitude" value={addNewAddress?.latitude} onChange={handleChange2} placeholder="Address latitude" className="form-field"></input>
                         {errors.latitude ? (<p style={{ color: "red" }}>{errors.latitude}</p>) : ("")}
                       </div>
                       <div className="col-md-6" >
                         <input type="number" name="longitude" value={addNewAddress?.longitude} onChange={handleChange2} placeholder="Address longitude" className="form-field"></input>
                         {errors.longitude ? (<p style={{ color: "red" }}>{errors.longitude}</p>) : ("")}
                       </div>
                       <MapComponent setAddNewAddress={setAddNewAddress} />
                       <div className="col-md-16">
                         <LocationMap latitude={addNewAddress?.latitude} longitude={addNewAddress?.longitude} setAddNewAddress={setAddNewAddress} />
                       </div>
                       <div className="col-md-12">
                         <input type="text" name="building_name" onChange={handleChange2} placeholder="Building Name" className="form-field"></input>
                         {errors.building_name ? (<p style={{ color: "red" }}>{errors.building_name}</p>) : ("")}
                       </div>
                       <div className="col-md-12">
                         <input type="text" name="apartment_no" onChange={handleChange2} placeholder="Apartment / Villa Name" className="form-field"></input>
                         {errors.apartment_no ? (<p style={{ color: "red" }}>{errors.apartment_no}</p>) : ("")}
                       </div>
                       <div className="col-md-12">
                         <div className="login_user_otp_for_bottom_button_create_pet">
                           <button
                             type="submit"
                             className="btn btn-danger btn-lg user_otp_first"
                           >
                             Submit
                           </button>
                           <ToastContainer />
                         </div>
                       </div>
                     </div>
                   </form>
                 </div>
                              </>
                            )}
                            <div>
                              {/* Mapping over the adminInfo array to display all the addresses */}
                              {AddressList.length > 0 ? (
                  AddressList.map((item, index) => (
                    <div className="addnew_address mb-3" id="addressList" key={index}>
                      <div>
                        {/* <input type="radio" 
                        name="selectedAddress" 
                         value={item?._id} 
                        // onChange={(e) => handleAddressSelect(e, item)}
                        onChange={() => setSelectedAddress(item._id)} 
                        checked = {selectedAddress?._id ===item?._id}
                        /> */}
                         <input type="radio" name="address" checked={selectedAddress === item._id}
                          onChange={() => setSelectedAddress(item._id)} />
                        <span>{`Address ${index + 1}`}</span>
                      </div>
                      <p>{`${capitalizeFirstLetter(item.firstname)} ${capitalizeFirstLetter(item.lastname)}, ${item.phone}, ${item.email}, ${capitalizeFirstLetter(item.apartment_no)}, ${capitalizeFirstLetter(item.building_name)},  ${capitalizeFirstLetter(item.address)} ${capitalizeFirstLetter(item.city)},`}</p>
                      </div>
                  ))
                ) : (
                  // <p>No addresses available</p>
                  ""
                )}
                            </div>
      
                            <div className="store_process_payement_deatils_heading mt-4">
                              {/* Pickup Time Input */}
                              <div className="time_pipckup">
                                <h6 className="mb-0 mt-2">Pickup Time From User</h6>
                                <select
                                  className="create_pet_for_gender_in_login"
                                  id="pickup-time"
                                  name="pickup-time"
                                  value={pickupTime}
                                  onChange={handlePickupTimeChange}
                                  placeholder="Select pickup time from user"
                                  disabled={!availableTimes.length}
                                >
                                  <option value="">Select Time</option>
                                  {availableTimes.map((item, index) => (
                                    <option key={index} value={item.time}>
                                      {item.time}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </>
                        )}
      
                        {sec_oggle && (
                          <>
                            <div className="store_process_payement_deatils_heading mt-4">
                              <div className="d-flex justify-content">
                                <div>
                                  <h6 className="mb-0 mt-2">
                                    Select Pick up & drop Address
                                  </h6>
                                </div>
                                <div>
                                {AddressList.length < 5 && (
                                  <button
                                    className="add_new_address mb-0"
                                    onClick={add_newaddreesheandleinstitute}
                                  >
                                    Add A New Address
                                  </button>
                                )}
                                </div>
                              </div>
      
                              <hr></hr>
                            </div>
      
                            {addNewAddressinstitute && (
                             <div className="addnew_address my-4" id="saveNewAddress">
                             <form onSubmit={handleSubmit2}>
                               <div className="row">
                                 <div className="col-md-4">
                                   <input type="text" name="firstname" onChange={handleChange2} placeholder="First Name" className="form-field"></input>
                                   {errors.firstname ? (<p style={{ color: "red" }}>{errors.firstname}</p>) : ("")}
                                 </div>
                                 <div className="col-md-4">
                                   <input type="text" name="lastname" onChange={handleChange2} placeholder="Last Name" className="form-field"></input>
                                   {errors.lastname ? (<p style={{ color: "red" }}>{errors.lastname}</p>) : ("")}
                                 </div>
                                 <div className="col-md-4">
                                   <input type="tel" name="phone" onChange={handleChange2} placeholder="Mobile Number" className="form-field"></input>
                                   {errors.phone ? (<p style={{ color: "red" }}>{errors.phone}</p>) : ("")}
                                 </div>
                                 <div className="col-md-8">
                                   <input type="email" name="email" onChange={handleChange2} placeholder="Email Address" className="form-field"></input>
                                   {errors.email ? (<p style={{ color: "red" }}>{errors.email}</p>) : ("")}
                                 </div>
                                 {/* <div className="col-md-4" >
                                   <input type="text" name="city" onChange={handleChange2} placeholder="City" className="form-field"></input>
                                   {errors.city ? (<p style={{ color: "red" }}>{errors.city}</p>) : ("")}
                                 </div> */}
                                 <div className="col-md-4" >
                                   <input type="text" name="city" value={addNewAddress?.city}  onChange={handleChange2} placeholder="City" className="form-field"></input>
                                   {errors.city ? (<p style={{ color: "red" }}>{errors.city}</p>) : ("")}
                                 </div>
                                 <div className="col-md-6" >
                                   <input type="number" name="latitude" value={addNewAddress?.latitude} onChange={handleChange2} placeholder="Address latitude" className="form-field"></input>
                                   {errors.latitude ? (<p style={{ color: "red" }}>{errors.latitude}</p>) : ("")}
                                 </div>
                                 <div className="col-md-6" >
                                   <input type="number" name="longitude" value={addNewAddress?.longitude} onChange={handleChange2} placeholder="Address longitude" className="form-field"></input>
                                   {errors.longitude ? (<p style={{ color: "red" }}>{errors.longitude}</p>) : ("")}
                                 </div>
                                 <MapComponent setAddNewAddress={setAddNewAddress} />
                                 <div className="col-md-16">
                                   <LocationMap latitude={addNewAddress?.latitude} longitude={addNewAddress?.longitude} setAddNewAddress={setAddNewAddress} />
                                 </div>
                                 <div className="col-md-12">
                                   <input type="text" name="building_name" onChange={handleChange2} placeholder="Building Name" className="form-field"></input>
                                   {errors.building_name ? (<p style={{ color: "red" }}>{errors.building_name}</p>) : ("")}
                                 </div>
                                 <div className="col-md-12">
                                   <input type="text" name="apartment_no" onChange={handleChange2} placeholder="Apartment / Villa Name" className="form-field"></input>
                                   {errors.apartment_no ? (<p style={{ color: "red" }}>{errors.apartment_no}</p>) : ("")}
                                 </div>
                                 <div className="col-md-12">
                                   <div className="login_user_otp_for_bottom_button_create_pet">
                                     <button
                                       type="submit"
                                       className="btn btn-danger btn-lg user_otp_first"
                                     >
                                       Submit
                                     </button>
                                     <ToastContainer />
                                   </div>
                                 </div>
                               </div>
                             </form>
                           </div>
                            )}
                            {/* Mapping over the adminInfo array to display all the addresses */}
                            {AddressList.length > 0 ? (
                  AddressList.map((item, index) => (
                    <div className="addnew_address mb-3" id="addressList" key={index}>
                      <div>
                         <input type="radio" name="address" checked={selectedAddress === item._id}
                          onChange={() => setSelectedAddress(item._id)} />
                        <span>{`Address ${index + 1}`}</span>
                      </div>
                      <p>{`${capitalizeFirstLetter(item.firstname)} ${capitalizeFirstLetter(item.lastname)}, ${item.phone}, ${item.email}, ${capitalizeFirstLetter(item.apartment_no)}, ${capitalizeFirstLetter(item.building_name)},  ${capitalizeFirstLetter(item.address)} ${capitalizeFirstLetter(item.city)},`}</p>
                      </div>
                  ))
                ) : (
                  // <p>No addresses available</p>
                  ""
                )}
      
                            <div className="store_process_payement_deatils_heading mt-4">
                              <div className="d-flex">
                                {/* Pickup Time Input */}
                                <div className="time_pipckup">
                                  <h6 className="mb-0 mt-2">Pickup Time From User</h6>
                                  <select
                                    className="create_pet_for_gender_in_login"
                                    id="pickup-time"
                                    name="pickup-time"
                                    value={pickupTime}
                                    onChange={handlePickupTimeChange}
                                    placeholder="Select pickup time from user"
                                    disabled={!availableTimes.length}
                                  >
                                    <option value="">Select Time</option>
                                    {availableTimes.map((item, index) => (
                                      <option key={index} value={item.time}>
                                        {item.time}
                                      </option>
                                    ))}
                                  </select>
                                </div>
      
                                {/* Drop Time Input */}
                                <div className="time_pipckup">
                                  <h6 className="mb-0 mt-2">Drop Time From User</h6>
                                  <select
            className="create_pet_for_gender_in_login"
            id="drop-time"
            name="drop-time"
            value={dropTime}
            onChange={handleDropTimeChange}
            placeholder="Select drop time from user"
            disabled={!filteredDropTimes.length}
          >
            <option value="">Select Time</option>
            {filteredDropTimes.map((item, index) => (
              <option key={index} value={item.time}>
                {item.time}
              </option>
            ))}
          </select>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                   )}
          </div>
        
          <div className="col-md-4">
            <div class="store_process_card_name"><span class="font-weight-bold">Selected Service</span></div>
            <div className="grooming_box">
              <div className="d-flex">
                <div>
                  <img src={`${ASSETS_BASE_URL}${checkoutData?.servicesId?.image}`} alt={checkoutData?.servicesId?.image} />
                  <p></p>
                </div>
                <div className="personal_details_petinfo">
                  <h2>{checkoutData?.servicesId?.name}</h2>
                  <p>{checkoutData?.servicesId?.details.length > 20 ? `(${checkoutData?.servicesId?.details.substring(0, 20)})...` : checkoutData?.servicesId?.details}</p>
                  <h4>AED {checkoutData?.servicesId?.price?.toFixed(2)}</h4>
                </div>
              </div>
              <div className="pet_details_info mt-0">
                <h2>Booking Details</h2>
                <ul className="date_time">
                  <li><p>Date :</p> <span>{moment(checkoutData?.selectedDate).format('DD-MM-YYYY')}</span></li>
                  <li><p>Time :  </p> <span>{checkoutData?.selectedAvailableTimes}</span></li>
                </ul>
              </div>

              <div className="pet_details_info">
                <div>
                  <div className="d-flex">
                    <div>
                      <div className="add_review">
                        <RatingsStar rating={checkoutData?.servicesId?.rating} />
                        <span>{checkoutData?.servicesId?.rating}</span>
                      </div>
                      <h2 className="pet_name">{checkoutData?.servicesId?.store?.shop_name}</h2>
                    </div>
                    <div>
                      <img src={`${ASSETS_BASE_URL}${checkoutData?.servicesId?.store?.image}`} alt={checkoutData?.servicesId?.store?.image} className="testnominal_img mx-0" />
                    </div>
                  </div>
                  <div className="d-flex mt-3">
                    <Link
                      to={`https://www.google.com/maps/dir/?api=1&destination=${checkoutData?.servicesId?.branch?.latitude},${checkoutData?.servicesId?.branch?.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="location_icon">
                        <FaLocationDot />
                      </span>
                      <p className="location_view">
                        {checkoutData?.servicesId?.branch?.address}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
              <div>
              </div>
            </div>
            <div className="login_user_otp_for_bottom_button mt-4">
              <button className="btn btn-danger btn-lg mb-3 user_otp_first" onClick={store_process}>
                Proceed to Order
              </button>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default TrainingPersonal_details;


