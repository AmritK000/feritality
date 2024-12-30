
import Navbar from "../Topnvbar";
import Dashbaordsidebar from "../sidebar";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { service_one, service_two, service_third, service_fourth, service_sixth, services_ninth,service_seventh, service_eigth } from "../../components/Images";
import React, { useState, useEffect, useRef } from "react";
const Payment_details = () => {

    // State to track which tab is currently active
  const [activeTab, setActiveTab] = useState(0);

  // Dummy data for services and wallets
  const services = [
    { img: service_one, label: "Grooming" },
    { img: service_two, label: "Pet Shop" },
    { img: services_ninth, label: "Day Care" },
    { img: service_third, label: "Boarding" },
    { img: service_fourth, label: "Veterinary" },
    { img: service_sixth, label: "Adoptions" },
    { img: service_eigth, label: "Dog Friendly" },
  ];

  const wallets = [
    { date: "28/02/2024", orderId: "ORDER4714521521", credit: "+0.09" },
    { date: "28/02/2024", orderId: "ORDER4714521522", credit: "+0.09" },
    { date: "28/02/2024", orderId: "ORDER4714521523", credit: "+0.09" },
    { date: "28/02/2024", orderId: "ORDER4714521524", credit: "+0.09" },
    { date: "28/02/2024", orderId: "ORDER4714521525", credit: "+0.09" },
  ];


    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {

        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <Navbar></Navbar>
            <Dashbaordsidebar></Dashbaordsidebar>
            <div className="main_wrapper inner_section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className=" mt-2">
                                <h1 className="heading">Payments</h1>
                                <p className="sub_heading_dash">Payment History</p>
                            </div>
                        </div>

                    </div>


                    <ul className="services_listing">
            {services.map((service, index) => (
              <li
                key={index}
                onClick={() => setActiveTab(index)}
                className={activeTab === index ? "active" : ""}
              >
                <img src={service.img} alt={service.label} />
                <button><p>{service.label}</p></button>
              </li>
            ))}
          </ul>
               
                    <div className="row">
            <div className="col-md-12">
              {wallets.map((wallet, index) => (
                <div className="wallet_list" key={index}>
                  <div>
                    <p>{wallet.date}</p>
                    <p>Order Id:<span>{wallet.orderId}</span></p>
                  </div>
                  <div>
                    <h2 className="credit">{wallet.credit}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
                </div>
            </div>
        </>
    )
}
export default Payment_details;