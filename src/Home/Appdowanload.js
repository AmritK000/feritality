import { Link } from "react-router-dom";
import { logo } from "../components/Images";
import { leftfootprint } from "../components/Images";
import { rightfootprint } from "../components/Images";
import { leftimg } from "../components/Images";
import  {footerlogoes} from  "../components/Images";
const Appdownaload = () =>{
    return(
        <>
        <div className="app_downalod_Section">
            <div className="dowanload_rightside">
            <div>
                <img src={leftfootprint} className="footprint"/>
            </div>
            <div className="appdownloadlogo">
            <img src={logo} alt="logo"  />
            </div>
             <div className="dowanloadapp_section">
           
             <h1>Download the app</h1>
            <p>Book professional Experts from your phone.</p>
            <Link to="/"><img src={footerlogoes}className="dowanload_img" /></Link>
             </div>
              <div>
              <img src={rightfootprint} className="right_footerprint" />
              </div>
            </div>
            <div>
            <img src={leftimg} className="left_img"></img>
            </div>
        </div>
        </>
    )
}

export default Appdownaload;