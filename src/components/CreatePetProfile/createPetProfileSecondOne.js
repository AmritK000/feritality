

import React, { useEffect, useRef, useState } from "react";
import "./createPetProfile.css";
import Header from "../Header";
import { GoPlus } from "react-icons/go";
import Appdownaload from "../../Home/Appdowanload";
import { breedList, petRegisterController } from "../../controllers/accounts/Account.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePetProfile = () => {
  const fileInputRef = useRef([]);
  const navigate = useNavigate();

  const [petForms, setPetForms] = useState([
    {
      name: "",
      breed: "",
      dob: "",
      gender: "",
      city: "",
      ipAddress: "",
      platform: "web",
      image: null,
    },
  ]);
  const [breeds, setBreeds] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([null]);
  const [errors, setErrors] = useState([{}]);
  

  React.useEffect(() => {
    axios.get("https://api.ipify.org?format=json").then((response) => {
      setPetForms((prevForms) =>
        prevForms.map((form) => ({
          ...form,
          ipAddress: response.data.ip,
        }))
      );
    });
  }, []);

  const handleClick = (index) => {
    fileInputRef.current[index].click();
  };

  const addPetForm = () => {
    setPetForms([
      ...petForms,
      {
        name: "",
        breed: "",
        dob: "",
        gender: "",
        city: "",
        ipAddress: petForms[0]?.ipAddress || "",
        platform: "web",
        image: null,
      },
    ]);
    setImagePreviews([...imagePreviews, null]);
    setErrors([...errors, {}]);
  };

  const getList = async () => {
    console.log("inside");
    try {
      const options = {
        condition: {},
        select: { name: 1 },
        sort: { _id: -1 },
      };
      const listData = await breedList(options);
      console.log("listData111:", listData); // Log the entire response to inspect it
      if (listData.status && Array.isArray(listData.result)) {
        setBreeds(listData.result.map((breed) => breed.name)); // Assuming each breed object has a 'name' field
      } else {
        setBreeds([]);
      }
    } catch (error) {
      console.error("Error fetching breeds:", error);
      setBreeds([]);
    }
  };
  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    const updatedPreviews = [...imagePreviews];
    updatedPreviews[index] = URL.createObjectURL(file);
    setImagePreviews(updatedPreviews);

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedForms = [...petForms];
      updatedForms[index].image = reader.result;
      setPetForms(updatedForms);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedForms = [...petForms];
    updatedForms[index][name] = value;
    setPetForms(updatedForms);

    const updatedErrors = [...errors];
    updatedErrors[index] = {
      ...updatedErrors[index],
      [name]: "",
    };
    setErrors(updatedErrors);
  };

  const validateForm = (formData, index) => {
    let formIsValid = true;
    const newErrors = { ...errors[index] };

    if (!formData.name) {
      formIsValid = false;
      newErrors.name = "Pet Name is required.";
    }

    if (!formData.dob) {
      formIsValid = false;
      newErrors.dob = "Date of Birth is required.";
    }

    if (!formData.breed) {
      formIsValid = false;
      newErrors.breed = "Breed is required.";
    }

    if (!formData.gender) {
      formIsValid = false;
      newErrors.gender = "Gender is required.";
    }

    if (!formData.city) {
      formIsValid = false;
      newErrors.city = "Location is required.";
    }

    if (!formData.image) {
      formIsValid = false;
      newErrors.image = "Pet Picture is required.";
    }

    const updatedErrors = [...errors];
    updatedErrors[index] = newErrors;
    setErrors(updatedErrors);

    return formIsValid;
  };

  const handleSubmit = async (e, index) => {
    e.preventDefault();
    const formData = petForms[index];
    if (validateForm(formData, index)) {
      const response = await petRegisterController(formData);
      alert(response.message);
      if (index === petForms.length - 1) {
        navigate("/");
      }
    }
  };

  const handleSkip = () => {
    navigate("/");
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
            <div className="col-lg-9">
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
                    <button
                      className="btn btn-outline-danger user_otp_second"
                      onClick={handleSkip}
                    >
                      Skip for Now
                    </button>
                  </div>
                </div>
                {petForms.map((formData, index) => (
                  <div
                    key={index}
                    className="create_pet_profile_main_section"
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
                                value={formData.name}
                                onChange={(e) => handleInputChange(e, index)}
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
                                placeholder="dob"
                                name="dob"
                                value={formData.dob}
                                onChange={(e) => handleInputChange(e, index)}
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
                                value={formData.breed}
                                onChange={(e) => handleInputChange(e, index)}
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
                              <select
                                className="form-control store_input_field_field_for_Create_pet create_pet_for_gender_in_login"
                                name="gender"
                                value={formData.gender}
                                onChange={(e) => handleInputChange(e, index)}
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
                                value={formData.city}
                                onChange={(e) => handleInputChange(e, index)}
                              />
                              {errors[index]?.city && (
                                <span className="text-danger">
                                  {errors[index].city}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="login_user_otp_for_bottom_button_create_pet">
                            <button
                              type="submit"
                              className="btn btn-danger btn-lg user_otp_first"
                            >
                              Submit
                            </button>
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
                              onChange={(e) => handleFileChange(e, index)}
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
                          {errors[index]?.image && (
                            <span className="text-danger">
                              {errors[index].image}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  className="btn btn-outline-danger user_otp_second"
                  onClick={addPetForm}
                >
                  + Add More Pets
                </button>
                <button className="btn btn-danger btn-lg  user_otp_first">
                  Submit
                </button>
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
        <Appdownaload />
      </div>
    </>
  );
};

export default CreatePetProfile;
