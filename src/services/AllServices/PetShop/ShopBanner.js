
import { Shopbanner } from "../../../components/Images";

const ShopBanner = () =>{
    return(
        <>   
            <div className="petshop-banner">
            <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <img src={Shopbanner} alt="shopbanner"/>
                        </div>
                        {/* <div className="col-md-12">
                            <div className="petshopbanner">
                            <h1>Looking for the pawfect protection for your dog? Enroll Now to
                            </h1>
                            <p className="sub_heading aos-init aos-animate">start your Pet Insurance</p>
                            <button>Send Your Inquiry</button>
                            </div>
                        
                        </div> */}

                    </div>
                </div>
            </div>
                
           
        </>
    )
}

export default ShopBanner;
