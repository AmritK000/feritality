import { recent_booking, product_pic } from "../../../../components/Images";
import React, { useState, useEffect, useRef } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
const Shoplist = () => {
  const navigate = useNavigate();
  const [smShow, setSmShow] = useState(false);
  const [reschdule, setreschdule] = useState(false)
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const dropdownRefs = useRef([]);


  const reschdule_event = () => {
    setreschdule(true);
  }
  const cross_event = () => {
    setSmShow(false);
    setreschdule(false);
  }

  const bookings = [
    { id: 1, order: "ORDER481521512", status: "Pending", type: "Same Day ( Delivery )" },
    { id: 2, order: "ORDER481521513", status: "Cancelled", type: "Same Day ( Delivery )" },
    { id: 3, order: "ORDER481521514", status: "Pending", type: "Same Day ( Delivery )" },
    { id: 4, order: "ORDER481521515", status: "Accepted", type: "Same Day ( Delivery )" },
  ];


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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownIndex]);

  const handleViewDetails = (bookingType) => {
    console.log("Navigating to /user/pick-drop with type:", bookingType);
    navigate('/user/shopdetail', { state: { type: bookingType } });

  };

  return (
    <>
      {bookings.map((booking, index) => (
        <div className="grooming_listing" key={booking.id}>
          <div className="d-flex">
            <div className="listing_leftimg">
              <div className="numberproduct">
                <img src={product_pic} alt="groomingimg" className="petshops_img" />
                <p>+3</p>
              </div>

            </div>
            <div className="listingrightside">
              <div className="d-flex justify-content">
                <h1>
                  Order Id : <strong>{booking.order} | </strong>
                </h1>
                <div ref={(el) => (dropdownRefs.current[index] = el)}>
                  <HiOutlineDotsVertical onClick={() => toggleDropdown(index)} />
                  {openDropdownIndex === index && (
                    <ul className="drop_down_item">
                      <li className="dropdown-item">
                        <button onClick={reschdule_event}>{booking.status === "Pending" ? "Re-schedule" : ""}</button>
                      </li>
                      <li className="dropdown-item">
                        <button className="mb-0" onClick={() => setSmShow(true)}>{booking.status === "Pending" ? "Cancel" : ""}</button>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
              <p>(Without Haircut/Shave)...</p>
              <div className="d-flex justify-content">
                <h2>AED 50.00</h2>
                <ul className="order_timelist">
                  <li><p onClick={() => handleViewDetails(booking.type)}><span>Type: </span> {booking.type}</p></li>
                  <li><p className={booking.status === "Pending" || booking.status === "Cancelled" ? "process_pending" : "process_com"}>
                    <span>Status: </span> {booking.status}
                  </p></li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      ))}


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
            <RxCross2 className="cross_btn" onClick={cross_event} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <p>Are you sure?</p>
          <div className="">
            <button className="yes_btn">Yes</button>
            <button className="no_btn">No</button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        size="sm"
        show={reschdule}
        onHide={() => setreschdule(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        className="reschdule_popup"
      >
        <Modal.Header className="pt-2 pb-0">
          <Modal.Title id="example-modal-sizes-title-sm">
            <h1 className="session">Rechedule Your <br></br>
              <span>   Pets Care Session.</span></h1>
            <RxCross2 className="cross_btn" onClick={cross_event} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">

          <div className="reschdule_popup">
            <p className="py-2">Please select date and timings.</p>
            <input type="date" />
            <input type="time" />
            <button className="no_btn my-2">Submit</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Shoplist;
