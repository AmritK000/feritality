import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { sendOtp, verifyLoginOtp } from "../../controllers/accounts/Account";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function LoginAndOtp({isModalOpen,setIsModalOpen}) {
  const [isOpen, setIsOpen] = useState(isModalOpen);
  const [isOpenDropdown, setIsOpenSetDropDown] = useState(false);

  const [formData, setFormData] = useState({
    mobileNumber: "",
    countryCode: "+971",
    otp: "",
    remember_me: false,
  });
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();

  const clientId =
    "272764677080-7dsn6l8355iftc59ct7md4d509ki2hu0.apps.googleusercontent.com";

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsModalOpen(false);
  }

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  const validateFormData = () => {
    const numberRegex = /^[0-9]+$/;
    if (!formData.mobileNumber || !numberRegex.test(formData.mobileNumber)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        mobileNumber: "Enter a valid mobile number",
      }));
      return false;
    } else if (
      (formData.countryCode === "+971" && formData.mobileNumber.length !== 9) ||
      (formData.countryCode === "+91" && formData.mobileNumber.length !== 10)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        mobileNumber: "Mobile number length is incorrect",
      }));
      return false;
    }
    return true;
  };

  const handleSendOtp = async () => {
    if (validateFormData()) {
      const options = {
        mobile: formData.mobileNumber,
        country_code: formData.countryCode,
      };
      const result = await sendOtp(options);
      if (result.status === true) {
        setIsOTPSent(true);
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          formError: result.message,
        }));
      }
    }
  };

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (value.length > 1) {
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    if (!value && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  


  const handleVerifyOtp = async () => {
    const otp = digits.join("");
    const options = {
      mobile: formData.mobileNumber,
      country_code: formData.countryCode,
      otp: otp,
      country: formData.countryCode === "+971" ? "UAE" : "India",
    };

    const result = await verifyLoginOtp(options);
    console.log(result, "result");

    if (result.status === true) {
      const flag = result?.data?.response?.result?.flag;
      // console.log(flag, "flag here");
      // window.location.reload(); 
      handleCloseModal(); 
      if (flag === "new") {
        navigate("/create-pet-profile");
      } else {
        // navigate("/");
         window.location.reload(); 
        handleCloseModal();
      }
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, formError: result.message }));
    }
  };

  const handleDropdownSelect = (code) => {
    setFormData((prevData) => ({ ...prevData, countryCode: code }));
    setIsOpenSetDropDown(false);
  };


  useEffect(() => {
    if (!isModalOpen) {
      setIsOTPSent(false); // Ensure isOTPSent is false when modal is not open
      setFormData({
        mobileNumber: "",
        countryCode: "+971",
        otp: "",
        remember_me: false,
      });
      setDigits(["", "", "", "", "", ""]);
      setErrors({});
    }
  }, [isModalOpen]);

  return (
    <div>
      {isModalOpen === true && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="modal-dialog modal-dialog-centered login_modal_popup"
            style={{ maxWidth: "58%" }}
          >
            <div className="modal-content">
              <div className="modal-body login_popup_modal_body">
                <div className="row">
                  <div className="col-md-6 p-4 text-white d-flex flex-column justify-content-center">
                    <div
                      style={{ backgroundColor: "#C73633" }}
                      className="frisbee_main_section_div"
                    >
                      <div className="frisbee_main_section_div_child">
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

                  <div className="col-md-6 p-4 d-flex flex-column justify-content-center frisbee_login_right_section_main">
                    {!isOTPSent ? (
                      <>
                        <img
                          src="/frisbeeImage/login_top.png"
                          alt="Logo"
                          className="img-fluid mb-3 mx-auto"
                          style={{ maxHeight: "60px" }}
                        />
                        <h4 className="text-center">
                          Welcome To{" "}
                          <span style={{ color: "#C73633" }}>Frisbee</span>
                        </h4>
                        <span className="text-center text-muted login_quic_affordable">
                          Quick • Affordable • Trusted
                        </span>
                        <form>
                          <div className="form-group login_right_side_form">
                            <label
                              htmlFor="mobileNumber"
                              className="font-weight-bold"
                            >
                              Mobile Number
                            </label>
                            <div className="input-group login_input_for_mobile_no">
                              <div className="input-group-prepend">
                                <button
                                  className="btn btn-outline-secondary dropdown-toggle"
                                  type="button"
                                  onClick={() =>
                                    setIsOpenSetDropDown(!isOpenDropdown)
                                  }
                                >
                                  {formData.countryCode}
                                </button>
                                <div
                                  className={`dropdown-menu login_main_dropdown_class ${
                                    isOpenDropdown ? "show" : ""
                                  }`}
                                >
                                  <a
                                    className="dropdown-item"
                                    onClick={() => handleDropdownSelect("+971")}
                                  >
                                    UAE (+971)
                                  </a>
                                  <a
                                    className="dropdown-item"
                                    onClick={() => handleDropdownSelect("+91")}
                                  >    
                                    IND (+91)
                                  </a>
                                </div>
                              </div>
                              <span className="login_straight_line">|</span>
                              <div>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="mobileNumber"
                                  placeholder="Enter Mobile Number"
                                  name="mobileNumber"
                                  onChange={handleChange}
                                  value={formData.mobileNumber}
                                />
                            
                              </div>
                            
                              <button
                                className="login_sent_button"
                                type="button"
                                onClick={handleSendOtp}
                              >
                                <img
                                  src="/frisbeeImage/ion_paper-plane.png"
                                  alt="Send"
                                  className="send-icon"
                                />
                              </button>
                            </div>
                          </div>
                          {errors.mobileNumber && (
                                  <p style={{ color: "red" }}>
                                    {errors.mobileNumber}
                                  </p>
                                )}
                        </form>
                      </>
                    ) : (
                      <div className="p-4 text-center">
                        <img
                          src="/frisbeeImage/login_top.png"
                          alt="Logo"
                          className="mb-3"
                        />
                        <h3>Verification</h3>
                        <p>
                          Enter the 6-digit code that we sent to your phone
                          number you provided to us.
                        </p>
                        <span>Enter OTP</span>
                        <div className="d-flex justify-content-between otp-input">
                          {digits.map((digit, index) => (
                            <input
                              key={index}
                              id={`otp-input-${index}`}
                              type="text"
                              maxLength="1"
                              value={digit}
                              onChange={(e) => handleOtpChange(e, index)}
                              className="form-control"
                              style={{ width: "48px", marginRight: "8px" }}
                            />
                          ))}
                        </div>
                      {/* </div>

                      <div className="d-flex align-items-center my-3 login_for_hr">
                        <hr className="flex-grow-1" />
                        <span className="mx-2">Or</span>
                        <hr className="flex-grow-1" />
                      </div>

                      <div className="d-flex justify-content-around mb-3 login_right_side_btn_section"> */}
                        <button
                          className="btn btn-primary mt-3"
                          onClick={handleVerifyOtp}
                        >
                          Submit
                        </button>
                        {errors.formError && (
                          <p style={{ color: "red" }}>{errors.formError}</p>
                        )}
                      </div>
                    )}

                    <div className="d-flex justify-content-around mb-3 login_right_side_btn_section">
                      <GoogleOAuthProvider clientId={clientId}>
                        <GoogleLogin
                        onSuccess={(credentialResponse) => {
                          console.log(credentialResponse, "Success");
                          handleCloseModal();
                          navigate("/create-enter-owner-detiail");
                          window.location.reload();
                          }}
                          onError={() => console.log("Login Failed")}
                        >
                          <button
                            style={{
                              border: "none",
                              background: "none",
                              padding: 0,
                              cursor: "pointer",
                            }}
                          >
                            <img
                              src="/frisbeeImage/login_ggogle.png"
                              alt="Google"
                              style={{ width: "20px" }}
                            />{" "}
                            <span>Google</span>
                          </button>
                        </GoogleLogin>
                      </GoogleOAuthProvider>

                      <button className="btn btn-light d-flex align-items-center">
                        <img
                          src="/frisbeeImage/login_apple.png"
                          alt="Apple"
                          className="mr-2"
                        />
                        <span>Apple</span>
                      </button>
                    </div>

                    <div className="text-center login_for_agree">
                      By continuing you indicate that you have read and agreed
                      to the
                      <span style={{ color: "#C73633" }}>
                        {" "}
                        Terms of Service
                      </span>{" "}
                      and{" "}
                      <span style={{ color: "#C73633" }}>Privacy Policy.</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="login_popup_cross_button"
                type="button"
                onClick={handleCloseModal}
              >
                <img src="/frisbeeImage/login_cross.png" alt="Close" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginAndOtp;

