import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MainBanner from "../services/AllServices/Grooming/mainbanner"
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import GroomingDownload from "../services/AllServices/Grooming/GroomingDownload";
import GroomingListing from "./AllServices/Grooming/GroomingListing";
import DayCareListing from "./AllServices/DayCare/DayCareListing";
import AdoptionListing from "./AllServices/Adoption/AdoptionListing";
import FriendlyListing from "./AllServices/Friendly/FriendlyListing";
import BoardingListing from "./AllServices/Boarding/BoardingListing";
import VetrinaryListing from "./AllServices/Veterinary/VeterinaryListing";
import TrainingListing from "./AllServices/Training/TrainingListing";
import Latest_news from "../Home/Latest_news";
import "../services/AllServices/grooming.css";

const Services = () => {
    const { slug } = useParams();
    const [slugTag, setSlugTag] = useState(slug || 'grooming');

    useEffect(() => {
        if (slug && slug !== 'undefine') {
            setSlugTag(slug);
        }
    }, [slug]);

    return (
        <>
            <Header />
            <div className="inner_mainbanner">
                <MainBanner></MainBanner>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar category={slugTag} />
                    </div>
                    <div className="col-md-9 grooming_info">
                        <div className="features_grooming">
                            <h1 className="main_heading" >Our <span>{slugTag}</span> Centres</h1>
                            <p className="sub_heading">It is a long established fact that a reader will be distracted by the readable content</p>
                        </div>
                        {slugTag === 'grooming' ? <GroomingListing /> : ''}
                        {slugTag === 'boarding' ? <BoardingListing /> : ''}
                        {slugTag === 'day-care' ? <DayCareListing /> : ''}
                        {slugTag === 'veterinary' ? <VetrinaryListing /> : ''}
                        {slugTag === 'training' ? <TrainingListing /> : ''}
                        {slugTag === 'adoption' ? <AdoptionListing/> : ''}
                        {slugTag === 'friendly' ? <FriendlyListing /> : ''}
                    </div>
                </div>
            </div>
            <div className="grooming_download" id="groomingdownload_info">
                <GroomingDownload></GroomingDownload>
            </div>
             {/* latest news section*/}
             <div className="container">
                <div className="row my-3">
                    <div className="col-md-10 grooming_info">
                        <div className="features_grooming">
                            <h1 className="main_heading">Latest <span>News </span></h1>
                            <p className="sub_heading" >It is a long established fact that a reader will be distracted by the readable content</p>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="view_btn">
                            <button className="view_all"><Link to="/">View All Insights</Link></button>
                        </div>
                    </div>
                    <div className="col-md-12 my-3">
                        <Latest_news/>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Services;