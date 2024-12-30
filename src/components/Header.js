import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "./Images";
import { GoBellFill } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import "./common.css";
import LoginAndOtp from "./Login/loginnew";
import Cartpop from "../components/Cartpop";
import {
  notificationList,
  markReadNotification,
} from "../controllers/accounts/Account";
import { logout } from "../controllers/accounts/Account"

const Header = ({isLoginShow = false}) => {
  const [location, setLocation] = useState("fetching location ...");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0); // Unread notification count
  const [notifications, setNotifications] = useState([]); // Initialize as an empty array
  const [readNotificationIds, setReadNotificationIds] = useState([]); // Array for unread notification IDs
  const [showNotifications, setShowNotifications] = useState(false); // Toggle for notification dropdown
  const navigate = useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("TOKEN" || ""));
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState([]); // State for cart data
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  const userData = JSON.parse(sessionStorage.getItem("USER-INFO"));
  useEffect(() => {
    // Function to get the cart count from local storage
    const updateCartCount = () => {
      const cartData = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(cartData);
      setCartCount(cartData.length);
    };

    // Update cart count initially
    updateCartCount();
    // Add event listener to update cart count when cart is updated
    window.addEventListener('cartUpdated', updateCartCount);
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          localStorage.setItem("LATITUDE", latitude);
          localStorage.setItem("LONGITUDE", longitude);
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then((response) => response.json())
            .then((data) => {
              setLocation(data.address.city || data.address.town || data.address.village || "Unknown location");
              sessionStorage.setItem("currentlocation", JSON.stringify(data));
            })
            .catch((error) => {
              console.error("Error fetching location data:", error);
              setLocation("Unable to fetch location");
            });
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation("Permission denied or unavailable");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, [token]);

  useEffect(() => {
    if (isLoginShow === true) {
      setIsModalOpen(true);
    }
  }, [isLoginShow])

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

 
  const handleLogout = async () => {
    const res = await logout()
    if (res.status === true) {
      setIsLoggedIn(false);
      navigate("/");
    } else {
      // sessionStorage.clear();
      // localStorage.clear();
      setIsLoggedIn(false);
      navigate('/');
    }
  };
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);

    // If opening the dropdown and there are unread notifications
    if (!showNotifications && unreadCount > 0) {
      const notificationIds = readNotificationIds.join(","); // Join IDs into a comma-separated string

      // Mark notifications as read by sending notification IDs
      markReadNotification({ notification_id: notificationIds })
        .then((response) => {
          console.log("Notifications marked as read:", response);
          setUnreadCount(0); // Reset unread count after marking them as read
        })
        .catch((error) => {
          console.error("Error marking notifications as read:", error);
        });
    }
  };


    // Fetch notifications on component mount
    useEffect(() => {
      if (token) {
        setIsLoggedIn(true);
  
        // Fetch unread notifications and read notifications in parallel
        Promise.all([
          notificationList({ status: "U" }), // Fetch unread notifications
          notificationList({ status: "R" }), // Fetch read notifications
        ])
          .then(([unreadResponse, readResponse]) => {
            const unreadNotifications = Array.isArray(unreadResponse.result)
              ? unreadResponse.result
              : [];
            const readNotifications = Array.isArray(readResponse.result)
              ? readResponse.result
              : [];
  
            // Combine unread notifications first, then read notifications
            const combinedNotifications = [
              ...unreadNotifications,
              ...readNotifications,
            ];
  
            // Update the notifications state with the combined list
            setNotifications(combinedNotifications);
  
            // Update unread notification count
            setUnreadCount(unreadNotifications.length);
  
            // Collect _id of all unread notifications
            const unreadIds = unreadNotifications.map(
              (notification) => notification._id
            );
            setReadNotificationIds(unreadIds); // Store _id array of unread notifications
          })
          .catch((error) => {
            console.error("Error fetching notifications:", error);
            // Handle errors by resetting notifications and unread count
            setNotifications([]);
            setUnreadCount(0);
          });
      }
    }, [token]);
  

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="row">
            <div className="col-md-4">

              <div className="">
                <div className="logo">
                  <Link to="/">
                    <img src={logo} alt="Home Logo" />
                  </Link>
                </div>
                <div className="store_location">
                  <ul className="location">
                    <li className="drop_down_has">
                      <FaLocationDot id="location" /> Location <br />
                      {location} <FaAngleDown id="dropdown_angeldown" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div>
                <ul className="menu_list">
                  <li><Link to="">About Us</Link></li>
                  <li><Link to="/services">Services</Link></li>
                  <li><Link to="/shop">Shop</Link></li>
                  <li><Link to="">Support</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex">
                <div className="">
                  <ul className="web" id="language_drop">
                    <li className="drop_down_has">
                      <CiGlobe /> Eng <FaAngleDown />
                      <ul className="drop_down">
                        <li><Link to="/">Hin</Link></li>
                        <li><Link to="/">Eng</Link></li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div
                  className="bell_icons drop_down_has"
                  onClick={toggleNotifications}
                >
                  <GoBellFill />
                  <span>{unreadCount}</span> {/* Show unread count */}
                  {showNotifications && (
                    <ul className="drop_down notifications_dropdown">
                      {notifications.length === 0 ? (
                        <li>No notifications</li>
                      ) : (
                        notifications.map(
                          (
                            notification,
                            index // Show only first 5
                          ) => (
                            <li key={index} className="notification-item">
                              <div className="notification-content">
                                <img
                                  src={logo}
                                  alt="Notification"
                                  className="notification-image"
                                />
                                <div className="notification-text">
                                  <strong>{notification.title}</strong> <br />
                                  {notification.message}
                                </div>
                              </div>
                              <hr className="notification-separator" />{" "}
                              {/* Separator line */}
                            </li>
                          )
                        )
                      )}
                      {notifications.length > 5 && (
                        <li className="show-more">Scroll to see more...</li> // Show scroll hint if there are more than 5
                      )}
                    </ul>
                  )}
                </div>
                <div className="bell_icons" onClick={handleShow}>
                  <FaShoppingCart />
                  <span>{cartCount}</span>
                </div>
                {isLoggedIn ? (
                  // <button id="logoutButton" className="btn" onClick={handleLogout}>
                  //   Logout
                  // </button>
                  <div className="dropdown">
                    <button className="btn dropdown-toggle" id="userMenuButton" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {userData?.name||"User"}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="userMenuButton">
                      <li>
                        <Link to="/user/dashboard" className="dropdown-item" >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <button id="signUpButton" className="btn" onClick={openModal}>
                    Sign Up/Sign In
                  </button>
                )}
              </div>
            </div>
            <div className="col-md-12">
              <marquee width="100%" direction="left" behavior="scroll" scrollamount="4">
                <p className="code">As our gift to you, enjoy 20% off with code XMAS20.</p>
              </marquee>
            </div>
          </div>
        </div>
      </div>
      {show &&
        <Cartpop cart={cart}></Cartpop>
      }
      <LoginAndOtp isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default Header;

