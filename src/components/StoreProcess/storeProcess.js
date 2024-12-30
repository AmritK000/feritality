import React, { useState } from "react";
import "./storeProcess.css";
import { FaRegTrashAlt } from "react-icons/fa";
import Header from "../Header";

function StoreProcess() {
  const [rating, setRating] = useState(0);
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };
  const handleRating = (rate) => {
    setRating(rate);
  };

  const [selected, setSelected] = useState("delivery");

  const handleSelect = (type) => {
    setSelected(type);
  };
  return (
    <>
      <Header />
      <div className="container">
        <div className="row mt-5 py-3 ">
          <div className="col-md-9">
            <div className="store_process_card_name">
              <span className="font-weight-bold">Cart Items</span>
            </div>
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
                                index < 4 ? "text-yellow-400" : "text-gray-300"
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
                        <span className="store_process_predigree">AED 50</span>
                        <span className="text-muted ml-2 text-decoration-line-through store_process_predigree_aed">
                          AED 65.50
                        </span>
                      </div>
                    </div>
                    <div className="col-md-4 d-flex align-items-end store_process_last_btn_section">
                      {/* <button className="btn btn-outline-danger  store_process_trash_button">
                        <FaRegTrashAlt />
                      </button> */}
                      <div className="store_process_trash_button">
                        <button type="button">
                          <FaRegTrashAlt />
                        </button>
                      </div>
                      <div
                        className="d-flex justify-content-center align-items-center"
                        // style={{ height: "100vh", background: "#E0ECFF" }}
                      >
                        <div className="btn-group rounded store_btn_group_for_increment_decrement">
                          <button type="button" onClick={handleDecrement}>
                            -
                          </button>
                          <div className="px-3 d-flex align-items-center ">
                            {count}
                          </div>
                          <button type="button" onClick={handleIncrement}>
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-3">
            <div className="store_process_card_name">
              <span className="font-weight-bold">Payment Details</span>
            </div>
            <div className="form-group">
              <div className="mt-2 store_process_type_order__section">
                <h6>Select Order Type</h6>
                <div className="card-deck store_process_select_order">
                  <div
                    className={`card mb-3 store_delivery_border ${
                      selected === "delivery" ? "border-danger" : ""
                    }`}
                    onClick={() => handleSelect("delivery")}
                  >
                    <div className="card-body d-flex align-items-center store_process_order_type">
                      <div className="icon-container">
                        {/* Replace with an actual icon */}
                        <span
                          role="img"
                          aria-label="delivery"
                          className="store_location_and_delivery"
                        >
                          <img src="/frisbeeImage/store_delivery.png" alt="" />
                        </span>
                      </div>
                      <div className="ml-3 store_process_delivery">
                        <h6
                          className={`mb-0  ${
                            selected === "delivery" ? "text-danger" : ""
                          }`}
                        >
                          Delivery
                        </h6>
                        <small className="text-muted">(Home Delivery)</small>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`card store_delivery_border ${
                      selected === "instore" ? "border-danger" : ""
                    }`}
                    onClick={() => handleSelect("instore")}
                  >
                    <div className="card-body d-flex align-items-center store_process_order_type">
                      <div className="icon-container">
                        {/* Replace with an actual icon */}
                        <span
                          role="img"
                          aria-label="instore"
                          className="store_location_and_delivery"
                        >
                          <img src="/frisbeeImage/store_location.png" alt="" />
                        </span>
                      </div>
                      <div className="ml-3 store_process_delivery">
                        <h6
                          className={`mb-0 ${
                            selected === "instore" ? "text-danger" : ""
                          }`}
                        >
                          Instore
                        </h6>
                        <small className="text-muted">(Click & Collect)</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="payment-details store_process_payement_deatils_heading mt-2">
              <h6>Payment Details</h6>
              {/* <div className="store_process_payement_deatils_heading_child_div">
                <div className="row mb-2 store_process_deatils_price">
                  <div className="col">Detail</div>
                  <div className="col text-end">Price</div>
                </div>
                <div className="row mb-2 store_process_deatils_price">
                  <div className="col">Subtotal</div>
                  <div className="col text-end">50 AED </div>
                </div>
                <div className="row mb-2 store_process_deatils_price">
                  <div className="col">Tier Discount</div>
                  <div className="col text-end text-danger">-AED 0.86</div>
                </div>
                <div className="row mb-2 store_process_deatils_price">
                  <div className="col">Total</div>
                  <div className="col text-end">AED 49.14</div>
                </div>
                <div className="row mb-2 store_process_deatils_price">
                  <div className="col">Treats Used (10)</div>
                  <div className="col text-end">-1</div>
                </div>
              </div> */}

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
                  Proceed to Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StoreProcess;
