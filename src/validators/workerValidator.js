import * as yup from 'yup';


export const validationSchemaForWorker = yup.object().shape({
workerMobileNum: yup
      .string()
      .min(10, 'Mobile number can have minimum 10 digits')
      .required('Mobile number is required'),
  });
  export  const otpSchemaWorker = yup
  .string()
  .required('OTP is required')
  .length(6, 'OTP must be exactly 6 characters')
  .matches(/^\d+$/, 'OTP must contain only numbers');
