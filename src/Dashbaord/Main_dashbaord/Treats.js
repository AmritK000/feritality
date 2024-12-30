import Navbar from "../Topnvbar";
import Dashbaordsidebar from "../sidebar";
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from "react";
import { treatsHistory } from "../../controllers/booking/promoCode";
import moment from "moment";
import Pagination from "@mui/material/Pagination";

const Treats = () => {
    const [isOpen, setIsOpen] = useState(false);
    const targetRef = useRef(null);
    const dropdownRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [treatsDetails, setTreatsDetails] = useState("");
    const [LIMIT, setLimit] = useState(10);
    const [SKIP, setSkip] = useState(0);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const treatDetails = async () => {
        try {
            const options = {
                type: "",
                condition: {},
                select: {},
                sort: { "_id": -1 },
                page: currentPage,
                skip: SKIP ? SKIP : 0,
                limit: LIMIT ? LIMIT : 10,
            }
            const response = await treatsHistory(options);
            if (response?.status === true || response?.status === 200) {
                setTreatsDetails(response?.result);
                setTotalPages(response?.totalPage || 1);
            }
        } catch (error) {
            console.log("Failed to fetch Treats Details", error);
        }
    }

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
        treatDetails()
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [currentPage]);

    return (
        <>
            <Navbar></Navbar>
            <Dashbaordsidebar></Dashbaordsidebar>
            <div className="main_wrapper inner_section" ref={targetRef}>
                <div className="container-fluid">
                    <div className="row my-2">
                        <div className="col-md-6">
                            <div className=" mt-2">
                                <h1 className="heading">Treats</h1>
                                <p className="sub_heading_dash">Treats History</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="textalign_right mt-2 wallet_details">
                                <Link to="/user/treats-work">
                                    <div className="walltes_info">
                                        <p>How it <br></br>
                                            <span>WORKS </span></p>
                                    </div>
                                </Link>
                                <div className="d-flex earned_treats">
                                    <div>
                                        <p className="mb-0">Total earned</p>
                                        <h2 className="mb-0">  Treats </h2>
                                    </div>
                                    <div>
                                        <h3 className="mb-0 ">100.45</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {treatsDetails && treatsDetails?.length > 0 ? (
                            treatsDetails.map((item, index) => (
                                <div className="col-md-12 px-0" key={index}>
                                    <div className="wallet_list">
                                        <div>
                                            <p className="services_treats">{item?.form}</p>
                                            <p>{moment(item?.creation_date).format("DD-MM-YYYY")}</p>
                                        </div>
                                        <div>
                                            {item?.type === "Credit" ? (
                                                <h2 className="credit">+{item?.amount.toFixed(2)}</h2>
                                            ) : (
                                                <h2 className="debit">-{item?.amount.toFixed(2)}</h2>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            "No Treats Available"
                        )}
                    </div>
                </div>
                {/* Pagination */}
                <div className="pagination">
                    <Pagination
                        count={totalPages}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
        </>
    )
}
export default Treats;







