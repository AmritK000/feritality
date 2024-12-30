import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";
import Service_slider from "./Service_slider";
import Mainslider from "./Mainslider";
import initAOS from "../aosInit/aosInit";
import "../Home/home.css";
import { Link } from "react-router-dom";
import Groomslider from "../Home/groominglider";
import Boarding from "./Boarding";
import Enquiery from "./Enquiery";
import ShopSlider from "./ShopSlider";
import Adoptbanners from "./Adoptbanners";
import Appdownaload from "./Appdowanload";
import Latest_news from "./Latest_news";
import Contactstripe from "./Contactstripe";
import Testimonial from "./testinominal";

const Home = () => {
    /* useffect aos for animation*/
    useEffect(() => {
        sessionStorage.removeItem("result");
     sessionStorage.removeItem("transaction");
    
    // // Remove cart data from localStorage
     localStorage.removeItem("checkoutData");
     sessionStorage.removeItem("chargeId");
     sessionStorage.removeItem("treat");
     sessionStorage.removeItem("grommingchargeId");
     sessionStorage.removeItem("boardingchargeId");
     sessionStorage.removeItem("daycarechargeId");
     sessionStorage.removeItem("veterinarychargeId");
     sessionStorage.removeItem("grommingresult");
     sessionStorage.removeItem("grommingtransaction");
     sessionStorage.removeItem("boardingresult");
     sessionStorage.removeItem("boardingtransaction");
     sessionStorage.removeItem("daycareresult");
     sessionStorage.removeItem("daycaretransaction");
     sessionStorage.removeItem("veterinaryresult");
     sessionStorage.removeItem("veterinarytransaction");
        initAOS();
    }, []);
    return (
        <>
            <Header />

            <div className="main_slider">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <Mainslider />
                        </div>
                    </div>
                </div>
            </div>
            <div className="main_services">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="main_heading" data-aos="fade-up" data-aos-delay="100">Book  <span>our care services </span>for your lovely pets</h1>
                            <p className="sub_heading" data-aos="fade-in" data-aos-delay="100">Discover over 900 free and fully customizable website templates, including eCommerce templates tailored specially for high-converting mobile and web stores.</p>
                            <div className="services">
                                <Service_slider></Service_slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="featured_grooming" id="featured_grooming">
                <div className="container">
                    {/* Grooming slider */}
                    <div className="row">
                        <div className="col-md-10">
                            <div className="features_grooming">
                                <h1 className="main_heading" data-aos="fade-up" data-aos-delay="100">Featured <span>Grooming </span></h1>
                                {/* <p className="sub_heading" data-aos="fade-in" data-aos-delay="100">It is a long established fact that a reader will be distracted by the readable content</p> */}
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="view_btn">
                                <button className="view_all"><Link to="/services/grooming">View All</Link></button>
                            </div>

                        </div>
                        <div className="col-md-12 my-3">
                            <Groomslider></Groomslider>
                        </div>
                        <div className="col-md-12 my-3">
                            <Enquiery></Enquiery>
                        </div>
                    </div>
                    {/* Boarding slider */}
                    <div className="row my-3">
                        <div className="col-md-10">
                            <div className="features_grooming">
                                <h1 className="main_heading" data-aos="fade-up" data-aos-delay="100">Featured <span>Boarding </span></h1>
                                {/* <p className="sub_heading" data-aos="fade-in" data-aos-delay="100">It is a long established fact that a reader will be distracted by the readable content</p> */}
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="view_btn">
                                <button className="view_all"><Link to="/services/boarding">View All</Link></button>
                            </div>

                        </div>
                        <div className="col-md-12 my-3">
                            <Boarding></Boarding>
                        </div>
                    </div>
                    {/* adopt banner*/}
                    <div className="row">
                        <div className="col-md-12">
                            <Adoptbanners></Adoptbanners>
                        </div>
                    </div>

                    {/* shop slider */}
                    <div className="row my-3">
                        <div className="col-md-10">
                            <div className="features_grooming">
                                <h1 className="main_heading" data-aos="fade-up" data-aos-delay="100">Featured <span>Shop </span></h1>
                                {/* <p className="sub_heading" data-aos="fade-in" data-aos-delay="100">It is a long established fact that a reader will be distracted by the readable content</p> */}
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="view_btn">
                                <button className="view_all"><Link to="/services/shop">View All</Link></button>
                            </div>

                        </div>
                        <div className="col-md-12 my-3">
                            <ShopSlider></ShopSlider>
                        </div>
                    </div>
                </div>

                <div className="app_dowanlad">
                    <Appdownaload></Appdownaload>
                </div>
                <div className="container">
                    {/* shop section*/}
                    <div className="row my-3">
                        <div className="col-md-10">
                            <div className="features_grooming">
                                <h1 className="main_heading" data-aos="fade-up" data-aos-delay="100">Featured <span>Place </span></h1>
                                {/* <p className="sub_heading" data-aos="fade-in" data-aos-delay="100">It is a long established fact that a reader will be distracted by the readable content</p> */}
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="view_btn">
                                <button className="view_all"><Link to="/services/shop">View All</Link></button>
                            </div>

                        </div>
                        <div className="col-md-12 my-3">
                            <ShopSlider></ShopSlider>
                        </div>
                    </div>

                    {/* latest news section*/}
                    <div className="row my-3">
                        <div className="col-md-10">
                            <div className="features_grooming">
                                <h1 className="main_heading" data-aos="fade-up" data-aos-delay="100">Latest <span>News </span></h1>
                                <p className="sub_heading" data-aos="fade-in" data-aos-delay="100">It is a long established fact that a reader will be distracted by the readable content</p>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="view_btn">
                                <button className="view_all"><Link to="/">View All Insights</Link></button>
                            </div>

                        </div>
                        <div className="col-md-12 my-3">
                            <Latest_news></Latest_news>
                        </div>

                        <div className="col-md-12">
                            <Contactstripe />
                        </div>
                    </div>
                    {/* dowanload app */}
                </div>
            </div>



            <div className="what_see">
                <div className="container_fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="main_heading">See what others are <span>saying</span></h2>
                            <p className="sub_heading mb-3">Read all testimonial from our customers.</p>
                            <Testimonial></Testimonial>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home;