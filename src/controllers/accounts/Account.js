import axios from "axios";
import { API_BASE_URL } from "../../config/constants";
import { getRequest, postRequest } from "../API";

/* ********************************************************************************
 * Function Name   : sendOtp
 * Purposes        :This function is used to send OTP
 * Creation Date   : 08-Aug-2024
 * Created By      : Noor Alam
 * Update By       :
 * Update Date     :
 ************************************************************************************/
export const sendOtp = async (options) => {
  try {
    // API call to the verify-phone endpoint
    const res = await postRequest({
      url: API_BASE_URL + "users/verify-phone",
      postData: options,
    });

    // Check if the response status indicates success
    if (res.status === true || res.status === 200) {
      return {
        status: true,
        message: `Your OTP has been sent to ${options.country_code} ${options.mobile.slice(0, -4) + 'XXXX'}.`,
      };
    } else {
      return { status: false, message: res?.response?.data?.statusMessage };
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Under Maintenance, Please try after some time.",
    };
  }
};


/*********************************************************
 *  This function is use to login api
 *********************************************************/
export const verifyLoginOtp = async (options) => {
  try {
    // Ensure all required fields are present
    const { mobile, country_code, otp } = options;
    if (!mobile) {
      return { status: false, message: "Mobile number is required" };
    } else if (!country_code) {
      return { status: false, message: "Country code is required" };
    } else if (!otp) {
      return { status: false, message: "One Time Password is required" };
    }

    // API call to the verify-phone-otp endpoint
    const res = await postRequest({
      url: API_BASE_URL + "users/verify-phone-otp",
      postData: options,
    });

    // Handle the response from the API
    if (res.status === true || res.status === 200) {
      // Storing the token and user info in sessionStorage
      sessionStorage.setItem('TOKEN', res.data.response.result.token);
      sessionStorage.setItem('USER-INFO', JSON.stringify(res.data.response.result));

      return {
        status: true,
        data: res.data,
        message: `Welcome Back! ${res.data.response.result.name}`,
      };
    } else {
      return { status: false, message: res?.response?.data?.statusMessage };
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Under Maintenance, Please try after some time.",
    };
  }
};

/*********************************************************
 *  This function is used for login API
 *********************************************************/
export const login = async (options) => { 
  try{
    const {mobile, otp}= options;
    if(!mobile){
        return {status : false, message:"mobile is required"}
    } else if(!otp){
        return {status : false, message:"One Time Password is required"}
    } else{
        const posrData ={ 
            url : API_BASE_URL+'users/login',
            postData : options
         }
        const res = await postRequest(posrData);
        if(res.status === true || res.status === 200){
          sessionStorage.setItem('userToken', res.data.response.result.Token);
            sessionStorage.setItem('USER-INFO', JSON.stringify(res.data.response.result));
            return {status : true, message:`Welcome Back! `};
        } else{
            return {status : false, message:res?.response?.data?.statusMessage}
        }
    }
}catch(error){
    console.log(error);
    return {status : false, message:"Under Maintanance in, Please try after some time."}
}
}; // End of Function

/*********************************************************
 *  This function is used pre register/create account
 *********************************************************/
export const petRegisterController = async (options) => {
  try {
    const {
      name,
      breed,
      dob,
      gender,
      city,
      ipAddress,
      platform,
      image,
    } = options;

    if (!name) return { status: false, message: "Pet name is required" };
    if (!breed) return { status: false, message: "Breed is required" };
    if (!dob) return { status: false, message: "Date of birth is required" };
    if (!gender) return { status: false, message: "Gender is required" };
    if (!city) return { status: false, message: "City is required" };
    if (!ipAddress) return { status: false, message: "IP address is required" };
    if (!platform) return { status: false, message: "Platform is required" };

    const postData = {
      url: API_BASE_URL + "users/create-pet-profile",
      postData: {
        name,
        breed,
        dob,
        gender,
        city,
        ipAddress,
        platform,
        latitude: options.latitude || null,
        longitude: options.longitude || null,
        version: options.version || null,
      },
    };

    const response = await postRequest(postData);

    if (response.status === true || response.status === 200) {
      return { status: true, message: "Pet registered successfully" };
    } else {
      return {
        status: false,
        message: response?.message || "Unknown error occurred",
      };
      const res = await postRequest(postData);
      if (res.status === true || res.status === 200) {
        sessionStorage.setItem('WEBTOKEN', res.data.response.result.webToken);
        sessionStorage.setItem('USER-INFO', JSON.stringify(res?.data?.response?.result))
        return { status: true, message: `Your One Time Password is sent to` };
      } else {
        return { status: false, message: res?.response?.data?.statusMessage };
      }
    }
  } catch (error) {
    console.log("Error in petRegisterController:", error.message);
    return {
      status: false,
      message: "An error occurred while registering the pet.",
    };
  }
};


/*********************************************************
* Function Name : petData
* Description   : petData for create and update 
* By            : Afsar Ali
* Date          : 04-03-2024 
*********************************************************/
export const petData = async (options) =>{
  try {
      const { url, postData={} } = options;
      const params = {
          url : `${API_BASE_URL}${url}`,
          postData : postData
      }
      const res = await postRequest(params);
      if(res.status === true || res.status === 200){
          return {status : true, result : res?.data?.response?.result};
      } else{
          return {status : false, message:res?.response?.data?.statusMessage}
      }
  } catch (error) {
      return {status : false, message:"Under Maintanance, Please try after some time."}
  }
};//End of Function


/*********************************************************
* Function Name : petList
* Description   : petData for petList data 
* By            : Noor Alam
* Date          : 01-Oct-2024 
*********************************************************/
export const petList = async (options) =>{
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
      return {status : false, message:"Under Maintanance, Please try after some time."}
  }
};//End of Function

/*********************************************************
 *  This function is use to logout user and clear session and local storage
 *********************************************************/
export const logout = async() => {
  try{
    const postData = {
      url : API_BASE_URL + 'users/logout',
    }
    await getRequest(postData);
    sessionStorage.clear();
    localStorage.clear();
    return {status: true, message: "Success"}
  }catch(error){
    sessionStorage.clear();
    localStorage.clear();
    return {status: true, message: "Success"}
  }
}

/*********************************************************
 *  This function is used pre register/create account
 *********************************************************/
export const updateOwnerProfileController = async (options) => {
  try {
    const params = {
      url: `${API_BASE_URL}users/update-owner-profile`,
      postData: options,
    };
    const res = await postRequest(params);
        if (res.status === true || res.status === 200) {
          sessionStorage.setItem('USER-INFO', JSON.stringify(res.data.response.result));
            return { status: true, result: res?.data?.response?.result };
        } else {
            return { status: false, message: res?.response?.data?.statusMessage }
        }
    } catch (error) {
        console.log("Error", error);
        return { status: false, message: "Under Maintenance, Please try after some time." }
    }
}

export const breedList = async (options) => {
  try {
    const params = {
      url: `${API_BASE_URL}common/breeds-list`,
      postData: options,
    };
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



/*********************************************************
 * Function Name : addEditAddress
 * Description   : this function is used for Add/Edit User Address
 * By            : Noor Alam
 * Date          : 06-Sep-2024
 *********************************************************/
export const addEditAddress = async (options) => {
  try {
    const params = {
      url: `${API_BASE_URL}users/addEditAddress/${options?.id?options?.id:'editId?'}`,
      postData: options,
    };
    const res = await postRequest(params);
    if (res.status === true || res.status === 200) {
      return { status: true, result: res?.data?.response?.result };
    } else {
      return { status: false, message: res?.response?.data?.statusMessage };
    }
  } catch (error) {
    return {
      status: false,
      message: "Under Maintanance, Please try after some time.",
    };
  }
}; //End of Function

/*********************************************************
 * Function Name : updatepetProfiles
 * Description   : this function is used for updatepetProfiles
 * By            : Noor Alam
 * Date          : 01-Oct-2024
 *********************************************************/
export const updatepetProfiles = async (options, id) => {
  try {
    const params = {
      url: `${API_BASE_URL}users/update-pet-profile/${id?id:'editId?'}`,
      postData: options,
    };
    const res = await postRequest(params);
    if (res.status === true || res.status === 200) {
      return { status: true, result: res?.data?.response?.result };
    } else {
      return { status: false, message: res?.response?.data?.statusMessage };
    }
  } catch (error) {
    return {
      status: false,
      message: "Under Maintanance, Please try after some time.",
    };
  }
}; //End of Function


/*********************************************************
 * Function Name : deletePet
 * Description   : this function is used for addressList
 * By            : Noor Alam
 * Date          : 30-Sep-2024
 *********************************************************/
export const deletePetProfile = async (options) => {
  try {
    const params = {
      url: `${API_BASE_URL}users/remove-pet-profile`,
      postData: options,
    };
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

/*********************************************************
 * Function Name : addressList
 * Description   : this function is used for addressList
 * By            : Noor Alam
 * Date          : 09-Sep-2024
 *********************************************************/
export const addressList = async (options) => {
  try {
    const params = {
      url: `${API_BASE_URL}users/get-address-list`,
      postData: options,
    };
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


/*********************************************************
 * Function Name : removeAddress
 * Description   : this function is used for addressList
 * By            : Noor Alam
 * Date          : 30-Sep-2024
 *********************************************************/
export const removeAddress = async (options) => {
  try {
    const params = {
      url: `${API_BASE_URL}users/remove-address`,
      postData: options,
    };
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

/*********************************************************
 * Function Name : notificationList
 * Description   : this function is used to fet notification list
 * By            : Siddharth Singh
 * Date          : 06-Sep-2024
 *********************************************************/
export const notificationList = async (options) => {
  try {
    const params = {
      url: `${API_BASE_URL}common/notification-list`,
      postData: options,
    };
    const res = await postRequest(params);
    if (res.status === true || res.status === 200) {
      return { status: true, result: res?.data?.response?.result };
    } else {
      return { status: false, message: res?.response?.data?.statusMessage };
    }
  } catch (error) {
    return {
      status: false,
      message: "Under Maintanance, Please try after some time.",
    };
  }
}; //End of Function

/*********************************************************
 * Function Name : markReadNotification
 * Description   : this function is used mark read notification
 * By            : Siddharth Singh
 * Date          : 26-Sep-2024
 *********************************************************/
export const markReadNotification = async (options) => {
  try {
    const params = {
      url: `${API_BASE_URL}common/read-notification`,
      postData: options,
    };
    const res = await postRequest(params);
    if (res.status === true || res.status === 200) {
      return { status: true, result: res?.data?.response?.result };
    } else {
      return { status: false, message: res?.response?.data?.statusMessage };
    }
  } catch (error) {
    return {
      status: false,
      message: "Under Maintanance, Please try after some time.",
    };
  }
}; //End of Function

/*********************************************************
 * Function Name : deleteNotification
 * Description   : this function is used deleteNotification
 * By            : Siddharth Singh
 * Date          : 26-Sep-2024
 *********************************************************/
export const deleteNotification = async (options) => {
  try {
    const params = {
      url: `${API_BASE_URL}common/remove-notification`,
      postData: options,
    };
    const res = await postRequest(params);
    if (res.status === true || res.status === 200) {
      return { status: true, result: res?.data?.response?.result };
    } else {
      return { status: false, message: res?.response?.data?.statusMessage };
    }
  } catch (error) {
    return {
      status: false,
      message: "Under Maintanance, Please try after some time.",
    };
  }
}; //End of Function
