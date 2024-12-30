import * as yup from 'yup';

export const validationSchema = yup.object().shape({
        mobileNumber: yup
          .string()
          .min(10, 'Mobile number can have minimum 10 digits')
          .required('Mobile number is required'),
      });

      export const validationSchemaForInvidual = yup.object().shape({
        // email: yup.string().email('Invalid email').required('Email is required'),
        // password: yup.string().required('Password is required'),
        individualMobileNum: yup.string()
        .min(10, 'Mobile number can have minimum 10 digits')
        .required('Mobile number is required'),
          // .string()
          // .matches(/^[1-9][0-9]*$/, 'Mobile number must be numeric')
          // .min(10, 'Mobile number can have maximum 10 digits')
          // .required('Mobile number is required'),
      });

      export const validationSchemaForUser = yup.object().shape({
        userMobileNum: yup
          .string().min(10, 'Mobile number can have minimum 10 digits')
          .required('Mobile number is required'),
          // .matches(/^[1-9][0-9]*$/, 'Mobile number must be numeric')
          // .max(10, 'Mobile number can have maximum 10 digits')
          // .required('Mobile number is required'),
      });


export const IndividualRegistrationSchema =yup.object().shape({
  fullName: yup.string().test('min-length', 'Name should be greater than 3 letters', 
    function(value) {
      if (value && value.length < 3) { return false;}
      return true; 
    }).required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  isEmailAvailable: yup.number().test('is-email-verify', 'Email is already register with another users', value => value === 1),
  isPhoneAvailable: yup.number().test('is-phone-verify', 'Phone is already register with another users', value => value === 1),
  phone: yup.string()
  .matches(/^[1-9][0-9]*$/, 'Mobile number must be numeric')
  .max(15, 'Mobile number can have maximum 10 digits')
  .required('Mobile number is required'),
  country: yup.string().required('Country is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  land_mark: yup.string().required('land mark is required'),
  postal_code: yup.string().required('Postal Code is required').max(6, 'Postal Code should be a maximum of 6 digits'), 
  gender: yup.string().required('Gender is required'), 
})

      export const vendorRegistrationSchema = yup.object().shape({
        // fullName: yup.string().required('Full name is required').min(3, 'should be greater than 3 letter'),
        fullName: yup.string()
          .test('min-length', 'Full name should be greater than 3 letters', function(value) {
            if (value && value.length < 3) {
              return false; // Return false to indicate an error for length validation
            }
            return true; // Return true if the field is empty or meets the length requirement
          })
          .required('Full name is required'),
        email: yup.string().email('Invalid email address').required('Email is required'),
        isEmailAvailable: yup.number().test('is-email-verify', 'Email is already register with another users', value => value === 1),
        isPhoneAvailable: yup.number().test('is-phone-verify', 'Phone is already register with another users', value => value === 1),
        // bankName : yup.string().required('Bank name required'),
        // phone: yup     .string()
        // .matches(/^[1-9][0-9]*$/, 'Mobile number must be numeric')
        // .max(10, 'Mobile number can have maximum 10 digits')
        // .required('Mobile number is required'),
        country: yup.string().required('Country is required'),
        state: yup.string().required('State is required'),
        city: yup.string().required('City is required'),
        // address1: yup.string().required('Address line 1 is required'),
        // address2: yup.string().required('Address line 2 is required'),
        land_mark: yup.string().required('Landmark is required'),
        postal_code: yup.string().required('Postal Code is required').max(6, 'Postal Code should be a maximum of 6 digits'),
    //     profile_pic: yup.mixed().test('fileType', 'Only image files are allowed', (value) => {
    //   if (value) {
    //     return value && ['image/jpeg', 'image/png'].includes(value.type);
    //   }
    //   return true;
    // })
    // .nullable()
    // .required('Profile image is required'),
    // certificate: yup
    // .mixed()
    // .test('isImage', 'Only image files are allowed', (value) => {
    //   if (value) {
    //     const supportedFormats = ['image/jpeg', 'image/png'];
    //     return supportedFormats.includes(value.type);
    //   }
    //   return true;
    // })
    // .nullable(),
    // .required('CAC certificate is required'),
        // userType: yup.string().required('User Type is required'),
        // companyRegNo: yup.string().required('Company registration No. is required'),
        // tinNumber: yup.string().required('Tax identification Number is required'),
        // bankAccountNumber: yup.string().required('Bank Account Number is required'),
        // latitude: yup.string().required('Latitude is required'),
        // longitude: yup.string().required('Longitude is required'),
        // deviceID: yup.string(),
        // platform: yup.string(),
        // companyName: yup.string().required('Company name is required').min(3, 'Name should be greater than 3 letter'),
        companyName: yup.string()
          .test('min-length', "Company's name should be greater than 3 letters", function(value) {
            if (value && value.length < 3) {
              return false; // Return false to indicate an error for length validation
            }
            return true; // Return true if the field is empty or meets the length requirement
          })
          .required("Company's name is required"),
       
        companyPhone: yup.string().required('Mobile no. is required'),
        // phone: yup.string()
        // .matches(/^[1-9][0-9]*$/, 'Mobile number must be numeric')
        // .max(10, 'Mobile number can have maximum 10 digits')
        // .required('Mobile number is required'),
  
        // documentType: yup.string().required('Document type is required'),
        // documentNo: yup.string().required('Identification number is required'),
        // ownerBVN: yup
        // .string()
        // .required('Bank verification number is required')
        // .min(7, 'Bank verification number must be at least 7 digits')
        // .max(16, 'Bank verification number must be at most 16 digits'),
        gender: yup.string().required('Gender is required'), 
        // profilePic: yup.mixed(),
        // certificate: yup.mixed()
      });
      
      
export  const otpSchema = yup
        .string()
        .required('OTP is required')
        .length(6, 'OTP must be exactly 6 characters')
        .matches(/^\d+$/, 'OTP must contain only numbers');

        export  const otpSchemaUser = yup
        .string()
        .required('OTP is required')
        .length(6, 'OTP must be exactly 6 characters')
        .matches(/^\d+$/, 'OTP must contain only numbers');
      

        export   const AddWorkerSchema = yup.object().shape({
          fullName: yup.string().required('Full name is required'),
          email: yup.string().email('Invalid email').required('Email is required'),
          phone: yup.string().required('Phone number is required'),
          isEmailAvailable: yup.number().test('is-email-verify', 'Email is already register with another users', value => value === 1),
          isPhoneAvailable: yup.number().test('is-phone-verify', 'Phone is already register with another users', value => value === 1),
          // address1: yup.string().required('Address line 1 is required'),
          // address2: yup.string().required('Address line 2 is required'),
          // country: yup.string().required('Country is required'),
          identificationType: yup.string().required('Identification type is required'),
          identificationNumber: yup.string().required('Identification number is required'),
          // state: yup.string().required('State is required'),
          // city: yup.string().required('City is required'),
          // land_mark: yup.string().required('Landmark is required'),
          // postal_code: yup.string().required('Postal code is required'),
          // companyRegNo: yup.string().required('Company registration number is required'),
          // tinNumber: yup.string().required('TIN number is required'),
          // platform: yup.string().required('Platform is required'),
          // profile_pic: yup.mixed().required('Profile picture is required'), 
        });

        export   const userRegisterationSchema = yup.object().shape({
          fullName: yup.string().required('Full name is required'),
          email: yup.string().email('Invalid email').required('Email is required'),
          phone: yup.string().required('Phone number is required'),
          isEmailAvailable: yup.number().test('is-email-verify', 'Email is already register with another users', value => value === 1),
          isPhoneAvailable: yup.number().test('is-phone-verify', 'Phone is already register with another users', value => value === 1),
          // address1: yup.string().required('Address line 1 is required'),
          // address2: yup.string().required('Address line 2 is required'),
          // country: yup.string().required('Country is required'),
          // state: yup.string().required('State is required'),
          // city: yup.string().required('City is required'),
          // land_mark: yup.string().required('Landmark is required'),
          // postal_code: yup.string().required('Postal code is required'),
          // platform: yup.string().required('Platform is required'),
          // profile_pic: yup.mixed().required('Profile picture is required'), 
          gender: yup.string().required('Gender is required'), 
          // documentType: yup.string().required('Bank varification number is required'),
          // documentNo: yup.string().required('Identification number is required'),
        });

        export   const EditWorkerSchema = yup.object().shape({
          fullName: yup.string().required('Full name is required'),
          email: yup.string().email('Invalid email').required('Email is required'),
          phone: yup.string().required('Phone number is required'),
          address1: yup.string().required('Address line 1 is required'),
          address2: yup.string().required('Address line 2 is required'),
          country: yup.string().required('Country is required'),
          // identificationType: yup.string().required('Identification type is required'),
          // identificationNumber: yup.string().required('Identification number is required'),
          state: yup.string().required('State is required'),
          city: yup.string().required('City is required'),
          land_mark: yup.string().required('Landmark is required'),
          postal_code: yup.string().required('Postal code is required'),
          // companyRegNo: yup.string().required('Company registration number is required'),
          // tinNumber: yup.string().required('TIN number is required'),
          platform: yup.string().required('Platform is required'),
          profile_pic: yup.mixed().required('Profile picture is required'), 
        });

     export const validationSchemaForCompanyUpdate = yup.object().shape({
      fullName: yup.string().required('Full Name is required'),
      // address1: yup.string().required('Address Line 1 is required'),
      land_mark: yup.string(),
      postal_code: yup.string().required('Postal Code is required'),
      // companyRegNo: yup.string().required('Company Registration Number is required'),
      tinNumber: yup.string().required('TIN is required'),
      bankAcountNumber: yup.string().required('Account number is required'),
      platform: yup.string().required('Platform is required'),
      profile_pic: yup.string(),
      // certificate: yup.string(),
      bankName : yup.string().required('Bank Name Required'),
    });

    export const validationSchemaForUserUpdate = yup.object().shape({
      fullName: yup.string()
        .required('Full Name is required'),
      // country: yup.string()
      //   .required('Country is required'),
      // state: yup.string()
      //   .required('State is required'),
      // city: yup.string()
      //   .required('City is required'),
      address1: yup.string()
        .required('Address Line 1 is required'),
      land_mark: yup.string(),
      postal_code: yup.string()
        .required('Postal Code is required'),
      tinNumber: yup.string(),
      // profile_pic: yup.string(),
      document: yup.string(),
      documentNo:yup.string().required('Identification Number is required')
    });

    export const validationSchemaForDeleteRequest = yup.object().shape({
      phone: yup.string()
        .required('Phone is required'),
      email: yup.string()
        .required('Email is required')
    });
