import { FaFacebookF } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { IoIosCall } from "react-icons/io";
import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Collapse } from "react-collapse";
import { logo } from "./Images";
import { subscription , getAdminInfo } from "../controllers/cms/subscription";
import { Link,useNavigate } from "react-router-dom";
import LoginAndOtp from "./Login/loginnew";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Footer = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  const [email, setEmail] = useState(false);
  // const [show, setShow] = useState(false); 
  const [success, setSuccess] = useState({});
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    
    email: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ADMININFO, setAdminInfo] = useState({});
  const navigate = useNavigate();
  /*********************************************************
    *  This function is use to handleChange 
    *********************************************************/
  const handleChange = (e) => {
    setFormData((preVal) => ({
      ...preVal,
      [e.target.name]: e.target.value,
    }));
    setErrors((preError) => ({
      ...preError,
      [e.target.name]: "",
    }));
  };




  /*********************************************************
  *  This function is use to handle Subscribe email
  *********************************************************/
  const handleSubscribe = async () => {
    try {
      if (!formData.email) {
        setErrors((preError) => ({
          ...preError,
          email: 'Email is required'
        }));
      }else{
        const options =  {email: formData.email};
        const result = await subscription(options)
        if(result.status === true){
          setEmail(true);
          setSuccess((preSuccess) => ({
            ...preSuccess,
            formSuccess: result.message
          }));
          toast.success('Subscribed successfully!')
        }else{
          setErrors((preError) => ({
            ...preError,
            formError: result.message,
          }));
        }
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleLoginRedirect = () => {
    navigate('/login-new', { target: '_blank' }); // Navigate to login popup
  };
  const checkLoginStatus = () => {
    const token = sessionStorage.getItem("TOKEN");
    if (token) {
      setIsLoggedIn(true);
    }
    
  };
  const getSocialMediaLink = (url) => {
    if (typeof url !== 'string' || !url) {
      return '#'; // Handle undefined, null, or non-string URLs
    }
  
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const data = await getAdminInfo();
        if (data?.status && data?.result?.length > 0) {
          setAdminInfo(data?.result[0]);
        }
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    fetchAdminInfo();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    checkLoginStatus();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [openSection, setOpenSection] = useState(null);

  const toggleDropdown = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  return (
    <footer className="footer bg-dark text-white mt-auto frisbee_footer_main_section">
      {isMobileView ? (
        <div>
          <div className="news_letter_main_section_div">
            <div className="newsletter_main_section bg-light text-dark">
              <div className="container d-flex justify-content-between align-items-center flex-wrap frisbee_mobile_for_pic">
                <div className="mobile_view_frisbee_footer_for_all_main">
                  <div className="newsletter-text d-flex align-items-center">
                    <img
                      src={logo}
                      alt="Logo"
                      className="mr-2"
                      width="50"
                      height="50"
                    />
                  </div>
                  <div className="social-icons d-flex align-items-center frisbee_all_footer_icon">
                    <a href="#" className="text-dark mr-2">
                      <FaFacebookF />
                    </a>
                    <a href="#" className="text-dark mr-2">
                      <FaXTwitter />
                    </a>
                    <a href="#" className="text-dark mr-2">
                      <FaInstagram />
                    </a>
                    <a href="ADMININFO.generalData_email" className="text-dark">
                      <FaLinkedinIn />
                    </a>
                  </div>
                </div>
                <div className="newsletter-form d-flex align-items-center frisbee_up_to_date_main_div">
                  <form className="form-inline">
                    <div className="inputNewsletter">
                      <input type="text" placeholder="Enter Email Address" />
                      <button className="btn footer-btn" type="button">
                        Subscribe
                        
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row frisbee_mobile_view_row_footer">
              <div className="col-md-2 all_footer_link_heading_frisbee">
                <h5 onClick={() => toggleDropdown("QuickLinks")}>
                  Quick Links{" "}
                  {openSection === "QuickLinks" ? (
                    <FaChevronUp className="ml-2" />
                  ) : (
                    <FaChevronDown className="ml-2" />
                  )}
                </h5>
                <Collapse isOpened={openSection === "QuickLinks"}>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#" className="text-white">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white">
                        About
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white">
                        Service
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white">
                        Shop
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white">
                        Contact
                      </a>
                    </li>
                  </ul>
                </Collapse>
              </div>
              <div className="col-md-2 all_footer_link_heading_frisbee">
                <h5 onClick={() => toggleDropdown("Joinfrisbee")}>
                  Join Frisbee
                  {openSection === "Joinfrisbee" ? (
                    <FaChevronUp className="ml-2" />
                  ) : (
                    <FaChevronDown className="ml-2" />
                  )}
                </h5>
                <Collapse isOpened={openSection === "Joinfrisbee"}>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#" className="text-white">
                        Sign In
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white">
                        Register Now
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white">
                        Get The App
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white">
                        Become a partner
                      </a>
                    </li>
                  </ul>
                </Collapse>
              </div>
              <div className="col-md-2 all_footer_link_heading_frisbee">
                <h5 onClick={() => toggleDropdown("Offerings")}>
                  Offerings
                  {openSection === "Offerings" ? (
                    <FaChevronUp className="ml-2" />
                  ) : (
                    <FaChevronDown className="ml-2" />
                  )}
                </h5>
                <Collapse isOpened={openSection === "Offerings"}>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#" className="text-white">
                        Grooming
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white">
                        Day Care
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white">
                        Pet Shop
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white">
                        Boarding
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white">
                        Veterinary
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white">
                        Adoption
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white">
                        Friendly
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white">
                        Training
                      </a>
                    </li>
                  </ul>
                </Collapse>
              </div>
              <div className="col-md-2 all_footer_link_heading_frisbee ">
                <h5 onClick={() => toggleDropdown("Helpsuppor")}>
                  Help & Support
                  {openSection === "Helpsuppor" ? (
                    <FaChevronUp className="ml-2" />
                  ) : (
                    <FaChevronDown className="ml-2" />
                  )}
                </h5>
                <Collapse isOpened={openSection === "Helpsuppor"}>
                  <ul className="list-unstyled">
                    <li>
                      <Link to="/privacy_policy" className="text-white">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <a href="/term_condition" className="text-white">
                        Term & Condition
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-white">
                        Help & Support
                      </a>
                    </li>
                    <li>
                      <Link to="/faq" className="text-white">
                        FAQ's
                      </Link>
                    </li>
                  </ul>
                </Collapse>
              </div>
              <div className="col-md-2 all_footer_link_heading_frisbee">
                <h5 onClick={() => toggleDropdown("connect")}>
                  Connect With Us
                  {openSection === "Helpsuppor" ? (
                    <FaChevronUp className="ml-2" />
                  ) : (
                    <FaChevronDown className="ml-2" />
                  )}
                </h5>
                <Collapse isOpened={openSection === "connect"}>
                  <ul className="list-unstyled frisbee_all_icon_for_location">
                    <li>
                      <IoLocationSharp />
                      <span>
                        C-25 MiQB Building, Sector 58, Noida, Uttar Pradesh
                        201309
                      </span>
                    </li>
                    <li>
                      <CiMail />
                      <span>contact@tryfrisbee.com</span>
                    </li>
                    <li>
                      <IoIosCall />
                      <span>+91 7011969292</span>
                    </li>
                  </ul>
                </Collapse>
              </div>
            </div>
            <div className="text-center pt-3 frisbee_bottom_paragraph">
              <p>© 2024 Copyright Frisbee. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="news_letter_main_section_div">
            <div className="newsletter_main_section bg-light text-dark">
              <div className="container d-flex justify-content-between align-items-center flex-wrap">
                <div className="newsletter-text d-flex align-items-center">
                  <img
                    src={logo}
                    alt="Logo"
                    className="mr-2"
                    width="50"
                    height="50"
                  />
                </div>
                <div className="newsletter-form d-flex align-items-center frisbee_up_to_date_main_div">
                  <h5 className="mb-0 frisbee_up_to_date_for_news">
                    <span>Stay up-to-date with</span> <h5>Our Newsletter</h5>
                  </h5>
                  <form className="form-inline" onClick={handleSubscribe}>
                    <div className="inputNewsletter">
                      <input
                        type="text"
                        placeholder="Enter Email Address"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                      />
                      {errors.mobileNumber ? (
                        <p style={{ color: "red" }}>{errors.mobileNumber}</p>
                      ) : (
                        ""
                      )}
                      <button className="btn footer-btn" type="button">
                        Subscribe
                      </button>
                      <ToastContainer/>
                    </div>
                  </form>
                </div>
                <div className="social-icons d-flex align-items-center frisbee_all_footer_icon">
                  <a href={getSocialMediaLink(ADMININFO.generalData_facebook)} className="text-dark mr-2">
                    <FaFacebookF />
                  </a>
                  <a href={getSocialMediaLink(ADMININFO.generalData_twitter)} className="text-dark mr-2">
                    <FaXTwitter />
                  </a>
                  <a href={getSocialMediaLink(ADMININFO.generalData_Instagram)} className="text-dark mr-2">
                    <FaInstagram />
                  </a>
                  <a href={getSocialMediaLink(ADMININFO.generalData_linkedin)} className="text-dark">
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-2 all_footer_link_heading_frisbee">
                <h5>Quick Links</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="#" className="text-white">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white">
                      Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white">
                      Shop
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-2 all_footer_link_heading_frisbee">
                <h5>Join Frisbee</h5>
                <ul className="list-unstyled">
                {!isLoggedIn && (
                      <>
                  <li>
                    <a href="#" className="text-white" onClick={openModal}>
                      Sign In
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white" onClick={openModal}>
                      Register Now
                    </a>
                  </li>
                  </>
                )}
                  <li>
                    <a href="#" className="text-white">
                      Get The App
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white">
                      Become a partner
                    </a>
                  </li>
                 
                </ul>
              </div>
              <div className="col-md-2 all_footer_link_heading_frisbee">
                <h5>Offerings</h5>
                <ul className="list-unstyled">
                  <li>
                    <a href="/services/grooming" className="text-white">
                      Grooming
                    </a>
                  </li>
                  <li>
                    <a href="/services/day-care" className="text-white">
                      Day Care
                    </a>
                  </li>
                  <li>
                    <a href="/services/shop" className="text-white">
                      Pet Shop
                    </a>
                  </li>
                  <li>
                    <a href="/services/boarding" className="text-white">
                      Boarding
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-2 frisbee_project_veternary all_footer_link_heading_frisbee">
                <ul className="list-unstyled">
                  <li>
                    <a href="/services/veterinary" className="text-white">
                      Veterinary
                    </a>
                  </li>
                  <li>
                    <a href="/services/adoption" className="text-white">
                      Adoption
                    </a>
                  </li>
                  <li>
                    <a href="/services/friendly" className="text-white">
                      Friendly
                    </a>
                  </li>
                  <li>
                    <a href="/services/training" className="text-white">
                      Training
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-2 all_footer_link_heading_frisbee ">
                <h5>Help & Support</h5>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/privacy_policy" className="text-white">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/term_condition" className="text-white">
                      Term & Condition
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-white">
                      FAQ's
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-2 all_footer_link_heading_frisbee">
                <h5>Connect With Us</h5>
                <ul className="list-unstyled frisbee_all_icon_for_location">
                  <li>
                    <IoLocationSharp />
                    <span>
                      C-25 MiQB Building, Sector 58, Noida, Uttar Pradesh 201309
                    </span>
                  </li>
                  <li>
                    <CiMail />
                    <span>{ADMININFO.generalData_email}</span>
                  </li>
                  <li>
                    <IoIosCall />
                    <span>{ADMININFO.generalData_phone}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="text-center pt-3 frisbee_bottom_paragraph">
              <p>© 2024 Copyright Frisbee. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        
        <LoginAndOtp />
      )}
    </footer>
  );
};

export default Footer;

