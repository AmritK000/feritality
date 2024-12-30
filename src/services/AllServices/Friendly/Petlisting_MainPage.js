import MainBanner from "../../../Grooming_listing/mainbanner";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Latest_news from "../../../Home/Latest_news";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/sidebar";
import GroomingDownload from "../Grooming_listing/GroomingDownload";
import PetfriendlyList from "./PetfriendlyList";

const Petlising_MainPage = () =>{
    return(
        <>
        <Header />
        <div className="inner_mainbanner">
            <MainBanner></MainBanner>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                     <Sidebar />
                    </div>
                    <div className="col-md-9 grooming_info">
                    <div className="features_grooming">
                            <h1 className="main_heading" >Our  <span>Dog Friendly </span> Centres</h1>
                            <p className="sub_heading">It is a long established fact that a reader will be distracted by the readable content</p> 
                    </div>
                  
                    <PetfriendlyList></PetfriendlyList>
                    
                    
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
                        <button  className="view_all"><Link to="/">View All Insights</Link></button>
                        </div>
                    
                    </div>
                    <div className="col-md-12 my-3">
                     <Latest_news></Latest_news>
                    </div>

               
                </div>
                </div>    
        <Footer />
        </>
    )
}

export default Petlising_MainPage;