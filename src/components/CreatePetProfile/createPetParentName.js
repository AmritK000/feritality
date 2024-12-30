import React, { useState, useEffect } from "react";
import "./createPetProfile.css";
import Header from "../Header";
import Appdownaload from "../../Home/Appdowanload";
import { updateOwnerProfileController } from "../../controllers/accounts/Account.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../Footer.js";

const CreatePetParentName = () => {
  const [userInfo, setUserInfo] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    address: "",
    ipAddress: "",
    version: "1.0", // Assuming a default version
    platform: "web",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get("https://api.ipify.org?format=json").then((response) => {
      setFormData((prevData) => ({
        ...prevData,
        ipAddress: response.data.ip,
      }));
    });
  }, []);

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Owner’s Name is required";
    if (!formData.email) formErrors.email = "Email Address is required";
    if (!formData.gender) formErrors.gender = "Gender is required";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Call the updateOwnerProfileController to submit the form
      const response = await updateOwnerProfileController(formData);

      // Show an alert with the response message

      // If the response status is true, proceed with storing data in sessionStorage
      if (response.status) {
        toast.success("profile created successfully!");
        // Get existing user info from sessionStorage (if any)
        const existingUserInfo = sessionStorage.getItem("USER-INFO");

        // Parse the existing user info or initialize it as an empty object if it doesn't exist
        let userInfo = existingUserInfo ? JSON.parse(existingUserInfo) : {};

        // Update userInfo with formData (or merge if needed)
        userInfo = { ...userInfo, ...formData };

        // Store updated userInfo in sessionStorage
        sessionStorage.setItem("USER-INFO", JSON.stringify(userInfo));

        // Redirect the user to the homepage after storing data
        window.location.href = "http://localhost:3000/";
      }
    }
  };

  const handleSkip = () => {
    window.location.href = "http://localhost:3000/";
  };
  useEffect(() => {
    const userinfo = JSON.parse(sessionStorage.getItem("USER-INFO"));
    // console.log(userinfo, "userinfo");
    setUserInfo(userinfo);
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
                      Enter{" "}
                      <span className="text-danger fw-bold">
                        Pet Parent Details
                      </span>
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
                <div className="create_pet_profile_main_section">
                  <div className="row cretae_pet_profile_form_div_sec">
                    <div className="col-lg-12 create_verify_owner_deatils_form_section">
                      <h4>Add Pet Parent Details</h4>
                      <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                          <div className="col-md-4 mb-3 mb-md-0 create_pet_for_profile_input">
                            <input
                              type="text"
                              className="form-control store_input_field_field_for_Create_pet"
                              placeholder="Owner’s Name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                            />
                            {errors.name && (
                              <div className="text-danger">{errors.name}</div>
                            )}
                          </div>
                          <div className="col-md-4 create_pet_for_profile_input">
                            <input
                              type="text"
                              className="form-control store_input_field_field_for_Create_pet"
                              placeholder="Phone"
                              name="phone"
                              value={`${userInfo?.country_code || ""}${
                                userInfo?.phone || ""
                              }`}
                              disabled
                            />
                          </div>
                          {/* <div className="col-md-4 create_pet_for_profile_input">
                            <input
                              type="email"
                              className="form-control store_input_field_field_for_Create_pet"
                              placeholder="Email Address"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                            {errors.email && (
                              <div className="text-danger">{errors.email}</div>
                            )}
                          </div> */}
                          <div className="col-md-4 create_pet_for_profile_input">
                            <select
                              className="form-control store_input_field_field_for_Create_pet create_pet_for_gender_in_login"
                              name="gender"
                              value={formData.gender}
                              onChange={handleInputChange}
                            >
                              <option value="">Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                            {errors.gender && (
                              <div className="text-danger">{errors.gender}</div>
                            )}
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-12 mb-3 mb-md-0 create_pet_for_profile_input">
                            <input
                              type="email"
                              className="form-control store_input_field_field_for_Create_pet"
                              placeholder="Email Address"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                            {errors.email && (
                              <div className="text-danger">{errors.email}</div>
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
                          <ToastContainer />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* </div> */}
                <div className="login_user_otp_for_bottom_button_create_pet">
                  <button className="btn btn-lg create_pet_back_button">
                    Back
                    {/* </button>
                  <button className="btn btn-danger btn-lg  user_otp_first">
                    Submit */}
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
        <Appdownaload />
      </div>
      <Footer />
    </>
  );
};

export default CreatePetParentName;
