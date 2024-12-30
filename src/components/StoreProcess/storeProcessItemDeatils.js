import React, { useState } from "react";
import { FaUser, FaPhone, FaEnvelope, FaRegTrashAlt } from "react-icons/fa";
import Header from "../Header";
import Footer from "../Footer";
import { CiLocationOn } from "react-icons/ci";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function StoreProcessItemDeatils() {
  const [count, setCount] = useState(0);
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const [selectedMethod, setSelectedMethod] = useState("Wallet (Treats 100)");
  const handleChange = (event) => {
    setSelectedMethod(event.target.value);
  };
  //carousls functionalaity
  const items = [
    {
      image: "/frisbeeImage/store_process_carouslos.png",
      discount: "50% Discount",
      description: "Wallet (Treats 100)",
    },
    {
      image: "/frisbeeImage/store_process_carouslos.png",
      discount: "50% Discount",
      discount: "30% Discount",
      description: "Cash Payment",
    },
    {
      image: "/frisbeeImage/store_process_carouslos.png",
      discount: "50% Discount",
      discount: "20% Discount",
      description: "Apple Pay",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <Header></Header>
      <div className="container my-4 mt-5">
        <div className="row">
          <div className="col-md-9">
            <ol className="steps_store_personal_deatils">
              <li className="step1 current progress_bar_first_step">
                <span className="progress_bar_first_step_span">
                  Personal Details
                </span>
              </li>
              <li className="step1 current progress_bar_first_step_second_details_page">
                <span className="progress_bar_first_step_second_span_details details_details">
                  Checkout
                </span>
              </li>
              <li className="step1 current progress_bar_first_step_third">
                <span className="progress_bar_first_step_third_span">
                  Payment
                </span>
              </li>
            </ol>
            <div className="col mt-2">
              <label className="store_process_you_are_logged_in">
                You are logged in as:
              </label>
            </div>
            <div className=" p-2 rounded user-info-container store_process_heading_name_main_div">
              <div className="row align-items-center">
                <div className="col-12 col-md-4 d-flex align-items-center mb-3 mb-md-0 store_process_heading_name">
                  <FaUser className="me-2" />
                  <span>Rufus</span>
                </div>
                <div className="col-12 col-md-4 d-flex align-items-center mb-3 mb-md-0 store_process_heading_name">
                  <FaPhone className="me-2" />
                  <span>+971-XX-1234567</span>
                </div>
                <div className="col-12 col-md-4 d-flex align-items-center store_process_heading_name">
                  <FaEnvelope className="me-2" />
                  <span>dineatadm@address.com</span>
                </div>
              </div>
            </div>
            {/* //Next section */}
            <div className="col mt-2">
              <label className="store_process_you_are_logged_in">
                Order Delivery Type:
              </label>
            </div>
            <div className="p-2 rounded user-info-container store_process_heading_name_main_div">
              <div className=" d-flex align-items-center store_process_ci_location">
                <CiLocationOn />
              </div>
              <div className="col-10 d-flex align-items-center">
                <span className="delivery-type-text store_process_instore_collect">
                  <span>Instore</span>
                  <span className="store_click_collect">
                    {" "}
                    (Click & Collect)
                  </span>
                </span>
              </div>
            </div>
            <div className="store_process_order_item">
              <h4>Order Items</h4>
            </div>
            <div>
              {[1, 2].map((item, index) => (
                <div
                  key={index}
                  className="row align-items-center py-2 store_process_product_imge_div"
                >
                  <div className="col-2 col-sm-2 col-md-2  store_process_product_imge">
                    <img
                      src="/frisbeeImage/product_pic.png"
                      alt="Product"
                      className="img-fluid product-image"
                    />
                  </div>
                  <div className="col-10 col-sm-10 col-md-10">
                    <div className="row">
                      <div className="col-md-8">
                        <div>
                          <div className="flex items-center justify-center">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                onClick={() => handleRating(index + 1)}
                                className={`w-8 h-8 cursor-pointer store_process_rating ${
                                  index < 4
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                            <span className="store_process_rating_no">4.2</span>
                          </div>
                        </div>
                        <span className="store_process_predigree">
                          Pedigree Beef Chunks in Gravy Wet Dog Food
                        </span>
                        <div className="store_process_for_kg_main_div">
                          <span className="store_process_for_g">500g</span>
                          <span className="store_process_for_kg">1kg</span>
                        </div>
                        <div className="store_process_aed ">
                          <span className="store_process_predigree">
                            AED 50
                          </span>
                          <span className="text-muted ml-2 text-decoration-line-through store_process_predigree_aed">
                            AED 65.50
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4 d-flex align-items-end store_process_last_btn_section">
                        <div className="quantity_container">
                          <span className="quantity-text">Qty :</span>
                          <span className="quantity-number">01</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="special_notes_container">
              <div className="alert alert-primary custom_alert" role="alert">
                You will earn 4.00 frisbee treats in this order!
              </div>
              <div className="form-group store_process_form_section">
                <form action="#">
                  <label htmlFor="specialNotes">Special Notes</label>
                  <input
                    type="text"
                    className="form-control custom_input"
                    id="specialNotes"
                    placeholder="Add notes here...."
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="store_process_card_name">
              <span className="font-weight-bold">Payment Details</span>
            </div>
            <div className=" mt-3">
              <div className="store_process_payement_deatils_heading">
                <h6>Select Payment Method</h6>
              </div>
              <div className="payment-methods p-3 store_process_wallet_section">
                {[
                  "Wallet (Treats 100)",
                  "Cash Payment",
                  "Apple Pay",
                  "Debit / Credit Card",
                ].map((method, index) => (
                  <div
                    className="form-check store_process_radio_section"
                    key={index}
                  >
                    <input
                      className="form-check-input custom-radio"
                      type="radio"
                      name="paymentMethod"
                      id={`paymentMethod ${index}`}
                      value={method}
                      checked={selectedMethod === method}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`paymentMethod ${index}`}
                    >
                      {method}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/* //// */}
            <div className="store_process_apply_coupon">
              <h5>Apply Coupons</h5>
            </div>
            <div className="form-group store_process_right_input">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Coupon/Discount code"
                // style={{ borderRadius: "25px", padding: "10px 20px" }}
              />
            </div>
            {/* //Carousles */}
            <div className="store_process_payement_carousls">
              <Slider
                {...settings}
                className="store_process_payement_carousls_child_div"
              >
                {items.map((item, index) => (
                  <div key={index} className="discount_slide">
                    <div className="d-flex justify-content-center align-items-center store_process_carousls_image">
                      <img
                        className="d-block"
                        src={item.image}
                        alt={item.description}
                        style={{
                          width: "75px",
                          height: "75px",
                          borderRadius: "10px",
                        }}
                      />
                      <div className="discount_details_store_process">
                        <h5 className="text-danger">{item.discount}</h5>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <div className="payment-details store_process_payement_deatils_heading mt-2">
              <h6>Payment Details</h6>
              <div className="store_process_payment_details_heading_child_div">
                <table className="table  bg-light">
                  <tbody>
                    <tr>
                      <td>Detail</td>
                      <td className="text-end">Price</td>
                    </tr>
                    <tr>
                      <td>Subtotal</td>
                      <td className="text-end">50 AED</td>
                    </tr>
                    <tr>
                      <td>Tier Discount</td>
                      <td className="text-end text-danger">-AED 0.86</td>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td className="text-end">AED 49.14</td>
                    </tr>
                    <tr>
                      <td>Treats Used (10)</td>
                      <td className="text-end">-1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row mb-4 mt-4 font-weight-bold store_process_payement_deatils_heading_child_div store_process_deatils_price">
                <div className="col">Amount Due</div>
                <div className="col text-end">AED 39.14</div>
              </div>
              <div className="login_user_otp_for_bottom_button">
                <button className="btn btn-danger btn-lg mb-3 user_otp_first">
                  Complete Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default StoreProcessItemDeatils;
