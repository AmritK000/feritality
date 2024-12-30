import { API_BASE_URL } from "../../config/constants";
import { postRequest, getRequest } from "../API";


/* ********************************************************************************
* Function Name   : ServiceCategory List
* Purposes        :This function is used to service Category
* Creation Date   : 10-Aug-2024
* Created By      : Noor Alam
* Update By       : 
* Update Date     : 
************************************************************************************/
export const list = async () => {
    try {
        const params = {
            url: `${API_BASE_URL}common/services-categories/list`,
            postData: ''
        }
        const res = await postRequest(params);
        if(res.status == true || res.status === 200){
            return {status : true, result : res?.data?.response?.result}
        }
    } catch (error) {
        console.log(error);
        return { status: false, message: "Under Maintanance, Please try after some time." }
    }
}