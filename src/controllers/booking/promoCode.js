import { API_BASE_URL } from "../../config/constants";
import { postRequest } from "../API";

/* ********************************************************************************
* Function Name   : PromoCode List
* Purposes        :This function is used to service Category
* Creation Date   : 2-Sep-2024
* Created By      : Noor Alam
* Update By       : 
* Update Date     : 
************************************************************************************/
export const list  = async(options) =>{
    try{
        const params = {
            url :`${API_BASE_URL}promocodes/list`,
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
* Function Name   : treatsHistory
* Purposes        : This function is used for treats-history
* Creation Date   : 26-Sep-2024
* Created By      : Noor Alam
* Update By       : 
* Update Date     : 
************************************************************************************/
export const treatsHistory  = async(options) =>{
    try{
        const params = {
            url :`${API_BASE_URL}users/treats-history`,
            postData: options
        }
        const res = await postRequest(params);
        if(res.status === true || res.status === 200){
            return {status : true, result : res?.data?.response?.result, totalPage : res?.data?.response?.totalPage};
        } else{
            return {status : false, message:res?.response?.data?.statusMessage}
        }
    }catch(error){
        console.log(error)
            return {status: false, message: 'Under Maintanance, Please try after some time.'}
    }
}


