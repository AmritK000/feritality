import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import LoginUserOtp from "./components/loginUserOtp/loginUserOtp";
import CreatePetProfile from "./components/CreatePetProfile/createPetProfile";
import CreatePetProfileSecondOne from "./components/CreatePetProfile/createPetProfileSecondOne";
import CreatePetParentName from "./components/CreatePetProfile/createPetParentName";
import CreateEnterWonerDetiail from "./components/CreatePetProfile/createEnterOwnerDetiail";
import CreateVerifyOwnerDeatils from "./components/CreatePetProfile/createVerifyOwnerDeatils";
import StoreProcess from "./components/StoreProcess/storeProcess";
import StorePersonalDeatils from "./components/StoreProcess/storePersonalDeatils";
import StoreProcessFinalDetils from "./components/StoreProcess/storeProcessFinalDetils";
import Loginnew from "./components/Login/loginnew";
import NewLoginUserOtp from "./components/loginUserOtp/newLoginUserOtp";
import StoreProcessItemDeatils from "./components/StoreProcess/storeProcessItemDeatils";
import DeliveryProcessFinalDetails from "./components/deliveryProcessStore/deliveryProcessFinalDetails";
import DeliveryProcessItemDeatils from "./components/deliveryProcessStore/deliveryProcessItemDeatils";
import DeliveryStorePopup from "./components/deliveryProcessStore/deliveryStorePopup";
/***************************/
import Services from "./services/Services";
import GroomingStoredetails from "./services/AllServices/Grooming/GroomingStoredetails";
import FAQ from "./pages/Help_Support/faq";
import Privacy_policy from "./pages/Help_Support/Prvicay_policy";
import Term_condition from "./pages/Help_Support/Term_condition";
import Pet_Shop from "./services/AllServices/PetShop/ShopListing";
import FriendlyDetails from "./services/AllServices/Friendly/FriendlyDetails";
import FriendlyListing from "./services/AllServices/Friendly/FriendlyListing";
import BoardingStoredetails from "./services/AllServices/Boarding/BoardingStoredetails";
import DayCareStoredetails from "./services/AllServices/DayCare/DayCareStoredetails";
import VetrinaryStoredetails from "./services/AllServices/Veterinary/VeterinaryStoredetails";
import TrainingStoredetails from "./services/AllServices/Training/TrainingStoredetails";
import AdoptionDetail from "./services/AllServices/Adoption/AdoptionDetail";
import AdoptionDogDetail from "./services/AllServices/Adoption/AdoptionDogDetail";
import Grooming_personaldetail from "./services/AllServices/Grooming/serviceType/GroomingPersonal_details"
import Verinary_personaldetail from "./services/AllServices/Veterinary/VeterinaryPersonal_details"
import Checkoutdetail from "./services/AllServices/Grooming/serviceType/checkout";
import VetrinaryCheckout from "./services/AllServices/Veterinary/checkout_details";
import Booking_recieved from "./components/StoreProcess/bookingRecieved";
import ShopDetail from "./services/AllServices/PetShop/Shop_productlisting";
import ShopProductDetail from "./services/AllServices/PetShop/Productdetail";
import Deliverypersonaldetail from "./components/deliveryProcessStore/deliverypersonaldetail"
import Addnew_address from "./components/deliveryProcessStore/addnew_address";
import OrderRecieved from "./components/deliveryProcessStore/booking_recieved";
import Devlivery_process from "./components/deliveryProcessStore/devlivery_process";
import DayCarePickup  from "./services/AllServices/DayCare/pick_up_module/pick_up"
import DayCareCheckout from "./services/AllServices/DayCare/pick_up_module/pick_up_checkout";
import BoardingPickup  from "./services/AllServices/Boarding/pick_up_module/pick_up"
import BoardingCheckout from "./services/AllServices/Boarding/pick_up_module/pick_up_checkout";
import TrainingPersonal_details from "./services/AllServices/Training/TrainingPersonal_details";
import Traningchackout_detail from "./services/AllServices/Training/Traningchackout_detail";
import Paymentgayway from "./components/deliveryProcessStore/payment";

/************* user dashbaord ************** */
import Maindashbaord from "./Dashbaord/Main_dashbaord/Maindashbaord";
import Petparentsprofile from "./Dashbaord/Main_dashbaord/petparentsprofile";
import Add_address from "./Dashbaord/Main_dashbaord/addaddress";
import Treats from "./Dashbaord/Main_dashbaord/Treats";
import Payment_details from "./Dashbaord/Main_dashbaord/payment";
import Petprofile from "./Dashbaord/Main_dashbaord/Petprofile";
import Listing from "./Dashbaord/Main_dashbaord/Services/Listing";
import Booking from "./Dashbaord/Main_dashbaord/Services/Grooming/Booking";
import Reapeatday from "./Dashbaord/Main_dashbaord/Services/Day_care/Reapeatday";
import Shopdetail from "./Dashbaord/Main_dashbaord/Services/Shoplist/Shoplistdetails";
import TreatsWork from "./Dashbaord/Main_dashbaord/treatsWork";
import GroomingBooking from "./Dashbaord/Main_dashbaord/Services/Grooming/Booking";
import VeterinaryBooking from "./Dashbaord/Main_dashbaord/Services/Veterinary/Booking";
import BoardingBooking from "./Dashbaord/Main_dashbaord/Services/Boarding/Booking";
import DayCareBooking from "./Dashbaord/Main_dashbaord/Services/Day_care/Booking";
import TrainingBooking from "./Dashbaord/Main_dashbaord/Services/Training/Booking";


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Grooming Service routes */}
        <Route path="/services/grooming/:id" element={<GroomingStoredetails />}></Route>
        <Route path="/grooming-personaldetail" element={<Grooming_personaldetail/>}></Route>
        <Route path="/paymentgayway" element={<Paymentgayway/>}></Route>
        <Route path="/grooming-checkoutdetail" element={<Checkoutdetail />}></Route>
       {/* Boarding Service routes */}
       <Route path="/services/boarding/:id" element={<BoardingStoredetails />}></Route>
        <Route path="/services/boarding/pick-drop" element={<BoardingPickup />}></Route>
        <Route path="/services/boarding/pick-drop/checkout" element={<BoardingCheckout />}></Route>
        {/* DayCare Service routes */}
        <Route path="/services/day-care/:id" element={<DayCareStoredetails />}></Route>
        <Route path="/services/day-care/pick-drop" element={<DayCarePickup />}></Route>
        <Route path="/services/day-care/pick-drop/checkout" element={<DayCareCheckout />}></Route>
        {/* Vetrinary Service routes */}
        <Route path="/services/veterinary/:id" element={<VetrinaryStoredetails />}></Route>
        <Route path="/vetrinary-personaldetail" element={<Verinary_personaldetail/>}></Route>
        <Route path="/vetrinary-checkoutdetail" element={<VetrinaryCheckout />}></Route>
        {/* Training Service routes */}
        <Route path="/services/training/:id" element={<TrainingStoredetails />}></Route>
        {/* adoption routes */}
        <Route path="/services/adoption/:id" element={<AdoptionDetail />}></Route>
        <Route path="/services/adoption/detail/:id" element={<AdoptionDogDetail />}></Route>
        {/* Friendly routes */}
        <Route path="/petlisting" element={<FriendlyListing />} />
        <Route path="/services/friendly/:id" element={<FriendlyDetails />}></Route>
        {/* Pet Shop routes */}
        <Route path="/shop" element={<Pet_Shop />}></Route>
        <Route path="/shop/:id" element={<Pet_Shop />}></Route>
        <Route path="/shop/shopDetail" element={<ShopDetail />}></Route>
        <Route path="/shop/productDetail/:id" element={<ShopProductDetail />}></Route>
        <Route path="/devlivery_process" element={<Devlivery_process></Devlivery_process>}></Route>
        <Route path="/deliverypersonaldetails" element={<Deliverypersonaldetail></Deliverypersonaldetail>}></Route>
        <Route path="/addnew-address" element={<Addnew_address />}></Route>
        <Route path="/order-recieved" element={<OrderRecieved />} />
        <Route path="/TrainingPersonal_details" element={<TrainingPersonal_details />}></Route>
        <Route path="/traningchackout_detail" element={<Traningchackout_detail />}></Route>
        <Route path="/login-user-otp" element={<LoginUserOtp />} />
        <Route path="/create-pet-profile" element={<CreatePetProfile />} />
        <Route path="/create-pet-profile-second-one" element={<CreatePetProfileSecondOne />}/>
        <Route path="/create-pet-parent-name" element={<CreatePetParentName />}/>
        <Route path="/create-enter-owner-detiail" element={<CreateEnterWonerDetiail />}/>
        <Route path="/create-verify-owner-deatils" element={<CreateVerifyOwnerDeatils />}/>
        <Route path="/store-process" element={<StoreProcess />} />
        <Route path="/store-personal-deatils" element={<StorePersonalDeatils />}/>
        <Route path="/store-process-final-detils" element={<StoreProcessFinalDetils />}/>
        <Route path="/booking-recieved" element={<Booking_recieved />}/>
        <Route path="/store-process-item-deatils" element={<StoreProcessItemDeatils />}/>
        <Route path="/login-new" element={<Loginnew />} />
        <Route path="/new-login-user-otp" element={<NewLoginUserOtp />} />
        <Route path="/delivery-process-final-details" element={<DeliveryProcessFinalDetails />} />
        <Route path="/delivery-process-item-deatils" element={<DeliveryProcessItemDeatils />} />
        <Route path="/delivery-store-popup" element={<DeliveryStorePopup />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<Services />} />
        {/* Help and Support routes */}
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy_policy" element={<Privacy_policy />}></Route>
        <Route path="/term_condition" element={<Term_condition />}></Route>
        
         {/* userdasboard */}
         <Route path="/user/dashboard" element={<Maindashbaord />} />
         <Route path="/user/myorder" element={<Listing />} />
         <Route path="/user/pet-profile" element={<Petprofile />} />
         <Route path="/user/pick-drop" element={<Booking />} />
         <Route path="/user/wallet" element={<Treats />} />
         <Route path="/user/repeatday" element={<Reapeatday></Reapeatday>}></Route>
         <Route path="/user/grooming-order" element={<GroomingBooking/>}></Route>
         <Route path="/user/veterinary-order" element={<VeterinaryBooking/>}></Route>
         <Route path="/user/boarding-order" element={<BoardingBooking/>}></Route>
         <Route path="/user/daycare-order" element={<DayCareBooking/>}></Route>
         <Route path="/user/training-order" element={<TrainingBooking/>}></Route>
         <Route  path="/user/payment-details" element={<Payment_details></Payment_details>}></Route>
         <Route path="/user/address" element={<Add_address />} />
         <Route path="/user/shop-detail" element={<Shopdetail />} />
         <Route path="/user/user-profile" element={<Petparentsprofile></Petparentsprofile>}></Route>
         <Route path="/user/treats-work" element={<TreatsWork/>}></Route>
      </Routes>
    </div>
  );
};

export default App;
