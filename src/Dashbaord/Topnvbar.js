import { FaBone } from "react-icons/fa6";
import { dashabordlogo,header_icosn} from "../components/Images";
import { FaShoppingCart } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import "./main.css";
const Navbar =  () =>{
    const userData = JSON.parse(sessionStorage.getItem("USER-INFO"));

    return(
        <>
     <div className="top_navbar">
     <div className="container pr">
            <div className="row">
                <div className="col-md-6">
                    <div className="dashbaord_logo">
                    <img src={dashabordlogo} alt="dashbaord_logo" />
                    <h1 className="username">Hello!! <span>{userData?.name}</span></h1>
                    </div>
                
                </div>
                <div className="col-md-6 pr">

                    <ul  className="cart_item">
                        <li><img src={header_icosn} alt="headericons" className="img_total"></img><span className="avl_bal">100</span></li>
                        <li><FaBell className="icon" /><span className="increse_no">1</span></li>
                        <li><FaShoppingCart  className="icon"/><span  className="increse_no">2</span></li>
                    </ul>
                </div>
            </div>
        </div>
     </div>
       
        </>
    )
}

export default Navbar;
