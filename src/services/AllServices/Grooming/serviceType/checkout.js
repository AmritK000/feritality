import React, { useState, useEffect } from "react";
import { FaUser, FaPhone, FaEnvelope, FaRegTrashAlt } from "react-icons/fa";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import { FaLocationDot } from "react-icons/fa6";
import { MdCall } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ASSETS_BASE_URL,TAP_URL } from "../../../../config/constants";
import { useLocation, useNavigate, Link } from "react-router-dom";
import RatingsStar from "../../../../components/RatingsStar";
import { create as OrderPlaced, changeStatus } from "../../../../controllers/booking/groomingBooking"
import { list as promoList } from "../../../../controllers/booking/promoCode"
import { wallethistory,paymentordercomplete } from "../../../../controllers/store/shopController"
import { calculateAge } from "../../../../util/common";
import moment from "moment";
import { fetchIpAddress } from '../../../../controllers/API'
import SkeltonList from "../../../../components/SkeltonEffect/list";
import { pickupPriceController as pickUpPrice } from "../../../../controllers/services/boardingController";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Checkoutdetail() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const [checkoutData, setCheckoutData] = useState(state)
    const [error, setError] = useState("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [specialNotes, setSpecialNotes] = useState('');
    const [pickupPrice, setPickupPrice] = useState("");
    const [treat, setTreat] = useState(0);
    const [selectedPromoCode, setSelectedPromoCode] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);
    const [discountamountdata, setDiscount] = useState(0);
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [couponitems, setItems] = useState();
    const [treatsUsed, setTreatsUsed] = useState(0);
    const [treatavlsUsed, setAvlTreatsUsed] = useState(0);
    const [walletData, setWalletData] = useState(null);
    const [avlBalance, setAvlBalance] = useState();
    const [selectedMethod, setSelectedMethod] = useState(false);
    const [couponErrorMessage, setCouponErrorMessage] = useState("");
    const [isProcessing, setIsProcessing] = useState(false); 
    const userInfo = JSON.parse(sessionStorage.getItem("USER-INFO"));

    // Handle payment method selection
    const handleRadioChange = (event) => {
        const { value } = event.target;
        setSelectedPaymentMethod(value);
        setSelectedMethod('');
        setSelectedPromoCode("");
    };

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
            console.error("Failed to fetch wallet data:", error);
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
    // const treat = (state?.checkoutData?.servicesId?.price?.toFixed(2)) / 10;

    /*********************************************************
   *  This function is use to calculate discount price
   *********************************************************/
    const calculateDiscount = (discountPercent) => {
        const paymentData = checkoutData;
        const subtotal = paymentData?.checkoutData?.servicesId?.price;
        return (subtotal * (discountPercent / 100));
    };

    const total = checkoutData?.checkoutData?.servicesId?.price - discountAmount + (pickupPrice?.total_charges ?? 0);
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
                alert("Invalid promo code.");
                setDiscountAmount(0);
                setIsCouponApplied(false);
            }
        }
    }

    /*********************************************************
   *  This function is use to handle pick up and drop price
   *********************************************************/
    const getPrice = async () => {
        try {
            const options = {
                usrLat: checkoutData?.selectedAddress?.latitude,
                usrLng: checkoutData?.selectedAddress?.longitude,
                storeLat: checkoutData?.checkoutData?.servicesId?.branch?.latitude,
                storeLng: checkoutData?.checkoutData?.servicesId?.branch?.longitude,
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

    /*********************************************************
     *  This function is use to handleSubmit for complete order
     *********************************************************/
    const handleSubmit = async (e) => {
        setIsProcessing(true);
        e.preventDefault();
        if (!selectedPaymentMethod) {
            toast.error('Please select a payment method!', { containerId: 'errorRequest' });
            setIsProcessing(false);
            return;
        }
        setIsLoading(true);
        const checkoutFormData = checkoutData?.checkoutData;
        // console.log("checkoutFormDgggata", checkoutFormData)
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
        form.append("petData", checkoutData?.petData?._id);
        form.append('shopId', checkoutFormData?.servicesId?.store?._id);
        form.append('branch', checkoutFormData?.servicesId?.branch?._id);
        form.append("pet_name", checkoutData?.petData?.name);
        form.append("pet_gender", checkoutData?.petData?.gender);
        form.append("pet_age", moment(checkoutData?.petData?.dob).format("YYYY-MM-DD"));
        form.append("pet_breed", checkoutData?.petData?.breed);
        form.append('owner_name', userInfo?.name);
        form.append('owner_phone', userInfo?.phone);
        form.append('owner_email', userInfo?.email);
        form.append('owner_address', checkoutData?.selectedAddress?.address.length > 0 ? checkoutData?.selectedAddress?.address : userInfo.address);
        form.append('appointment_date', checkoutFormData?.selectedDate);
        form.append('appointment_time', checkoutFormData?.selectedAvailableTimes);
        form.append('document', checkoutFormData?.fileName);
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
        form.append('pick_drop_charges', pickupPrice?.total_charges);
        form.append('pick_drop_address', checkoutData?.selectedAddress?._id ? checkoutData.selectedAddress._id : '');

        try {
            const res = await OrderPlaced(form);
            if (res.status === true || res.status === 200) {
                if (selectedPaymentMethod !== "Cash Payment") {
                    console.log("res?.result",res?.result);
                   handleCompleteOrderpayment(res?.result);
                   const treats = treat;
                   const dataToStore = { checkoutFormData, isTreatsUsed, treats, totalamount };
                  sessionStorage.setItem('checkoutData', JSON.stringify(dataToStore));
                  }else{
                        const options = {
                            bookingId: res?.result?.order?._id,
                            paymentStatus: 'Success',
                            status: 'Pending',
                            txnnumber: "NA",
                            paidBy: "Cash"
                        }
                        const response = await changeStatus(options);
                        if (response.status) {
                            setIsLoading(false);
                            localStorage.removeItem('bookingData');
                            navigate("/booking-recieved", { state: { checkoutFormData, isTreatsUsed, totalamount, treat } });
                        }
                    }
            }else if (res.status === false) {
                setCouponErrorMessage("Coupon is out of limit, please use another coupon.");
                setIsLoading(false);
            } else {
                return false;
            }
        } catch (error) {
            console.error("fail:", error);
        }finally {
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

    // const handleInputChange = (e) => {
    //     setSpecialNotes(e.target.value);
    // }
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
              "order": result.order._id,
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
                      sessionStorage.setItem("grommingtransaction", JSON.stringify(transaction));
                      sessionStorage.setItem("grommingchargeId", JSON.stringify(chargeId));
                      const treats = treat;
                      sessionStorage.setItem("grommingresult", JSON.stringify(result));
                      sessionStorage.setItem("grommingtreats", JSON.stringify(treats));
                  }
      
        } catch (error) {
          console.error('Error making Tap API request:', error.message);
          console.error('Full error stack:', error);
          alert("There was a problem processing the payment. Please check your network or API configuration.");
        } finally {
          setIsProcessing(false);
        }
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

    useEffect(() => {
        if (checkoutData?.checkoutData?.serviceType === 'Pick & Drop') {
            getPrice();
        }
        fetchPromocodeData();
        fetchWalletData();
        const bookingDetails =  localStorage.getItem("bookingData");
        if(!bookingDetails){
            navigate("/services/grooming");
        }
    }, []);
    useEffect(() => {
        if(totalamount!== undefined){
        setTreat( totalamount.toFixed(0)/10);
        }
      },[totalamount]);
    // totalamount.toFixed(2)

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
                                            <li><span><FaLocationDot /></span><p>{userInfo.address || "C-25 MiQB Building , Sector 58, Noida, Uttar Pradesh 201309"}</p></li>
                                        </ul>
                                    </div>

                                </div>
                            </div> 
                            {checkoutData?.checkoutData?.serviceType === "Pick & Drop" && (
                                <div className="pet_details_info mt-4">
                                    <p>Pick Up & Drop Address</p>
                                    <div className="more_info p-3 mb-0" id="booking_info">
                                        <p className="mb-0 address_details">
                                            {checkoutData?.selectedAddress?.firstname}{" "}
                                            {checkoutData?.selectedAddress?.lastname},{" "}
                                            {checkoutData?.selectedAddress?.email},{" "}
                                            {checkoutData?.selectedAddress?.phone}{" "}<br />
                                            {checkoutData?.selectedAddress?.address}
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
                                    <textarea
                                        type="text"
                                        className="form-control custom_input"
                                        id="specialNotes"
                                        placeholder="Add notes here...."
                                        value={specialNotes}
                                        onChange={handleInputChange}
                                        rows={2}
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
                            {couponitems && couponitems?.length > 0 ? (
                                <Slider {...settings}
                                    className="store_process_payement_carousls_child_div">
                                    {couponitems.map((items, index) => (
                                        <div key={index} className="discount_slide" onClick={() => handleCouponClick(items.promocode, items.discounts)}>
                                            <div className="d-flex justify-content-center align-items-center store_process_carousls_image">
                                                <img
                                                    className="d-block"
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
                                            <td>Sub-Total</td>
                                            <td className="text-end">AED {(state?.checkoutData?.servicesId?.price).toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td>Tier-Discount</td>
                                            <td className="text-end text-danger">AED {discountAmount.toFixed(2)}</td>
                                        </tr>
                                        {checkoutData?.checkoutData?.serviceType === "Pick & Drop" && (
                                            <tr>
                                                <td>Pickup & Drop Charges</td>
                                                <td className="text-end ">
                                                    AED {pickupPrice?.total_charges?.toFixed(2)}{" "}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td>Total</td>
                                            <td className="text-end">AED {total.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                            <td>Treats Used ({treatavlsUsed.toFixed(2)})</td>
                                            <td className="text-end">{treatsUsed}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="row mb-4 mt-4 font-weight-bold store_process_payement_deatils_heading_child_div store_process_deatils_price">
                                <div className="col">Amount Due</div>
                                <div className="col text-end">AED {totalamount.toFixed(2)}</div>
                            </div>
                            <div className="login_user_otp_for_bottom_button" >
                                <button className="btn btn-danger btn-lg mb-3 user_otp_first" onClick={handleSubmit}>
                                {isProcessing ? 'Processing...' : 'Complete Order'}
                                </button>
                                <ToastContainer containerId="errorRequest" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
}

export default Checkoutdetail;
