import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import "./createPetProfile.css";
import Header from "../Header";
import Appdownaload from "../../Home/Appdowanload";
import { sendOtp, verifyLoginOtp, updateOwnerProfileController } from "../../controllers/accounts/Account.js";

const CreateEnterWonerDetiail = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    countryCode: "+971", // Default to UAE
    country: "UAE", // Default country based on default code
    gender: "",
    email: "",
    address: "",
    otp: "",
  });
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isOpenDropdown, setIsOpenSetDropDown] = useState(false);

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownSelect = (code) => {
    let country = code === "+971" ? "UAE" : "India";
    setFormData({ ...formData, countryCode: code, country: country });
    setIsOpenSetDropDown(false);
  };

  const handleSendOtp = async () => {
    const { mobile, countryCode, country } = formData;
    if (!mobile) {
      alert("Please enter your mobile number.");
      return;
    }
    const response = await sendOtp({ mobile, country_code: countryCode, country });
    if (response.status) {
      setShowOtpForm(true);
    } else {
      alert(response.message);
    }
  };

  const handleVerifyOtp = async () => {
    const { mobile, otp, countryCode, country } = formData;
    const response = await verifyLoginOtp({ mobile, otp, country_code: countryCode, country });
    if (response.status) {
      setOtpVerified(true);
      alert("OTP verified successfully!");
    } else {
      alert(response.message);
    }
  };

  const handleSubmit = async () => {
    const { name, email, gender, address } = formData;
    if (!name || !email || !gender) {
      alert("Please fill out all required fields.");
      return;
    }
    const options = {
      name,
      email,
      gender,
      ipAddress: "127.0.0.1", // Placeholder IP
      version: "1.0",          // Placeholder version
      platform: "web",         // Placeholder platform
    };
    const response = await updateOwnerProfileController(options);
    if (response.status) {
      alert("Profile updated successfully!");
      navigate("/create-pet-profile-second-one"); // Redirect after successful submission
    } else {
      alert(response.message);
    }
  };

  const handleSkip = () => {
    navigate("/create-pet-profile-second-one"); // Redirect when skipping
  };

  return (
    <>
      <div>
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-9">
              <div className="create_pet_profile_main_div_div">
                <div className="create_pet_profile_for_skip_for_now">
                  <div className="create_pet_profile_for_pet_profile">
                    <h2>
                      Enter{" "}
                      <span className="text-danger fw-bold">Owner Details</span>
                    </h2>
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content
                    </p>
                  </div>
                  <div className="login_user_otp_for_bottom_button_skip">
                    <button 
                      className="btn btn-outline-danger user_otp_second"
                      onClick={handleSkip} // Handle skip button click
                    >
                      Skip for Now
                    </button>
                  </div>
                </div>
                <div className="create_pet_profile_main_section">
                  <div className="row cretae_pet_profile_form_div_sec">
                    <div className="col-lg-12 create_verify_owner_deatils_form_section">
                      <h4>Add Owner Details</h4>
                      <form>
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
                          </div>
                          <div className="col-md-4 create_pet_for_profile_input d-flex">
                            <div className="input-group-prepend">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                onClick={() =>
                                  setIsOpenSetDropDown(!isOpenDropdown)
                                }
                              >
                                <img
                                  src="/frisbeeImage/login_flag.png"
                                  alt="Flag"
                                  style={{ width: "20px" }}
                                />
                              </button>
                              <div
                                className={`dropdown-menu login_main_dropdown_class ${
                                  isOpenDropdown ? "show" : ""
                                }`}
                              >
                                <a
                                  className="dropdown-item"
                                  onClick={() =>
                                    handleDropdownSelect("+971")
                                  }
                                >
                                  <img
                                    src="/frisbeeImage/login_flag.png"
                                    alt="Flag"
                                    style={{ width: "20px" }}
                                  />{" "}
                                  UAE (+971)
                                </a>
                                <a
                                  className="dropdown-item"
                                  onClick={() =>
                                    handleDropdownSelect("+91")
                                  }
                                >
                                  <img
                                    src="/frisbeeImage/login_flag.png"
                                    alt="Flag"
                                    style={{ width: "20px" }}
                                  />{" "}
                                  IND (+91)
                                </a>
                              </div>
                            </div>
                            <input
                              type="number"
                              className="form-control store_input_field_field_for_Create_pet"
                              placeholder="1234567"
                              name="mobile"
                              value={formData.mobile}
                              onChange={handleInputChange}
                            />
                          </div>
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
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-12 create_pet_for_profile_input">
                            <input
                              type="text"
                              className="form-control store_input_field_field_for_Create_pet"
                              placeholder="address"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="login_user_otp_for_bottom_button_create_pet">
                  <button 
                    className="btn btn-lg create_pet_back_button"
                    onClick={() => navigate(-1)} // Go back to the previous page
                  >
                    Back
                  </button>
                  {!showOtpForm && (
                    <button
                      className="btn btn-danger btn-lg user_otp_first"
                      onClick={handleSendOtp}
                    >
                      Verify Mobile No.
                    </button>
                  )}
                </div>
                {showOtpForm && (
                  <div className="create_pet_profile_main_section">
                    <div className="row cretae_pet_profile_form_div_sec">
                      <div className="col-lg-12 create_verify_owner_deatils_form_section">
                        <h4>Verify Mobile No.</h4>
                        <form>
                          <div className="row mb-3">
                            <div className="col-md-8 mb-3 mb-md-0 create_pet_for_profile_input">
                              <input
                                type="text"
                                className="form-control store_input_field_field_for_Create_pet"
                                placeholder="Enter Verification Code"
                                name="otp"
                                value={formData.otp}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-md-4 enter_owner_deatils_button d-flex justify-content-end">
                              <button type="button" className="btn btn-lg">
                                Resend Code
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="login_user_otp_for_bottom_button_create_pet">
                      <button
                        className="btn btn-danger btn-lg user_otp_second"
                        onClick={handleVerifyOtp}
                      >
                        Verify OTP
                      </button>
                      {otpVerified && (
                        <button
                          className="btn btn-danger btn-lg user_otp_second"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                )}
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

export default CreateEnterWonerDetiail;
