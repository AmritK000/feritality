import { Link } from "react-router-dom";
import { logo, leftfootprint, left_side, rightfootprint, leftimg, bottom_line, footerlogoes, anim_img} from "../../../components/Images";


const GroomingDownload = () =>{
    return(
        <>
        <div className="app_downalod_Section">
            <div className="dowanload_rightside">
           
           
             <div className="dowanloadapp_section">
           
             <h1>Download the app</h1>
             <img src={bottom_line} />
            <p>Book professional Experts <br></br>from your phone.</p>
            <Link to="/"><img src={footerlogoes}className="dowanload_img" /></Link>
             </div>
             <div>

                <img src={leftfootprint} className="footprint"/>
                <div className="curve_rotation">
                <img src={anim_img} className="leftside" />
                </div>
               
            </div>
             <div className="appdownloadlogo">
              
            <img src={logo} alt="logo"  />
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

export default GroomingDownload;