import { API_BASE_URL } from "../../config/constants";
import { postRequest,getRequestwallet } from "../API";
import axios from "axios";


/* ********************************************************************************
* Function Name   : Shop List
* Purposes        :This function is used to shop Category
* Creation Date   : 03-Sep-2024
* Created By      : Megha Kumari
* Update By       : 
* Update Date     : 
************************************************************************************/
export const shopList  = async(options) =>{
    try{
        const params = {
            url :`${API_BASE_URL}products/shoplist`,
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
* Function Name   : Shop CategoryList
* Purposes        :This function is used to shop Category
* Creation Date   : 03-Sep-2024
* Created By      : Megha Kumari
* Update By       : 
* Update Date     : 
************************************************************************************/
export const shopCategoryDataList  = async(options) =>{
    try{
        const params = {
            url :`${API_BASE_URL}products/shop-product-category`,
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
* Function Name   : Shop CategoryList
* Purposes        :This function is used to shop Category
* Creation Date   : 03-Sep-2024
* Created By      : Megha Kumari
* Update By       : 
* Update Date     : 
************************************************************************************/
export const shopCategoryList  = async(options) =>{
    try{
        const params = {
            url :`${API_BASE_URL}common/product-categories/list`,
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

export const shopproductList  = async(options) =>{
    try{
        const params = {
            url :`${API_BASE_URL}products/list`,
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


export const shopproductfrequentlyList  = async(options) =>{
    try{
        const params = {
            url :`${API_BASE_URL}products/frequently-brought-together`,
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


export const addressdataList  = async(options) =>{
    try{
        const params = {
            url :`${API_BASE_URL}users/get-address-list`,
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

export const addaddressdata  = async(options) =>{
    try{
        const params = {
            url :`${API_BASE_URL}users/addEditAddress/:editId`,
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



export const ordercomplete  = async(options) =>{
    try{
        const params = {
            url :`${API_BASE_URL}orders/create`,
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


export const wallethistory  = async(options) =>{
    try{
        const params = {
            url :`${API_BASE_URL}users/wallet-data`,
            postData: options
        }
        const res = await getRequestwallet(params);
        if(res){
            return {result : res};
        } else{
            return {status : false, message:res?.response?.data?.statusMessage}
        }
    }catch(error){
        console.log(error)
            return {status: false, message: 'Under Maintanance, Please try after some time.'}
    }
}


export const promocodelist  = async(options) =>{
    try{
        const params = {
            url :`${API_BASE_URL}promocodes/list`,
            postData: options
        }
        const res = await postRequest(params);
        console.log("res",res);
        if(res){
            return {result : res};
        } else{
            return {status : false, message:res?.response?.data?.statusMessage}
        }
    }catch(error){
        console.log(error)
            return {status: false, message: 'Under Maintanance, Please try after some time.'}
    }
}


export const orderchangestatus  = async(options) =>{
    try{
        const params = {
            url :`${API_BASE_URL}orders/change-status`,
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

  
  
export const paymentordercomplete  = async(options) =>{
    try{
        const params = {
            url :`${API_BASE_URL}bookingservices/training/tap-payment`,
            postData: options
        }
        const res = await postRequest(params);
        return {res};
    }catch(error){
        console.log(error)
            return {status: false, message: 'Under Maintanance, Please try after some time.'}
    }
}

  
export const orderpaymentstatus  = async(options) =>{
    try{
        const params = {
            url :`${API_BASE_URL}bookingservices/training/payment-verify`,
            postData: options
        }
        const res = await postRequest(params);
        return {res};
    }catch(error){
        console.log(error)
            return {status: false, message: 'Under Maintanance, Please try after some time.'}
    }
}

  