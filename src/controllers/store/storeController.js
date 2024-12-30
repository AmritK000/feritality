import { API_BASE_URL } from "../../config/constants";
import { postRequest } from "../API";

/* ********************************************************************************
* Function Name   : ServiceCategory List
* Purposes        :This function is used to service Category
* Creation Date   : 12-Aug-2024
* Created By      : Noor Alam
* Update By       : 
* Update Date     : 
************************************************************************************/
export const list  = async(options) =>{
    try{
        const params = {
            url :`${API_BASE_URL}stores/service-provider`,
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
