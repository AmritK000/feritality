
import { sidebarlogo, user_icon, cart, pet_user, history, addresses, Payments, logout_pic, help, treats, dashbaordicon } from "../components/Images";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../controllers/accounts/Account";
import React, { useEffect, useState } from "react";

const Dashbaordsidebar = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async() => {
        const res = await logout();
        if(res?.status === true){
            setIsLoggedIn(false);
            navigate("/");
        }else{
            setIsLoggedIn(false);
        }
    }


    return (
        <>
            <div className="sidebar">
               <Link to="/"><img src={sidebarlogo} alt="dashbaord_logo" className="sidebarlogo" /></Link>
                <ul>
                    <li className={currentPath === "/user/dashboard" ? "active" : ""}>
                        <div className="bar_icon">
                            <Link to="/user/dashboard"><img src={dashbaordicon} alt="dashbaord_logo" /></Link>
                        </div>
                        <p>Home</p>
                    </li>
                    <li className={currentPath === "/user/user-profile" ? "active" : ""}>
                        <Link to="/user/user-profile">
                            <div className="bar_icon">
                                <img src={user_icon} alt="dashbaord_logo" />
                            </div>
                        </Link>
                        <p>Profile</p>
                    </li>
                    <li className={currentPath === "/user/pet-profile" ? "active" : ""}>
                        <Link to="/user/pet-profile">

                            <div className="bar_icon">
                                <img src={pet_user} alt="dashbaord_logo" />
                            </div>
                        </Link>
                        <p>Pet Profiles</p>
                    </li>
                    <li className={currentPath === "/user/myorder" ? "active" : ""}>
                        <Link to="/user/myorder">
                            <div className="bar_icon">
                                <img src={cart} alt="dashbaord_logo" />
                            </div>

                        </Link>
                        <p>Order</p>
                    </li>
                    <li className={currentPath === "/user/wallet" ? "active" : ""}>
                        <Link to="/user/wallet">
                            <div className="bar_icon">
                                <img src={treats} alt="treats" />
                            </div>
                        </Link>
                        <p>Treats</p>
                    </li>
                    <li className={currentPath === "/user/address" ? "active" : ""}>
                        <Link to="/user/address">
                            <div className="bar_icon">
                                <img src={addresses} alt="dashbaord_logo" />
                            </div>
                        </Link>
                        <p>Addresses</p>
                    </li>
                    <li className={currentPath === "/user/payment-details" ? "active" : ""}>
                        <Link to="/user/payment-details">
                            <div className="bar_icon">
                                <img src={Payments} alt="dashbaord_logo" />
                            </div>
                        </Link>
                        <p>Payments</p>
                    </li>
                    <li>
                        <div className="bar_icon">
                            <img src={help} alt="dashbaord_logo" />
                        </div>
                        <p>Help</p>
                    </li>
                    <li>
                        <div className="bar_icon" onClick={handleLogout}>
                            <img src={logout_pic} alt="dashbaord_logo" />
                        </div>
                        <p>Logout</p>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Dashbaordsidebar;