
import Navbar from "../Topnvbar";
import Dashbaordsidebar from "../sidebar";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Bookingslider from "./bookingslider";
import {
  dashabordlogo,
  header_icosn,
  Earn_treats,
  Orders_placed,
  recent_bookings,
  Pet_Profile,
} from "../../components/Images";
import Recentslider from "./Recentslider";
import { useEffect, useState } from "react";
import {
  notificationList,
  markReadNotification,
  deleteNotification,
} from "../../controllers/accounts/Account";

const Maindashbaord = () => {
  const [unreadCount, setUnreadCount] = useState(0); // Unread notification count
  const [notifications, setNotifications] = useState([]); // Initialize as an empty array
  const [dropdowns, setDropdowns] = useState({}); // State to control dropdown visibility

  useEffect(() => {
    // Fetch unread notifications
    Promise.all([
      notificationList({ status: "U" }), // Fetch unread notifications
    ])
      .then(([unreadResponse]) => {
        const unreadNotifications = Array.isArray(unreadResponse.result)
          ? unreadResponse.result
          : [];

        // Update the notifications state with the list
        setNotifications(unreadNotifications);

        // Update unread notification count
        setUnreadCount(unreadNotifications.length);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
        // Handle errors by resetting notifications and unread count
        setNotifications([]);
        setUnreadCount(0);
      });
  }, []);

  // Function to calculate "minutes ago" based on the createdAt date
  const getTimeAgo = (createdAt) => {
    const now = new Date();
    const notificationDate = new Date(createdAt);
    const diffInMs = now - notificationDate; // Difference in milliseconds
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // Convert to minutes

    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  };

  // Toggle the visibility of dropdown for a specific notification
  const toggleDropdown = (notificationId) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [notificationId]: !prevState[notificationId], // Toggle the specific dropdown
    }));
  };

  // Handle marking notification as read
  const handleMarkRead = (notificationId) => {
    // Call markReadNotification API with the notificationId
    markReadNotification({ notification_id: notificationId })
    // markReadNotification({ notification_id: notificationIds })
      .then((response) => {
        console.log("Notification marked as read:", response);
        // Optionally, you can remove or update the notification from the list
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification._id !== notificationId
          )
        );
        setUnreadCount((prevCount) => prevCount - 1); // Decrease unread count
      })
      .catch((error) => {
        console.error("Error marking notification as read:", error);
      });
  };

  const handleDelete = (notificationId) => {
    // Call deleteNotification API with the notificationId
    deleteNotification({ notification_id: notificationId })
    // deleteNotification({ notification_id: notificationIds })
      .then((response) => {
        console.log("Notification marked as read:", response);
        // Optionally, you can remove or update the notification from the list
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification._id !== notificationId
          )
        );
        setUnreadCount((prevCount) => prevCount - 1); // Decrease unread count
      })
      .catch((error) => {
        console.error("Error marking notification as read:", error);
      });
  };

  return (
    <>
      <Navbar></Navbar>
      <Dashbaordsidebar></Dashbaordsidebar>
      <div className="main_wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-9 px-0">
              <div className="dashbar_info">
                <h1 className="heading">Dashboard</h1>
                <p className="sub_heading_dash">Quick Dashboard Data</p>

                <div className="qucik_dashboard">
                  <div className="quick_info">
                    <div>
                      <h2>01</h2>
                      <p>Pet Profile</p>
                    </div>
                    <div>
                      <img src={Pet_Profile} alt="Pet Profile" />
                    </div>
                  </div>

                  <div className="quick_info">
                    <div>
                      <h2>03</h2>
                      <p>Recent Bookings</p>
                    </div>
                    <div>
                      <img src={recent_bookings} alt="Recent Bookings" />
                    </div>
                  </div>

                  <div className="quick_info">
                    <div>
                      <h2>100</h2>
                      <p>Orders Placed</p>
                    </div>
                    <div>
                      <img src={Orders_placed} alt="Orders Placed" />
                    </div>
                  </div>

                  <div className="quick_info">
                    <div>
                      <h2>04</h2>
                      <p>Earn Treats</p>
                    </div>
                    <div>
                      <img src={Earn_treats} alt="Earn Treats" />
                    </div>
                  </div>
                </div>

                <section>
                  <p className="sub_heading_dash">Latest Bookings</p>
                  <Bookingslider />
                </section>

                <section className="mt-2">
                  <p className="sub_heading_dash">Recent Orders</p>
                  <Recentslider />
                </section>
              </div>
            </div>

            <div className="col-md-3 px-0">
              {/* Notification Section */}
              <div className="notification_sections">
                <h1>Notifications</h1>
                <p className="sub_heading_dash">Recent Notifications</p>

                <ul>
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <li className="notification_list" key={notification._id}>
                        <div className="notification_img">
                          <img src={dashabordlogo} alt="dashboard logo" />
                        </div>
                        <div>
                          <p>{getTimeAgo(notification.createdAt)}</p>
                          <h2>{notification.title}</h2>
                          <p>{notification.message}</p>
                        </div>
                        <div className="notification_actions">
                          {/* Three dots icon to toggle dropdown */}
                          <HiOutlineDotsVertical
                            onClick={() => toggleDropdown(notification._id)}
                          />
                          {dropdowns[notification._id] && (
                            <div className="dropdown_menu">
                              <ul>
                                <li
                                  onClick={() => handleMarkRead(notification._id)}
                                >
                                  Mark as Read
                                </li>
                                <li
                                  onClick={() => handleDelete(notification._id)}
                                >
                                  Delete
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </li>
                    ))
                  ) : (
                    <p>No new notifications</p>
                  )}
                </ul>
              </div>

              {/* Enquiry Banner */}
              <div className="enquiery_banner">
                <h3>
                  Looking for the pawfect protection for your dog? Enroll Now to
                  <span>start your Pet Insurance</span>
                </h3>
                <button>Send Your Inquiry</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Maindashbaord;

