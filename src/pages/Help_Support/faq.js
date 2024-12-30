import React, { useEffect, useState, useRef } from 'react';
import "./privacy.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { faq } from "../../controllers/help_Support/supportController";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

const FAQ = () => {
  const [FaqList, setFaqList] = useState([]);
  const [showRequest, setShowRequest] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const targetRef = useRef(null);
  const handleShowRequest = (value) => {
    setShowRequest(value);
  };
  /*********************************************************
 *  This function is use to fetch services category list
 *********************************************************/
  const getDetails = async () => {
    setFaqList([])
    try {
      const options = {
        type: "",
        condition: {
          ...(showRequest ? { status: showRequest } : null),
          type: "user"
        },
        select: {
          title: true,
          description: true,
          status: true
        },
        sort: { "_id": -1 }
      }
      const listData = await faq(options);
      console.log("faq listData", listData)
      if (listData?.status === true) {
        if (listData?.result?.length > 0) {
          setFaqList(listData.result);
        } else {
          setFaqList([{
            title: "No Data Found"
          }])
        }
      }
    } catch (error) {
      console.log("failed to fetch FAQ data", error)
    }
  }


  /*********************************************************
    *  This function is load when page load and with dependency update
    *********************************************************/
  useEffect(() => {
    getDetails();
    document.title = "Frisbee website || FAQ list"
  }, [currentPage]);

  return (
    <>
      <Header />
      {FaqList?.length > 0 ? (
        <div className="container" id="faqMobile">
          <div className="row">
            <div className="col-md-12">
              <div className="privacy">
                <h1 className="mb-4 faq_heading"> Frequently Asked Question (FAQs)</h1>
                <div className="accordion" id="accordionFlushExample">
                  {FaqList.map((item, index) => (
                    <div className="accordion-item" key={index}>
                      <h2 className="accordion-header" id={`flush-heading${index}`}>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#flush-collapse${index}`}
                          aria-expanded="false"
                          aria-controls={`flush-collapse${index}`}
                        >
                          {item.title}
                        </button>
                      </h2>
                      <div
                        id={`flush-collapse${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`flush-heading${index}`}
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">
                          <p>{item.description}</p></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No FAQs available at the moment.</p>
      )}

      <Footer />
    </>
  );
};

export default FAQ;
