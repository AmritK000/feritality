import { groomingmain_banner } from "../../../components/Images";
import BookNew from "../../../components/Modals/Booknew";
import { useState } from "react";

const MainBanner = () => {
    const [show, setshow] = useState(false);
    const booknow_popshow = () => {
        setshow(true);
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <img src={groomingmain_banner} />
                    </div>
                    <div className="col-md-12">
                        <div className="groomingBanner">
                            <h1>Pet Grooming</h1>
                            <p className="sub_heading aos-init aos-animate">Bring your pets for a relaxed session & give him a new look.</p>
                            <button onClick={booknow_popshow}>Book Now</button>
                        </div>
                    </div>
                </div>
            </div>
            {
                show &&
                <BookNew />
            }
        </>
    )
}

export default MainBanner;
