import { API_BASE_URL, API_STORE_URL } from "../config/constants";
import { getRequest, postRequest } from "./API"; 

export const getData = async (options) =>{
    try {
        const res = await postRequest(options);
        if(res.status === true || res.status === 200){
            return {status : true, result : res?.data?.response?.result};
        } else{
            return {status : false, message:res?.response?.data?.statusMessage}
        }
    } catch (error) {
        return {status : false, message:"Under Maintanance, Please try after some time."}
    }
}

export const addData = async (options) =>{
    try {
        const res = await postRequest(options);
        if(res.status === true || res.status === 200){
            return {status : true, result : res?.data?.response?.result};
        } else{
            return {status : false, message:res?.response?.data?.statusMessage}
        }
    } catch (error) {
        return {status : false, message:"Under Maintanance, Please try after some time."}
    }
}

/*********************************************************
* Function Name : List
* Description   : Get list of all common listing
* By            : Afsar Ali
* Date          : 27-03-2024 
*********************************************************/
export const commonList = async (options) =>{
    try {
        const params = {
            url : `${API_STORE_URL}common/list`, 
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



export const formatedDate = (inputDate) => {
    const months = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];

    const date = new Date(inputDate);
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
}

export const statusMessage = (status) => {
    try{
        if(status === 'A'){
            return `<p class="status-active" >Active</p>`;
        } else if(status === 'B'){
            return `<p class="status-danger" >Blocked</p>`;
        } else if(status === 'I'){
            return `<p class="status-inactive" >Inactive</p>`;
        } else if(status === 'D'){
            return `<p class="status-danger" >Deleted</p>`;
        }
    } catch(error) {
        console.log(error) 
        return '';
    }
}





export const getPage = (Nos) => {
    const page = parseInt(Nos/10) + 1;
    // console.log(page);
    return page
}


/*********************************************************
* Function Name : ucfirst
* Description   : Get list of ucfirst
* By            : Noor Alam
* Date          : 30-04-2024 
*********************************************************/
export const ucfirst = (str) => {
    try{
        return str.charAt(0).toUpperCase() + str.slice(1);
    }catch (error){
        return str;
    }
}


/*********************************************************
* Function Name : shortDescription
* Description   : shortDescription
* By            : Noor Alam
* Date          : 16August-2024 
*********************************************************/
export const shortDescription = (text, wordLimit) => {
    try{
       const words = text.split('');
       if(words.length>wordLimit){
        return words.slice(0, wordLimit).join('') + '...';
       }
    }catch (error){
        return text;
    }
}


/*********************************************************
* Function Name : getWorkingDays
* Description   : getWorkingDays
* By            : Noor Alam
* Date          : 19August-2024 
*********************************************************/
export const getWorkingDays = (storeTime) => {
    if (!storeTime || !Array.isArray(storeTime)) return '';
    const openDays = storeTime
        .filter(day => day.status === 'Open')
        .map(day => day.day.charAt(0).toUpperCase() + day.day.slice(1, 3)) // e.g., "Mon", "Tue"
        .join(', ');

    const openDaysCount = storeTime.filter(day => day.status === 'Open').length;
    return `${openDaysCount} Days (${openDays})`;
};



/*********************************************************
* Function Name : List
* Description   : Get list of all common listing
* By            : Afsar Ali
* Date          : 27-03-2024 
*********************************************************/
export const petDetails = async (options) =>{
    try {
        const params = {
            url : `${API_BASE_URL}users/get-pets-data`, 
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
