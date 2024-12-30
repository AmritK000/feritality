import { API_BASE_URL } from "../../config/constants";
import { postRequest } from "../API";


/*********************************************************
* Function Name : List
* Description   : Get list of all banner
* By            : Noor ALam
* Date          : 10-Aug-2024 
*********************************************************/
export const list = async (options) => {
    try {
        const params = {
            url: `${API_BASE_URL}common/banner/list`,
            postData: options
        }
        const res = await postRequest(params);
        if (res.status === true || res.status === 200) {
            return { status: true, result: res?.data?.response?.result };
        } else {
            return { status: false, message: res?.response?.data?.statusMessage }
        }
    } catch (error) {
        console.log("Error", error);
        return { status: false, message: "Under Maintenance, Please try after some time." }
    }
}


