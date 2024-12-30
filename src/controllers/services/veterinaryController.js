import { API_BASE_URL,API_BASE_URL_ORDER } from "../../config/constants";
import { postRequest,fetchIpAddress,getRequest } from "../API";

/*********************************************************
* Function Name : List
* Description   : This function is used for get grooming store details
* By            : Noor Alam
* Date          : 23-August-2024
*********************************************************/
export const details = async (options) =>{
    try {
        const params = {
            url : `${API_BASE_URL}stores/veterinary/services-list`,
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
* Function Name : booking_details
* Description   : This function is used for booking_details of vetrinary services
* By            : Noor Alam
* Date          : 11-05-2024 
*********************************************************/
export const booking_details = async (options) =>{
    try {
        const params = {
            url : `${API_BASE_URL}bookingservices/veterinary/booking-details`,
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
* Purposes        : This function is used to Vetrinary Available-appointment List
* Creation Date   : 12-Sep-2024
* Created By      : Noor Alam
* Update By       : 
* Update Date     : 
************************************************************************************/
export const appointment  = async(options) =>{
    try{
        const params = {
            url :`${API_BASE_URL}bookingservices/veterinary/available-appointment`,
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
* Function Name   : Vetrinary Create Order
* Purposes        :This function is used for Vetrinary Create Order
* Creation Date   : 12-Sep-2024
* Created By      : Noor Alam
* Update By       : 
* Update Date     : 
************************************************************************************/
export const create = async(options) => {
    try{
        const params = {
            url : `${API_BASE_URL}bookingservices/veterinary/create`,
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



/*********************************************************
* Function Name : chnageStatus
* Description   : This function is used for chage status of grooming booking services
* By            : Afsar Ali
* Date          : 11-05-2024 
*********************************************************/
export const changeStatus = async (options) =>{
    try {
        const params = {
            url : `${API_BASE_URL}bookingservices/veterinary/change-status`,
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
  /*********************************************************/


  /* ********************************************************************************
* Function Name   : Reschedule
* Purposes        : This function is used to veterinary reschedule_appointment
* Creation Date   : 7Oct-2024
* Created By      : Noor Alam
* Update By       : 
* Update Date     : 
************************************************************************************/
export const reschedule_appointment = async(options) => {
    try{
        const params = {
            url : `${API_BASE_URL}bookingservices/veterinary/reschedule-appointment`,
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
* Purposes        : This function is used to veterinary cancel_appointment
* Creation Date   : 7Oct-2024
* Created By      : Noor Alam
* Update By       : 
* Update Date     : 
************************************************************************************/
export const cancel_appointment = async(options) => {
    try{
        const params = {
            url : `${API_BASE_URL}bookingservices/veterinary/cancel-booking`,
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
            url: `${API_BASE_URL_ORDER}veterinaty/order-summary/${options._id}`, // use _id dynamically
            postData: {}
          };
        const res = await getRequest(params);
            return {result : res};
    } catch (error) {
        console.log(error)
        return {status : false, message:"Under Maintanance, Please try after some time."}
    }
};//End of Function
