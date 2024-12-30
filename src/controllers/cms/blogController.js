import { API_BASE_URL } from "../../config/constants";
import { postRequest } from "../API";

export const list = async (options) =>{
    try {
        const params = {
            url : `${API_BASE_URL}common/blogs/list`,
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