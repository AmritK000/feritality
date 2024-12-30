import { API_BASE_URL,API_BASE_URL_ORDER } from "../../config/constants";
import { postRequest,fetchIpAddress, getRequestwallet,getRequest } from "../API";

/*********************************************************
* Function Name : List
* Description   : This function is used for get grooming store details
* By            : Noor Alam
* Date          : 19-August-2024
*********************************************************/
export const details = async (options) =>{
    try {
        const params = {
            url : `${API_BASE_URL}stores/boarding/services-list`,
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
            url : `${API_BASE_URL}bookingservices/boarding/booking-details`,
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

/*********************************************************
* Function Name : chnageStatus
* Description   : This function is used for chnage status of training service
* By            : Afsar Ali
* Date          : 11-05-2024 
*********************************************************/
export const pickupPriceController = async (options) =>{
    try {
        const params = {
            url : `${API_BASE_URL}common/get-pick-drop-charges`,
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
* Description   : This function is used to create boarding 
* By            : Siddharth Singh
* Date          : 11-05-2024 
*********************************************************/
export const createBooking = async (options) =>{
    try {
        const params = {
            url : `${API_BASE_URL}bookingservices/boarding/create`,
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
* Description   : This function is used for chnage status of boarding
* By            : Siddharth Singh
* Date          : 12-09-2024 
*********************************************************/
export const changeStatus = async (options) =>{
    try {
        const params = {
            url : `${API_BASE_URL}bookingservices/boarding/change-status`,
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

/*********************************************************
* Function Name : chnageStatus
* Description   : This function is used to get time slot
* By            : Siddharth Singh
* Date          : 12-09-2024 
*********************************************************/
export const timeSlot = async (options) =>{
    try {
        const params = {
            url : `${API_BASE_URL}common/time-slot`,
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
/* ********************************************************************************
* Function Name   : ServiceCategory List
* Purposes        :This function is used to service Category
* Creation Date   : 12-Aug-2024
* Created By      : Noor Alam
* Update By       : 
* Update Date     : 
************************************************************************************/
export const booking  = async(options) =>{
    try{
        const params = {
            url :`${API_BASE_URL}bookingservices/boarding/available-appointment`,
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

export const wallethistory  = async(options) =>{
    try{
        const params = {
            url :`${API_BASE_URL}users/wallet-data`,
            postData: options
        }
        const res = await getRequestwallet(params);
        if(res){
            return {result : res};
        } else{
            return {status : false, message:res?.response?.data?.statusMessage}
        }
    }catch(error){
        console.log(error)
            return {status: false, message: 'Under Maintanance, Please try after some time.'}
    }
}

export const promocodelist  = async(options) =>{
    try{
        const params = {
            url :`${API_BASE_URL}promocodes/list`,
            postData: options
        }
        const res = await postRequest(params);
        console.log("res",res);
        if(res){
            return {result : res};
        } else{
            return {status : false, message:res?.response?.data?.statusMessage}
        }
    }catch(error){
        console.log(error)
            return {status: false, message: 'Under Maintanance, Please try after some time.'}
    }
}


export const bookingList = async(options) => {
    try {
        const params = {
            url : `${API_BASE_URL}bookingservices/boarding/booking-details`,
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
            url : `${API_BASE_URL}bookingservices/boarding/reschedule-appointment`,
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
            url : `${API_BASE_URL}bookingservices/boarding/cancel-booking`,
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
            url: `${API_BASE_URL_ORDER}boarding/order-summary/${options._id}`, // use _id dynamically
            postData: {}
          };
        const res = await getRequest(params);
            return {result : res};
    } catch (error) {
        console.log(error)
        return {status : false, message:"Under Maintanance, Please try after some time."}
    }
};//End of Function
