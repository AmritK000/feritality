import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { TbFileUpload } from "react-icons/tb";
import {useNavigate } from 'react-router-dom';
import { booking as grooming_services_appointment } from "../../controllers/booking/traningBooking.js"
import { getCurrentDayStoreHours } from "../../util/common.js"

const Training_Modal = ({ storeTime, groomingFulfillment, storeId, branchId, categoryId, servicesId,selectedOption}) => {
   console.log("selectedOption",selectedOption);
  const [booksession, setbooksession] = useState(true);
  const [fileName, setFileName] = useState("");
  const [documents, setdocuments] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [serviceType, setServiceType] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedAvailableTimes, setSelectedAvailableTimes] = useState([]);
  const navigate = useNavigate()
  const [errors, setErrors] = useState([{}]);
  const handleClose = () => setbooksession(false);
  

  /*********************************************************
  *This function is used to upload pdf file for pet vacination certificate
  *********************************************************/
  // const handleFileChange = (event) => {
  //   if (event.target.files.length > 0) {
  //     setFileName(event.target.files[0].name);
  //     setdocuments(event.target.files[0])
  //   }
  // };
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log("file",file);
      const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];

      if (allowedTypes.includes(file.type)) {
        setFileName(file.name);
        setdocuments(file);
        setErrors({ ...errors, file: "" });
      } else {
        setErrors({ ...errors, file: "Only PNG, JPG, JPEG, and PDF files are allowed." });
        setFileName('');
        setdocuments('');
      }
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
  *This function is used to set service type
  *********************************************************/
  const handleServiceChange = (event) => {
    setServiceType(event.target.value);
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
      }
      const appointmentTime = await grooming_services_appointment(options);
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
  *  This function is use to Filter available times and service types
  *********************************************************/
  useEffect(() => {
    getAppointment()
  }, [selectedDate]);

  useEffect(() => {
    // If selectedOption has a value, set it as serviceType
    if (selectedOption) {
        setServiceType(selectedOption);
    }
}, [selectedOption]);
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
  

  const handleBookNow = () => {
    if (validateForm()) {
      const checkoutData = {
        servicesId,
        selectedDate,
        selectedAvailableTimes,
        serviceType,
        // fileName: documents,
        fileName: {
          name: documents.name,
          size: documents.size,
          type: documents.type,
          lastModified: documents.lastModified,
        },
      };
      // Store the data in sessionStorage
      sessionStorage.setItem("checkoutData", JSON.stringify(checkoutData));
      navigate('/TrainingPersonal_details');
      // navigate('/TrainingPersonal_details', {
      //   state: { servicesId, selectedDate, selectedAvailableTimes, serviceType, fileName : documents},
      // });
    }
  };
  

  return (
    <>
      <Modal show={booksession} onHide={handleClose} className='booknow'>
        <div className='modelheader'>
          <h1 className='main_heading'>Book Your<br></br>
            <span>Pets Care Session.</span></h1>
          <p className='sub_heading'>Please select date and timings, service type for book your session. Also Upload pet documents.</p>
          <button
                className="login_popup_cross_button"
                type="button"
                onClick={handleClose}
              >
                <img src="/frisbeeImage/login_cross.png" alt="Close" />
              </button>
        </div>
        <Modal.Body>
          <div className='select_dete_time'>
          {selectedOption === null || selectedOption === "" && (
                <select className="create_pet_for_gender_in_login" value={serviceType} onChange={handleServiceChange}>
                    <option>Service Type</option>
                    {groomingFulfillment?.in_store === "Y" && <option value="Home">At Home</option>}
                    {groomingFulfillment?.pick_drop === "Y" && <option value="Institute">At Institute</option>}
                </select>
            )}

          {/* <select className='create_pet_for_gender_in_login' value={serviceType} onChange={handleServiceChange}>
              <option>Service Type</option>
            
              {groomingFulfillment?.in_store === "Y" && <option value="At Home">At Home</option>}
              {groomingFulfillment?.pick_drop === "Y" && <option value="At Institute">At Institute</option>}
            </select> */}
            <input type='date' min={new Date().toISOString().split('T')[0]} value={selectedDate} onChange={handleDateChange} />
            {errors.selectedDate && <p className="error" style={{color:'red'}}>{errors.selectedDate}</p>}
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
              {errors.selectedAvailableTimes && <p className="error" style={{color:'red'}}>{errors.selectedAvailableTimes}</p>}
          </div>

          <div className='upload_section'>
            {fileName && <p className='file-name'>{fileName}</p>}
            <label htmlFor="file-upload" className="custom-file-upload">
              <TbFileUpload
              />   Upload Document
            </label>
            <input id="file-upload" type="file" onChange={handleFileChange} />
            {errors.file && <p className="error" style={{ color: 'red' }}>{errors.file}</p>}
          </div>
        </Modal.Body>
        <div className='model_footer'>
          <button className='booknow_btn' onClick={handleBookNow}>Book Now</button>
        </div>
      </Modal>
    </>
  )
}


export default Training_Modal;
