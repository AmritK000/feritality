import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { TbFileUpload } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { appointment as vetrinary_services_appointment } from "../../../controllers/services/veterinaryController.js"
import { getCurrentDayStoreHours } from "../../../util/common.js"
import Cookies from 'js-cookie';

const BookNew = ({ storeTime, storeId, branchId, categoryId, servicesId }) => {
  const [booksession, setbooksession] = useState(true);
  const [fileName, setFileName] = useState("");
  const [documents, setdocuments] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedAvailableTimes, setSelectedAvailableTimes] = useState([]);
  const navigate = useNavigate();
  const handleClose = () => setbooksession(false);
  const [errors, setErrors] = useState([{}]);

  /*********************************************************
  *This function is used to upload pdf file for pet vaccination certificate
  *********************************************************/
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
  
      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        alert("Only PNG, JPG, and PDF files are allowed.");
        return;
      }
  
      // Validate file size
      if (file.size > maxSize) {
        alert("File size must be less than 2MB.");
        return;
      }
      setFileName(event.target.files[0].name);
    }
  };

  /*********************************************************
  *This function is used to set time
  *********************************************************/
  const handleTimeChange = (event) => {
    setSelectedAvailableTimes(event.target.value);
  }

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setSelectedAvailableTimes('');
  };

  /*********************************************************
  *  This function is use to fetch appointment time
  *********************************************************/
  const getAppointment = async () => {
    try {
      const { openTime, closeTime } = getCurrentDayStoreHours(storeTime);
      const options = {
        store_id: storeId,
        branch_id: branchId,
        serviceId: categoryId,
        date: selectedDate,
        openTime: openTime,
        closeTime: closeTime
      };
      const appointmentTime = await vetrinary_services_appointment(options);
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

  useEffect(() => {
    getAppointment();
  }, [selectedDate]);


  /*********************************************************
*  This function is use to validate available times and service types
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
  * Handle Booking - Store data in cookie and navigate
  *********************************************************/
  const handleBookNow = () => {
    if (validateForm()) {
      const bookingData = {
        servicesId, selectedDate, selectedAvailableTimes, documents
      };
      localStorage.setItem('bookingData', JSON.stringify(bookingData));
      navigate('/vetrinary-personaldetail', {
        state: { servicesId, selectedDate, selectedAvailableTimes, fileName: documents },
      });
    }
  };

  return (
    <>
      <Modal show={booksession} onHide={handleClose} className='booknow'>
        <div className='modelheader'>
          <h1 className='main_heading'>Book Your<br></br>
            <span>Pets Care Session.</span></h1>
          <p className='sub_heading'>Please select date and timings, Also Upload pet documents.</p>
          <button className="login_popup_cross_button" type="button" onClick={handleClose}>
            <img src="/frisbeeImage/login_cross.png" alt="Close" />
          </button>
        </div>
        <Modal.Body>
          <div className='select_dete_time'>
            <input type='date' min={new Date().toISOString().split('T')[0]} value={selectedDate} onChange={handleDateChange} />
            {errors.selectedDate && <p className="error" style={{ color: 'red' }}>{errors.selectedDate}</p>}
            <select
              className='create_pet_for_gender_in_login'
              value={selectedAvailableTimes}
              onChange={handleTimeChange}
              disabled={!availableTimes.length}
            >
              <option value="">Select Time</option>
              {availableTimes?.length && (availableTimes.map((item, index) => (
                <option key={index} value={item.slot}>{item.slot}</option>
              )))}
            </select>
            {errors.selectedAvailableTimes && <p className="error" style={{ color: 'red' }}>{errors.selectedAvailableTimes}</p>}
          </div>
          <div className='vaccinaction_middle_section'>
            <h2 className='documnet'>Vaccination Documents</h2>
            <p className='document_show'>(or Show Later Physically)</p>
          </div>
          <div className='upload_section'>
            {fileName && <p className='file-name'>{fileName}</p>}
            <label htmlFor="file-upload" className="custom-file-upload">
              <TbFileUpload /> Upload Document
            </label>
            <input id="file-upload" type="file" onChange={handleFileChange} />
          </div>
        </Modal.Body>
        <div className='model_footer'>
          <button className='booknow_btn' onClick={handleBookNow}>Book Now</button>
        </div>
      </Modal>
    </>
  );
};

export default BookNew;
