import { firebaseApp } from '../../config/firebaseConfig.js';
import { getMessaging, getToken } from 'firebase/messaging';
const messaging = getMessaging(firebaseApp);
/*********************************************************
* Function Name : generateToken
* Description   : This function is used for generate web device id
* By            : Afsar Ali
* Date          : 09-04-2024 
*********************************************************/
export const generateToken = async () =>{
    try {
        return await getToken(messaging, {validKey : 'BEySiXJLKUyFnRVb7uSU-nZPTJz-FTaxqVN0pTbRFUN40R8x62BTGpy6_dLANjruh_GYcqzLkB3A137Cd8GSqP4'}).then((currentToken)=>{
            return currentToken;
          }).catch((err)=>{
            console.log('errrrrr', err);
            return false;
          })
    } catch (error) {
        console.log(error)
        // return false;
        return {status : false, message:"Under Maintanance, Please try after some time."}
    }
};//End of Function