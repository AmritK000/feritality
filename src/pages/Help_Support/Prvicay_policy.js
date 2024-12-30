import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./privacy.css";
import { policy } from "../../controllers/help_Support/supportController";
import axios from 'axios';

const Privacy_policy = () =>{
    const [policyList, setPolicyList] = useState([]);
    const [showRequest, setShowRequest] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const handleShowRequest = (value) => {
      setShowRequest(value);
    };
    /*********************************************************
   *  This function is use to fetch services category list
   *********************************************************/
    const getDetails = async () => {
        setPolicyList([])
      try {
        const res = await axios.get('http://localhost:3300/front/privacy-policy?from_API=Y');
        setPolicyList(res?.data || '');
      } catch (error) {
        console.log("failed to fetch privacy_policy data", error)
      }
    }
  
  
    /*********************************************************
      *  This function is load when page load and with dependency update
      *********************************************************/
    useEffect(() => {
      getDetails();
      document.title = "Frisbee website || Privacy_policy"
    }, [currentPage]);

    return(
        <>
        <Header />
        {policyList?.length>0? (
        <div className="privacy">
          <div className="container">
            <div className="row">
              <div className="col-md-12" >
                <div>
                  <div className="privacy_policy" key={"index"} >
                    <div dangerouslySetInnerHTML={ { __html: policyList}}>
                    </div>
                  </div>
                </div>
              </div>        
            </div>
          </div>
        </div>
        ): (
            <p>No Privacy_policy available at the moment.</p>
        )}
        <Footer />
        </>
    );
};

export default Privacy_policy;