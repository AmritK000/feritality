import React, { useState,useEffect,useMemo } from "react";
import { FaUser, FaPhone, FaEnvelope, FaRegTrashAlt } from "react-icons/fa";
import Header from "../Header";
import Footer from "../Footer";
import { CiLocationOn } from "react-icons/ci";
import Slider from "react-slick";
import { useNavigate, Link,useLocation } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ASSETS_BASE_URL,TAP_URL } from  "../../config/constants";
import {ordercomplete,orderchangestatus,wallethistory,promocodelist,paymentordercomplete,orderpaymentstatus} from "../../controllers/store/shopController";
import { fetchIpAddress } from "../../controllers/API";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DeliveryProcessItemDeatils() {
  const [count, setCount] = useState(0);
  const [rating, setRating] = useState(0);
  const addressData = JSON.parse(sessionStorage.getItem("addressData"));
  const orderData = JSON.parse(sessionStorage.getItem("orderData"));
  const USER_INFO = JSON.parse(sessionStorage.getItem("USER-INFO"));
 
  const [walletData, setWalletData] = useState(null);
  const [promoData, setPromocodeData] = useState(null);
  const st= JSON.parse(localStorage.getItem("cart"));
  const [selectedVariants, setSelectedVariants] = useState({});
  const [quantities, setQuantities] = useState({});
  const [cartData, setCartData] = useState([]);
  const [error, setError] = useState("");
  const [couponitems, setItems] = useState();
  const navigate = useNavigate();
  const location = useLocation();
   const pathName = location.pathname;
  const [treatsUsed, setTreatsUsed] = useState(0);
  const [treatavlsUsed, setAvlTreatsUsed] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0); // Initialize with 0 or appropriate value
  const [discountamountdata, setDiscount] = useState(0); // Initialize with 0 or appropriate value
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponErrorMessage, setCouponErrorMessage] = useState(""); 
  const [isProcessing, setIsProcessing] = useState(false);
  const selectedSlug =  localStorage.getItem('selectedSlug')
 
  const handleRating = (rate) => {
    setRating(rate);
  };

  const [selectedMethod, setSelectedMethod] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Cash Payment');
  const [selectedPromoCode, setSelectedPromoCode] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");
  const handleChange = (event) => {
    const method = event.target.value;
     if (selectedPaymentMethod === 'Cash Payment') {
      
    // Show a toast message or alert when the user tries to apply wallet while using incompatible payment methods
    // alert("Please select another payment method to use Wallet.");
    toast.error("Please select another payment method to use Wallet.");
    return; // Prevent further execution
  }
    if (event.target.checked) {
    if (method.startsWith("Wallet")) {
      const availableBalance = walletData?.avlBalance || 0;
      const treatsValue = Math.floor(availableBalance / 100);
      setSelectedMethod(method);
      setTreatsUsed(treatsValue);
      setAvlTreatsUsed(walletData?.avlBalance);
  } else {
      setTreatsUsed(0);
      setAvlTreatsUsed(0);
  }
} else {
  // Handle the uncheck scenario
  setSelectedMethod('');
  setTreatsUsed(0);
  setAvlTreatsUsed(0);
}
  };
  // const handleSpecialNotesChange = (event) => {
  //   setSpecialNotes(event.target.value);
  // };
  const handleInputChange = (e) => {
    const input = e.target.value;
    const maxLength = 200; // Set character limit
    const textAndNumberRegex = /^[a-zA-Z0-9\s]*$/; // Regex to allow text, numbers, and spaces
  
    if (input.length > maxLength) {
      setError(`Special notes cannot exceed ${maxLength} characters.`);
    } else if (!textAndNumberRegex.test(input)) {
      setError("Special notes can only contain letters,  numbers, and spaces.");

    } else {
      setError("");
      setSpecialNotes(input);
    }
  };
  const handleRadioChange = (event) => {
    const { value } = event.target;
    setSelectedPaymentMethod(value);
    setSelectedMethod('');
  };
  const uniqueProducts = useMemo(() => {
    const uniqueVariantsMap = new Map();
    cartData.forEach(item => {
      item.varients.forEach(variant => {
        const variantId = variant._id;
        if (!uniqueVariantsMap.has(variantId)) {
          uniqueVariantsMap.set(variantId, { ...item, variant });
        }
      });
    });
    return [...uniqueVariantsMap.values()];
  }, [cartData]);

  //carousls functionalaity
 
  
  const fetchWalletData = async () => {
    setError(""); // Assuming there's a state for error handling
    try {
      const options = {}; // Specify any necessary options for the request
      const response = await wallethistory(options);
      // Corrected to handle the response structure correctly
      if (response) {
        setWalletData(response.result); // Set walletData to response.result
      } else {
        console.log("No wallet data found or response status is not true");
      }
    } catch (error) {
      console.error("Failed to fetch wallet data: ", error);
    }
  };
  const fetchPromocodeData = async () => {
    try {
      const options = {
        service:selectedSlug,
        type: "",
        condition: {
             service: selectedSlug,
              status : "A"
        },
       select    : { 
        title : true,
        promocode : true,
        discount_type:true,
        discounts : true,
        eligible_amount : true,
        status : true,
        redeem_to : true,
        vendor:true,
        store : true,
        branch : true,
        service :true
     },
        sort: { "_id": -1 },
        page: "1",
    }
      const response = await promocodelist(options);
      // Corrected to handle the response structure correctly
      if (response) {
        setPromocodeData(response.result); // Set walletData to response.result
        setItems(response.result.data.response.result);
      } else {
        console.log("No wallet data found or response status is not true");
      }
    } catch (error) {
      console.error("Failed to fetch wallet data: ", error);
    }
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const handleVariantClick = (itemId, variant) => {
    setSelectedVariants(prevState => ({
        ...prevState,
        [itemId]: variant
    }));
};
const calculateDiscountedPrice = (productId, quantity) => {
  const selectedVariant = selectedVariants[productId];
  if (!selectedVariant) return 0;

  const rate = selectedVariant.rate || 0;
  const discount = selectedVariant.discount || 0;

  const discountedPrice = discount ? rate - (rate * (discount / 100)) : rate;
  return discountedPrice * quantity;
};
const calculateSubtotal = () => {
  return uniqueProducts.reduce((total, item) => {
    const quantity = quantities[item.varients[0]._id] || 1;
    const discountedPrice = calculateDiscountedPrice(item.varients[0]._id, quantity);
    return total + discountedPrice;
  }, 0);
};
const subtotal = calculateSubtotal();

function generateTransactionID() {
  const timestamp = Date.now(); // Get the current timestamp
  const randomNum = Math.floor(Math.random() * 10000); // Generate a random number
  return `txn_${timestamp}_${randomNum}`; // Format the transaction ID
}
const handleCompleteOrderpayment = async (result,transaction) => {
  setIsProcessing(true);
  try {
  //  const transaction=generateTransactionID();
    const tapPaymentData = {
      "amount": result.order.paidAmount,
      "currency": "AED",
      "description": "Test Description",
        "transaction": transaction,
        "order": result.order.order_seq_id,
        "first_name": USER_INFO.name,
        "middle_name": "",
        "last_name": "",
        "email": USER_INFO.email,
          "country_code": USER_INFO.country_code,
          "number": USER_INFO.phone,
          "threeDSecure":true,
          "save_card":false,
          "url": `${TAP_URL}order-recieved`,
           "udf1": "Metadata 1",
           "receiptemail":true,
           "sms": true,
           "merchantid":123,
           "sourceid":"src_card",
           "posturl":`${TAP_URL}delivery-process-item-deatils`,
           "customer_initiated": true,
           "threeDSecure": true,
           "save_card": false,
    };
    const response = await paymentordercomplete(tapPaymentData);
   // window.location.href = response.res.data.transaction.url;
    const paymentUrl = response.res.data.transaction.url; // URL for the payment gateway
      const chargeId = response.res.data.id;
            // Redirect to the payment URL after confirming payment was initiated
            if (paymentUrl) {
                window.location.href = paymentUrl; // Redirect to payment
                sessionStorage.setItem("changeorderresult", JSON.stringify(result));
                sessionStorage.setItem("transaction", JSON.stringify(transaction));
                sessionStorage.setItem("chargeId", JSON.stringify(chargeId));
                sessionStorage.removeItem("orderData");
                sessionStorage.removeItem("addressData");
                const orderData = {
                  paidAmount: result.order.paidAmount,
                  treats: treat,
                };
                const cartdata = JSON.parse(localStorage.getItem('cart')) || [];
               const  shopname = cartdata[0].store.shop_name;
                sessionStorage.setItem("orderDataComplete", JSON.stringify(orderData));
                sessionStorage.setItem("shopname", JSON.stringify(shopname));
                 sessionStorage.removeItem("orderData");
                 sessionStorage.removeItem("addressData");
               
                // // Remove cart data from localStorage
                localStorage.removeItem("cart");
               // // Remove cart data from localStorage
               localStorage.removeItem("cart");
            }

  } catch (error) {
    console.error('Error making Tap API request:', error.message);
    console.error('Full error stack:', error);
    alert("There was a problem processing the payment. Please check your network or API configuration.");
  } finally {
    setIsProcessing(false);
  }
};




const handleCompleteOrder = async () => {
  setIsProcessing(true);
  try {
    const transaction=generateTransactionID();
    const cartItems = uniqueProducts.map(item => {
      const variant = selectedVariants[item.varients[0]._id];
      const quantity = quantities[item.varients[0]._id] || 1;
      const basePrice = variant ? variant.rate : 0;
      const discount = variant?.discount || 0;
      const discountedPrice = basePrice - (basePrice * (discount / 100));
      const total = discountedPrice * quantity;

      return {
        productId: item.productData._id,
        vendorProductId: item._id, 
        varientId: variant ? variant._id : "",
        rate: discountedPrice, 
        qty: quantity,
        total: total,
        discount: discount
      };
    });
    const isTreatsUsed = typeof selectedMethod === 'string' && selectedMethod.startsWith("Wallet") ? "Y" : "N";
    const treats = isTreatsUsed === "Y" ? treatavlsUsed : 0;
    const treatsDiscount = isTreatsUsed === "Y" ? treatsUsed : 0;
    const isCouponUsed = selectedPromoCode ? 'Y' : 'N';
    const promocode = selectedPromoCode || null;
    const ipAddress = await fetchIpAddress();

    const options = {
      shopId: st[0].store._id,
      branch: st[0].branch, 
      petId: "", 
      deliveryAddress: addressData._id,
      isCouponUsed: isCouponUsed, 
      promocode: promocode, 
      paidAmount:totalamount.toFixed(2),
      isTreatsUsed: isTreatsUsed,
      treats: treats,
      treats_discount: treatsDiscount,
      discount:discountAmount,
      txnNumber: transaction, // Generate or get the actual transaction number
      notes: specialNotes, 
      cart: cartItems,
      delivery_type:orderData.deliveryMethod,
     delivery_charges:orderData.shippingCharge,
      ipAddress: ipAddress,
      platform:'Web',
    };
       const response = await ordercomplete(options);
      if (response.status === true || response.status === 200) {
        if (selectedPaymentMethod !== "Cash Payment") {
          sessionStorage.setItem("treat", JSON.stringify(treat));
          handleCompleteOrderpayment(response.result,transaction);
        }else{
          sessionStorage.setItem("treat", JSON.stringify(treat));
          sessionStorage.setItem("changeorderresult", JSON.stringify(response.result));
          handleChangeOrder(response.result);
          
        }
        // handleCompleteOrderpayment(response.result);
   ///   handleChangeOrder(response.result);
      }else if (response.status === false) {
        setCouponErrorMessage("Coupon is out of limit, please use another coupon.");
    }else {
      return false;
  }
  } catch (error) {
    console.error(error.message);
  }finally {
    setIsProcessing(false); // Set processing to false when the API call is done
  }
};
const handleApplyCoupon = () => {
  setCouponErrorMessage(""); 
  if (selectedPaymentMethod === 'Cash Payment') {
    setSelectedPromoCode("");
    setDiscountAmount(0); // Reset discount if the promo code is invalid
    setIsCouponApplied(false);
    toast.error("Please select another payment method to apply the coupon.");
   
    return; // Prevent further execution
  }
  const promoCode = selectedPromoCode.trim();
  if (promoCode) {
    // Find the coupon from the list that matches the entered promo code
    const coupon = couponitems.find(item => item.promocode === promoCode);
    if (coupon) {
      setDiscountAmount(calculateDiscount(coupon.discounts));
      setIsCouponApplied(true); // Mark coupon as applied
    } else {
      alert("Invalid promo code.");
      setDiscountAmount(0); // Reset discount if the promo code is invalid
      setIsCouponApplied(false); // No coupon applied
    }
  }
};
const handleRemoveCoupon = () => {
  setSelectedPromoCode(""); // Clear the input field
  setDiscountAmount(0); // Reset the discount amount
  setIsCouponApplied(false); // Mark coupon as not applied
  setCouponErrorMessage(""); 
};
 const handleChangeOrder = async (result) => {
   try {
     const options = {
       orderId: result.order._id,
       orderStatus : "Success",
       // paymentStatus : "Success",
       paymentStatus : "Pending",
       // txnnumber : "tok_P1Ke582410437vHE23RC3839",
       txnnumber : "",
       paidBy : "Cash Payment",
       txnRespounse : {}
     };
//     // Complete the order
      const response = await orderchangestatus(options);
     if (response.status) {
       const orderData = {
         paidAmount: totalamount.toFixed(2),
        //  treats:treat,
       };
       const cartdata = JSON.parse(localStorage.getItem('cart')) || [];
      const  shopname = cartdata[0].store.shop_name;
       sessionStorage.setItem("orderDataComplete", JSON.stringify(orderData));
       sessionStorage.setItem("shopname", JSON.stringify(shopname));
       sessionStorage.setItem("treat", JSON.stringify(treat));
        sessionStorage.removeItem("orderData");
        sessionStorage.removeItem("addressData");
      
       // // Remove cart data from localStorage
       localStorage.removeItem("cart");
       navigate("/order-recieved");
       // navigate("/order-recieved", {
      //   state: {
       //     orderDataComplete: orderData,
              //     shopname: shopname,
       //   },
       // });
       //  navigate("/delivery-process-final-details");
     }
   } catch (error) {
     // Handle errors and provide feedback
     console.error(error.message);
     alert('An error occurred while completing the order. Please try again.');
   }
 };
useEffect(() => {
  fetchWalletData();
  fetchPromocodeData();
  
}, []);
useEffect(() => {
  if (cartData) {
    const defaultVariants = {};
    const initialQuantities = {};

    cartData.forEach(item => {
      const productId = item?.productData?._id;

      if (productId && item?.varients?.length) {
        item.varients.forEach(variant => {
          const variantId = variant._id;

          // Add variant to defaultVariants only if it's not already present
          if (!defaultVariants[variantId]) {
            defaultVariants[variantId] = variant;
          }

          // Accumulate quantities for variants with the same _id
          initialQuantities[variantId] = (initialQuantities[variantId] || 0) + 1;
        });
      }
    });

    // Set the selected variants and their quantities
    setSelectedVariants(defaultVariants);
    setQuantities(initialQuantities);
  }
}, [cartData]);

const walletLabel = `Wallet${walletData?.avlBalance ? ` (Treats ${walletData.avlBalance})` : "(0)"}`;

const handleCouponClick = (promoCode, discounts) => {
  setSelectedPromoCode(promoCode);
  setDiscount(discounts);
  setDiscountAmount(0);
};

const calculateDiscount = (discountPercent) => {
  return (subtotal * (discountPercent / 100));
};
const total = subtotal - discountAmount + orderData.shippingCharge;
const totalamount = total - treatsUsed;
const treat = (totalamount.toFixed(2)) / 10;
const capitalizeFirstLetter = (str) => {
  // Check if the input is a string
  if (typeof str !== 'string') return ''; // If not a string, return an empty string
  // Capitalize the first letter and concatenate with the rest of the string
  return str.charAt(0).toUpperCase() + str.slice(1);
};


  useEffect(() => {
    const storedCartData = localStorage.getItem("cart");
    
    if (storedCartData) {
        setCartData(JSON.parse(storedCartData));
    } else {
        console.log("No cart data found in localStorage.");
    }
}, []);

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
                  <span>{capitalizeFirstLetter(USER_INFO.name)}</span>
                </div>
                <div className="col-12 col-md-4 d-flex align-items-center mb-3 mb-md-0 store_process_heading_name">
                  <FaPhone className="me-2" />
                  <span>{USER_INFO.country_code}-{USER_INFO.phone}</span>
                </div>
                <div className="col-12 col-md-4 d-flex align-items-center store_process_heading_name">
                  <FaEnvelope className="me-2" />
                  <span>{capitalizeFirstLetter(USER_INFO.email)}</span>
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
                {/* <CiLocationOn /> */}
                <img src="/frisbeeImage/delivery_location.png" alt=""  width="30px" /> 
              </div>
              <div className="col-10 d-flex align-items-center">
                <span className="delivery-type-text store_process_instore_collect">
                   <span> Delivery </span>
                  <span className="store_click_collect">
                   (Home Delivery), 
                  </span>
                  <span className="same_day_delivery"> {orderData.deliveryMethod}</span>
                </span>
              </div>
            </div>
            {/* //Next Line */}
            <div className="col mt-4">
              <span className="store_process_you_are_logged_in">
                Select delivery Options
              </span>
            </div>
            <div className="p-2 mt-2 rounded user-info-container store_process_heading_name_main_div">
            <p>
              {capitalizeFirstLetter(addressData.firstname)} {capitalizeFirstLetter(addressData.lastname)},
              {capitalizeFirstLetter(addressData.phone)}, {capitalizeFirstLetter(addressData.email)}<br />
              {capitalizeFirstLetter(addressData.apartment_no)}, {capitalizeFirstLetter(addressData.building_name)},
              {capitalizeFirstLetter(addressData.address)}, {capitalizeFirstLetter(addressData.city)}
            </p>

            </div>
            <div className="store_process_order_item">
              <h4>Order Items</h4>
            </div>
            <div>
            {uniqueProducts.map(item => (
                <div
                key={item.productData._id}
                  className="row align-items-center py-2 store_process_product_imge_div"
                >
                  <div className="col-2 col-sm-2 col-md-2  store_process_product_imge">
                    <img
                      src={`${ASSETS_BASE_URL}${item.productData?.image}`}
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
                        {item.productData?.name}
                        </span>
                        <div className="store_process_for_kg_main_div">
                        {item.varients?.map((variant, variantIndex) => (
                                                    <span
                                                        key={variantIndex}
                                                        className={variant === selectedVariants[item.varients[0]._id]
                                                            ? "store_process_for_g"
                                                            : "store_process_for_kg"
                                                        }
                                                        onClick={() => handleVariantClick(item.productData?._id, variant)}
                                                    >
                                                        {variant.unit}
                                                    </span>
                                                ))}
                        </div>
                        <div className="store_process_aed ">
                        <span className="store_process_predigree">
                        AED {calculateDiscountedPrice(item.varients[0]._id, quantities[item.varients[0]._id] || 1).toFixed(2)}
                                                </span>
                                                {selectedVariants[item.productData?._id]?.discount > 0 && (
                                                    <span className="text-muted ml-2 text-decoration-line-through store_process_predigree_aed">
                                                        AED {selectedVariants[item.varients[0]._id]?.rate * (quantities[item.varients[0]._id] || 1) || 0}
                                                    </span>
                                                )}
                        </div>
                      </div>
                      <div className="col-md-4 d-flex align-items-end store_process_last_btn_section">
                        <div className="quantity_container">
                          <span className="quantity-text">Qty :</span>
                          <span className="quantity-number">
                          {quantities[item.varients[0]._id] < 10 ? `0${quantities[item.varients[0]._id]}` : quantities[item.varients[0]._id]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="special_notes_container">
              <div className="alert alert-primary custom_alert" role="alert">
                You will earn {treat.toFixed(2)} frisbee treats in this order!
              </div>
              <div className="form-group store_process_form_section">
                <form action="#">
                  <label htmlFor="specialNotes">Special Notes</label>
                 
           <textarea
      className="form-control custom_input"
      id="specialNotes"
      placeholder="Add notes here...."
      value={specialNotes}
      onChange={handleInputChange}
      rows="2" // Initial number of rows
    />
     {error && <span className="error">{error}</span>}
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
  {/* Separate Wallet Radio Button */}
  <div className="form-check store_process_radio_section">
    <input
      className="form-check-input custom-radio"
      type="checkbox"
      name="paymentMethod"
      id="paymentMethodWallet"
      checked={selectedMethod === walletLabel}
      value={`Wallet${walletData?.avlBalance ? ` (Treats ${walletData.avlBalance})` : ""}`}
      onChange={handleChange}
      disabled={walletData?.avlBalance === 0}
    />
    <label className="form-check-label" htmlFor="paymentMethodWallet">
      {`Wallet${walletData?.avlBalance.toFixed(2) ? ` (Treats ${walletData.avlBalance.toFixed(2)})` : "(0)"}`}
    </label>
  </div>

  {/* Other Payment Methods */}
  {["Cash Payment", "Apple Pay", "Debit / Credit Card"].map((method, index) => (
    <div className="form-check store_process_radio_section" key={index}>
      <input
        className="form-check-input custom-radio"
        type="radio"
        name="paymentMethod"
        id={`paymentMethod ${index}`}
        value={method}
        checked={selectedPaymentMethod === method}
        onChange={handleRadioChange}
      />
      <label className="form-check-label" htmlFor={`paymentMethod ${index}`}>
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
          value={selectedPromoCode}
          onChange={(e) => {
            setSelectedPromoCode(e.target.value);
            setDiscountAmount(0); // Reset the discount amount when input changes
            setIsCouponApplied(false); // Reset coupon applied state
            setCouponErrorMessage(""); 
          }}
        />
       {!isCouponApplied && (
          <button
            className="btn btn-primary ml-2"
            onClick={handleApplyCoupon}
          >
            Apply
          </button>
        )}
        {isCouponApplied && (
          <button
            className="btn btn-secondary ml-2"
            onClick={handleRemoveCoupon}
          >
            Remove Coupon
          </button>
        )}
                                    {couponErrorMessage && (
                                <div className="alert alert-danger mt-2">
                                    {couponErrorMessage}
                                </div>
                            )}
            </div>
            <div className="store_process_payement_carousls">
  <Slider {...settings} className="store_process_payement_carousls_child_div">
    {couponitems && couponitems.length > 0 ? (
      couponitems.map((item, index) => (
        <div key={index} className="discount_slide" onClick={() => handleCouponClick(item.promocode,item.discounts)}>
          <div className="d-flex justify-content-center align-items-center store_process_carousls_image">
            <img
              className="d-block"
              src="/frisbeeImage/store_process_carouslos.png"
              alt={item.title}
              style={{
                width: "75px",
                height: "75px",
                borderRadius: "10px",
              }}
            />
            <div className="discount_details_store_process">
              <h5 className="text-danger">{item.discounts}% Discount</h5>
              <p>{item.title}</p>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No coupons available</p> // Show a message or loader if no data is available
    )}
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
                      <td>Sub Total :-</td>
                      {/* <td className="text-end">{calculateSubtotal().toFixed(2)} AED</td> */}
                      <td className="text-end">{subtotal.toFixed(2)} AED</td>
                    </tr>
                    <tr>
                      <td>Tier Discount :-</td>
                      <td className="text-end text-danger">-AED {discountAmount.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Shipping Charge :-</td>
                      <td className="text-end text-danger">{orderData.shippingCharge} AED</td>
                    </tr>
                    <tr>
                      <td>Total :-</td>
                      <td className="text-end">AED {total.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Treats Used ({treatavlsUsed.toFixed(2)}) :-</td>
                      <td className="text-end">-{treatsUsed}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row mb-4 mt-4 font-weight-bold store_process_payement_deatils_heading_child_div store_process_deatils_price">
                <div className="col">Amount Due :-</div>
                <div className="col text-end">AED {totalamount.toFixed(2)}</div>
              </div>
              <div className="login_user_otp_for_bottom_button">
                 <button className="btn btn-danger btn-lg mb-3 user_otp_first"  onClick={handleCompleteOrder}> 
                {/* <button className="btn btn-danger btn-lg mb-3 user_otp_first"  onClick={handleCompleteOrderpayment}> */}
                {isProcessing ? 'Processing...' : 'Complete Order'}
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

export default DeliveryProcessItemDeatils;
