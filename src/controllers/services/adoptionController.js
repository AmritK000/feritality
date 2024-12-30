import { API_BASE_URL } from "../../config/constants";
import { postRequest,fetchIpAddress } from "../API";

/*********************************************************
* Function Name : List
* Description   : This function is used for get dog adoption list
* By            : Noor Alam
* Date          : 13-August-2024
*********************************************************/
export const list = async (options) =>{
    try {
        const params = {
            url : `${API_BASE_URL}adoptions/list`,
            postData : options
        }
        const res = await postRequest(params);
        if(res.status === true || res.status === 200){
            return {status : true, result : res?.data?.response?.result, totalPage:res?.data?.response?.totalPage};
        } else{
            return {status : false, message:res?.response?.data?.statusMessage}
        }
    } catch (error) {
        console.log(error)
        return {status : false, message:"Under Maintanance, Please try after some time."}
    }
};//End of Function



