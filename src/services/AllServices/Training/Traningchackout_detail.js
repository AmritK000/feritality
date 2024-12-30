import React, { useState, useEffect } from "react";
import { FaUser, FaPhone, FaEnvelope, FaRegTrashAlt } from "react-icons/fa";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { FaLocationDot } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";
import { MdCall } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ASSETS_BASE_URL,TAP_URL } from "../../../config/constants";
import { useLocation, useNavigate, Link } from "react-router-dom";
import RatingsStar from "../../../components/RatingsStar";
import { create as OrderPlaced, changeStatus,pickUpPrice } from "../../../controllers/booking/traningBooking"
import { list as promoList } from "../../../controllers/booking/promoCode"
import { wallethistory,paymentordercomplete } from "../../../controllers/store/shopController"
import { calculateAge } from "../../../util/common";
import moment from "moment";
import { fetchIpAddress } from '../../../controllers/API'
import SkeltonList from "../../../components/SkeltonEffect/list";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Traningchackout_detail() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
   
    const state = JSON.parse(sessionStorage.getItem("checkoutData1"));
    const [checkoutData, setCheckoutData] = useState(state)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Cash Payment');
    const [specialNotes, setSpecialNotes] = useState('');
    const [error, setError] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [selectedPromoCode, setSelectedPromoCode] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);
    const [discountamountdata, setDiscount] = useState(0);
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [couponitems, setItems] = useState();
    const [treatsUsed, setTreatsUsed] = useState(0);
    const [treatavlsUsed, setAvlTreatsUsed] = useState(0);
    const [walletData, setWalletData] = useState(null);
    const [avlBalance, setAvlBalance] = useState();
    // const [selectedMethod, setSelectedMethod] = useState("Wallet (Treats 100)");
    const [selectedMethod, setSelectedMethod] = useState(false);
    const userInfo = JSON.parse(sessionStorage.getItem("USER-INFO"));
    const [couponErrorMessage, setCouponErrorMessage] = useState(""); 
    const [pickupPrice, setPickupPrice] = useState("");

    const [isProcessing, setIsProcessing] = useState(false);
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



    /*********************************************************
      *  This function is use to handle promo code list API
      *********************************************************/
    const fetchPromocodeData = async () => {
        try {
            const options = {
                service: state?.checkoutData?.servicesId?.category?._id,
                type: "",
                condition: {
                    service: state?.checkoutData?.servicesId?.category?._id,
                    status: "A"
                },
                select: {
                    title: true,
                    promocode: true,
                    discount_type: true,
                    discounts: true,
                    eligible_amount: true,
                    status: true,
                    redeem_to: true,
                    vendor: true,
                    store: true,
                    branch: true,
                    service: true
                },
                sort: { "_id": -1 },
                page: 1
            }
            const response = await promoList(options);
            if (response.status === true || response.status === 200) {
                setItems(response?.result);
            }
        } catch (error) {
            console.log("Failed to fetch promoCode list:", error);
        }
    }

    /*********************************************************
          *  This function is use to handle fetchWalletData API
          *********************************************************/
    const fetchWalletData = async () => {
        try {
            const options = {};
            const response = await wallethistory(options);
            if (response) {
                setAvlBalance(response.result.avlBalance.toFixed(2));
                setWalletData(response.result);
            } else {
                console.log("No wallet data found or response status is not true");
            }
        } catch (error) {
            console.error("Failed to fetch wallet data: ", error);
        }
    };

    /*********************************************************
     *  This function is use to handle calculation for order code 
     *********************************************************/
    const handleCouponClick = (promoCode, discounts) => {
        setSelectedPromoCode(promoCode);
        setDiscount(discounts);
        setDiscountAmount(0);
        setIsCouponApplied(false);
        setCouponErrorMessage(""); 
    };

    const handleRemoveCoupon = () => {
        setSelectedPromoCode("");
        setDiscountAmount(0);
        setIsCouponApplied(false);
          setCouponErrorMessage(""); 
    }

    const walletLabel = `Wallet${avlBalance ? ` (Treats ${avlBalance})` : ""}`;
    const calculateDiscount = (discountPercent) => {
        const paymentData = checkoutData;
        const subtotal = paymentData?.checkoutData?.servicesId?.price;
        return (subtotal * (discountPercent / 100));
    };

    const total = checkoutData?.checkoutData?.servicesId?.price - discountAmount + (state.twoWay ? (pickupPrice?.total_charges ?? 0)*2 : pickupPrice?.total_charges ?? 0);
    const totalamount = total - treatsUsed;
    /*********************************************************
     *  This function is use to handleApplyCoupon code 
     *********************************************************/
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
            const coupon = couponitems?.find((item) => item.promocode === promoCode);
            if (coupon) {
                setDiscountAmount(calculateDiscount(coupon.discounts));
                setIsCouponApplied(true);
            } else {
                setDiscountAmount(0);
                setIsCouponApplied(false);
            }
        }
    }


    const handleRadioChange = (event) => {
        const { value } = event.target;
        setSelectedPaymentMethod(value);
        setSelectedMethod('');
       
    };

    /*********************************************************
     *  This function is use to handleSubmit for complete order
     *********************************************************/
    const handleSubmit = async (e) => {
        setIsProcessing(true);
        e.preventDefault();
        setIsLoading(true);
        const checkoutFormData = checkoutData?.checkoutData;
        const service = [{ serviceId: checkoutFormData?.servicesId?._id, total: checkoutFormData?.servicesId?.price }]
        const isTreatsUsed = typeof selectedMethod === 'string' && selectedMethod.startsWith("Wallet") ? "Y" : "N";
        const treats = isTreatsUsed === "Y" ? treatavlsUsed : 0;
        const treatsDiscount = isTreatsUsed === "Y" ? treatsUsed : 0;
        const isCouponUsed = isCouponApplied ? 'Y' : 'N';
        const promocode = isCouponApplied ? selectedPromoCode : "";
        const ipAddress = await fetchIpAddress();
        const form = new FormData();
        // Append additional data to the form
        form.append("vendorId", checkoutFormData?.servicesId?.vendor);
        form.append("petData", state?.petData?._id);
        form.append('shopId', checkoutFormData?.servicesId?.store?._id);
        form.append('branch', checkoutFormData?.servicesId?.branch?._id);
        form.append("pet_name", state?.petData?.name);
        form.append("pet_gender", state?.petData?.gender);
        form.append("pet_age", moment(state?.petData?.dob).format("YYYY-MM-DD"));
        form.append("pet_breed", state?.petData?.breed);
        form.append('owner_name', userInfo?.name);
        form.append('owner_phone', userInfo?.phone);
        form.append('dog_size',"S");
        form.append("pick_drop", state?.isPickDropToggled ? "Y" : "N");
        form.append(
            "pick_drop_type",
            state.twoWay ? "Two-way" : "One-way"
          );
        form.append('owner_email', userInfo?.email);
        form.append(
          "owner_address", 
          `${state.selectedAddressData.apartment_no} ${state.selectedAddressData.building_name} ${state.selectedAddressData.address}`
        );
         form.append('appointment_date', checkoutFormData?.selectedDate);
        form.append('appointment_time', checkoutFormData?.selectedAvailableTimes);
        form.append('document', checkoutFormData.fileName);
        form.append('services', JSON.stringify(service));
        form.append('paidAmount', totalamount);
        form.append('ipAddress', ipAddress);
        form.append('notes', specialNotes);
        form.append('category', checkoutFormData?.servicesId?.category?._id);
        form.append('discount', discountAmount);
        form.append('isCouponUsed', isCouponUsed);
        form.append('promocode', promocode);
        form.append('isTreatsUsed', isTreatsUsed);
        form.append('treats_discount', treatsDiscount);
        form.append('treats', treats);
        form.append('version', 'V1');
        form.append('platform', 'Web');
        form.append('servive_type', checkoutFormData?.serviceType);
        form.append(
            "to_address",
            state?.pickupType === "Centre to user location"
              ? `${state?.selectedAddressData?.apartment_no}, ${state?.selectedAddressData?.address}`
              : `${state?.checkoutData.servicesId?.branch?.address}`
          );
          form.append(
            "from_address",
            state?.pickupType === "Centre to user location"
              ? `${state?.checkoutData.servicesId?.branch?.address}`
              : `${state?.selectedAddressData?.apartment_no}, ${state?.selectedAddressData?.address}`
          );
          form.append("oneWayPickUpLocationTime", state?.pickupTime);
          form.append(
            "twoWayPickUpLocationTime",
            state?.twoWay ? state?.pickupTime : ""
          );
          form.append(
            "twoWayPickUpCenterTime",
            state?.twoWay ? state?.dropTime : ""
          );
          form.append('pick_drop_charge', state.twoWay ? (pickupPrice?.total_charges ?? 0)*2 : pickupPrice?.total_charges ?? 0);
          form.append('pick_drop_address', state?.selectedAddressData?._id ? state?.selectedAddressData?._id : '');
          
        try {
         const res = await OrderPlaced(form);
            if (res.status === true || res.status === 200) {
              if (selectedPaymentMethod !== "Cash Payment") {
               handleCompleteOrderpayment(res?.result);
               const treats = treat;
               const dataToStore = { checkoutFormData, isTreatsUsed, treats, totalamount };
              sessionStorage.setItem('checkoutData', JSON.stringify(dataToStore));
              }else{
                const options = {
                  bookingId: res?.result?.order?._id,
                  paymentStatus: 'Pending',
                  status: 'Pending',
                  txnnumber: "NA",
                  paidBy: "Cash Payment"
              };
              const response = await changeStatus(options);
              if (response.status) {
                  setIsLoading(false);
                  const treats = treat;
                  navigate("/booking-recieved", { state: { checkoutFormData, isTreatsUsed, treats, totalamount } });
              } else {
                  return false;
              }
          }
                // const response = await changeStatus(options);
                // if (response.status) {
                //     setIsLoading(false);
                //     const treats = treat;
                //     navigate("/booking-recieved", { state: { checkoutFormData, isTreatsUsed,treats, totalamount } });
                // }
            }else if (res.status === false) {
                // Show coupon error message
                setCouponErrorMessage("Coupon is out of limit, please use another coupon.");
                setIsLoading(false); // Stop loading spinner
            }  else {
                return false;
            }
        } catch (error) {
            console.error("fail:", error);
        }finally {
            setIsProcessing(false); // Set processing to false when the API call is done
          }
    };

    function generateTransactionID() {
      const timestamp = Date.now(); // Get the current timestamp
      const randomNum = Math.floor(Math.random() * 10000); // Generate a random number
      return `txn_${timestamp}_${randomNum}`; // Format the transaction ID
    }
    const handleCompleteOrderpayment = async (result) => {
      setIsProcessing(true);
      try {
       const transaction=generateTransactionID();
        const tapPaymentData = {
          "amount": result.order.paidAmount,
          "currency": "AED",
          "description": "Test Description",
            "transaction": transaction,
            "order": result.order.booking_seq_id,
            "first_name": userInfo?.name,
            "middle_name": "",
            "last_name": "",
            "email": userInfo?.email,
               "country_code": userInfo.country_code,
               "number": userInfo.phone,
               "threeDSecure":true,
              "save_card":false,
              "url": `${TAP_URL}booking-recieved`,
               "udf1": "Metadata 1",
               "receiptemail":true,
               "sms": true,
               "merchantid":123,
               "sourceid":"src_card",
               "posturl":`${TAP_URL}booking-recieved`,
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
                    sessionStorage.setItem("transaction", JSON.stringify(transaction));
                    sessionStorage.setItem("chargeId", JSON.stringify(chargeId));
                    const treats = treat;
                    sessionStorage.setItem("result", JSON.stringify(result));
                    sessionStorage.setItem("treats", JSON.stringify(treats));
                }
    
      } catch (error) {
        console.error('Error making Tap API request:', error.message);
        console.error('Full error stack:', error);
        alert("There was a problem processing the payment. Please check your network or API configuration.");
      } finally {
        setIsProcessing(false);
      }
    };
  
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1.1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const capitalizeFirstLetter = (str) => {
        // Check if the input is a string
        if (typeof str !== 'string') return ''; // If not a string, return an empty string
        // Capitalize the first letter and concatenate with the rest of the string
        return str.charAt(0).toUpperCase() + str.slice(1);
      };

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
    const getPrice = async () => {
      try {
          const options = {
              usrLat: state?.selectedAddressData?.latitude,
              usrLng: state?.selectedAddressData?.longitude,
              storeLat: state?.checkoutData?.servicesId?.branch?.latitude,
              storeLng: state?.checkoutData?.servicesId?.branch?.longitude,
          };
          const Data = await pickUpPrice(options);
          if (Data.status && Data.result) {
              setPickupPrice(Data.result);
          } else {
              setPickupPrice();
          }
      } catch (error) {
          console.error("Error fetching price:", error);
          setPickupPrice();
      }
  };
  const treat = (totalamount.toFixed(2)) / 10;
    useEffect(() => {
        fetchPromocodeData();
        getPrice();
        fetchWalletData();
    }, []);
 
    return (
        <>
            <Header></Header>
            <div className="container my-4 mt-5">
                <div className="row">
                    <div className="col-md-8">
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
                        {(state?.checkoutData?.serviceType ==="Home") && (

                        <div className="">
                            <div className="pet_details_info mt-4">
                                <p>Service Details</p>
                                <div id="booking_info">
                                    <div className="d-flex grooming_box" >
                                        <div>
                                            <img src={`${ASSETS_BASE_URL}${state?.checkoutData?.servicesId?.image}`} alt={state?.checkoutData?.servicesId?.image} className="testnominal_img mx-0" />
                                            <div className="add_review  my-0" id="add_review">
                                                <ul className="review_pet">
                                                    <RatingsStar rating={state?.checkoutData?.servicesId?.rating} />
                                                    <span>{state?.checkoutData?.servicesId?.rating}</span>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="personal_details_petinfo">
                                            <h2>{state?.checkoutData?.servicesId?.name}...</h2>
                                            {/* <p>(Without Haircut/Shave)...</p> */}
                                            <p>{state?.checkoutData?.servicesId?.details.length > 20 ? `(${state?.checkoutData?.servicesId?.details.substring(0, 20)})...` : state?.checkoutData?.servicesId?.details}</p>
                                            <h4>AED {state?.checkoutData?.servicesId?.price?.toFixed(2)} </h4>
                                        </div>
                                    </div>

                                    <div className="d-flex pet_details_info mx-2 justify-content">
                                        <div>
                                            <img src={`${ASSETS_BASE_URL}${state?.checkoutData?.servicesId?.store?.image}`} alt={state?.checkoutData?.servicesId?.store?.image} className="testnominal_img mx-0" />
                                        </div>
                                        <div className="personal_details_petinfo">
                                            <h2>{state?.checkoutData?.servicesId?.store?.shop_name}</h2>
                                            <p className="mx-0"><Link to={`https://www.google.com/maps/dir/?api=1&destination=${state?.checkoutData?.servicesId?.branch?.latitude},${state?.checkoutData?.servicesId?.branch?.longitude}`}
                                                target="_blank"
                                                rel="noopener noreferrer">
                                                <FaLocationDot id="location" />
                                            </Link>
                                                {state?.checkoutData?.servicesId?.branch?.city}</p>
                                        </div>
                                        <div className="add_review">
                                            <RatingsStar rating={state?.checkoutData?.servicesId?.rating} />
                                            <span>{state?.checkoutData?.servicesId?.rating}</span>
                                        </div>
                                    </div>

                                    <div className="d-flex pet_details_info mx-2 justify-content">
                                        <div className="pick_drop_info">
                                            <p className="pet_info">
                                                <span>Type :</span>
                                                {state?.checkoutData?.serviceType}</p>
                                        </div>
                                        <div className="pick_drop_info">
                                            <p className="pet_info">
                                                <span>Date :</span>
                                                {moment(state?.checkoutData?.selectedDate).format('DD-MM-YYYY')}</p>
                                        </div>
                                        <div className="pick_drop_info">
                                            <p className="pet_info">
                                                <span> Time : </span>
                                                {state?.checkoutData?.selectedAvailableTimes}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="pet_details_info mt-4">
                                <p>Pet Details</p>
                                <div className="more_info">
                                    <div className="d-flex">
                                        <div className="py-0">
                                            <img src={`${ASSETS_BASE_URL}${state?.petData?.image}`} alt={state?.petData?.image} width={`100px`} />
                                        </div>
                                        <div className="py-0">
                                            <h2 className="pet_details_name">{state?.petData?.name}</h2>
                                            <p className="pet_info"><span>Age : </span>{state?.petData?.dob ? calculateAge(state?.petData?.dob) : "Age is Not Available"}</p>
                                            <p className="pet_info"><span>Gender : </span>{state?.petData?.gender}</p>
                                        </div>
                                        <div className="py-0 pt-3">
                                            <p className="pet_info"><span>Breed : </span>{state?.petData?.breed}</p>
                                            <p className="pet_info"><span> Location : </span>{state?.petData?.city}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="pet_details_info mt-4">
                                <p>Pet Owner Details</p>
                                <div className="more_info">
                                    <div>
                                        <h1>{capitalizeFirstLetter(userInfo?.name)}</h1>
                                        <ul>
                                            <li><span><MdCall /></span><p>{userInfo.phone}</p></li>
                                            <li><span><FaEnvelope></FaEnvelope></span><p>{userInfo.email}</p></li>
                                            <li><span><FaLocationDot /></span><p>{capitalizeFirstLetter(userInfo.address) || "C-25 MiQB Building , Sector 58, Noida, Uttar Pradesh 201309"}</p></li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <div className="pet_details_info mt-4">
                                <p>Pick Up & Drop Address</p>
                                <div className="more_info">
                                    <div>
                                       <p>
                                        {capitalizeFirstLetter(state?.selectedAddressData.firstname)} {capitalizeFirstLetter(state?.selectedAddressData.lastname)},
              {state?.selectedAddressData.phone}, {state?.selectedAddressData.email}<br />
              {capitalizeFirstLetter(state?.selectedAddressData.apartment_no)}, {capitalizeFirstLetter(state?.selectedAddressData.building_name)},
              {capitalizeFirstLetter(state?.selectedAddressData.address)}, {capitalizeFirstLetter(state?.selectedAddressData.city)}
                                  </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        )}


{(state?.checkoutData?.serviceType ==="Institute" && state?.isPickDropToggled === false) && (

<div className="">
    <div className="pet_details_info mt-4">
        <p>Service Details</p>
        <div id="booking_info">
            <div className="d-flex grooming_box" >
                <div>
                    <img src={`${ASSETS_BASE_URL}${state?.checkoutData?.servicesId?.image}`} alt={state?.checkoutData?.servicesId?.image} className="testnominal_img mx-0" />
                    <div className="add_review  my-0" id="add_review">
                        <ul className="review_pet">
                            <RatingsStar rating={state?.checkoutData?.servicesId?.rating} />
                            <span>{state?.checkoutData?.servicesId?.rating}</span>
                        </ul>
                    </div>
                </div>
                <div className="personal_details_petinfo">
                    <h2>{state?.checkoutData?.servicesId?.name}...</h2>
                    {/* <p>(Without Haircut/Shave)...</p> */}
                    <p>{state?.checkoutData?.servicesId?.details.length > 20 ? `(${state?.checkoutData?.servicesId?.details.substring(0, 20)})...` : state?.checkoutData?.servicesId?.details}</p>
                    <h4>AED {state?.checkoutData?.servicesId?.price?.toFixed(2)} </h4>
                </div>
            </div>

            <div className="d-flex pet_details_info mx-2 justify-content">
                <div>
                    <img src={`${ASSETS_BASE_URL}${state?.checkoutData?.servicesId?.store?.image}`} alt={state?.checkoutData?.servicesId?.store?.image} className="testnominal_img mx-0" />
                </div>
                <div className="personal_details_petinfo">
                    <h2>{state?.checkoutData?.servicesId?.store?.shop_name}</h2>
                    <p className="mx-0"><Link to={`https://www.google.com/maps/dir/?api=1&destination=${state?.checkoutData?.servicesId?.branch?.latitude},${state?.checkoutData?.servicesId?.branch?.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        <FaLocationDot id="location" />
                    </Link>
                        {state?.checkoutData?.servicesId?.branch?.city}</p>
                </div>
                <div className="add_review">
                    <RatingsStar rating={state?.checkoutData?.servicesId?.rating} />
                    <span>{state?.checkoutData?.servicesId?.rating}</span>
                </div>
            </div>

            <div className="d-flex pet_details_info mx-2 justify-content">
                <div className="pick_drop_info">
                    <p className="pet_info">
                        <span>Type :</span>
                        {state?.checkoutData?.serviceType}</p>
                </div>
                <div className="pick_drop_info">
                    <p className="pet_info">
                        <span>Date :</span>
                        {moment(state?.checkoutData?.selectedDate).format('DD-MM-YYYY')}</p>
                </div>
                <div className="pick_drop_info">
                    <p className="pet_info">
                        <span> Time : </span>
                        {state?.checkoutData?.selectedAvailableTimes}</p>
                </div>
            </div>
        </div>

    </div>
    <div className="pet_details_info mt-4">
        <p>Pet Details</p>
        <div className="more_info">
            <div className="d-flex">
                <div className="py-0">
                    <img src={`${ASSETS_BASE_URL}${state?.petData?.image}`} alt={state?.petData?.image} width={`100px`} />
                </div>
                <div className="py-0">
                    <h2 className="pet_details_name">{state?.petData?.name}</h2>
                    <p className="pet_info"><span>Age : </span>{state?.petData?.dob ? calculateAge(state?.petData?.dob) : "Age is Not Available"}</p>
                    <p className="pet_info"><span>Gender : </span>{state?.petData?.gender}</p>
                </div>
                <div className="py-0 pt-3">
                    <p className="pet_info"><span>Breed : </span>{state?.petData?.breed}</p>
                    <p className="pet_info"><span> Location : </span>{state?.petData?.city}</p>
                </div>
            </div>

        </div>
    </div>
    <div className="pet_details_info mt-4">
        <p>Pet Owner Details</p>
        <div className="more_info">
            <div>
                <h1>{userInfo?.name}</h1>
                <ul>
                    <li><span><MdCall /></span><p>{userInfo.phone}</p></li>
                    <li><span><FaEnvelope></FaEnvelope></span><p>{userInfo.email}</p></li>
                    <li><span><FaLocationDot /></span><p>{capitalizeFirstLetter(userInfo.address) || "C-25 MiQB Building , Sector 58, Noida, Uttar Pradesh 201309"}</p></li>
                </ul>
            </div>

        </div>
    </div>
   
</div>
)}

                        {(state?.checkoutData?.serviceType ==="Institute" && state?.isPickDropToggled === true) && (

                        <div className="">
              <div className="pet_details_info mt-4">
                <p>Service Details</p>
                <div id="booking_info" className="pb-1">
                  <div className="d-flex grooming_box">
                    <div>
                      <img
                        src={`${ASSETS_BASE_URL}${state?.checkoutData?.servicesId?.image}`}
                        alt="testinominal_img"
                      ></img>
                      <div className="add_review  my-0" id="add_review">
                        <RatingsStar rating={state?.checkoutData?.servicesId?.rating} />
                        <span>{state?.checkoutData?.servicesId?.rating}</span>
                      </div>
                    </div>
                    <div className="personal_details_petinfo">
                      <h2>{state?.checkoutData?.servicesId?.name}</h2>
                      <p>
                        {state?.checkoutData?.servicesId?.details.length > 20
                          ? `(${state?.checkoutData?.servicesId?.details.substring(
                              0,
                              20
                            )})...`
                          : state?.checkoutData?.servicesId?.details}
                      </p>
                      <h4>AED {state?.checkoutData?.servicesId?.price?.toFixed(2)}</h4>
                    </div>
                  </div>

                  <div className="d-flex pet_details_info mx-2 justify-content">
                    <div>
                      <img
                        src={`${ASSETS_BASE_URL}${state?.checkoutData?.servicesId?.store?.image}`}
                        alt="testinominal_img"
                        className="testnominal_img mx-0"
                      ></img>
                    </div>
                    <div className="personal_details_petinfo">
                      <h2 className="text-left">
                        {state?.checkoutData?.servicesId?.store?.shop_name}
                      </h2>
                      <p className="text-left">
                        <MdLocationPin id="center_location" />{" "}
                        {state?.checkoutData?.servicesId?.branch?.address}
                      </p>
                    </div>
                    <div className="add_review">
                      <RatingsStar rating={state?.checkoutData?.servicesId?.rating} />
                      <span>{state?.checkoutData?.servicesId?.rating}</span>
                    </div>
                  </div>

                  <div className="pet_details_info mx-2 ">
                    <h2 className="text-left">Booking Details</h2>

                    <div className="day_care_infodetails">
                      <div className="pick_drop_info">
                        <p className="pet_info">
                          <span>Date :</span>
                          {moment(state?.checkoutData?.selectedDate).format(
                            "DD-MM-YYYY"
                          )}
                        </p>
                      </div>
                      <div className="pick_drop_info">
                        <p className="pet_info">
                          <span>Time :</span>
                          {state?.checkoutData?.selectedAvailableTimes}
                        </p>
                      </div>
                    </div>
                  </div>
                  {state?.isRepeatToggled && (
                    <div className="pet_details_info mx-2 mb-2">
                      <h2 className="text-left mb-0">Repeat Days Details</h2>
                      <div className="pet_details_info mt-2 repeat_days">
                        <div className="d-flex justify-content">
                          <p className="mb-0">Repeat Days</p>
                          <ul className="d-flex justify-content week-day">
                            <li>Sun</li>
                            <li>Mon</li>
                            <li>Tue</li>
                            <li>Wed</li>
                            <li>Thu</li>
                            <li>Fri</li>
                            <li>Sat</li>
                          </ul>
                        </div>
                      </div>

                      <div className="day_care_infodetails mt-2">
                        <div className="pick_drop_info">
                          <p className="pet_info">
                            <span>Start Date </span>
                            12/02/2024
                          </p>
                        </div>
                        <div className="pick_drop_info">
                          <p className="pet_info">
                            <span>End Date :</span>
                            12/02/2024
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {state?.isPickDropToggled && (
                    <div className="pet_details_info mx-2 mb-2">
                      <h2 className="text-left">Pickup & Drop Details</h2>

                      <div className="day_care_infodetails">
                        <div className="pick_drop_info">
                          <p className="pet_info">
                            <span>Date :</span>
                            {moment(state?.checkoutData.selectedDate).format(
                              "DD-MM-YYYY"
                            )}
                          </p>
                        </div>
                        <div className="pick_drop_info">
                          <p className="pet_info">
                            <span>Time :</span>
                            {state?.pickupTime}
                          </p>
                        </div>
                      </div>

                      <h2 className="text-left mt-2">From Location</h2>
                      <div className="day_carelocationdetails">
                        <p className="pet_info">
                          {state?.pickupType === "Centre to user location"
                            ? `${capitalizeFirstLetter(state?.checkoutData?.servicesId?.branch?.address)}`
                            : `${capitalizeFirstLetter(state?.selectedAddressData.apartment_no)}, ${capitalizeFirstLetter(state?.selectedAddressData.address)}`}
                        </p>
                      </div>

                      <h2 className="text-left mt-2">To Location</h2>
                      <div className="day_carelocationdetails">
                        <p className="pet_info">
                          {state?.pickupType === "Centre to user location"
                            ? `${capitalizeFirstLetter(state?.selectedAddressData?.apartment_no)}, ${capitalizeFirstLetter(state?.selectedAddressData.address)}`
                            : `${capitalizeFirstLetter(state?.checkoutData?.servicesId?.branch?.address)}`}
                        </p>
                      </div>

                      <h2 className="text-left my-2">Pickup Timings</h2>

                      <div className="day_care_infodetails">
                        <div className="pick_drop_info">
                          <p className="pet_info">
                            <span>From User Location: </span>
                            {state?.pickupTime}
                          </p>
                        </div>
                        {state?.twoWay && (
                          <div className="pick_drop_info">
                            <p className="pet_info">
                              <span>From Centre Location:</span>
                              {state?.dropTime}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

             
              <div className="pet_details_info mt-4">
                <p>Pet Details</p>
                <div className="more_info">
                  <div className="d-flex">
                    <div className="py-0">
                      <img
                        src={`${ASSETS_BASE_URL}${state?.petData.image}`}
                        alt="testinominal_img"
                        className="pet_img"
                      ></img>
                    </div>
                    <div className="py-0">
                      <h2 className="pet_details_name">
                        {state?.petData.name}
                      </h2>
                      <p className="pet_info">
                        <span>Age : </span>
                        {calculateAge(state?.petData.dob)}
                      </p>
                      <p className="pet_info">
                        <span>Gender : </span>
                        {state?.petData.gender}
                      </p>
                    </div>
                    <div className="py-0">
                      <p className="pet_info pt-3">
                        <span>Breed :</span>
                        {state?.petData.breed}
                      </p>
                      <p className="pet_info">
                        <span> Location :</span>
                        {state?.petData.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pet_details_info mt-4">
                <p>Pet Owner Details</p>
                <div className="more_info">
                  <div>
                    <h1>{capitalizeFirstLetter(userInfo?.name)}</h1>
                    <ul>
                      <li>
                        <span>
                          <MdCall />
                        </span>
                        <p>+91{userInfo?.phone}</p>
                      </li>
                      <li>
                        <span>
                          <FaEnvelope></FaEnvelope>
                        </span>
                        <p>{userInfo?.email}</p>
                      </li>
                      <li>
                        <span>
                          <FaLocationDot />
                        </span>
                        <p>
                        {capitalizeFirstLetter(userInfo?.address)}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {state?.isPickDropToggled && (
                <div className="pet_details_info mt-4">
                  <p>Pick Up & Drop Address</p>
                  <div className="more_info p-3 mb-0" id="booking_info">
                    <p className="mb-0 address_details">
                      {capitalizeFirstLetter(state?.selectedAddressData.apartment_no)},{" "}
                      {capitalizeFirstLetter(state?.selectedAddressData.address)}
                    </p>
                  </div>
                </div>
              )}
             
            </div>
            
                        )}


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
                    <div className="col-md-4">
                        <div className="store_process_card_name">
                            <span className="font-weight-bold">Payment Details</span>
                        </div>
                        {/* Separate Wallet Radio Button */}
                        <div className="payment-methods p-3 store_process_wallet_section">
                            <div className="form-check store_process_radio_section">
                                <input
                                    className="form-check-input custom-radio"
                                    type="checkbox"
                                    name="paymentMethod"
                                    id="paymentMethodWallet"
                                    checked={selectedMethod === walletLabel}
                                    // value={`Wallet${walletData?.avlBalance? ` (Treats ${walletData.avlBalance.toFixed(2)})` : ""}`}
                                    value={`Wallet${avlBalance !== undefined && avlBalance !== null ? ` (Treats ${avlBalance})` : ""}`}
                                    onChange={handleChange}
                                    disabled={walletData?.avlBalance === 0}
                                />
                                <label className="form-check-label" htmlFor="paymentMethodWallet">
                                    {`Wallet${avlBalance ? ` (Treats ${avlBalance})` : ""}`}
                                </label>
                            </div>
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

                        {/* Apply Coupoun List */}
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
                                    setDiscountAmount(0);
                                    setIsCouponApplied(false);
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
                            {couponitems && couponitems.length > 0 ? (
                                <Slider {...settings}
                                    className="store_process_payement_carousls_child_div">
                                    {couponitems.map((items, index) => (
                                        // {items.map((item, index) => (
                                        <div key={index} className="discount_slide" onClick={() => handleCouponClick(items.promocode, items.discounts)}>
                                            <div className="d-flex justify-content-center align-items-center store_process_carousls_image">
                                                <img
                                                    className="d-block"
                                                    // src={`${ASSETS_BASE_URL}${items.image}`}
                                                    src={`/frisbeeImage/store_process_carouslos.png`}
                                                    alt={items.description}
                                                    style={{
                                                        width: "75px",
                                                        height: "75px",
                                                        borderRadius: "10px",
                                                    }}
                                                />
                                                <div className="discount_details_store_process">
                                                    <h5 className="text-danger">{items.discounts}%Discounts</h5>
                                                    <p>{items.title}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            ) : (
                                <SkeltonList />
                            )}
                        </div>


                        <div className="payment-details store_process_payement_deatils_heading mt-2">
                            <h6>Payment Details</h6>
                            <div className="store_process_payment_details_heading_child_div">
                                <table className="table  bg-light">
                                    <tbody>
                                        <tr>
                                            <td>Details</td>
                                            <td className="text-end">Price</td>
                                        </tr>
                                        <tr>
                                            <td>Sub Total :- </td>
                                            <td className="text-end">AED {(state?.checkoutData?.servicesId?.price).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td>Tier Discount :- </td>
                                            <td className="text-end text-danger">-AED{discountAmount.toFixed(2)}</td>
                                        </tr>
                                         <tr>
                                                <td>Pickup & Drop Charges :-</td>
                                                <td className="text-end ">
                                                    AED {state.twoWay ? (pickupPrice?.total_charges ?? 0)*2 : pickupPrice?.total_charges ?? 0}{" "}
                                                </td>
                                            </tr>
                                        <tr>
                                            <td>Total :-</td>
                                            <td className="text-end">AED {total.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td>Treats Used ({treatavlsUsed.toFixed(2)}) :- </td>
                                            <td className="text-end">-{treatsUsed}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="row mb-4 mt-4 font-weight-bold store_process_payement_deatils_heading_child_div store_process_deatils_price">
                                <div className="col">Amount Due :- </div>
                                <div className="col text-end">AED {totalamount.toFixed(2)}</div>
                            </div>
                            <div className="login_user_otp_for_bottom_button" >

                                <button className="btn btn-danger btn-lg mb-3 user_otp_first" onClick={handleSubmit}>
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

export default Traningchackout_detail;
