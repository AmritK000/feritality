import { API_BASE_URL, API_CMS_URL } from '../../config/constants';
import { postRequest, getRequest } from '../API';


/* ********************************************************************************
* Function Name   : faq
* Purposes        :This function is used to faq
* Creation Date   : 20-Aug-2024
* Created By      : Noor Alam
* Update By       : 
* Update Date     : 
************************************************************************************/
export const faq = async (options) => {
  try {
    const postData = {
      url: API_BASE_URL + 'common/FAQs/list',
      postData: options
    };
    const res = await postRequest(postData);
    if (res?.status === true || res.status === 200) {
      return { status: true, result: res?.data?.response?.result };
    } else {
      return { status: false, message: res?.data?.statusMessage };
    }
  } catch (error) {
    console.log(error);
    return { status: false, message: "Under Maintenance, Please try after some time." };
  }
}; // End of Function



/* ********************************************************************************
* Function Name   : policy
* Purposes        :This function is used to privacy policy 
* Creation Date   : 21-Aug-2024
* Created By      : Noor Alam
* Update By       : 
* Update Date     : 
************************************************************************************/
export const policy = async (options) => {
  try {
    const postData = {
      url: API_CMS_URL + 'privacy-policy?from_API=Y',
      postData: options
    }
    const res = await getRequest(postData);
    console.log("resssssssssssss", res)
    if (res.status === true || res.status === 200) {
      return { status: true, result: res?.data?.response?.result };
    } else {
      return { status: false, mesasge: res?.response?.data?.statusMessage }
    }

  } catch (error) {
    console.log("Error", error);
    return { status: false, message: "Under MAintenance, Please try after some time" }
  }
}; // End of Function


