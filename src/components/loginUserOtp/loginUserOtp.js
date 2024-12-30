import React,{useState} from "react";
import '../Login/login.css';

function LoginUserOtp() {
  // Initialize state with default values
  const [digits, setDigits] = useState(["6", "7", "8", "1", "0", "2"]);

  // Handle input change
  const handleChange = (e, index) => {
    const { value } = e.target;
    // Update only the specific input field that changed
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-dark">
      <div
        className="card p-3"
        style={{ maxWidth: "800px", borderRadius: "15px" }}
      >
        <div className="row g-0">
          <div className="col-md-6">
            <div className="d-flex align-items-center justify-content-center h-100">
              <div className="position-relative text-center p-3 login_user_for_left_section">
                <img
                  src="/frisbeeImage/userloginotp.png"
                  className="img-fluid rounded-start"
                  alt="Dog"
                />
                <div className="position-absolute top-0 start-50 translate-middle-x mt-3 text-container login_user_otp_for_paragraph">
                  <p className="text-white ">
                    Looking for the pawfect protection for your dog? Enroll Now
                    to
                  </p>
                  <h2 className="text-white">Start Your Pet Insurance</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 bg-white login_user_right_side_main_section">
            <div className="p-4 text-center">
              <img
                src="/frisbeeImage/login_top.png"
                alt="Logo"
                className="mb-3"
              />
              <h3>Verification</h3>
              <p>
                Enter the 6-digit code that we sent to your phone number you
                provided to us.
              </p>
              <span>Enter OTP</span>
              <div className="d-flex justify-content-center mb-3 login_user_enter_otp">
                {digits.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    className="form-control text-center m-1 store_input_field_field"
                    style={{ width: "50px" }}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                  />
                ))}
              </div>
              <div className="login_user_otp_for_bottom_button">
                <button className="btn btn-danger btn-lg mb-3 user_otp_first">
                  Submit
                </button>
                <button className="btn btn-outline-danger user_otp_second">
                  Resend Code
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="position-absolute user_login_top_right_cross_btn">
          <button
            className="top-0 end-0 m-3"
            // aria-label="Close"
          >
            x
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginUserOtp;
