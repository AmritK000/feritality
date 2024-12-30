import React, { useEffect, useRef, useState } from "react";
import "./createPetProfile.css";
import Header from "../Header.js";
import { GoPlus } from "react-icons/go";
import Appdownaload from "../../Home/Appdowanload.js";
import { useNavigate } from 'react-router-dom'; 
import { getRequest, postRequest } from "../../controllers/API.js";
import { API_BASE_URL } from "../../config/constants.js";
import { breedList } from "../../controllers/accounts/Account.js";
import { fetchIpAddress } from '../../controllers/API.js'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Footer from "../Footer.js";



const CreatePetProfile = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef([]);
    const [toastshow, setToastShow] = useState(false);
    const [toastmsg, setToastMsg] = useState('');
    const [imagePreviews, setImagePreviews] = useState([null]);
    const [profiles, setProfiles] = useState([{ name: '', dob: '', breed: '', gender: '', city: '' }]);
    const [images, setImages] = useState({}); // Separate state for images
    const [breeds, setBreeds] = useState([]);
    const [errors, setErrors] = useState({}); // Initialize errors as an object


    const handleClick = (index) => {
        fileInputRef.current[index].click();
      };
  
    // Handle input change for text fields (inside the form)
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
  
    // Add more profile fields
    const addProfile = () => {
      setProfiles([...profiles, { name: '', dob: '', breed: '', gender: '', city: '' }]);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [profiles.length]: { name: '', dob: '', breed: '', gender: '', city: '', image: '' }
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
          }
        } catch (error) {
          console.error(`Error submitting profile ${i + 1}: `, error);
        }
      }
  
      if (profileAdded > 0) {
        setToastMsg(`${profileAdded} out of ${profiles.length} pet profile added!`);
        setToastShow(true);
        setTimeout(() => {
          navigate('/create-pet-parent-name');
        }, 3000);
      } else {
        setToastMsg(`Failed to add pet profile!`);
        setToastShow(true);
      }
    };

    const handleSkip = () => {
      navigate("/create-pet-parent-name");
    };
  
    useEffect(() => {
      getList();
    }, []);
  
    return (
        <>
        <Header />
        <div>
          <div className="container">
            <div className="row mt-5">
              <div className="col-lg-9 ">
                <div className="create_pet_profile_main_div_div">
                  <div className="create_pet_profile_for_skip_for_now">
                    <div className="create_pet_profile_for_pet_profile">
                      <h2>
                        Create Your{" "}
                        <span className="text-danger fw-bold">Pet Profile</span>
                      </h2>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content
                      </p>
                    </div>
                    <div className="login_user_otp_for_bottom_button_skip">
                      <button className="btn btn-outline-danger user_otp_second"
                      onClick={handleSkip}>
                        Skip for Now
                      </button>
                    </div>
                  </div>
                  {profiles.map((profile, index) => (
                      <>
                  <div className="create_pet_profile_main_section">
                    <div className="row cretae_pet_profile_form_div_sec">
                      <div key={index} className="col-lg-9">
                        <h4>Add Pets Details</h4>
                        <form >
                          <div className="row mb-3 ">
                            <div className="col-md-6 mb-3 mb-md-0 create_pet_for_profile_input">
                              <input
                                type="text"
                                className="form-control store_input_field_field_for_Create_pet"
                                placeholder="Pet Name"
                                name="name"
                                onChange={(e) => handleChange(index, e)}
                                value={profile?.name}
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
                                value={profile?.dob}
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
                            <div className="col-md-6 create_pet_for_profile_input ">
                              <select name="gender" onChange={(e) => handleChange(index, e)} className="form-control store_input_field_field_for_Create_pet create_pet_for_gender_in_login">
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
                                value={profile?.city}
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
                    </>
                      ))}
                  <div className="login_user_otp_for_bottom_button_create_pet">
                    <button onClick={addProfile} className="btn btn-outline-danger user_otp_second">
                      + Add More Pets
                    </button>
                    <button onClick={handleSubmit} className="btn btn-danger btn-lg  user_otp_first">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 p-4 create_pet_profile_right_section_get_expert text-white d-flex flex-column justify-content-center">
                <div
                  style={{ backgroundColor: "#C73633" }}
                  className="frisbee_main_section_div"
                >
                  <div className="frisbee_main_section_div_child_create_pet_profile">
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
          </div>
          <Appdownaload></Appdownaload>
          <ToastContainer
            className="p-3"
            position={'top-end'}
            style={{ zIndex: 99999999999999 }}
          >
          <Toast bg={'success'} onClose={() => setToastShow(false)} show={toastshow} delay={3000} autohide>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Info!</strong>
            </Toast.Header>
            <Toast.Body className="text-white">{toastmsg}</Toast.Body>
          </Toast>
          </ToastContainer>
        </div>
        <Footer />
      </>
    );
  };
  
  export default CreatePetProfile;
  