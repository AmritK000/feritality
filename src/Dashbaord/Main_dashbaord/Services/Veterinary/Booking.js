// import React, { useState, useEffect, useRef } from "react";
// import { Link, useLocation } from "react-router-dom";
// import Navbar from "../../../Topnvbar";
// import { recent_booking } from "../../../../components/Images";
// import { PiArrowArcLeftFill } from "react-icons/pi";
// import { FaStar } from "react-icons/fa";
// import { HiLocationMarker } from "react-icons/hi";
// import { IoLocationSharp } from "react-icons/io5";

// import Dashbaordsidebar from "../../../sidebar";
// const Booking = () => {
//     const location = useLocation();
//     const { type } = location.state || {};
    
//     return (
//         <>
//             <Navbar />
//             <Dashbaordsidebar />
//             <div className="main_wrapper">
//                 <div className="container-fluid">
//                     <div className="order_deatils">
//                         <div className="row">
//                             <div className="col-md-6">
//                                 <div className="d-flex">
//                                 <Link to="/" className="arrow_btn"><PiArrowArcLeftFill /></Link>
//                                 <div>
//                                 <p className="order_id"><strong>Order Id </strong>: ORDER4625624562556 </p>
//                                 <p className="order_id"> <strong>Order Date & Time  </strong>:  19/02/2024. 02:00:56 PM</p>
//                                 </div>
                            
//                                 </div>
                            
//                             </div>
//                             <div className="col-md-6">
//                                 <div className="down_loads_btns">
//                                     <button className="canel_btn">Download Receipt</button>
//                                     <button className="reshdule">Re-schedule</button>
//                                     <button className="canel_btn">Cancel</button>
//                                 </div>
//                             </div>
//                             <div className="col-md-6">
//                                 <div className="row petforms mx-1 my-2">
//                                     <div className="col-md-3 px-0">
//                                         <div className="pet_reviews">
//                                         <img src={recent_booking}></img>
//                                             <span>4.2 <FaStar className="star" /></span>
//                                         </div>

//                                     </div>
//                                     <div className="col-md-9">
//                                     <h4 className="pet_avenues">Standard Groming | Dog (All Sizes)...</h4>
//                                         <h4 className="my-1 service_provide">(Without Haircut/Shave)...</h4>
//                                         <p className="mb-0 mt-1">AED 50.00</p>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-md-6">
//                             <div className="row petforms mx-1 my-2">
//                                     <div className="col-md-3 px-0">
                                  
//                                        <div className="pet_reviews">
//                                         <img src={recent_booking}></img>
                                           
//                                         </div>
//                                     </div>
//                                     <div className="col-md-9">
//                                     <ul className="rating_stars">
//                                         <li><FaStar className="star" /></li>
//                                         <li><FaStar className="star" /></li>
//                                         <li><FaStar className="star" /></li>
//                                         <li><FaStar className="star" /></li>
//                                         <li><h2 className="rating_reviwesvalues">4.5</h2></li>
//                                        </ul>
                                       
//                                         <h4 className="pet_avenues">Pet Avenue</h4>
//                                         <div className="d-flex">
                                              
//                                                 <h2 className="my-1 location_avenuess"> <HiLocationMarker className="location mx-2" />
//                                                 Dubai Al Warsan 3, Birds and...</h2>

                                           
//                                         </div> 
//                                     </div>
//                                 </div>
//                             </div>
//                             {type == 'Pick up & Drop' && (
//                             <div className="col-md-12 ">
//                                 <div className="row book_deatils mx-2 my-2">
//                                     <div className="col-md-4 px-0">
//                                         <h2>Booking Details</h2>
//                                     </div>
//                                     <div className="col-md-8">
//                                         <ul className="order_timelist">
//                                             <li><p ><span>Type: </span>  {type}</p></li>
//                                             <li><p><span>Date: </span> 12/02/2024</p></li>
//                                             <li><p><span>Time: </span> 9:00 AM</p></li>
//                                             <li><p className="process_pending">
//                                                 <span>Status: </span>cancelled
//                                             </p></li>
//                                         </ul>
//                                     </div>
//                                 </div>
//                             </div>
//                               )
//                             }
//                              {type == 'In-Store' && (
//                             <div className="col-md-12 ">
//                                 <div className="row book_deatils mx-2 my-2">
//                                     <div className="col-md-4 px-0">
//                                         <h2>Reschedule Details</h2>
//                                     </div>
//                                     <div className="col-md-8">
//                                         <ul className="order_timelist">
                                           
//                                             <li><p><span>Date: </span> 12/02/2024</p></li>
//                                             <li><p><span>Time: </span> 9:00 AM</p></li>
//                                             <li><p className="process_com">
//                                                 <span>Status: </span>Accepted
//                                             </p></li>
//                                         </ul>
//                                     </div>
//                                 </div>
//                             </div>
//                             )
//                         }
//                         </div>

//                     </div >

//                     <div className="row mt-3">
//                         <div className="col-md-8">
//                         <div className="order_deatils">
//                             <h2>Pet Details</h2>
//                             <div className=" mt-2 pet_detailsinfo">
//                                 <div className="row">
//                                 <div className="col-md-2">
//                                <img src={recent_booking}></img>
//                                </div>
//                                <div className="col-md-4">
//                                 <h2>Skudo</h2> 
//                                 <p className="my-2">Age :  <span className="mx-2"> 1 year 8 months</span></p>
//                                 <p className="my-2">Gender : <span  className="mx-2">Male</span></p>
//                                </div>
//                                <div className="col-md-6">
//                                <p className="my-2">Breed : <span className="mx-2"> Mixed</span></p>
//                                <p className="my-2">Location :<span className="mx-2"> Dubai</span></p>
//                                </div>
//                                 </div>
                              
//                                 </div>
                            
                           
//                             </div>
//                             <div className="order_deatils mt-3">
//                             <h2>Pick Up & Drop Address</h2>
//                             <div className="petforms mt-2">
//                                 <h4 className="my-1 service_provide">Rufus, +971-XX-1234567, dineatadm@address.com
//                                 C-20/1, C Block, Phase 2, Industrial Area, Sector 62, Noida, Uttar Pradesh 201301</h4>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-md-4 px-0">
//                             <div className="order_deatils">
//                             <h2>Payment Details</h2>
//                             <div className="payment_details mt-2">
//                                <ul className="pt-0">
//                                 <li><span>detail</span><p>Price</p></li>
//                                 <li><span>Subtotal</span><p>50 AED </p></li>
//                                 <li><span>Tier Discount</span><p className="decrease">-AED 0.86</p></li>
//                                 <li><span>Total</span><p>AED 49.14</p></li>
//                                 <li><span>Treats used (100)</span><p>-1</p></li>
//                                 </ul>

//                                 <ul className="mt-2 pt-0">
//                                 <li><span>Amount Due</span><p>AED 39.14</p></li>
//                                 </ul>
//                             </div>
//                             </div>
                            
//                         </div>
//                     </div>
//                 </div>


//             </div>

         
//         </>
//     )
// }

// export default Booking;




////////////////////////////////////////
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../../Topnvbar";
import { FaLocationDot } from "react-icons/fa6";
import { PiArrowArcLeftFill } from "react-icons/pi";
import { HiLocationMarker } from "react-icons/hi";
import moment from "moment";
import Dashbaordsidebar from "../../../sidebar";
import { ASSETS_BASE_URL } from "../../../../config/constants";
import RatingsStar from "../../../../components/RatingsStar";
import { calculateAge } from "../../../../util/common";
import Modal from 'react-bootstrap/Modal';
import { getCurrentDayStoreHours } from "../../../../util/common";
import { RxCross2 } from "react-icons/rx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  appointment,
  reschedule_appointment,
  cancel_appointment,downloadreceipt
} from "../../../../controllers/services/veterinaryController";


const Booking = () => {
  const location = useLocation();
  const { state } = location;
  const [data, setData] = useState(state.bookingDetails || []);
  const [smShow, setSmShow] = useState(false);
  const [selectedAvailableTimes, setSelectedAvailableTimes] = useState([]);
  const [storeTime, setStoreTime] = useState([]);
  const [errors, setErrors] = useState([{}]);
  const [storeId, setStoreId] = useState([]);
  const [branch_id, setBranch_id] = useState([]);
  const [reschedule, setReschedule] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [booking_id, setBooking_id] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const dropdownRefs = useRef([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const userLocation = JSON.parse(sessionStorage.getItem("currentlocation"));

  console.log("daraaraahg", data)
  /*********************************************************
  * validate data before going further
  *********************************************************/
  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};
    if (!selectedDate) {
      formIsValid = false;
      newErrors.selectedDate = "Date is required.";
    }

    if (!selectedAvailableTimes || selectedAvailableTimes.length === 0) {
      formIsValid = false;
      newErrors.selectedAvailableTimes = "Time is required.";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  /*********************************************************
 *This function is used to set date and time
 *********************************************************/
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setSelectedAvailableTimes("");
  };

  const handleTimeChange = (event) => {
    setSelectedAvailableTimes(event.target.value);
  };

  // Toggle cancel popup visibility
  const cancelEvent = (booking_id) => {
    setCancel(true);
    setBooking_id(booking_id);
  };

  // Toggle reschedule popup visibility
  const rescheduleEvent = (storeId, branch_id, categoryId, store_time, booking_id) => {
    setReschedule(true);
    setStoreId(storeId);
    setBranch_id(branch_id);
    setCategoryId(categoryId);
    setStoreTime(store_time);
    setBooking_id(booking_id);
  };

  // Close popups
  const crossEvent = () => {
    setSmShow(false);
    setReschedule(false);
    setCancel(false);
  };

  const handleClickOutside = (event) => {
    dropdownRefs.current.forEach((ref, index) => {
      if (ref && !ref.contains(event.target)) {
        if (index === openDropdownIndex) {
          setOpenDropdownIndex(null);
        }
      }
    });
  };

  /*********************************************************
*  This function is use to fetch appointment time
*********************************************************/
  const getAppointment = async () => {
    try {
      const { openTime, closeTime } = getCurrentDayStoreHours(storeTime);

      const options = {
        branch_id: branch_id,
        store_id: storeId,
        serviceId: categoryId,
        date: selectedDate,
        openTime: openTime,
        closeTime: closeTime,
      };
      const appointmentTime = await appointment(options);
      if (appointmentTime?.status === true) {
        setAvailableTimes(appointmentTime?.result || []);
      } else {
        setAvailableTimes([]);
      }
    } catch (error) {
      console.log("Failed to fetch appointment time", error);
      setAvailableTimes([]);
    }
  };


  const handleRescheduleSubmit = async () => {
    if (validateForm()) {
      try {
        const options = {
          booking_id: data?._id,
          date: selectedDate,
          time: selectedAvailableTimes,
        };
        console.log("handleRescheduleSubmit", options)
        const response = await reschedule_appointment(options);
        if (response?.status === true) {
          toast("Your booking is rescheduled");
        } else {
          alert("Server error");
        }
      } catch (error) {
        console.log("Failed to fetch appointment time", error);
      }
      setReschedule(false);
    }
  };

  const handleCancel = async (booking_id) => {
    setSmShow(true);
    setBooking_id(booking_id);
  }

  const handleCancelSubmit = async () => {
    try {
      const options = {
        booking_id,
      };
      console.log("handleCancelSubmit", booking_id)
      const response = await cancel_appointment(options);
      if (response?.status === true) {
        toast("your booking is cancelled");
      } else {
        alert("server error");
      }
    } catch (error) {
      console.log("Failed to fetch appointment time", error);
    }
    setSmShow(false);
  };
  const handleDownloadReceipt = async () => {
    try {
      const options = { _id: data?._id };
      const response = await downloadreceipt(options);
      const receiptHtml = response.result; // Assuming the HTML is in response.result
  
      // Create a temporary DOM element to hold the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = receiptHtml;
      document.body.appendChild(tempDiv);
  
      // Use html2canvas to capture the content as an image
      html2canvas(tempDiv).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
  
        // Create a jsPDF instance with A4 size and portrait orientation
        const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' stands for portrait orientation
  
        // A4 size: 210mm (width) x 297mm (height)
        const pageWidth = 210;
        const pageHeight = 297;
  
        // Calculate image size to fit the A4 page while maintaining aspect ratio
        const imgWidth = pageWidth - 20; // 10mm margin on both sides
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
  
        // Ensure the image fits within the available height of the A4 page
        if (imgHeight > pageHeight - 20) { // If image height exceeds the available height
          pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, pageHeight - 20); // Adjust to fit height
        } else {
          pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight); // Add the image to PDF
        }
  
        // Save the PDF as 'receipt.pdf' and trigger download
        pdf.save('receipt.pdf');
  
        // Remove the temporary div
        document.body.removeChild(tempDiv);
      });
  
    } catch (error) {
      console.log("Failed to fetch appointment time", error);
    }
  };
  useEffect(() => {
    getAppointment();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownIndex, selectedDate]);


  return (
    <>
      <Navbar />
      <Dashbaordsidebar />
      <div className="main_wrapper">
        <div className="container-fluid">
          <div className="order_deatils">
            <div className="row">
              <div className="col-md-6">
                <div className="d-flex">
                  <Link to="/" className="arrow_btn"><PiArrowArcLeftFill /></Link>
                  <div>
                    <p className="order_id"><strong>Order Id </strong>: {data?.booking_seq_id} </p>
                    <p className="order_id"> <strong>Order Date & Time  </strong>:  {new Date(data?.createdAt).toLocaleDateString("en-GB")}.  {new Date(data?.createdAt).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="down_loads_btns">
                  <button className="canel_btn" onClick={handleDownloadReceipt}>Download Receipt</button>
                  <button className="reshdule" onClick={() => rescheduleEvent(
                    data?.shopId?._id,
                    data?.branch?._id,
                    data?.category?._id,
                    data?.shopId?.store_time,
                    data?._id
                  )}>
                    Reschedule
                  </button>
                  {/* <button className="canel_btn" onClick={() => cancelEvent(data?._id)}> */}
                  <button className="canel_btn" onClick={() => handleCancel(data?._id)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="row petforms mx-1 my-2">
                  <div className="col-md-3 px-0">
                    <div className="pet_reviews">
                      <img src={`${ASSETS_BASE_URL}${data?.bookingdetails?.[0]?.services?.image}`} alt="servicesImage"></img>
                      <span><RatingsStar rating={data?.shopId?.rating} /></span>
                    </div>

                  </div>
                  <div className="col-md-9">
                    <h4 className="pet_avenues">{data?.bookingdetails?.[0]?.services?.name} | Dog (All Sizes)...</h4>
                    <h4 className="my-1 service_provide">
                      {data?.bookingdetails[0]?.services?.details.length > 60
                        ? `(${data?.bookingdetails[0]?.services?.details.substring(0, 60)})...`
                        : data?.bookingdetails[0]?.services?.details}
                    </h4>
                    <p className="mb-0 mt-1">{data?.bookingdetails[0]?.services?.price}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row petforms mx-1 my-2">
                  <div className="col-md-3 px-0">
                    <div className="pet_reviews">
                      <img src={`${ASSETS_BASE_URL}${data?.shopId?.image}`} alt="servicesImage"></img>
                    </div>
                  </div>
                  <div className="col-md-9">
                    <ul className="rating_stars">
                      <RatingsStar rating={data?.shopId?.rating} />
                    </ul>

                    <h4 className="pet_avenues">{data?.shopId?.shop_name}</h4>
                    <div className="d-flex">

                      <h2 className="my-1 location_avenuess">
                        <HiLocationMarker className="location mx-2" />
                        <Link to={`https://www.google.com/maps/dir/?api=1&destination=${userLocation?.lat},${userLocation?.lon}`}
                          target="_blank"
                          rel="noopener noreferrer">
                        </Link>
                        {data?.shopId?.address}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 ">
              <div className="row book_deatils mx-2 my-2">
                <div className="col-md-4 px-0">
                  <h2>Booking Details</h2>
                </div>
                <div className="col-md-8">
                  <ul className="order_timelist">
                    <li><p ><span>Type: {data?.bookingdetails[0]?.servive_type} </span></p></li>
                    <li><p><span>Date: </span>{moment(data?.bookingdetails[0]?.canceled_date).format('DD-MM-YYYY')}</p></li>
                    <li><p><span>Time: </span>{moment(data?.bookingdetails[0]?.createdAt).format('h:mm A')}
                    </p></li>
                    <li><p className="process_pending">
                      <span>Status: </span>{data?.status}
                    </p></li>
                  </ul>
                </div>
              </div>
            </div>
            {data?.servive_type === "In Store" && (
            <div className="col-md-12 ">
              <div className="row book_deatils mx-2 my-2">
                <div className="col-md-4 px-0">
                  <h2>Reschedule Details</h2>
                </div>
                <div className="col-md-8">
                  <ul className="order_timelist">
                    <li><p><span>Date: </span> 12/02/2024</p></li>
                    <li><p><span>Time: </span> 9:00 AM</p></li>
                    <li><p className="process_com">
                      <span>Status: </span>Accepted
                    </p></li>
                  </ul>
                </div>
              </div>
            </div>
            )}
          </div>
        </div >
        <div className="row mt-3">
          <div className="col-md-8">
            <div className="order_deatils">
              <h2>Pet Details</h2>
              <div className=" mt-2 pet_detailsinfo">
                <div className="row">
                  <div className="col-md-2">
                    <img src={`${ASSETS_BASE_URL}${data?.petData?.image}`} alt="petImage"></img>
                  </div>
                  <div className="col-md-4">
                    <h2>{data?.petInfo?.name}</h2>
                    <p className="my-2">Age :  <span className="mx-2">{data?.petInfo?.age ? calculateAge(data?.petInfo?.age) : "Age is Not Available"}</span></p>
                    <p className="my-2">Gender : <span className="mx-2">{data?.petInfo?.gender}</span></p>
                  </div>
                  <div className="col-md-6">
                    <p className="my-2">Breed : <span className="mx-2">{data?.petInfo?.breed}</span></p>
                    <p className="my-2">Location :<span className="mx-2"> Dubai</span></p>
                  </div>
                </div>
              </div>
            </div>
            {data?.servive_type === "Pick & Drop" && (
            <div className="order_deatils mt-3">
              <h2>Pick Up & Drop Address</h2>
              <div className="petforms mt-2">
                <h4 className="my-1 service_provide">
                  {data?.ownerInfo?.name},{" "}
                  {data?.ownerInfo?.email},{" "}
                  {data?.ownerInfo?.phone},{" "}
                  {data?.ownerInfo?.address},{" "}
                </h4>
                {/* <h4 className="my-1 service_provide">Rufus, +971-XX-1234567, dineatadm@address.com
                  C-20/1, C Block, Phase 2, Industrial Area, Sector 62, Noida, Uttar Pradesh 201301</h4> */}
              </div>
            </div>
            )}
          </div>
          <div className="col-md-4 px-0">
            <div className="order_deatils">
              <h2>Payment Details</h2>
              <div className="payment_details mt-2">
                <ul className="pt-0">
                  <li><span>Details</span><p>Price</p></li>
                  <li><span>Sub-Total</span><p>AED {data?.bookingdetails[0]?.services?.price} </p></li>
                  <li><span>Tier Discount</span><p className="decrease">-AED {data?.discount}</p></li>
                  {data?.servive_type === "Pick & Drop" && (
                    <li>
                      <span>Pickup & Drop Charges</span>
                      <p className="text-end">
                        AED {data?.pick_drop_charges?.toFixed(2)}
                      </p>
                    </li>
                  )}
                  <li><span>Treats used (100)</span><p>AED {data?.treats_discount}</p></li>
                  <li><span>Total</span><p>AED {data?.paidAmount.toFixed(2)}</p></li>
                </ul>
                <ul className="mt-2 pt-0">
                  <li><span>Amount Due</span><p>AED {data?.paidAmount.toFixed(2)}</p></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        className="cancel_pop"
      >
        <Modal.Header className="pt-2 pb-0" >
          <Modal.Title id="example-modal-sizes-title-sm">
            <h1 className="session">Cancel <span> Session</span></h1>
            <RxCross2 className="cross_btn" onClick={crossEvent} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <p>Are you sure?</p>
          <div className="">
            <button className="yes_btn" onClick={handleCancelSubmit} >Yes</button>
            <ToastContainer />
            <button className="no_btn" onClick={crossEvent}>No</button>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        size="sm"
        show={reschedule}
        onHide={() => setReschedule(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        className="reschdule_popup"
      >
        <Modal.Header className="pt-2 pb-0">
          <Modal.Title id="example-modal-sizes-title-sm">
            <h1 className="session">Reschedule Your <br></br><span>Pets Care Session.</span></h1>
            <RxCross2 className="cross_btn" onClick={crossEvent} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <div className="reschdule_popup">
            <p className="py-2">Please select date and timings.</p>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={selectedDate}
              onChange={handleDateChange}
            />
            {errors.selectedDate && (
              <p className="error" style={{ color: "red" }}>
                {errors.selectedDate}
              </p>
            )}
            <select
              value={selectedAvailableTimes}
              onChange={handleTimeChange}
              disabled={!availableTimes.length}
            >
              <option value="">Select Time</option>
              {availableTimes?.length &&
                availableTimes.map((item, index) => (
                  <option key={index} value={item.slot}>
                    {item.slot}
                  </option>
                ))}
            </select>
            {errors.selectedAvailableTimes && (
              <p className="error" style={{ color: "red" }}>
                {errors.selectedAvailableTimes}
              </p>
            )}
            <button className="no_btn my-2" onClick={handleRescheduleSubmit}>Submit</button>
            <ToastContainer />
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Booking;

