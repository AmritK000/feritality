import { logo } from "../components/Images";
const Contactstripe = () => {
     return (
        <>
           <div className="contactstripe">
            <div className="row">
                <div className="col-md-6">
                 <div className="logo_img">
                    <div className="logo_frishbee">
                     <img src={logo}></img>
                    </div>
                    <div>
                        <p>If you still have a</p>
                        <h1>Questions?</h1>
                    </div>
                 </div>
                </div>
                <div className="col-md-6">
                    <div className="text-align-right">
                    <button className="contact_btn">Contact Us</button>
                    </div>
                 
                    </div>
            </div>
           </div>
           
        </>
    )
}

export default Contactstripe;