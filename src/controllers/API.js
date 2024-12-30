import axios from "axios";
import { API_KEY, GOOGLE_MAP_API } from "../config/constants";

/*****************************************************
 * This function is use to generate GET Request
 *****************************************************/
export const getRequest = async (options)=>{
    try {
        const { url, postData ={} } = options;
        const token = sessionStorage.getItem('TOKEN');
        const headers = { authToken : token, key : API_KEY };
        const response = await axios.get(url, { headers });
        const data = response.data.response.result;
        return data;
    } catch (error) {
        return false;
    }
} //End of the function

/*****************************************************
 * This function is use to generate POST Request
 *****************************************************/
export const postRequest = async (options)=>{
    try{
        const { url, postData ={} } = options;
        const token = sessionStorage.getItem('TOKEN');
        const headers = { authToken : token, key : API_KEY };
        return await axios.post(url, postData, { headers });
    } catch(error){
        if(error?.response.status === 500 && error?.response.data.response.error === "Invalid or Expired Token"){
            sessionStorage.removeItem('STORE-INFO');
            sessionStorage.removeItem('TOKEN');
        }
        return error;
    }
} //End of the function


/*****************************************************
 * This function is use to fetch IP Address
 *****************************************************/
export const fetchIpAddress = async () => {
    try {
        if(sessionStorage.getItem('IP_ADDRESS')){
            return sessionStorage.getItem('IP_ADDRESS');
        } else {
            const result = await axios.get('https://api.ipify.org?format=json');
            if(result?.statusText === 'OK'){
                // console.log('data1',result.data.ip)
                sessionStorage.setItem('IP_ADDRESS',result?.data.ip);
                return result?.data.ip;
            } else{
                return ":1";
            }
        }
    } catch (error) {
        return ":1";
    }
}




export const getRequestwallet = async (options)=>{
    try {
        const { url, postData ={} } = options;
        const token = sessionStorage.getItem('TOKEN');
        const headers = { authToken : token, key : API_KEY };
        const response = await axios.get(url, { headers });
        const data = response.data.response.result;
        return data;
    } catch (error) {
        return false;
    }
} //End of the function


/*****************************************************
 * This function is use to get auto complete address
 *****************************************************/
export const autoCompleteAddress = async (value) => {
    try {
        let data = JSON.stringify({
        "input": `${value}`
        });

        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://places.googleapis.com/v1/places:autocomplete?key=${GOOGLE_MAP_API}`,
        headers: { 
            'Content-Type': 'application/json', 
            'X-Goog-Api-Key': `${GOOGLE_MAP_API}`
        },
        data : data
        };

        const response = await axios.request(config);
        const placesData = response?.data?.suggestions || [];
        
        const extractedData = placesData.map(place => ({
            placeId: place.placePrediction.placeId,
            address: place.placePrediction.text.text,
            mainText: place.placePrediction.structuredFormat.mainText.text
        }));
        return extractedData;
    } catch (error) {
        console.log('error',error);
        return [];
    }
}
/*****************************************************
 * This function is use to get lat and lng by place id
 *****************************************************/
export const fetchLatLngByPlceId = async (placeId) => {
    try {
        let data = '';

        let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://places.googleapis.com/v1/places/${placeId}?key=${GOOGLE_MAP_API}`,
        headers: { 
            'X-Goog-Api-Key': `${GOOGLE_MAP_API}`, 
            'X-Goog-FieldMask': 'location', 
            'Content-Type': 'application/json'
        },
        data : data
        };

        const res = await axios.request(config);
        return {status : true , result : res?.data?.location};

    } catch (error) {
        console.log(error);
        return {status : false, result : ''};
    }
}