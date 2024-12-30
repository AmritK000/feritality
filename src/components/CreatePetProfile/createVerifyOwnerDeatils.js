import React from "react";
import "./createPetProfile.css";
import Header from "../Header";
import Appdownaload from "../../Home/Appdowanload";

const CreateVerifyOwnerDeatils = () => {
  return (
    <>
      <Header />
      <div>
        <div class="container">
          <div className="row mt-5">
            <div class="col-lg-9">
              <div>
                <div className="create_pet_profile_main_div_div">
                  <div className="create_pet_profile_for_skip_for_now">
                    <div className="create_pet_profile_for_pet_profile">
                      <h2>
                        Enter <span className="text-danger">Owner Details</span>
                      </h2>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content
                      </p>
                    </div>
                    <div className="login_user_otp_for_bottom_button_skip">
                      <button className="btn btn-outline-danger user_otp_second">
                        Skip for Now
                      </button>
                    </div>
                  </div>
                  <div className="create_pet_profile_main_section">
                    <div className="row cretae_pet_profile_form_div_sec">
                      <div className="col-lg-12 create_verify_owner_deatils_form_section">
                        <h4>Add Owner Details</h4>
                        <form>
                          <div className="row mb-3 ">
                            <div className="col-md-4 mb-3 mb-md-0 create_pet_for_profile_input">
                              <input
                                type="text"
                                className="form-control store_input_field_field_for_Create_pet"
                                placeholder="Owner’s Name"
                              />
                            </div>
                            <div className="col-md-4 create_pet_for_profile_input">
                              <input
                                type="number"
                                className="form-control store_input_field_field_for_Create_pet"
                                placeholder="+971-XX-1234567"
                              />
                            </div>
                            <div className="col-md-4 create_pet_for_profile_input">
                              <select className="form-control store_input_field_field_for_Create_pet create_pet_for_gender_in_login">
                                <option value="" disabled selected>
                                  Gender
                                </option>
                                <option>Male</option>
                                <option>Female</option>
                              </select>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-md-12 mb-3 mb-md-0 create_pet_for_profile_input">
                              <input
                                type="email"
                                className="form-control store_input_field_field_for_Create_pet"
                                placeholder="Email Address"
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-12 create_pet_for_profile_input">
                              <input
                                type="text"
                                className="form-control store_input_field_field_for_Create_pet"
                                placeholder="Location"
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-4 mt-4">
                  <div className="  create_pet_profile_main_div_div">
                    <div className="create_pet_profile_for_skip_for_now"></div>
                    <div className="create_pet_profile_main_section">
                      <div className="row cretae_pet_profile_form_div_sec">
                        <div className="col-lg-12 create_verify_owner_deatils_form_section">
                          <h4>Verify Mobile No.</h4>
                          <form>
                            <div className="row mb-3 ">
                              <div className="col-md-8 mb-3 mb-md-0 create_pet_for_profile_input">
                                <input
                                  type="text"
                                  className="form-control store_input_field_field_for_Create_pet"
                                  placeholder="Enter Verification Code"
                                />
                              </div>
                              <div className="col-md-4 enter_owner_deatils_button d-flex justify-content-end">
                                <button type="button" className="btn btn-lg ">
                                  Resend Code
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="login_user_otp_for_bottom_button_create_pet  d-flex justify-content-center">
                <button className="btn btn-danger btn-lg  user_otp_first">
                  Verify & Submit
                </button>
              </div>
            </div>
            <div className="col-lg-3 p-4 text-white d-flex flex-column create_pet_profile_right_section_get_expert">
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
      </div>
    </>
  );
};

export default CreateVerifyOwnerDeatils;
