import {adoptbanner} from "../components/Images";
import { Link } from "react-router-dom";

const Adoptbanners = () =>{
    return(
        <>
         <div className="adopt_banner">
            <img src={adoptbanner} />
            <div className="adoptbanner_innnercontent">
                <h1>Give A Home,<br></br>
                Get A Forever Friend</h1>
                <button><Link to="/services/adoption/">Adopt Now!</Link></button>
            </div>
         </div>
        </>
    )
}
export  default Adoptbanners;