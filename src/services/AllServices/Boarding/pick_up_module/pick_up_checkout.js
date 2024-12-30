import React, { useEffect, useState } from "react";
import { FaUser, FaPhone, FaEnvelope, FaRegTrashAlt } from "react-icons/fa";
import Header from "../../../../components/Header";
import { testimonial_img } from "../../../../components/Images";
import Footer from "../../../../components/Footer";
import { MdLocationPin } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { MdCall } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { ASSETS_BASE_URL,TAP_URL } from "../../../../config/constants";
import RatingsStar from "../../../../components/RatingsStar";
import Cookies from "js-cookie"; // Import js-cookie
import moment from "moment";
import { calculateAge } from "../../../../util/common";
import {
  pickupPriceController,
  createBooking,
  changeStatus,
  wallethistory,
  promocodelist,
} from "../../../../controllers/services/boardingController";
import { fetchIpAddress } from "../../../../controllers/API";
import {paymentordercomplete} from "../../../../controllers/store/shopController";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Checkout_detail() {
  const [count, setCount] = useState(0);
  const [rating, setRating] = useState(0);
  const [petData, setPetData] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [pickupInfo, setpickupInfo] = useState(null);
  const [error, setError] = useState("");
  const [userinfo, setUserinfo] = useState([]);
  const [walletData, setWalletData] = useState(null);
  const [treatavlsUsed, setAvlTreatsUsed] = useState(0);
  const [treatsUsed, setTreatsUsed] = useState(0);
  const [treat, setTreat] = useState(0);
  const [pickupPrice, setPickupPrice] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(false);
  const [selectedTreat, setSelectedTreat] = useState("");
  const [selectedPromoCode, setSelectedPromoCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponitems, setItems] = useState();
  const [avlBalance, setAvlBalance] = useState();
  const [discountamountdata, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [couponErrorMessage, setCouponErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const walletLabel = `Wallet${avlBalance ? ` (Treats ${avlBalance})` : ""}`;
  const handleRating = (rate) => {
    setRating(rate);
  };



  // Assuming bookingData contains the relevant dates and price information
  const from_date = new Date(bookingData?.selectedDate);  // Convert from_date to Date object
  const to_date = new Date(bookingData?.selectedToDate);  // Convert to_date to Date object
  const subtotal = parseFloat(bookingData?.servicesId?.price?.toFixed(2));  // Get the subtotal price per day

  // Calculate the difference in time (in milliseconds)
  const diffInTime = to_date.getTime() - from_date.getTime();

  // Convert the difference in time to days (1 day = 1000ms * 60s * 60m * 24h)
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

  // Calculate the total price by multiplying the subtotal by the number of days
  const totalSubtotal = subtotal * diffInDays;
 
  /*********************************************************
     *  This function is use tocapitalizeFirstLetter
     *********************************************************/
  const capitalizeFirstLetter = (str) => {
    // Check if the input is a string

    if (typeof str !== 'string') return ''; // If not a string, return an empty string
    // Capitalize the first letter and concatenate with the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  /*********************************************************
     *  This function is use to calculate discount price
     *********************************************************/
  const calculateDiscount = (discountPercent) => {
    const basePrice = bookingData?.servicesId?.price?.toFixed(2);
    return basePrice * (discountPercent / 100);
  };

  /*********************************************************
     *  This function is use to handle change
     *********************************************************/
  const handleChange = (event) => {
    const method = event.target.value;
    console.log("method",method);
    setSelectedMethod(method);
    setSelectedPromoCode("");
    setSelectedTreat("");
    setTreatsUsed(0);
    setAvlTreatsUsed(0);
    if (method === "Cash Payment") {
      setPaymentMethod("cash");
    } else {
      setPaymentMethod("online");
    }
  };

  /*********************************************************
  *  This function is use to handle change
  *********************************************************/
  // const handleInputChange = (e) => {
  //   setSpecialNotes(e.target.value);
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
  /*********************************************************
   *  This function is use to handle final placed order
   *********************************************************/
  const store_process = async () => {
    // if (paymentMethod === "cash") {
      const response = await handleCreateBooking();
    //   console.log("Cash payment process completed.");
    // } else {
    //   console.log("Online payment method selected.");
    // }
  };

  /*********************************************************
   *  This function is use to handle pick up and drop price
   *********************************************************/
  const getPrice = async () => {
    try {
      const options = {
        usrLat: pickupInfo?.pickupDropAddress?.latitude,
        usrLng: pickupInfo?.pickupDropAddress?.longitude,
        storeLat: bookingData?.servicesId?.branch?.latitude,
        storeLng: bookingData?.servicesId?.branch?.longitude,
      };
      const Data = await pickupPriceController(options);
      if (Data.status && Data.result) {
        setPickupPrice(Data.result);
        console.log(pickupPrice, "here is the pickuop price");
      } else {
        setPickupPrice();
      }
    } catch (error) {
      console.error("Error fetching price:", error);
      setPickupPrice();
    }
  };

  /*********************************************************
   *  This function is use to calculate total amount
   *********************************************************/
  const totalAmount = (
    subtotal = 0,
    pickupAndDropCharges = 0,
    discount = 0,
    treatValue = 0,
    treatsUsed = 0,
    promocode = 0,
    // pickupInfo = { twoWay: false } // Default value for pickupInfo
  ) => {
    
    const effectivePickupAndDropCharges = pickupInfo?.twoWay
      ? pickupAndDropCharges * 2
      : pickupAndDropCharges;
  
    const total =
      subtotal +
      effectivePickupAndDropCharges -
      discount -
      treatValue -
      treatsUsed -
      promocode;
      
    return total.toFixed(2);
  };

  
  /*********************************************************
   *  This function is use to clear all order cookie
   *********************************************************/
  function clearAllOrderCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie =
        name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    }

    console.log("All cookies cleared after order placed");
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
   *  This function is use to handle wallet change
   *********************************************************/
  const handleWalletChange = (event) => {
    const method = event.target.value;
    if (selectedMethod === 'Cash Payment') {
      toast.error("Please select another payment method to use Wallet.");
      return; 
    }
    if (event.target.checked) {
      if (method.startsWith("Wallet")) {
        const availableBalance = walletData?.avlBalance || 0;
        setSelectedTreat(method)
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
      setSelectedMethod("");
      setTreatsUsed(0);
      setAvlTreatsUsed(0);
    }
  };

  /*********************************************************
   *  This function is use to handle coupon click code
   *********************************************************/
  const handleCouponClick = (promoCode, discounts) => {
    setSelectedPromoCode(promoCode);
    setDiscount(discounts);
    setDiscountAmount(0);
    // setIsCouponApplied(false);
    setCouponErrorMessage("");
  };

  /*********************************************************
   *  This function is use to handle coupon click code
   *********************************************************/
  const handleRemoveCoupon = () => {
    setSelectedPromoCode("");
    setDiscountAmount(0);
    setIsCouponApplied(false);
    setCouponErrorMessage("");
  };

  /*********************************************************
   *  This function is use to handleApplyCoupon code
   *********************************************************/
  const handleApplyCoupon = () => {
    setCouponErrorMessage(""); 
    if (selectedMethod === 'Cash Payment') {
      setSelectedPromoCode("");
      setDiscountAmount(0); // Reset discount if the promo code is invalid
      setIsCouponApplied(false);
      toast.error("Please select another payment method to apply the coupon.");
     
      return; // Prevent further execution
    }
    const promoCode = selectedPromoCode.trim();
    if (promoCode) {
      const coupon = couponitems.find((item) => item.promocode === promoCode);
      if (coupon) {
        setDiscountAmount(calculateDiscount(coupon.discounts));
        setIsCouponApplied(true);
      } else {
        alert("Invalid promo code.");
        setDiscountAmount(0);
        setIsCouponApplied(false);
      }
    }
  };

  /*********************************************************
   *  This function is use to handle promo code list API
   *********************************************************/
  const fetchPromocodeData = async () => {
    try {
      const options = {
        service: bookingData?.servicesId?.category?._id,
        type: "",
        condition: {
          service: bookingData?.servicesId?.category?._id,
          status: "A",
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
          service: true,
        },
        sort: { _id: -1 },
        page: "1",
      };
      const response = await promocodelist(options);
      if (response) {
        setItems(response.result.data.response.result);
      }
    } catch (error) {
      console.error("Failed to fetch wallet data: ", error);
    }
  };

  /*********************************************************
   *  This function is use to handleSubmit for complete order
   *********************************************************/
  const handleCreateBooking = async () => {
    setIsProcessing(true);
    const ipAddress = fetchIpAddress();
    const isTreatsUsed =
      typeof selectedTreat === "string" && selectedTreat.startsWith("Wallet")
        ? "Y"
        : "N";
    const treats = isTreatsUsed === "Y" ? treatavlsUsed : 0;
    const treatsDiscount = isTreatsUsed === "Y" ? treatsUsed : 0;
    const isCouponUsed = selectedPromoCode ? "Y" : "N";
    const promocode = selectedPromoCode || null;
    const document = localStorage.getItem("uploadedFile");
    const services = [
      {
        serviceId: bookingData?.servicesId?._id,
        total: totalSubtotal
      },
    ];
    const formData = new FormData();
    // Append key-value pairs from the options object
    formData.append("vendorId", bookingData?.servicesId?.vendor);
    formData.append("shopId", bookingData?.servicesId?.store._id);
    formData.append("petData", pickupInfo?.petData?._id);
    formData.append("branch", bookingData?.servicesId?.branch?._id);
    formData.append("category", bookingData?.servicesId?.category?._id);
    formData.append("pet_name", pickupInfo?.petData?.name);
    formData.append("pet_gender", pickupInfo?.petData?.gender);
    formData.append(
      "pet_age",
      moment(bookingData?.selectedDate).format("YYYY-MM-DD")
    );
    formData.append("pet_breed", pickupInfo?.petData?.breed);
    formData.append("owner_name", userinfo?.name);
    formData.append("owner_phone", userinfo?.phone);
    formData.append("owner_email", userinfo?.email);
    formData.append("owner_address", pickupInfo?.pickupDropAddress?.address);
    formData.append("duration", "Full Day");
    formData.append("is_repeat", "N");
    formData.append("from_date", bookingData?.selectedDate);
    formData.append("to_date", bookingData?.selectedToDate);
    formData.append("appointment_time", bookingData?.selectedAvailableTimes);
    formData.append("services", JSON.stringify(services));
    formData.append("isCouponUsed", isCouponUsed);
    formData.append("promocode", promocode);
    formData.append("isTreatsUsed", isTreatsUsed);
    formData.append("treats", treats);
    formData.append("treats_discount", treatsDiscount);
    formData.append("discount", discountAmount);
    formData.append("document", document);
    formData.append(
      "paidAmount",
      totalAmount(
        totalSubtotal,
        pickupPrice?.total_charges,
        0,
        0,
        treatsUsed,
        discountAmount.toFixed(2)
      )
    );
    formData.append("notes", specialNotes);
    formData.append("dog_size", "small");
    formData.append("pick_drop", pickupInfo?.isPickDropToggled ? "Y" : "N");
    formData.append(
      "pick_drop_type",
      pickupInfo.twoWay ? "Two-way" : "One-way"
    );
    formData.append("pickup_notes", pickupInfo?.pickupType);
    formData.append(
      "to_address",
      pickupInfo?.pickupType === "Centre to user location"
        ? `${pickupInfo?.pickupDropAddress?.apartment_no}, ${pickupInfo?.pickupDropAddress?.address}`
        : `${bookingData?.servicesId?.branch?.address}`
    );
    formData.append(
      "from_address",
      pickupInfo?.pickupType === "Centre to user location"
        ? `${bookingData?.servicesId?.branch?.address}`
        : `${pickupInfo?.pickupDropAddress?.apartment_no}, ${pickupInfo?.pickupDropAddress?.address}`
    );
    formData.append("oneWayPickUpLocationTime", pickupInfo?.pickupTime);
    formData.append(
      "twoWayPickUpLocationTime",
      pickupInfo?.twoWay ? pickupInfo?.pickupTime : ""
    );
    formData.append(
      "twoWayPickUpCenterTime",
      pickupInfo?.twoWay ? pickupInfo?.dropTime : ""
    );
    formData.append("ipAddress", ipAddress);
    formData.append("platform", "Web");
    formData.append("version", "1.0.1");
    formData.append("pick_drop_charge", pickupInfo.twoWay ? (pickupPrice?.total_charges?.toFixed(2)*2) : pickupPrice?.total_charges?.toFixed(2));
    formData.append('pick_drop_address', pickupInfo?.pickupDropAddress?._id ? pickupInfo?.pickupDropAddress?._id : '');

    try {
      const Data = await createBooking(formData);


      if (Data.status) {
        if(selectedMethod !== "Cash Payment"){
          handleCompleteOrderpayment(Data?.result);
          const checkoutFormData = bookingData;
          const totalamount = totalAmount(
            totalSubtotal,
            pickupPrice?.total_charges,
            0,
            0,
            treatsUsed,
            discountAmount.toFixed(2)
          );
          const treats = totalamount / 10;

               const dataToStore = { checkoutFormData, isTreatsUsed, treats, totalamount };
              sessionStorage.setItem('checkoutData', JSON.stringify(dataToStore));
        }else{
         const options = {
           bookingId: Data?.result?.bookingDetailsData[0].booking_id,
           paymentStatus: "pending",
           status: Data?.result?.bookingDetailsData[0].status,
           // txnnumber:  "NA",
           paidBy: "cash",
         };
         const response = await changeStatus(options);
         if (response.status) {
           const checkoutFormData = bookingData;
           const totalamount = totalAmount(
             totalSubtotal,
             pickupPrice?.total_charges,
             0,
             0,
             treatsUsed,
             discountAmount.toFixed(2)
           );
           const treats = totalamount / 10;
           setIsLoading(false);

           clearAllOrderCookies();
           navigate("/booking-recieved", { state: { checkoutFormData, isTreatsUsed, totalamount, treats } });
         }
        }
      } else{
        setCouponErrorMessage("Coupon is out of limit, please use another coupon.");
        setIsLoading(false);
        return false;
      } 
    } catch (error) {
      console.error("fail:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const settings = {
    dots: true,
    infinite: false,

    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
          "order": result.bookingDetailsData[0].booking_id,
          "first_name": userinfo?.name,
          "middle_name": "",
          "last_name": "",
          "email": userinfo?.email,
             "country_code": userinfo.country_code,
             "number": userinfo.phone,
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
                  sessionStorage.setItem("boardingtransaction", JSON.stringify(transaction));
                  sessionStorage.setItem("boardingchargeId", JSON.stringify(chargeId));
                  const treats = treat;
                  sessionStorage.setItem("boardingresult", JSON.stringify(result));
                  sessionStorage.setItem("boardingtreats", JSON.stringify(treats));
              }
  
    } catch (error) {
      console.error('Error making Tap API request:', error.message);
      console.error('Full error stack:', error);
      alert("There was a problem processing the payment. Please check your network or API configuration.");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {

    const savedPet = Cookies.get("selectedPet");
    if (savedPet) {
      setPetData(JSON.parse(atob(savedPet)));
    }
    const savedBookingData = Cookies.get("bookingData");
    if (savedBookingData) {

      setBookingData(JSON.parse(decodeURIComponent(atob(savedBookingData))));
    }
    const savedPickupInfo = Cookies.get("pickupInfo");
    if (savedPickupInfo) {
      setpickupInfo(JSON.parse(atob(savedPickupInfo)));
    }

    // Add a condition that ensures the necessary data is fully loaded
    if (!savedPet && !savedBookingData && !savedPickupInfo) {
      navigate("/services");
    }
  }, []);

  // Use another useEffect to call getPrice only when necessary data is available
  useEffect(() => {
    if (pickupInfo && bookingData) {
      getPrice();
      fetchWalletData();
      fetchPromocodeData();
      const userinfo = JSON.parse(sessionStorage.getItem("USER-INFO"));
      setUserinfo(userinfo);
      
    }
  }, [pickupInfo, bookingData]);
  useEffect(() => {
    if (totalSubtotal !== undefined && pickupPrice?.total_charges !== undefined) {
      const total = totalAmount(
        totalSubtotal,
        pickupPrice.total_charges,
        0,
        0,
        treatsUsed,
        discountAmount.toFixed(2)
      );
      setTreat((Number(total) / 10).toFixed(1)); // Ensure the total calculation is correct
      
    }
    
  }, [totalSubtotal, pickupPrice, treatsUsed, discountAmount]);  // Add all relevant dependencies here

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

            <div className="">
              <div className="pet_details_info mt-4">
                <p>Service Details</p>
                <div id="booking_info" className="pb-1">
                  <div className="d-flex grooming_box">
                    <div>
                      <img
                        src={`${ASSETS_BASE_URL}${bookingData?.servicesId?.image}`}
                        alt="testinominal_img"
                      ></img>
                      <div className="add_review  my-0" id="add_review">
                        <RatingsStar rating={bookingData?.servicesId?.rating} />
                        <span>{bookingData?.servicesId?.rating}</span>
                      </div>
                    </div>
                    <div className="personal_details_petinfo">
                      <h2>{bookingData?.servicesId?.name}</h2>
                      <p>
                        {bookingData?.servicesId?.details.length > 20
                          ? `(${bookingData?.servicesId?.details.substring(
                            0,
                            20
                          )})...`
                          : bookingData?.servicesId?.details}
                      </p>
                      <h4>AED {bookingData?.servicesId?.price?.toFixed(2)}</h4>
                    </div>
                  </div>

                  <div className="d-flex pet_details_info mx-2 justify-content">
                    <div>
                      <img
                        src={`${ASSETS_BASE_URL}${bookingData?.servicesId?.store?.image}`}
                        alt="testinominal_img"
                        className="testnominal_img mx-0"
                      ></img>
                    </div>
                    <div className="personal_details_petinfo">
                      <h2 className="text-left">
                        {bookingData?.servicesId?.store?.shop_name}
                      </h2>
                      <p className="text-left">
                        <MdLocationPin id="center_location" />{" "}
                        {bookingData?.servicesId?.branch?.address}
                      </p>
                    </div>
                    <div className="add_review">
                      <RatingsStar rating={bookingData?.servicesId?.rating} />
                      <span>{bookingData?.servicesId?.rating}</span>
                    </div>
                  </div>

                  <div className="pet_details_info mx-2 ">
                    <h2 className="text-left">Booking Details</h2>

                    <div className="day_care_infodetails">
                      <div className="pick_drop_info">
                        <p className="pet_info">
                          <span>Start Date :</span>
                          {moment(bookingData?.selectedDate).format(
                            "DD-MM-YYYY"
                          )}
                        </p>
                      </div>
                      <div className="pick_drop_info">
                        <p className="pet_info">
                          <span>End Date :</span>
                          {moment(bookingData?.selectedToDate).format(
                            "DD-MM-YYYY"
                          )}
                        </p>
                      </div>
                      <div className="pick_drop_info">
                        <p className="pet_info">
                          <span>Time :</span>
                          {bookingData?.selectedAvailableTimes}
                        </p>
                      </div>
                    </div>
                  </div>
                  {pickupInfo?.isRepeatToggled && (
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

                  {pickupInfo?.isPickDropToggled && (
                    <div className="pet_details_info mx-2 mb-2">
                      <h2 className="text-left">Pickup & Drop Details</h2>

                      <div className="day_care_infodetails">
                        <div className="pick_drop_info">
                          <p className="pet_info">
                            <span>Date :</span>
                            {moment(bookingData?.selectedDate).format(
                              "DD-MM-YYYY"
                            )}
                          </p>
                        </div>
                        <div className="pick_drop_info">
                          <p className="pet_info">
                            <span>Time :</span>
                            {pickupInfo?.pickupTime}
                          </p>
                        </div>
                      </div>

                      <h2 className="text-left mt-2">From Location</h2>
                      <div className="day_carelocationdetails">
                        <p className="pet_info">
                          {pickupInfo?.pickupType === "Centre to user location"
                            ? `${bookingData?.servicesId?.branch?.address}`
                            : `${pickupInfo?.pickupDropAddress.apartment_no}, ${pickupInfo?.pickupDropAddress.address}`}
                        </p>
                      </div>

                      <h2 className="text-left mt-2">To Location</h2>
                      <div className="day_carelocationdetails">
                        <p className="pet_info">
                          {pickupInfo?.pickupType === "Centre to user location"
                            ? `${pickupInfo?.pickupDropAddress.apartment_no}, ${pickupInfo?.pickupDropAddress.address}`
                            : `${bookingData?.servicesId?.branch?.address}`}
                        </p>
                      </div>

                      <h2 className="text-left my-2">Pickup Timings</h2>

                      <div className="day_care_infodetails">
                        <div className="pick_drop_info">
                          <p className="pet_info">
                            <span>From User Location: </span>
                            {pickupInfo?.pickupTime}
                          </p>
                        </div>
                        {pickupInfo?.twoWay && (
                          <div className="pick_drop_info">
                            <p className="pet_info">
                              <span>From Centre Location:</span>
                              {pickupInfo?.dropTime}
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
                        src={`${ASSETS_BASE_URL}${pickupInfo?.petData.image}`}
                        alt="testinominal_img"
                        className="pet_img"
                      ></img>
                    </div>
                    <div className="py-0">
                      <h2 className="pet_details_name">
                        {capitalizeFirstLetter(pickupInfo?.petData.name)}
                      </h2>
                      <p className="pet_info">
                        <span>Age : </span>
                        {calculateAge(pickupInfo?.petData.dob)}
                      </p>
                      <p className="pet_info">
                        <span>Gender : </span>
                        {capitalizeFirstLetter(pickupInfo?.petData.gender)}
                      </p>
                    </div>
                    <div className="py-0">
                      <p className="pet_info pt-3">
                        <span>Breed :</span>
                        {capitalizeFirstLetter(pickupInfo?.petData.breed)}
                      </p>
                      <p className="pet_info">
                        <span> Location :</span>
                        {capitalizeFirstLetter(pickupInfo?.petData.city)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pet_details_info mt-4">
                <p>Pet Owner Details</p>
                <div className="more_info">
                  <div>
                    <h1>{capitalizeFirstLetter(userinfo?.name)}</h1>
                    <ul>
                      <li>
                        <span>
                          <MdCall />
                        </span>
                        <p>+91{userinfo?.phone}</p>
                      </li>
                      <li>
                        <span>
                          <FaEnvelope></FaEnvelope>
                        </span>
                        <p>{userinfo?.email}</p>
                      </li>
                      {/* <li>
                        <span>
                          <FaLocationDot />
                        </span>
                        <p>
                        {userinfo?.address}
                        </p>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>

              {pickupInfo?.isPickDropToggled && (
                <div className="pet_details_info mt-4">
                  <p>Pick Up & Drop Address</p>
                  <div className="more_info p-3 mb-0" id="booking_info">
                    <p className="mb-0 address_details">
                      {capitalizeFirstLetter(`${pickupInfo?.pickupDropAddress?.address}, ${pickupInfo?.pickupDropAddress?.building_name}, ${pickupInfo?.pickupDropAddress?.apartment_no}, ${pickupInfo?.pickupDropAddress?.city}`)}

                    </p>
                  </div>
                </div>
              )}

            </div>
            <div className="special_notes_container">
              <div className="alert alert-primary custom_alert" role="alert">
                You will earn {treat} frisbee treats in this order!
              </div>
              <div className="form-group store_process_form_section">
                <form action="#">
                  <label htmlFor="specialNotes">Special Notes</label>
                  <input
                    type="text"
                    className="form-control custom_input"
                    id="specialNotes"
                    placeholder="Add notes here...."
                    value={specialNotes}
                    onChange={handleInputChange}
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
                    checked={selectedTreat === walletLabel}
                    // checked={selectedMethod === walletLabel}
                    // value={`Wallet${
                    //   walletData?.avlBalance
                    //     ? ` (Treats ${walletData.avlBalance})`
                    //     : ""
                    // }`}
                    value={`Wallet${avlBalance !== undefined && avlBalance !== null
                      ? ` (Treats ${avlBalance})`
                      : ""
                      }`}
                    onChange={handleWalletChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="paymentMethodWallet"
                  >
                    {`Wallet${avlBalance ? ` (Treats ${avlBalance})` : ""}`}
                    {/* {`Wallet${
                      walletData?.avlBalance
                        ? ` (Treats ${walletData.avlBalance})`
                        : ""
                    }`} */}
                  </label>
                </div>

                {[

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
            {/* //Carousles */}
            <div className="store_process_payement_carousls">
              <Slider
                {...settings}
                className="store_process_payement_carousls_child_div"
              >
                {couponitems && couponitems.length > 0 ? (
                  couponitems.map((item, index) => (
                    <div
                      key={index}
                      className="discount_slide"
                      onClick={() =>
                        handleCouponClick(item.promocode, item.discounts)
                      }
                    >
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
                          <h5 className="text-danger">
                            {item.discounts}% Discount
                          </h5>
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
                      <td>Details</td>
                      <td className="text-end">Price</td>
                    </tr>
                    <tr>
                      <td>Sub-Total</td>
                      <td className="text-end">
                        AED {totalSubtotal}
                      </td>
                    </tr>
                    <tr>
                      <td>Tier-Discount</td>
                      <td className="text-end text-danger">
                        -AED {discountAmount.toFixed(2)}
                      </td>
                    </tr>
                    {pickupInfo?.isPickDropToggled && (
                      <tr>
                        <td>Pickup & Drop Charges</td>
                        <td className="text-end ">
                          AED {pickupInfo.twoWay ? (pickupPrice?.total_charges?.toFixed(2)*2) : pickupPrice?.total_charges?.toFixed(2)}{" "}
                        </td>
                      </tr>
                    )}

                    <tr>
                      <td>Treats Used ({treatavlsUsed})</td>
                      <td className="text-end">-{treatsUsed}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row mb-4 mt-4 font-weight-bold store_process_payement_deatils_heading_child_div store_process_deatils_price">
                <div className="col">Amount Due</div>
                <div className="col text-end">
                  AED{" "}
                  {totalAmount(
                    totalSubtotal,
                    pickupPrice?.total_charges,
                    0,
                    0,
                    treatsUsed,
                    discountAmount.toFixed(2)
                  )}
                </div>
              </div>
              <div className="login_user_otp_for_bottom_button">
                <button
                  className="btn btn-danger btn-lg mb-3 user_otp_first"
                  onClick={store_process}
                >
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

export default Checkout_detail;
