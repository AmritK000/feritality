import { API_BASE_URL } from "../../config/constants";
import {postRequest} from "../API";


/*********************************************************
* Function Name : email Subscription
* Description   : get upto date through email subscription
* By            : Noor ALam
* Date          : 12-Aug-2024 
*********************************************************/
export const subscription = async (options) =>{
    try{
     const params = {
        url : `${API_BASE_URL}common/subscription`,
        postData : options
     }
     const res = await postRequest(params);
     if(res.status === true || res.status === 200){
        return {status: true, result: res?.data?.response?.result};
     }else{
        return { status: false, message: res?.response?.data?.statusMessage }
     }
    }catch(error){
        console.log(error);
        return {status: false, message: "Under Maintenance, Please try after some time."}
    }
}

/*********************************************************
 * Function Name : List
 * Description   : Get list of all promocode list
 * By            : Afsar Ali
 * Date          : 02-04-2024
 *********************************************************/
export const getAdminInfo = async (options) => {
   try {
     const params = {
       url: `${API_BASE_URL}common/generalData`,
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