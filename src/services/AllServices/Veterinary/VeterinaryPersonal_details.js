import React, { useState, useRef, useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Header from "../../../components/Header";
import { breedList } from "../../../controllers/accounts/Account.js";
import { MdCall } from "react-icons/md";
import Pet_infoslider from "../Grooming/serviceType/pet_infoslider.js";
import { GoPlus } from "react-icons/go";
import Footer from "../../../components/Footer";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ASSETS_BASE_URL } from "../../../config/constants";
import RatingsStar from "../../../components/RatingsStar";
import moment from "moment/moment.js";
import { postRequest, fetchIpAddress } from "../../../controllers/API.js";
import { API_BASE_URL } from "../../../config/constants.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Grooming_personaldetail() {
  const navigate = useNavigate();
  const [show_petdetail, setshow_petdetail] = useState(false);
  const [addPet, setAddPet] = useState(false);
  const fileInputRef = useRef([]);
  const location = useLocation();
  const { state } = location;
  const [checkoutData, setCheckoutData] = useState(state || '');
  const [toastshow, setToastShow] = useState(false);
  const [toastmsg, setToastMsg] = useState('');
  const [imagePreviews, setImagePreviews] = useState([null]);
  const [profiles, setProfiles] = useState([{ name: '', dob: '', breed: '', gender: '', city: '' }]);
  const [images, setImages] = useState({});
  const [breeds, setBreeds] = useState([]);
  const [AddressList, setAddressList] = useState([]);
  const [errors, setErrors] = useState({});
  const userInfo = JSON.parse(sessionStorage.getItem("USER-INFO"));
  const [petData, setPetData] = useState("");
  const handleClick = (index) => {
    fileInputRef.current[index].click();
  };

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



  const store_process = () => {
    if (!petData || petData.length === 0) {
      toast.error('Select a pet to continue!')
      return;
    }
    navigate("/vetrinary-checkoutdetail", { state: { checkoutData, petData } });
  };
  const add_morehandle = () => {
    // setshow_petdetail(true);
    setAddPet(!addPet);
  }

  useEffect(() => {
    let bookingData = state;
    console.log("sytsygdsk", state);
    //  If state is empty, try to retrieve from local storage
     if (!bookingData) {
      const savedBookingData = localStorage.getItem('bookingData');
      if (savedBookingData) {
        bookingData = JSON.parse(savedBookingData);
        setCheckoutData(bookingData);
      }
    }
    getList();
  }, [state]);



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
            {!show_petdetail &&(
            <div className="pet_details_info">
              <div className="add_new_info">
                <p>Pet Details</p>
                <button className="add_new_pet" onClick={add_morehandle}>Add New Pet</button>
              </div>
              <div className="pet_slides">
              <Pet_infoslider petData={petData} setPetData={setPetData} setshow_petdetail={setshow_petdetail} />
              </div>
            </div>
 )}

{(show_petdetail || addPet) && (
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
                  <h1>{userInfo?.name}</h1>
                  <ul>
                    <li><span><MdCall /></span><p>{userInfo.phone}</p></li>
                    <li><span><FaEnvelope></FaEnvelope></span><p>{userInfo.email}</p></li>
                    <li><span><FaLocationDot /></span><p>{userInfo.address || "C-25 MiQB Building , Sector 58, Noida, Uttar Pradesh 201309"}</p></li>
                    {/* <li><span><FaLocationDot /></span>  <p className="mx-0"><Link to={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
                      target="_blank"
                      rel="noopener noreferrer">
                    </Link>
                      {userInfo?.address  || "C-25 MiQB Building , Sector 58, Noida, Uttar Pradesh 201309"}</p></li> */}
                  </ul>
                </div>
              </div>
            </div>
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

export default Grooming_personaldetail;


