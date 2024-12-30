import Navbar from "../../Topnvbar";
import Dashbaordsidebar from "../../sidebar";
import { HiOutlineDotsVertical } from "react-icons/hi";
import React, { useState, useEffect, useRef } from "react";
import { ASSETS_BASE_URL } from "../../../config/constants";
import { list } from "../../../controllers/services/servicesCategory"
import DayCare from "./Day_care/Daycare";
import Grooming from "./Grooming/Grooming";
import Boarding from "./Boarding/Boarding";
import Training from "./Training/Training";
import Veterinary from "./Veterinary/Veterinary";
import Shoplist from "./Shoplist/ShopList";
import Adoption from "./Adoption/Adoption";
import Friendly from "./Friendly/Friendly";
import { useParams } from "react-router-dom";


const Listing = () => {
    const [ServiceList, setServiceList] = useState([]);
    const { slug } = useParams();
    const [slugTag, setSlugTag] = useState(slug || 'grooming');

    const getList = async () => {
        try {
            const listData = await list();
            if (listData?.status === true) {
                setServiceList(listData?.result);
            }
        } catch (error) {
            console.log("Failed to fetch service list:", error);
        }
    }

    const handleServiceClick = (slug) => {
        // console.log('slug',slug);
        setSlugTag(slug);
    };

    useEffect(() => {
        getList();
        if (slug && slug !== 'undefine') {
            setSlugTag(slug);
        }
    }, [slug]);

    return (
        <>
            <Navbar />
            <Dashbaordsidebar />
            <div className="main_wrapper inner_section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="mt-2">
                                <h1 className="heading">My Orders</h1>
                                <p className="sub_heading_dash">Order History</p>
                            </div>
                        </div>

                        <div className="col-md-12">
                            {/* Static Tabs */}
                            <ul className="services_listing">
                                {ServiceList.map((service, index) => (
                                    <li key={index} onClick={() => handleServiceClick(service.slug)} className={slugTag === service?.slug ? 'active' : ''}>
                                        <img src={`${ASSETS_BASE_URL}${service?.image}`} alt={service.name} />
                                        <button>
                                            <p>{service.name}</p>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <div className="service_content">
                                {slugTag === 'grooming' ? < Grooming/> : ''}
                                {slugTag === 'boarding' ? <Boarding/> : ''}
                                {slugTag === 'day-care' ? <DayCare/> : ''}
                                {slugTag === 'shop'     ? <Shoplist/> : ''}
                                {slugTag === 'veterinary' ? <Veterinary/> : ''}
                                {slugTag === 'training' ? <Training/> : ''}
                                {slugTag === 'adoption' ? <Adoption/> : ''}
                                {slugTag === 'friendly' ? <Friendly/> : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Listing;
