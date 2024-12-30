import React, { useState } from "react";
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import Header from "../Header";
import Footer from "../Footer";

function StorePersonalDeatils() {
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
              <li className="step1 current progress_bar_first_step_second">
                <span className="progress_bar_first_step_second_span">
                  Checkout
                </span>
              </li>
              <li className="step1 current progress_bar_first_step_third">
                <span className="progress_bar_first_step_third_span">
                  Payment
                </span>
              </li>
            </ol>
            <div className="store_process_payement_deatils_heading mt-2">
              <h6>You are logged in as:</h6>
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
          </div>
          <div className="col-md-3">
            <div className="store_process_card_name">
              <span className="font-weight-bold">Payment Details</span>
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
                  Proceed to Order
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

export default StorePersonalDeatils;
