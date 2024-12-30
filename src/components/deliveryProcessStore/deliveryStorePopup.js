import React, { useState } from "react";
import Lottie from "react-lottie";
import locationAnimation from "./locationAnimation.json";

function DeliveryStorePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const deliveryLocationAnimation = {
    loop: true,
    autoplay: true,
    animationData: locationAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleOpenModal}
      >
        Open Login Popup
      </button>

      {isOpen && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="modal-dialog modal-dialog-centered login_modal_popup"
            style={{ maxWidth: "25%" }}
          >
            <div className="modal-content">
              <div className="modal-body text-center position-relative delivery_store_pop_up_div">
                <div className="delivery_location_svg">
                  <Lottie
                    options={deliveryLocationAnimation}
                    height={100}
                    width={100}
                  />
                  <h5 className="mt-4">Your Want To</h5>
                  <h5 className="text-danger">Add New Delivery Address.</h5>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <div className="login_user_otp_for_bottom_button">
                    <button className="btn btn-outline-danger mb-3 user_otp_second">
                      Use Current Location
                    </button>
                    <button className="btn btn-danger btn-lg  user_otp_first">
                      Add Address Manually
                    </button>
                  </div>
                </div>
              </div>
              <div className="position-absolute user_login_top_right_cross_btn">
                <button className="top-0 end-0 m-3" onClick={handleCloseModal}>
                  x
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeliveryStorePopup;
