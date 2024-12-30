import React, { useState, useRef, useEffect } from "react";
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Header from "../../../../components/Header";
import { GoPlus } from "react-icons/go";
import { MdCall } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import Pet_infoslider from "../../Grooming/serviceType/pet_infoslider.js";
import Footer from "../../../../components/Footer";
import DatePicker from "react-datepicker";
import moment from "moment";
import "../../Grooming/grooming.css";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAdminInfo } from "../../../../controllers/booking/groomingBooking";
import { postRequest } from "../../../../controllers/API.js";
import RatingsStar from "../../../../components/RatingsStar";
import { ASSETS_BASE_URL } from "../../../../config/constants";
import { API_BASE_URL } from "../../../../config/constants.js";
import { breedList, addEditAddress} from "../../../../controllers/accounts/Account.js";
import { fetchIpAddress } from "../../../../controllers/API";
import { timeSlot } from "../../../../controllers/services/dayCareController.js";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MapComponent from "../../../Map/MapComponent.js";
import LocationMap from "../../../Map/LocationMap.js";

const Daycareservice = () => {
  const [isRepeatToggled, setIsRepeatToggled] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [show_petdetail, setshow_petdetail] = useState(false);
  const [addPet, setAddPet] = useState(false);
  const [add_newaddress, setadd_newaddress] = useState(false);
  const [showRepeat, setshowRepeat] = useState(false);
  const [showPickDrop, setshowPickDrop] = useState(false);
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);
  const [ADMININFO, setAdminInfo] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const location = useLocation();
  const { state } = location;
  const [userinfo, setUserinfo] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([null]);
  const [petData, setPetData] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [pickupType, setpickupType] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [twoWay, setTwoWay] = useState(false);
  const [toggle, set_toggle] = useState(false);
  const [sec_oggle, setsec_toggle] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [isPickDropToggled, setIsPickDropToggled] = useState(false);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [availableTimes, setAvailableTimes] = useState([]);
  const [file, setFile] = useState(null);
  const [images, setImages] = useState({});
  const [preview, setPreview] = useState("");
  const [profiles, setProfiles] = useState([
    { name: "", dob: "", breed: "", gender: "", city: "" },
  ]);
  const [errors, setErrors] = useState({});
  const [toastshow, setToastShow] = useState(false);
  const [toastmsg, setToastMsg] = useState("");
  const [addNewAddress, setAddNewAddress] = useState(false);
  const fileInputRef = useRef([]);

  
  /*********************************************************
   *  This function is use tocapitalizeFirstLetter
   *********************************************************/
  const capitalizeFirstLetter = (str) => {
    // Check if the input is a string
    
    if (typeof str !== 'string') return ''; // If not a string, return an empty string
    // Capitalize the first letter and concatenate with the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  /*********************************************************
   *  Store the selected address data in the state
   *********************************************************/
  const handleAddressChange = (index) => {
    setSelectedAddress(ADMININFO[index]);
  }; //end

  /*********************************************************
   *  Update the state with the selected option
   *********************************************************/
  const handlePickupTypeChange = (event) => {
    setpickupType(event.target.value);
  }; //end

  /*********************************************************
   *  Reset end date if it's before start date
   *********************************************************/
  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date && moment(date).isAfter(endDate)) {
      setEndDate(null);
    }
  }; //end

  /*********************************************************
   *  This function is use to handle end date
   *********************************************************/
  const handleEndDateChange = (date) => {
    setEndDate(date);
  }; //end

  /*********************************************************
   *  This function is use to handle the change for pickup time
   *********************************************************/
  const handlePickupTimeChange = (event) => {
    setPickupTime(event.target.value);
  }; //end

  /*********************************************************
   *  This function is use to handle the change for pickup time
   *********************************************************/
  const handleDropTimeChange = (event) => {
    setDropTime(event.target.value);
  }; //end

  /*********************************************************
   *  This function is use to handle add more pet profile
   *********************************************************/
  const add_morehandle = () => {
    setAddPet(!addPet);
  }; //end

  /*********************************************************
   *  This function is use to handle repeat component part
   *********************************************************/
  const handleRepeat = () => {
    setIsRepeatToggled(!isRepeatToggled);
    setshowRepeat(!showRepeat);
  }; //end

  /*********************************************************
   *  This function is use to show pickand drop component
   *********************************************************/
  const handlePickDrop = () => {
    setIsPickDropToggled(!isPickDropToggled);
    setshowPickDrop(!showPickDrop);
    setTwoWay(!twoWay);
    setPickupTime("");
    setSelectedAddress(null);
    setDropTime("");
  }; //end

  /*********************************************************
   *  This function is use to handle click
   *********************************************************/
  const handleClick = (index) => {
    fileInputRef.current[index].click();
  }; //end

  /*********************************************************
   *  This function is use to handle add new address
   *********************************************************/
  const add_newaddreesheandle = () => {
    setadd_newaddress(!add_newaddress);
  }; //end

  /*********************************************************
   *  This function is use to toggle Day in repeat days
   *********************************************************/
  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  }; //end

  /*********************************************************
   *  This function is use to get boolean on One-way toggle
   *********************************************************/
  const one_sidehandle = () => {
    set_toggle(!toggle);
    setTwoWay(false);
    setsec_toggle(false); // Set the secondary toggle to false
  }; //end

  /*********************************************************
   *  This function is use to set boolean on two-way toggle
   *********************************************************/
  const second_sidehandle = () => {
    setTwoWay(true); // Toggle the `twoWay` boolean directly
    setsec_toggle(true); // Set the secondary toggle to true
    set_toggle(false); // Set the primary toggle to false
    setpickupType("");
  }; //end

  /*********************************************************
   *  This function is use to fetch appointment time
   *********************************************************/
  const getAppointment = async () => {
    try {
      const options = {
        openTime: bookingData?.openTime,
        closeTime: bookingData?.closeTime,
      };
      const appointmentTime = await timeSlot(options);
      if (appointmentTime?.status === true) {
        console.log(appointmentTime?.result, "here is thetime");

        setAvailableTimes(appointmentTime?.result || []);
      } else {
        setAvailableTimes([]);
      }
    } catch (error) {
      console.log("Failed to fetch appointment time", error);
      setAvailableTimes([]);
    }
  }; //end

  /*****************************************************************************
   *  This function is use to get breed list for pet form
   ********************************************************************************/
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
  }; //end


  /*****************************************************************************
   *  This function is use to  Handle Data required to get before entering checkout
   ********************************************************************************/
  const store_process = (e) => {
    e.preventDefault();
    Cookies.remove("pickupInfo", { path: "/" });
    Cookies.remove("selectedPet", { path: "/" });

    // Validate if petData is available and not empty
    if (!petData || Object.keys(petData).length === 0) {
      alert("please select or add a Pet");
      return; // Ensure immediate return after toast
    }

    // If isPickDropToggled is true, validate pickup details
    if (isPickDropToggled) {
      if (!selectedAddress) {
        // toast.warn("Please select Pickup/Drop Address");
        alert("Please select Pickup/Drop Address");
        return false; // Ensure immediate return after toast
      }
      if(toggle){
      if (!pickupType) {
        alert("Please select Pickup Way");
        // toast.warn("Please select Pickup Type");
        return false; // Ensure immediate return after toast
      }
      
    }else{
      if(!dropTime){
        alert("Please select Drop Time");
      }
    }
      if (!pickupTime) {
        alert("Please select Pickup Time");
        // toast.warn("Please select Pickup and Drop Time");
        return false; // Ensure immediate return after toast
      }
    }

    // Prepare the data for pickupInfo based on isPickDropToggled
    const pickupInfo = {
      isPickDropToggled: isPickDropToggled || false,
      isRepeatToggled: isRepeatToggled || false,
      petData: petData || {},
    };

    // If isPickDropToggled is true, add the extra fields to pickupInfo
    if (isPickDropToggled) {
      pickupInfo.pickupDropAddress = selectedAddress || "";
      pickupInfo.pickupType = pickupType || "";
      pickupInfo.pickupTime = pickupTime || "";
      pickupInfo.dropTime = dropTime || "";
      pickupInfo.twoWay = twoWay || false;
    }

    console.log(pickupInfo, "here is the pickup info");
    
    // Store pickupInfo in cookies for persistence
    const encodedPickupInfo = btoa(JSON.stringify(pickupInfo));
    const oneHourFromNow = 1 / 24; // Expires in 1 hour
    Cookies.set("pickupInfo", encodedPickupInfo, { expires: oneHourFromNow });
    navigate("/services/day-care/pick-drop/checkout");
  }; //end

  /*****************************************************************
   *  This function is use to  Handle image input (outside the form)
   ******************************************************************/
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
      [index]: { ...prevErrors[index], image: "" },
    }));
  }; //end

  /*********************************************************
   *  This function is use to handleChnage for add pet
   *********************************************************/
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProfiles = [...profiles];
    updatedProfiles[index][name] = value;
    setProfiles(updatedProfiles);

    // Clear any existing errors for this field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [index]: { ...prevErrors[index], [name]: "" },
    }));
  }; //end

  /*********************************************************
   *  This function is use to handleChnage for add Address
   *********************************************************/
  const handleChange2 = (e) => {
    const { name } = e.target;
    setErrors((pre) => ({
      ...pre,
      [name]: "",
    }));
  }; //end

  /********************************************************************
   *  This function is use to validate add new pet form data before submit
   ********************************************************************/
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
  }; //end


  
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
   *  This function is use to add new pet
   *********************************************************/
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
      formData.append("name", profiles[i].name);
      formData.append("dob", profiles[i].dob);
      formData.append("breed", profiles[i].breed);
      formData.append("gender", profiles[i].gender);
      formData.append("city", profiles[i].city);
      formData.append("ipAddress", ipAddress);
      formData.append("platform", "web");
      if (images[i]) {
        formData.append("image", images[i]);
      }
      try {
        const postData = {
          url: API_BASE_URL + "users/create-pet-profile",
          postData: formData,
        };

        const response = await postRequest(postData);
        if (response.status === true || response.status === 200) {
          profileAdded++;
          toast.success("Pet profile created successfully!");
        }
      } catch (error) {
        console.error(`Error submitting profile ${i + 1}: `, error);
      }
    }

    if (profileAdded > 0) {
      setToastMsg(
        `${profileAdded} out of ${profiles.length} pet profile added!`
      );
      toast.success("Pet profile created successfully!");
      setProfiles();
      window.location.reload(); 
    } else {
      setToastMsg(`Failed to add pet profile!`);
      setToastShow(true);
    }
  }; //end

  /*********************************************************
   *  This function is use to add Address
   *********************************************************/
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData(e.target);
      const ipAddress = await fetchIpAddress();
      const isValidate = await validateFormData(form);
      if (isValidate) {
        const formDataObject = {};
        form.forEach((value, key) => {
          formDataObject[key] = value;
        });
        formDataObject.ipAddress = ipAddress;
        const res = await addEditAddress(formDataObject);
        if (res.status === true) {
          setAddNewAddress(res?.result);

          toast.success("Address save successfully!");
          fetchAdminInfo();
          setadd_newaddress(false);

          // window.location.reload();
        } else {
          console.error("Error adding/editing address");
        }
      }
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
    }
  }; //end

  const fetchAdminInfo = async () => {
    const userinfo = JSON.parse(sessionStorage.getItem("USER-INFO"));
      const currentUser = userinfo._id;
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

  /*****************************************************************************
   *  This is use to set all the neccessary data
   ***************************************************************************/
  useEffect(() => {
    const userinfo = JSON.parse(sessionStorage.getItem("USER-INFO"));
    console.log(userinfo, "userinfo here");

    setUserinfo(userinfo);
    if (userinfo) {
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

  /*****************************************************************************
   *  This is use to check if bookingData available before using getAppointment
   ***************************************************************************/
  useEffect(() => {
    if (bookingData) {
      getAppointment();
    }
    const pickupInfo = Cookies.get("pickupInfo");
    if (pickupInfo) {
      Cookies.remove("pickupInfo", { path: "/" });
      Cookies.remove("selectedPet", { path: "/" });
      console.log("Previous pickupInfo cookie deleted from all pages");
    }
  }, [bookingData]); //end

  return (
    <>
      <Header></Header>
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
            {!show_petdetail &&(
            <div className="pet_details_info">
              <div className="add_new_info">
                <p>Pet Details</p>
                <button className="add_new_pet" onClick={add_morehandle}>
                  Add New Pet
                </button>
              </div>
              <div className="pet_slides">
                <div className="pet_slides">
                  <Pet_infoslider petData={petData} setPetData={setPetData} setshow_petdetail={setshow_petdetail} />
                </div>
              </div>
            </div>
            )}

            {(show_petdetail ||addPet) && (
              <>
                {profiles?.map((profile, index) => (
                  <div
                    key={index}
                    className="create_pet_profile_main_section mt-4"
                  >
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
                                max={new Date().toISOString().split("T")[0]} // Disable future dates
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
                  <button
                    onClick={handleSubmit}
                    className="btn btn-danger btn-lg  user_otp_first"
                  >
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
                  <h1>{capitalizeFirstLetter(userinfo?.name)}</h1>
                  <ul>
                    <li>
                      <span>
                        <MdCall />
                      </span>
                      <p>+91{userinfo?.phone}</p>
                    </li>
                    <li>
                      <span>
                        <FaEnvelope></FaEnvelope>
                      </span>
                      <p>{userinfo?.email}</p>
                    </li>
                    {/* <li>
                      <span>
                        <FaLocationDot />
                      </span>
                      <p>
                      {userinfo?.address}
                      </p>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>

            <div className="pet_details_info mt-4">
              <div className="d-flex justify-content">
                <p>Book Weekly? Repeat </p>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    name="repeat"
                    checked={isRepeatToggled}
                    onClick={() => {
                      // handleRepeatToggle(); // Call your first function
                      handleRepeat(); // Call another function
                    }}
                    className="toggle-switch-checkbox"
                    id={`toggle-switch-new`}
                  />
                  <label
                    className="toggle-switch-label"
                    htmlFor={`toggle-switch-new`}
                  >
                    <span className="toggle-switch-inner" />
                    <span className="toggle-switch-switch" />
                  </label>
                </div>
              </div>

              {showRepeat && (
                <div className="pet_details_info mt-0">
                  <hr className="mt-0"></hr>
                  <div className="d-flex justify-content">
                    <p className="mb-0">Select Repeat Days</p>
                    <ul className="d-flex justify-content week-day">
                      {daysOfWeek.map((day, index) => (
                        <li
                          key={index}
                          className={
                            selectedDays.includes(day) ? "selected" : ""
                          }
                          onClick={() => toggleDay(day)}
                          style={{ cursor: "pointer" }}
                        >
                          {day}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <hr></hr>
                  <div>
                    <p className="">Booking Date & Time</p>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="date_picker">
                        <DatePicker
                          selected={startDate}
                          onChange={handleStartDateChange}
                          dateFormat="dd-MM-yyyy"
                          placeholderText="Select Start Date"
                          minDate={new Date()}
                          className="datepicker"
                        />
                        <FaCalendarDays className="calnder_icon" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="date_picker">
                        <DatePicker
                          selected={endDate}
                          onChange={handleEndDateChange}
                          dateFormat="dd-MM-yyyy"
                          placeholderText="Select End Date"
                          minDate={startDate || new Date()}
                          disabled={!startDate}
                          className="datepicker"
                        />
                        <FaCalendarDays className="calnder_icon" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pet_details_info mt-4">
              <div className="d-flex justify-content">
                <p>Need Pickup & Drop</p>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={isPickDropToggled}
                    name="pickDrop"
                    onClick={() => {
                      // handlePickDropToggle(); // Call your first function
                      handlePickDrop(); // Call another function
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
                <div className="pet_details_info mt-4">
                  <hr className="mt-0"></hr>
                  <div className="d-flex justify-content">
                    <p>Select Pickup Way</p>
                    <div>
                      <button className="one_sides" onClick={one_sidehandle}>
                        One - Side
                      </button>
                      <button className="one_sides" onClick={second_sidehandle}>
                        Two - Side
                      </button>
                    </div>
                  </div>

                  {typeof toggle !== "undefined" && toggle && (
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
                            <button
                              className="add_new_address mb-0"
                              onClick={add_newaddreesheandle}
                            >
                              Add A New Address
                            </button>
                          </div>
                        </div>

                        <hr></hr>
                      </div>

                      {add_newaddress && (
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
                        {console.log("addNewAddressvvv", addNewAddress)}
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
                        {ADMININFO.map((info, index) => (
                          <div key={index} className="addnew_address mb-3">
                            <div>
                              <input
                                type="radio"
                                name="address"
                                value={index}
                                onChange={() => handleAddressChange(index)}
                                checked={selectedAddress === ADMININFO[index]}
                              />
                              <span>{`Address ${index + 1}`}</span>
                            </div>
                            <p>
                            {capitalizeFirstLetter(`${info.firstname} ${info.lastname}, +91 ${info.phone}, ${info.address}, ${info.building_name}, ${info.apartment_no}, ${info.city}`)}
                            </p>
                          </div>
                        ))}
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

                  {typeof sec_oggle !== "undefined" && sec_oggle && (
                    <>
                      <div className="store_process_payement_deatils_heading mt-4">
                        <div className="d-flex justify-content">
                          <div>
                            <h6 className="mb-0 mt-2">
                              Select Pick up & drop Address
                            </h6>
                          </div>
                          <div>
                            <button
                              className="add_new_address mb-0"
                              onClick={add_newaddreesheandle}
                            >
                              Add A New Address
                            </button>
                          </div>
                        </div>

                        <hr></hr>
                      </div>

                      {add_newaddress && (
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
                    {console.log("addNewAddressvvv", addNewAddress)}
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
                      {/* Mapping over the adminInfo array to display all the addresses */}
                      {ADMININFO.map((info, index) => (
                        <div key={index} className="addnew_address mb-3">
                          <div>
                            <input
                              type="radio"
                              name="address"
                              value={index}
                              onChange={() => handleAddressChange(index)}
                              checked={selectedAddress === ADMININFO[index]}
                            />
                            <span>{`Address ${index + 1}`}</span>
                          </div>
                          <p>
                          {capitalizeFirstLetter(`${info.firstname} ${info.lastname}, +91 ${info.phone}, ${info.address}, ${info.building_name}, ${info.apartment_no}, ${info.city}`)}
                          </p>
                        </div>
                      ))}

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
                              placeholder="Select Drop time from user"
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
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <div className="store_process_card_name">
              <span className="font-weight-bold">Selected Service</span>
            </div>
            {bookingData && (
              <div className="grooming_box">
                <div className="d-flex">
                  <div>
                    <img
                      src={`${ASSETS_BASE_URL}${bookingData?.servicesId?.image}`}
                      alt={bookingData?.servicesId?.image}
                    />
                  </div>
                  <div className="personal_details_petinfo">
                    <h2>{bookingData?.servicesId?.name}</h2>
                    <p>
                      {bookingData?.servicesId?.details.length > 20
                        ? `(${bookingData?.servicesId?.details.substring(
                            0,
                            20
                          )})...`
                        : bookingData?.servicesId?.details}
                    </p>
                    <h4>AED {bookingData?.servicesId?.price?.toFixed(2)}</h4>
                  </div>
                </div>
                <div className="pet_details_info mt-0">
                  <h2>Booking Details</h2>
                  <ul className="date_time">
                    <li>
                      <p>Date :</p>
                      <span>
                        {moment(bookingData?.selectedDate).format("DD-MM-YYYY")}
                      </span>
                    </li>
                    <li>
                      <p>Time : </p>
                      <span>{bookingData?.selectedAvailableTimes}</span>
                    </li>
                  </ul>
                </div>

                <div className="pet_details_info">
                  <div className="d-flex">
                    <div>
                      <div className="add_review mx-0 mt-0">
                        <RatingsStar rating={bookingData?.servicesId?.rating} />
                        <span>{bookingData?.servicesId?.rating}</span>
                      </div>
                      <h2 className="pet_name">
                        {bookingData?.servicesId?.store?.shop_name}
                      </h2>
                    </div>
                    <div>
                      <img
                        src={`${ASSETS_BASE_URL}${bookingData?.servicesId?.store?.image}`}
                        alt={bookingData?.servicesId?.store?.image}
                        className="testnominal_img mx-0"
                      />
                    </div>
                  </div>
                  <div className="d-flex mt-2">
                    <Link
                      to={`https://www.google.com/maps/dir/?api=1&destination=${bookingData?.servicesId?.branch?.latitude},${bookingData?.servicesId?.branch?.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="location_infodayservice"
                    >
                      <span className="location_icon">
                        <FaLocationDot />
                      </span>
                      <p className="location_view">
                        {bookingData?.servicesId?.branch?.address}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="login_user_otp_for_bottom_button mt-4">
              <ToastContainer />
              <button
                className="btn btn-danger btn-lg mb-3 user_otp_first"
                onClick={store_process}>
                Proceed to Order
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default Daycareservice;
