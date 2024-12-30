import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { list } from "../../../../controllers/services/friendlyController";
import { ASSETS_BASE_URL } from "../../../../config/constants";
import Pagination from "@mui/material/Pagination";
import 'react-toastify/dist/ReactToastify.css';
import { no_listing } from "../../../../components/Images";

const Adoption = () => {
  const navigate = useNavigate();
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
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
  const [showRequest, setShowRequest] = useState("");

  const handleShowRequest = (value) => {
    setShowRequest(value);
  }

  const handleClickOutside = (event) => {
    dropdownRefs.current.forEach((ref, index) => {
      if (ref && !ref.contains(event.target)) {
        if (index === openDropdownIndex) {
          setOpenDropdownIndex(null);
        }
      }
    });
  };


  /*****************************************************************************
   *  This function is used to get the booking list and store it in the List state
   ********************************************************************************/
  const dogFriendlyList = async () => {
    try {
      const longitude = localStorage.getItem('LONGITUDE');
      const latitude = localStorage.getItem('LATITUDE');
      const options = {
        type: "",
        condition: {
          ...(showRequest ? { status: showRequest } : null),
        },
        latitude: latitude,
        longitude: longitude,
        select: {
          title: true,
          about: true,
          photos: true,
          ratings: true,
          longitude: true,
          latitude: true,
          status: true,
          parks: true,
          restaurant: true,
          cafe: true,
          beach: true,
          image: true,
          center_facilities: true,
        },
        filter: {
          beach: "Y"
        },
        sort: { "_id": -1 },
        skip: SKIP ? SKIP : 0,
        limit: LIMIT ? LIMIT : 10
      };
      const listData = await list(options);
      console.log("hkajdsfksdk page", listData)
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
    dogFriendlyList();
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
      {List.map((booking, index) => (
        <div className="grooming_listing" key={booking._id} ref={targetRef}>
          <div className="d-flex">
            <div className="listing_leftimg">
              <img src={`${ASSETS_BASE_URL}${booking?.image}`} alt="groomingimg" />
            </div>
            <div className="listingrightside">
              <div className="d-flex justify-content">
                <h1>
                  Dog Name: {booking?.pet_name}
                </h1>
              </div>
              <h1>
                Breed: {booking?.breed}
              </h1>
              <div className="d-flex justify-content">
                <h2>About: {booking?.about.length > 80 ? `${booking?.about?.substring(0, 80)}...` : booking?.about}</h2>
                <ul className="order_timelist">
                  <li>
                    <p>
                      <span>Type: </span>{" "}
                      {booking?.servive_type ? booking?.servive_type : "In-Store"}</p> </li>
                  <li><p><span>Title: </span> {booking?.title?.length>10 ? `${booking?.title.substring(0,10)}...` : booking?.title}</p></li>
                  <li><p> <span>Rating: </span> {booking?.ratings}</p></li>
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
    </>
  );
};

export default Adoption;
