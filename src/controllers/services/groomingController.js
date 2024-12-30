import { API_BASE_URL,API_BASE_URL_ORDER } from "../../config/constants";
import { postRequest,fetchIpAddress,getRequest } from "../API";

/*********************************************************
* Function Name : List
* Description   : This function is used for get grooming store details
* By            : Noor Alam
* Date          : 19-August-2024
*********************************************************/
export const details = async (options) =>{
    try {
        const params = {
            url : `${API_BASE_URL}stores/store-services-list`,
            postData : options
        }
        const res = await postRequest(params);
        if(res.status === true || res.status === 200){
            return {status : true, result : res?.data?.response?.result};
        } else{
            return {status : false, message:res?.response?.data?.statusMessage}
        }
    } catch (error) {
        console.log(error)
        return {status : false, message:"Under Maintanance, Please try after some time."}
    }
};//End of Function



/*********************************************************
* Function Name : chnageStatus
* Description   : This function is used for chnage status of training service
* By            : Afsar Ali
* Date          : 11-05-2024 
*********************************************************/
export const booking_details = async (options) =>{
    try {
        const params = {
            url : `${API_BASE_URL}bookingservices/booking-details`,
            postData : options
        }
        const res = await postRequest(params);
        if(res.status === true || res.status === 200){
            return {status : true, result : res?.data?.response?.result, totalPage : res?.data?.response?.totalPage};
        } else{
            return {status : false, message:res?.response?.data?.statusMessage}
        }
    } catch (error) {
        console.log(error)
        return {status : false, message:"Under Maintanance, Please try after some time."}
    }
};//End of Function


/* ********************************************************************************
* Function Name   : Available-appointment List
* Purposes        : This function is used to grooming Available-appointment List
* Creation Date   : 12-Aug-2024
* Created By      : Noor Alam
* Update By       : 
* Update Date     : 
************************************************************************************/
export const booking  = async(options) =>{
    try{
        const params = {
            url :`${API_BASE_URL}bookingservices/available-appointment`,
            postData: options
        }
        const res = await postRequest(params);
        if(res.status === true || res.status === 200){
            return {status : true, result : res?.data?.response?.result};
        } else{
            return {status : false, message:res?.response?.data?.statusMessage}
        }
    }catch(error){
        console.log(error)
            return {status: false, message: 'Under Maintanance, Please try after some time.'}
    }
}


/* ********************************************************************************
* Function Name   : Reschedule
* Purposes        : This function is used to grooming reschedule_appointment
* Creation Date   : 7Oct-2024
* Created By      : Noor Alam
* Update By       : 
* Update Date     : 
************************************************************************************/
export const reschedule_appointment = async(options) => {
    try{
        const params = {
            url : `${API_BASE_URL}bookingservices/reschedule-appointment`,
            postData: options
        }
      const res = await postRequest(params);
      if(res.status === true || res.status === 200){
        return {status : true, result : res?.data?.response?.result};
    } else{
        return {status : false, message:res?.response?.data?.statusMessage}
    }
    }catch(error){
        console.log(error);
        return {status: false, message: 'Under Maintanance, Please try after some time.'}
    }
}



/* ********************************************************************************
* Function Name   : Cancel_appointment
* Purposes        : This function is used to grooming cancel_appointment
* Creation Date   : 7Oct-2024
* Created By      : Noor Alam
* Update By       : 
* Update Date     : 
************************************************************************************/
export const cancel_appointment = async(options) => {
    try{
        const params = {
            url : `${API_BASE_URL}bookingservices/cancel-grooming-booking`,
            postData: options
        }
      const res = await postRequest(params);
      if(res.status === true || res.status === 200){
        return {status : true, result : res?.data?.response?.result};
    } else{
        return {status : false, message:res?.response?.data?.statusMessage}
    }
    }catch(error){
        console.log(error);
        return {status: false, message: 'Under Maintanance, Please try after some time.'}
    }
}
export const downloadreceipt = async (options) =>{
    try {
        const params = {
            url: `${API_BASE_URL_ORDER}grooming/order-summary/${options._id}`, // use _id dynamically
            postData: {}
          };
        const res = await getRequest(params);
            return {result : res};
    } catch (error) {
        console.log(error)
        return {status : false, message:"Under Maintanance, Please try after some time."}
    }
};//End of Function
