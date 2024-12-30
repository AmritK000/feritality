import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import "./privacy.css";

const Term_condition = () => {
    const [TermCondition, setTermConditon] = useState([]);
    const [showRequest, setShowRequest] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const handleShowRequest = (value) => {
        setShowRequest(value);
    }

    /*********************************************************
  *  This function is use to fetch services category list
  *********************************************************/
    const getDetails = async () => {
        setTermConditon([]);
        try {
            const res = await axios.get('https://api.tryfrisbee.com/front/terms-conditions?from_API=Y');
            setTermConditon(res?.data || '');
        } catch (error) {
            console.log("Fail to fetch term_conditon data", error)
        }
    }

    /*********************************************************
       *  This function is load when page load and with dependency update
       *********************************************************/
    useEffect(() => {
        getDetails();
        document.title = "Frisbee website || Term_Comndition"
    }, [currentPage]);

    return (
        <>
            <Header />
            {TermCondition?.length>0? (
            <div className="privacy">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div>
                                <div className="Term And Condition" key={"index"} >
                                    <div dangerouslySetInnerHTML={{ __html: TermCondition }}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ): (
            <p>No Term And Condition available at the moment.</p>
        )}
            <Footer />
        </>
    );
}
export default Term_condition;