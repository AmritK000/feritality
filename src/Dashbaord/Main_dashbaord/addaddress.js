import Navbar from "../Topnvbar";
import Dashbaordsidebar from "../sidebar";
import { HiOutlineDotsVertical } from "react-icons/hi";
import React, { useState, useEffect, useRef } from "react";
import { addEditAddress, addressList, removeAddress } from "../../controllers/accounts/Account.js";
import MapComponent from "../../services/Map/MapComponent.js";
import LocationMap from "../../services/Map/LocationMap.js";
import { fetchIpAddress } from "../../controllers/API.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add_address = () => {
    const [AddressList, setAddressList] = useState([]);
    const [isOpen, setIsOpen] = useState(null);
    const [addNewAddress, setAddNewAddress] = useState(false);
    const [errors, setErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const dropdownRef = useRef(null);
    const userInfo = JSON.parse(sessionStorage.getItem("USER-INFO"));
    // const targetRef = useRef(null);

    const toggleDropdown = (index) => {
        if (isOpen === index) {
            setIsOpen(null);
        } else {
            setIsOpen(index);
        }
    };

    /*********************************************************
 *  This function is use to validate address form data before submit
 *********************************************************/
    const validateFormData = async (formData, index) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const numberRegex = /^[0-9]+$/;

        if (
            formData.get("firstname") === "undefined" ||
            formData.get("firstname") === null ||
            formData.get("firstname").trim() === ""
        ) {
            setErrors((preError) => ({
                ...preError,
                firstname: "First Name is required",
            }));
            return false;
        } else if (
            formData.get("lastname") === "undefined" ||
            formData.get("lastname") === null ||
            formData.get("lastname").trim() === ""
        ) {
            setErrors((preError) => ({
                ...preError,
                lastname: "Last name is required",
            }));
            return false;
        } else if (
            formData.get("phone") === "undefined" ||
            formData.get("phone") === null ||
            formData.get("phone").trim() === "" ||
            !numberRegex.test(formData.get("phone"))
        ) {
            if (formData.get("phone").trim() === "") {
                setErrors((preError) => ({
                    ...preError,
                    phone: "Phone number is required",
                }));
            } else {
                setErrors((preError) => ({
                    ...preError,
                    phone: "Enter a valid mobile number",
                }));
            }
            return false;
        } else if (
            formData.get("email") === "undefined" ||
            formData.get("email") === null ||
            formData.get("email").trim() === "" ||
            !emailRegex.test(formData.get("email"))
        ) {
            if (formData.get("email").trim() === "") {
                setErrors((preError) => ({
                    ...preError,
                    email: "Email address is required",
                }));
            } else {
                setErrors((prevError) => ({
                    ...prevError,
                    email: "Enter a valid email address",
                }));
            }
            return false;
        } else if (
            formData.get("city") === "undefined" ||
            formData.get("city") === null ||
            formData.get("city").trim() === ""
        ) {
            setErrors((preError) => ({
                ...preError,
                city: "City is required",
            }))
            return false;
        } else if (
            formData.get("latitude") === "undefined" ||
            formData.get("latitude") === null ||
            formData.get("latitude").trim() === ""
        ) {
            setErrors((preError) => ({
                ...preError,
                latitude: "latitude is required",
            }))
            return false;
        } else if (
            formData.get("longitude") === "undefined" ||
            formData.get("longitude") === null ||
            formData.get("longitude").trim() === ""
        ) {
            setErrors((preError) => ({
                ...preError,
                longitude: "longitude is required",
            }))
            return false;
        } else if (
            formData.get("address") === "undefined" ||
            formData.get("address") === null ||
            formData.get("address").trim() === ""
        ) {
            setErrors((preError) => ({
                ...preError,
                address: "Address is required",
            }))
            return false;
        } else if (
            formData.get("building_name") === "undefined" ||
            formData.get("building_name") === null ||
            formData.get("building_name").trim() === ""
        ) {
            setErrors((preError) => ({
                ...preError,
                building_name: "Building Name is required",
            }))
            return false;
        } else if (
            formData.get("apartment_no") === "undefined" ||
            formData.get("apartment_no") === null ||
            formData.get("apartment_no").trim() === ""
        ) {
            setErrors((preError) => ({
                ...preError,
                apartment_no: "Apartment Number is required",
            }))
            return false;
        } else {
            return true;
        }
    }; //End


    //
    const handleChange = (e) => {
        const { name, value } = e.target;
        e.preventDefault();
        const updateAddress = { ...addNewAddress };
        updateAddress[name] = value;
        setAddNewAddress(updateAddress);
        setErrors((pre) => ({
            ...pre,
            [name]: "",
        }));
    };

    /*********************************************************
   *  This function is use to addresslist for Address
   *********************************************************/
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
            };
            const listData = await addressList(options);
            if (listData.status && Array.isArray(listData.result)) {
                setAddressList(listData?.result)
            } else {
                setAddressList([]);
            }
        } catch (error) {
            console.error("Error fetching breeds:", error);
        }
    };

    /*********************************************************
   *  This function is use to handleChnage for add Address
   *********************************************************/
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData(e.target);
            const ipAddress = await fetchIpAddress();
            const isValidate = await validateFormData(form);

            if (isValidate) {
                const formDataObject = {};
                form.forEach((value, key) => {
                    formDataObject[key] = value;
                });
                formDataObject.ipAddress = ipAddress;

                // If editing, include the address ID to update
                if (isEditing && addNewAddress._id) {
                    formDataObject.id = addNewAddress._id;
                }

                const res = await addEditAddress(formDataObject);
                if (res && res.status === true) {
                    // setAddNewAddress(res?.result);
                    setAddNewAddress(false);
                    setIsEditing(false);
                    toast.success(`Address ${isEditing ? 'updated' : 'added'} successfully!`);
                    await addresslist();
                } else {
                    console.log(`Error ${isEditing ? 'updating' : 'adding'} address`);
                }
            }
        } catch (error) {
            console.log("add new address failed", error)
        }
    }

    /*********************************************************
  *  This function is use to handleChnage for add Address
  *********************************************************/
    const deleteAddress = async (addressIds) => {
        try {
            if (!addressIds) {
                alert('Address id not found');
            } else {
                const res = await removeAddress({ id: addressIds });
                if (res?.status === true) {
                    toast.success('Address deleted successfully!');
                    setAddressList(AddressList.filter((address) => address._id !== addressIds));
                } else {
                    toast.error('Address not deleted!')
                }
            }
        } catch (error) {
            console.error('Error in deleteAddress:', error);
        }
    };

    const editAddress = (addressId) => {
        const addressToEdit = AddressList.find(item => item._id === addressId);
        setAddNewAddress({ ...addressToEdit });
        setIsEditing(true);
        setIsOpen(null);
    };

    useEffect(() => {
        addresslist();
        // targetRef.current.scrollIntoView({
        //     behavior:'smooth',
        //   })
        //   document.title = 'Frisbee Website || User Dashboard'
    }, []);

    return (
        <>
            <Navbar />
            <Dashbaordsidebar />
            <div className="main_wrapper inner_section">
                <div className="container-fluid">
                    <div className="row">
                        {/* <div className="col-md-6">
                            <div className=" mt-2">
                                <h1 className="heading">Address</h1>
                                <p className="sub_heading_dash">Saved Addresses</p>
                            </div>
                        </div> */}
                        <div className="col-md-12">
                            <div className=" mt-2">
                                <h1 className="heading">Address</h1>
                                <p className="sub_heading_dash">Saved Addresses</p>
                            </div>
                            <div className="textalign_right mt-2">
                                <button className="edit_btn" onClick={() => setAddNewAddress(true)}>Add new address</button>
                            </div>
                            {addNewAddress &&
                                <div className="addnew_address my-4" id="saveNewAddress">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <input type="text" name="firstname" value={addNewAddress?.firstname} onChange={handleChange} placeholder="First Name" className="form-field"></input>
                                                {errors.firstname ? (<p style={{ color: "red" }}>{errors.firstname}</p>) : ("")}
                                            </div>
                                            <div className="col-md-4">
                                                <input type="text" name="lastname" value={addNewAddress?.lastname} onChange={handleChange} placeholder="Last Name" className="form-field"></input>
                                                {errors.lastname ? (<p style={{ color: "red" }}>{errors.lastname}</p>) : ("")}
                                            </div>
                                            <div className="col-md-4">
                                                <input type="tel" name="phone" value={addNewAddress?.phone} onChange={handleChange} placeholder="Mobile Number" className="form-field"></input>
                                                {errors.phone ? (<p style={{ color: "red" }}>{errors.phone}</p>) : ("")}
                                            </div>
                                            <div className="col-md-8">
                                                <input type="email" name="email" value={addNewAddress?.email} onChange={handleChange} placeholder="Email Address" className="form-field"></input>
                                                {errors.email ? (<p style={{ color: "red" }}>{errors.email}</p>) : ("")}
                                            </div>
                                            <div className="col-md-4" >
                                                <input type="text" name="city" value={addNewAddress?.city} onChange={handleChange} placeholder="City" className="form-field"></input>
                                                {errors.city ? (<p style={{ color: "red" }}>{errors.city}</p>) : ("")}
                                            </div>
                                            <div className="col-md-6" >
                                                <input type="number" name="latitude" value={addNewAddress?.latitude} onChange={handleChange} placeholder="latitude" className="form-field"></input>
                                                {errors.latitude ? (<p style={{ color: "red" }}>{errors.latitude}</p>) : ("")}
                                            </div>
                                            <div className="col-md-6" >
                                                <input type="number" name="longitude" value={addNewAddress?.longitude} onChange={handleChange} placeholder="longitude" className="form-field"></input>
                                                {errors.longitude ? (<p style={{ color: "red" }}>{errors.longitude}</p>) : ("")}
                                            </div>
                                            <MapComponent setAddNewAddress={setAddNewAddress} />
                                            <div className="col-md-16">
                                                <LocationMap latitude={addNewAddress?.latitude} longitude={addNewAddress?.longitude} setAddNewAddress={setAddNewAddress} />
                                            </div>
                                            <div className="col-md-12">
                                                <input type="text" name="building_name" value={addNewAddress?.building_name} onChange={handleChange} placeholder="Building Name" className="form-field"></input>
                                                {errors.building_name ? (<p style={{ color: "red" }}>{errors.building_name}</p>) : ("")}
                                            </div>
                                            <div className="col-md-12">
                                                <input type="text" name="apartment_no" value={addNewAddress?.apartment_no} onChange={handleChange} placeholder="Apartment / Villa Name" className="form-field"></input>
                                                {errors.apartment_no ? (<p style={{ color: "red" }}>{errors.apartment_no}</p>) : ("")}
                                            </div>
                                            <div className="col-md-12">
                                                <div className="login_user_otp_for_bottom_button_create_pet">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-danger btn-lg user_otp_first"
                                                    >
                                                        {/* Submit */}
                                                        {isEditing ? "Update Address" : "Save Address"}
                                                    </button>
                                                    <ToastContainer />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="row">
                        {/* <div className="col-md-12">
                            {AddressList.length > 0 ? (
                                AddressList.slice().reverse().map((item, index) => (
                                    <div className="add_address" key={index}>
                                        <div>
                                            <h1>{`Address ${index + 1}`}</h1>
                                            <p>{`${item.firstname} ${item.lastname}, ${item.phone}, ${item.email}, ${item.apartment_no}, ${item.building_name}, ${item.address}, ${item.city}`}</p>
                                        </div>
                                        <div ref={dropdownRef}>
                                            <HiOutlineDotsVertical onClick={() => toggleDropdown(index)} />
                                            {isOpen === index && (
                                                <ul className="drop_down_item">
                                                    <li className="dropdown-item">
                                                        <button className="mb-0" onClick={() => editAddress(item._id)}>Edit</button>
                                                    </li>
                                                    <li className="dropdown-item">
                                                        <button onClick={(e) => {
                                                            e.stopPropagation(); // Prevents closing of dropdown too early
                                                            deleteAddress(item?._id);
                                                        }}>Delete</button>
                                                    </li>
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No addresses found</p>
                            )}
                        </div> */}
                        <div className="col-md-12">
                            {AddressList.length > 0 ? (
                                AddressList.slice().reverse().map((item, index) => (
                                    <div className="add_address" key={index}>
                                        <div>
                                            <h1>{`Address ${index + 1}`}</h1>
                                            <p>{`${item.firstname} ${item.lastname}, ${item.phone}, ${item.email}, ${item.apartment_no}, ${item.building_name}, ${item.address}, ${item.city}`}</p>
                                        </div>
                                        <div ref={dropdownRef}>
                                            <HiOutlineDotsVertical onClick={() => toggleDropdown(index)} />
                                            {isOpen === index && (
                                                <ul className="drop_down_item">
                                                    <li className="dropdown-item">
                                                        <button className="mb-0" onClick={() => editAddress(item._id)}>Edit</button>
                                                    </li>
                                                    <li className="dropdown-item">
                                                        <button onClick={(e) => {
                                                            e.stopPropagation(); // Prevents closing of dropdown too early
                                                            deleteAddress(item?._id);
                                                        }}>Delete</button>
                                                    </li>
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No addresses found</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Add_address;
