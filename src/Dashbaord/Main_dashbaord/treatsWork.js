import axios from "axios";
import React, { useEffect, useState } from 'react';
import Navbar from "../Topnvbar";
import Dashbaordsidebar from "../sidebar";


const TreatsWork = () => {
    const [treatsWork, setTreatsWorks] = useState();

    /*********************************************************
  *  This function is use to fetch services category list
  *********************************************************/
    const getDetails = async () => {
        setTreatsWorks();
        try {
            const res = await axios.get('https://api.tryfrisbee.com/front/how-it-works');
            setTreatsWorks(res?.data || '');
        } catch (error) {
            console.log("Fail to fetch term_conditon data", error)
        }
    }

    /*********************************************************
       *  This function is load when page load and with dependency update
       *********************************************************/
    useEffect(() => {
        getDetails();
        document.title = "Frisbee website || Term_Works"
    }, []);

    return (
        <>
        <Navbar/>
        <Dashbaordsidebar></Dashbaordsidebar>
        <div className="main_wrapper inner_section">
            <div className="container-fluid">
                {treatsWork?.length>0? (
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div>
                                    <div className="Term And Condition" key={"index"} >
                                        <div dangerouslySetInnerHTML={{ __html: treatsWork }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ): (
                    <p>No Treats Text available at the moment.</p>
                )}
            </div>
        </div>
    </>
    );
}
export default TreatsWork;