import { API_BASE_URL } from "../../config/constants";
import { postRequest } from "../API";

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
* Function Name   : ServiceCategory List
* Purposes        :This function is used to service Category
* Creation Date   : 2-Sep-2024
* Created By      : Noor Alam
* Update By       : 
* Update Date     : 
************************************************************************************/
export const create = async(options) => {
    try{
        const params = {
            url : `${API_BASE_URL}bookingservices/create`,
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
* Function Name   : getAdminInfo 
* Purposes        :This function is used to getAdminInfo address list
* Creation Date   : 3-Sep-2024
* Created By      : Siddharth
* Update By       : 
* Update Date     : 
************************************************************************************/
export const getAdminInfo = async (options) => {
    try {
      const params = {
        url: `${API_BASE_URL}users/get-address-list`,
        postData: options,
      };
      const res = await postRequest(params);
      if (res.status === true || res.status === 200) {
        return {
          status: true,
          result: res?.data?.response?.result,
          count: res?.data?.response?.count,
        };
      } else {
        return { status: false, message: res?.response?.data?.statusMessage };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: "Under Maintanance, Please try after some time.",
      };
    }
  }; //End of Function


  /*********************************************************
* Function Name : chnageStatus
* Description   : This function is used for chage status of grooming booking services
* By            : Afsar Ali
* Date          : 11-05-2024 
*********************************************************/
export const changeStatus = async (options) =>{
  try {
      const params = {
          url : `${API_BASE_URL}bookingservices/change-status`,
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