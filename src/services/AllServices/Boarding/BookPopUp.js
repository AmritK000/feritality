import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { TbFileUpload } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { booking as boarding_services_appointment } from "../../../controllers/services/boardingController.js";
import { getCurrentDayStoreHours } from "../../../util/common.js";
import Cookies from "js-cookie"; // Import js-cookie

const BookNew = ({
  storeTime,
  groomingFulfillment,
  storeId,
  branchId,
  categoryId,
  servicesId,
}) => {
  const [booksession, setbooksession] = useState(true);
  const [fileName, setFileName] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedToDate, setSelectedToDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [availableTimes, setAvailableTimes] = useState([]);
  const [documents, setdocuments] = useState("");
  const [selectedAvailableTimes, setSelectedAvailableTimes] = useState([]);
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [errors, setErrors] = useState([{}]);
  const [fileData, setFileData] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => setbooksession(false);

  /*********************************************************
   *This function is used to upload pdf file for pet vaccination certificate
   * It stores the file in localStorage
   *********************************************************/
  // const handleFileChange = (event) => {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     setFileName(file.name);
      
  //     // Read the file as base64 and store it in localStorage
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64String = reader.result;
  //       setFileData(base64String); // Store the base64 string in state
  //       localStorage.setItem("uploadedFile", base64String); // Save to localStorage
  //       localStorage.setItem("fileName", file.name); // Save the file name as well
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleFileChange = (event) => {
    const newErrors = { ...errors }; // Copy existing errors
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
  
      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        newErrors.documents = "Only PNG, JPG, and PDF files are allowed.";
        setErrors(newErrors);
        return;
      }
  
      // Validate file size
      if (file.size > maxSize) {
        newErrors.documents = "File size must be less than 2MB.";
        setErrors(newErrors);
        return;
      }
  
      // If file is valid, clear the error and set the file
      setFileName(file.name);
      setdocuments(file);
      newErrors.documents = ""; // Clear previous error
      setErrors(newErrors);
    }
  };
  
  
  /*********************************************************
   *This function is used to set time
   *********************************************************/
  const handleTimeChange = (event) => {
    setSelectedAvailableTimes(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setSelectedAvailableTimes("");
  };
  const handleToDateChange = (event) => {
    setSelectedToDate(event.target.value);
  };
  /*********************************************************
   *  This function is use to fetch appointment time
   *********************************************************/
  const getAppointment = async () => {
    try {
      const { openTime, closeTime } = getCurrentDayStoreHours(storeTime);
      setOpenTime(openTime);
      setCloseTime(closeTime);
      const options = {
        store_id: storeId,
        branch_id: branchId,
        serviceId: categoryId,
        date: selectedDate,
        openTime: openTime,
        closeTime: closeTime,
      };
      const appointmentTime = await boarding_services_appointment(options);
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
  /*********************************************************
   * validate data before going further
   *********************************************************/
  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};
  
    if (!selectedDate) {
      formIsValid = false;
      newErrors.selectedDate = "From Date is required.";
    }
  
    if (!selectedToDate) {
      formIsValid = false;
      newErrors.selectedToDate = "To Date is required.";
    }
  
    // Validate that the "From Date" is less than or equal to the "To Date"
    if (selectedDate && selectedToDate && new Date(selectedDate) >= new Date(selectedToDate)) {
      formIsValid = false;
      newErrors.selectedToDate = "To Date must be after From Date.";
    }
  
    if (!selectedAvailableTimes || selectedAvailableTimes.length === 0) {
      formIsValid = false;
      newErrors.selectedAvailableTimes = "Time is required.";
    }
  
    setErrors(newErrors);
    return formIsValid;
  };
  /*********************************************************
   * Handle Booking - Store data in cookie and navigate
   *********************************************************/
  const handleBookNow = () => {
   
    if (validateForm()) {
    const bookingData = {
      servicesId,
      selectedDate,
      selectedToDate,
      selectedAvailableTimes,
      openTime,
      closeTime,
      fileName,
    };

    // Function to convert the booking data to Base64 safely
    const encodeToBase64 = (obj) => {
      const jsonString = JSON.stringify(obj);
      const uint8Array = new TextEncoder().encode(jsonString); // UTF-8 encoding
      const base64String = btoa(String.fromCharCode(...uint8Array)); // Convert to Base64
      return base64String;
    };

    const enBookingData = encodeToBase64(bookingData);
    const oneHourFromNow = new Date(new Date().getTime() + 60 * 60 * 1000);

    // Store booking data in a cookie (expires in 1 hour)
    Cookies.set("bookingData", enBookingData, { expires: oneHourFromNow });

    // Check if the cookie is actually set before navigating
    const storedCookie = Cookies.get("bookingData");

    if (storedCookie) {
      // Navigate to the next page only if the cookie was successfully set
      navigate("/services/boarding/pick-drop");
    } else {
      alert("Failed to save booking data. Please try again.");
    }
  }
  };

  useEffect(() => {
    getAppointment();
  }, [selectedDate]);


  return (
    <>
      <Modal show={booksession} onHide={handleClose} className="booknow">
        <div className="modelheader">
          <h1 className="main_heading">
            Book Your<br></br>
            <span>Pets Care Session.</span>
          </h1>
          <p className="sub_heading">
            Please select date and timings, Also Upload pet documents.
          </p>
          <button
            className="login_popup_cross_button"
            type="button"
            onClick={handleClose}
          >
            <img src="/frisbeeImage/login_cross.png" alt="Close" />
          </button>
        </div>
        <Modal.Body>
          <div className="select_dete_time">
            <input
              type="date"
              placeholder="From Date"
              min={new Date().toISOString().split("T")[0]}
              value={selectedDate}
              onChange={handleDateChange}
            />
             {errors.selectedDate && <p className="error" style={{color:'red'}}>{errors.selectedDate}</p>}
            <input
              type="date"
              placeholder="To Date"
              min={new Date().toISOString().split("T")[0]}
              value={selectedToDate}
              onChange={handleToDateChange}
            />
             {errors.selectedToDate && <p className="error" style={{color:'red'}}>{errors.selectedToDate}</p>}
            <select
              className="create_pet_for_gender_in_login"
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
            {errors.selectedAvailableTimes && <p className="error" style={{color:'red'}}>{errors.selectedAvailableTimes}</p>}
          </div>
          <div>
            <h2 className="documnet">Vaccination Documents</h2>
            <p className="document_show">(or Show Later Physically)</p>
          </div>
          <div className="upload_section">
            {fileName && <p className="file-name">{fileName}</p>}
            <label htmlFor="file-upload" className="custom-file-upload">
              <TbFileUpload /> Upload Document
            </label>
            <input id="file-upload" type="file" onChange={handleFileChange} />
            {errors.documents && <p className="error" style={{ color: 'red' }}>{errors.documents}</p>}
          </div>
        </Modal.Body>
        <div className="model_footer">
          <button className="booknow_btn" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </Modal>
    </>
  );
};

export default BookNew;
