import { API_ADMIN_URL } from "../../config/constants";
import { postRequest,fetchIpAddress } from "../API";

/*********************************************************
* Function Name : List
* Description   : This function is used for get all service list
* By            : Afsar Ali
* Date          : 29-03-2024 
*********************************************************/
export const list = async (options) =>{
    try {
        const params = {
            url : `${API_ADMIN_URL}servicesmaster/list`,
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
* Function Name : addEditData
* Description   : This function is used for Add/Edit services
* By            : Afsar Ali
* Date          : 30-03-2024 
*********************************************************/
export const addEditData = async (options) =>{
    try {
        const params = {
            url : `${API_ADMIN_URL}servicesmaster/addeditdata`,
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
* Description   : This function is used for get all service list
* By            : Afsar Ali
* Date          : 29-03-2024 
*********************************************************/
export const chnageStatus = async (options) =>{
    try {
        const params = {
            url : `${API_ADMIN_URL}servicesmaster/change-status`,
            postData : {
                ...options,
                ipAddress : await fetchIpAddress()
            }
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


