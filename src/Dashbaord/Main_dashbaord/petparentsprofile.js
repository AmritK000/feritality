import Navbar from "../Topnvbar";
import Dashbaordsidebar from "../sidebar";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { sidebarlogo, rightfootprint, footerlogoes } from "../../components/Images";
import React, { useState, useEffect, useRef } from "react";
import { fetchIpAddress } from "../../controllers/API";
import { updateOwnerProfileController, addressList } from "../../controllers/accounts/Account";
import { ToastContainer, toast } from "react-toastify";

const Petparentsprofile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const dropdownRef = useRef(null);
    const [edit, setshow_edit] = useState(false);
    const [errors, setErrors] = useState({});
    const [lastUpdatedTime, setLastUpdatedTime] = useState(null);
    const [AddressList, setAddressList] = useState([]);
    const userInfo = JSON.parse(sessionStorage.getItem("USER-INFO"));
    const [ADDEDITDATA, setAddEditData] = useState(userInfo || {});


    /*********************************************************
    *  This function is use to handle imput chnage
    *********************************************************/
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddEditData((pre) => ({
            ...pre,
            [name]: value,
        }));
        setErrors((preError) => ({
            ...preError,
            [name]: "",
        }));
    };

    /*********************************************************
      *  This function is use to handle genger checkbox chnage
      *********************************************************/
    const onCheckedChange = (e) => {
        setAddEditData((prev) => ({
            ...prev,
            gender: e.target.value,
        }));
    };


    const validateFormData = (formData) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.get("name")?.trim()) {
            setErrors((preError) => ({ ...preError, name: "Name is required" }));
            return false;
        } else if (!emailRegex.test(formData.get("email")?.trim())) {
            setErrors((preError) => ({ ...preError, email: "Enter a valid email address" }));
            return false;
        } else if (!formData.get("gender")?.trim()) {
            setErrors((preError) => ({ ...preError, gender: "Please select a gender" }));
            return false;
        } else if (!formData.get("address")?.trim()) {
            setErrors((preError) => ({ ...preError, address: "Address is required" }));
            return false;
        } else {
            return true;
        }
    };

    const handleSubmit = async () => {
        const currentTime = new Date().getTime();
        if (lastUpdatedTime && currentTime - lastUpdatedTime < 0 * 60 * 1000) {
            toast.error("Already updated pet profile.");
            return;
        }
        try {
            const { name, email, gender, version, platform, address } = ADDEDITDATA;
            const ipAddress = await fetchIpAddress();
            const form = new FormData();
            form.append("name", name);
            form.append("email", email);
            form.append("address", address);
            form.append("gender", gender ? gender : "Male");
            form.append("ipAddress", ipAddress);

            const isValid = validateFormData(form);
            if (isValid) {
                const res = await updateOwnerProfileController(form);
                if (res?.status === true) {
                    setAddEditData({ name, email, gender, address });
                    setLastUpdatedTime(currentTime);
                    setIsEditing(false);
                    toast.success("Profile updated successfully!");
                }
            }
        } catch (error) {
            console.log("Error", error);
        }
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const addresslist = async () => {
        try {
            const options = {
                type: "",
                condition: {
                    userData: userInfo?._id,
                    status: "A"
                },
                select: {},
                sort: { _id: -1 },
                populate: {
                    key: "",
                    select: ""
                }
            };
            const listData = await addressList(options);
            if (listData.status && Array.isArray(listData.result)) {
                setAddressList(listData?.result)
            } else {
                setAddressList([]);
            }
        } catch (error) {
            console.error("Error fetching breeds:", error);
            setAddressList([]);
        }
    };

    useEffect(() => {
        addresslist()
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <Navbar />
            <Dashbaordsidebar />
            <div className="main_wrapper inner_section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <div className=" mt-2">
                                <h1 className="heading">Pet Parent Profile</h1>
                                <p className="sub_heading_dash">Pet Parent’s Profile Details</p>
                            </div>
                        </div>
                        <div className="col-md-6 textalign_right mt-2">
                            {!isEditing && (
                                <button className="edit_btn" onClick={toggleEditMode}>
                                    Edit Profile Details
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="row parents_details">
                        <div className="col-md-4">
                            <input
                                type="text"
                                placeholder="Owner’s Name"
                                name="name"
                                value={ADDEDITDATA?.name}
                                onChange={handleChange}
                                readOnly={!isEditing}
                            />
                            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                        </div>
                        <div className="col-md-4 verfied_input">
                            <input
                                type="text"
                                placeholder="Enter your phone number"
                                name="phone"
                                value={ADDEDITDATA?.phone}
                                onChange={handleChange}
                                readOnly
                            />
                            <span className="verified">Verified</span>
                        </div>
                        <div className="col-md-4">
                            <select
                                name="gender"
                                value={ADDEDITDATA?.gender}
                                onChange={onCheckedChange}
                                disabled={!isEditing}
                            >
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}
                        </div>
                        <div className="col-md-12">
                            <input
                                type="email"
                                placeholder="Enter email address"
                                name="email"
                                value={ADDEDITDATA?.email}
                                onChange={handleChange}
                                readOnly={!isEditing}
                            />
                            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                        </div>
                        <div className="col-md-12">
                            <input
                                type="text"
                                placeholder="Enter Your Address"
                                name="address"
                                value={ADDEDITDATA?.address}
                                onChange={handleChange}
                                readOnly={!isEditing}
                            />
                            {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
                        </div>

                        {isEditing && (
                            <div className="col-md-12">
                                <button className="edit_btn" type="button" onClick={handleSubmit}>
                                    Submit
                                </button>
                                <ToastContainer/>
                            </div>
                        )}
                    </div>


                    {/* <!-edit end section --> */}
                    <div className={`edit ${edit ? "blur-content" : ""}`}>
                        <div className="col-md-12">
                            <p className="sub_heading_dash">Saved Addresses</p>
                        </div>

                        {AddressList.length > 0 ? (
                            AddressList.map((item, index) => (
                                <div className="add_address">
                                    <div>
                                        <h1>{`Address ${index + 1}`}</h1>
                                        <p>{`${item.firstname} ${item.lastname}, ${item.phone}, ${item.email}, ${item.apartment_no}, ${item.building_name},  ${item.address} ${item.city},`}</p>
                                    </div>
                                    {/* <div ref={dropdownRef}>
                                        <HiOutlineDotsVertical onClick={toggleDropdown} />
                                        {isOpen && (
                                            <ul className="drop_down_item">
                                                <li className="dropdown-item">
                                                    <button>Delete</button>
                                                </li>
                                                <li className="dropdown-item">

                                                    <button className="mb-0">Save</button>
                                                </li>

                                            </ul>
                                        )}
                                    </div> */}
                                </div>
                            ))) : ("")}
                        <div className="col-md-12">
                            <div className="inner_pages_footer mt-5">
                                <div className="row">
                                    <div className="col-md-1">
                                        <div>
                                            <img src={sidebarlogo} alt="dashbaord_logo" className="footer_logo" />
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="d-flex">
                                            <div>
                                                <h2>Download the app</h2>
                                                <p> Book professional Experts from your phone.</p>
                                            </div>
                                            <div>
                                                <img src={rightfootprint} className="foote_print_img"></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <img src={footerlogoes} alt="dashbaord_logo" className="mt-3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Petparentsprofile;