// import { recent_booking } from "../../../../components/Images";
// import React, { useState, useEffect, useRef } from "react";
// import { HiOutlineDotsVertical } from "react-icons/hi";
// import { RxCross2 } from "react-icons/rx";
// import { useNavigate } from "react-router-dom";
// import Booking from "../Day_care/Reapeatday";
// import Modal from 'react-bootstrap/Modal';
// import { booking_details } from "../../../../controllers/services/veterinaryController";
// import { ASSETS_BASE_URL } from "../../../../config/constants";
// import Pagination from "@mui/material/Pagination";

// const Grooming = () => {
//   const navigate = useNavigate();
//   const [smShow, setSmShow] = useState(false);
//   const [reschedule, setReschedule] = useState(false);
//   const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
//   const [List, setList] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [SKIP, setSkip] = useState(0);
//   const [LIMIT, setLimit] = useState(10);
//   const targetRef = useRef(null);
//   const dropdownRefs = useRef([]);

//   const rescheduleEvent = () => {
//     setReschedule(true);
//   };

//   const crossEvent = () => {
//     setSmShow(false);
//     setReschedule(false);
//   };

//   const toggleDropdown = (index) => {
//     setOpenDropdownIndex(openDropdownIndex === index ? null : index);
//   };

//   const handleClickOutside = (event) => {
//     dropdownRefs.current.forEach((ref, index) => {
//       if (ref && !ref.contains(event.target)) {
//         if (index === openDropdownIndex) {
//           setOpenDropdownIndex(null);
//         }
//       }
//     });
//   };

//   /*****************************************************************************
//    *  This function is used to get the booking list and store it in the List state
//    ********************************************************************************/
//   const getBookingList = async () => {
//     try {
//       const options = {
//         type: "",
//         condition: {},
//         select: {},
//         sort: { _id: -1 },
//         page: currentPage,
//         skip: SKIP ? SKIP : 0,
//         limit: LIMIT ? LIMIT : 10,
//       };
//       const listData = await booking_details(options);
//       if (listData.status && Array.isArray(listData.result)) {
//         setList(listData.result);
//         setTotalPages(listData?.totalPage || 1);
//       } else {
//         setList([]);
//       }
//     } catch (error) {
//       console.error("Error fetching list:", error);
//       setList([]);
//     }
//   };

//      /*********************************************************
//   *  This function is for handle page change
//   *********************************************************/
//      const handlePageChange = (event, newPage) => {
//       setCurrentPage(newPage);
//       setSkip((newPage - 1) * LIMIT);
//       targetRef.current.scrollIntoView({
//           behavior: "smooth",
//       });
//   };

//   useEffect(() => {
//     getBookingList(); // Fetch bookings when component mounts
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [openDropdownIndex, currentPage]);

//   const handleViewDetails = (bookingId, isPickUp) => {
//     console.log("Navigating to /user/pick-drop with type:", bookingId, isPickUp);
//     navigate('/user/pick-drop', { state: { id: bookingId, isPickUp } });

//   };

//   return (
//     <>
//       {/* Iterate through List instead of hardcoded bookings */}
//       {List.map((booking, index) => (
//         <div className="grooming_listing" key={booking._id} ref={targetRef}>
//           <div className="d-flex">
//             <div className="listing_leftimg">
//               <img src={`${ASSETS_BASE_URL}${booking?.shopId?.image}`} alt="groomingimg"/>
//             </div>
//             <div className="listingrightside">
//               <div className="d-flex justify-content">
//                 {/* Use booking_seq_id from List */}
//                 <h1>
//                   <strong>{booking.booking_seq_id} | </strong> {booking?.category?.name} | Dog (All Sizes)...
//                 </h1>
//                 <div ref={(el) => (dropdownRefs.current[index] = el)}>
//                   <HiOutlineDotsVertical onClick={() => toggleDropdown(index)} />
//                   {openDropdownIndex === index && (
//                     <ul className="drop_down_item">
//                       <li className="dropdown-item">
//                         <button onClick={rescheduleEvent}>
//                           {booking.status === "Pending" ? "Re-schedule" : ""}
//                         </button>
//                       </li>
//                       <li className="dropdown-item">
//                         <button className="mb-0" onClick={() => setSmShow(true)}>
//                           {booking.status === "Pending" ? "Cancel" : ""}
//                         </button>
//                       </li>
//                     </ul>
//                   )}
//                 </div>
//               </div>
//               <p>{booking?.bookingdetails[0]?.services?.name}...</p>
//               <div className="d-flex justify-content">
//                 <h2>AED {booking?.subTotal}</h2>
//                 <ul className="order_timelist">
//                   {/* Use dynamic data for booking type and other details */}
//                   <li><p onClick={() => handleViewDetails(booking?._id, booking?.pick_drop)}><span>Type: </span> {booking?.pick_drop === "Y" ? "Pick & Drop" : "In-Store"}</p></li>
//                   <li><p><span>Date: </span> {new Date(booking?.createdAt).toLocaleDateString("en-GB")}</p></li>
//                   <li><p> <span>Time: </span> {new Date(booking?.createdAt).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true })}</p></li>
//                   <li><p className={booking?.status === "Pending" || booking?.status === "Cancelled" ? "process_pending" : "process_com"}>
//                     <span>Status: </span> {booking?.status}
//                   </p></li>
//                 </ul>
//               </div>
             
//             </div>
//           </div>
//         </div>
//       ))}
//       {/* Pagination */}
//       <div className="pagination">
//         <Pagination
//           count={totalPages}
//           onChange={handlePageChange}
//         />
//       </div>

//       <Modal
//         size="sm"
//         show={smShow}
//         onHide={() => setSmShow(false)}
//         aria-labelledby="example-modal-sizes-title-sm"
//         className="cancel_pop"
//       >
//         <Modal.Header className="pt-2 pb-0" >
//           <Modal.Title id="example-modal-sizes-title-sm">
//             <h1 className="session">Cancel <span> Session</span></h1>
//             <RxCross2 className="cross_btn" onClick={crossEvent} />
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="pt-0">
//           <p>Are you sure?</p>
//           <div className="">
//             <button className="yes_btn">Yes</button>
//             <button className="no_btn">No</button>
//           </div>
//         </Modal.Body>
//       </Modal>

//       <Modal
//         size="sm"
//         show={reschedule}
//         onHide={() => setReschedule(false)}
//         aria-labelledby="example-modal-sizes-title-sm"
//         className="reschdule_popup"
//       >
//         <Modal.Header className="pt-2 pb-0">
//           <Modal.Title id="example-modal-sizes-title-sm">
//             <h1 className="session">Reschedule Your <br></br><span>Pets Care Session.</span></h1>
//             <RxCross2 className="cross_btn" onClick={crossEvent} />
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="pt-0">

//           <div className="reschdule_popup">
//             <p className="py-2">Please select date and timings.</p>
//             <input type="date" />
//             <input type="time" />
//             <button className="no_btn my-2">Submit</button>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default Grooming;


//////////////////////////////////////////////
import React, { useState, useEffect, useRef } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import {
  booking_details,
  appointment,
  reschedule_appointment,
  cancel_appointment
} from "../../../../controllers/services/veterinaryController";
import { ASSETS_BASE_URL } from "../../../../config/constants";
import Pagination from "@mui/material/Pagination";
import { getCurrentDayStoreHours } from "../../../../util/common";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { no_listing } from "../../../../components/Images";

const Veterinary = () => {
  const navigate = useNavigate();
  const [smShow, setSmShow] = useState(false);
  const [reschedule, setReschedule] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [selectedAvailableTimes, setSelectedAvailableTimes] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [storeId, setStoreId] = useState([]);
  const [branch_id, setBranch_id] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [storeTime, setStoreTime] = useState([]);
  const [booking_id, setBooking_id] = useState([]);
  const [List, setList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [SKIP, setSkip] = useState(0);
  const [LIMIT, setLimit] = useState(10);
  const targetRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const dropdownRefs = useRef([]);
  const [errors, setErrors] = useState([{}]);



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

  const rescheduleEvent = (storeId, branch_id, categoryId, store_time, booking_id) => {
    setReschedule(true);
    setStoreId(storeId);
    setBranch_id(branch_id);
    setCategoryId(categoryId);
    setStoreTime(store_time);
    setBooking_id(booking_id);
  };

  const crossEvent = () => {
    setSmShow(false);
    setReschedule(false);
  };


  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
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

  const handleCancel = async (booking_id) => {
    setSmShow(true);
    setBooking_id(booking_id);
  }

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const options = {
          booking_id,
          date: selectedDate,
          time: selectedAvailableTimes,
        };
        const response = await reschedule_appointment(options);
        if (response?.status === true) {
          toast.success('Your booking is resheduled!', {
            position: "top-right",
            autoClose: 20000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            });
          setReschedule(response?.status)
          await getBookingList();
        } else {
          alert("server error");
        }
      } catch (error) {
        console.log("Failed to fetch appointment time", error);
      }
      setReschedule(false);
    }
  };

  const handleCancelSubmit = async () => {
    try {
      const options = {
        booking_id,
      };
      const response = await cancel_appointment(options);
      if (response?.status === true) {
        toast.success('Your booking has been canceled!', {
          position: "top-right",
          autoClose: 20000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          });
        await getBookingList();
      } else {
        alert("server error");
      }
    } catch (error) {
      console.log("Failed to fetch appointment time", error);
    }
    setSmShow(false);
  };

  /*********************************************************
 *  This function is use to fetch appointment time
 *********************************************************/
  const getAppointment = async () => {
    try {
      const { openTime, closeTime } = getCurrentDayStoreHours(storeTime);

      const options = {
        store_id: storeId,
        branch_id: branch_id,
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

  /*****************************************************************************
   *  This function is used to get the booking list and store it in the List state
   ********************************************************************************/
  const getBookingList = async () => {
    try {
      const options = {
        type: "",
        condition: {},
        select: {},
        sort: { _id: -1 },
        page: currentPage,
        skip: SKIP ? SKIP : 0,
        limit: LIMIT ? LIMIT : 10,
      };
      const listData = await booking_details(options);
      if (listData.status && Array.isArray(listData.result)) {
        setList(listData.result);
        setTotalPages(listData?.totalPage || 1);
      } else {
        setList([]);
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      setList([]);
    }
  };


  const handleViewDetails = (bookingId, isPickUp) => {
    console.log(
      "Navigating to /user/pick-drop with type:",
      bookingId,
      isPickUp
    );
    navigate("/user/veterinary-order", { state: { bookingDetails: bookingId, isPickUp } });
  };

  /*********************************************************
*  This function is for handle page change
*********************************************************/
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    setSkip((newPage - 1) * LIMIT);
    targetRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    getBookingList();
    getAppointment();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownIndex, currentPage, selectedDate]);



  return (
    <>
      {List.length === 0 && (
        <div className="row data_no_coming">
          <img src={no_listing} alt="No Pet Profiles" />
          <p className="heading">No Previous order</p>
        </div>
      )}
      {/* Iterate through List instead of hardcoded bookings */}
      {List.map((booking, index) => (
        <div className="grooming_listing" key={booking._id} ref={targetRef} onClick={() => handleViewDetails(booking, booking?.pick_drop)}>
          <div className="d-flex">
            <div className="listing_leftimg">
              <img src={`${ASSETS_BASE_URL}${booking?.shopId?.image}`} alt="groomingimg" />
            </div>
            <div className="listingrightside">
              <div className="d-flex justify-content">
                {/* Use booking_seq_id from List */}
                <h1>
                  <strong>{booking.booking_seq_id} | </strong> {booking?.category?.name} | Dog (All Sizes)...
                </h1>
                <div ref={(el) => (dropdownRefs.current[index] = el)}
                  onClick={(e) => e.stopPropagation()}
                  >
                  <HiOutlineDotsVertical onClick={() => toggleDropdown(index)} />
                  {openDropdownIndex === index && (
                    <ul className="drop_down_item">
                      {booking.status !== "Canceled" && (
                        <li className="dropdown-item">
                          {booking.status === "Pending" || booking.status === "Reschedule" ? (
                            <button
                              onClick={(e) =>{
                                e.stopPropagation();
                                rescheduleEvent(
                                  booking?.shopId?._id,
                                  booking?.branch,
                                  booking?.category?._id,
                                  booking?.shopId?.store_time,
                                  booking?._id
                                )
                              }}
                            >
                              Reschedule
                            </button>
                          ) : null}
                        </li>
                      )}
                      {/* Show Cancel button for Pending and Rescheduled status */}
                      {booking.status !== "Canceled" && (
                        <li className="dropdown-item">
                          {booking.status === "Pending" || booking.status === "Reschedule" ? (
                            <button className="mb-0"
                              onClick={(e) =>{
                                e.stopPropagation();
                                handleCancel(booking?._id)
                              }}
                            >
                              Cancel
                            </button>
                          ) : null}
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
              <p>{booking?.bookingdetails[0]?.services?.name}...</p>
              <div className="d-flex justify-content">
                <h2>AED {booking?.subTotal}</h2>
                <ul className="order_timelist">
                  <li>
                    <p>
                      {/* <p onClick={() => handleViewDetails(booking, booking?.pick_drop)}> */}
                      <span>Type: </span>{" "}
                      {booking?.servive_type ? booking?.servive_type : "In-Store"}</p> </li>
                  <li><p><span>Date: </span> {new Date(booking?.createdAt).toLocaleDateString("en-GB")}</p></li>
                  <li><p> <span>Time: </span> {new Date(booking?.createdAt).toLocaleTimeString("en-US", { hour: 'numeric', minute: 'numeric', hour12: true })}</p></li>
                  <li><p className={booking?.status === "Pending" || booking?.status === "Canceled" || booking?.status === "Reschedule" ? "process_pending" : "process_com"}>
                    <span>Status: </span> {booking?.status}
                  </p></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Pagination */}
      <div className="pagination">
        <Pagination
          count={totalPages}
          onChange={handlePageChange}
        />
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
            <button className="no_btn my-2" onClick={handleSubmit}>Submit</button>
            <ToastContainer />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Veterinary;
