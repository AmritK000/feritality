import * as Yup from 'yup';

export const validationSlotSchema = Yup.object().shape({
    jobId: Yup.string().required('Service location is required.'),
    locationID: Yup.string().required('Service date is required.'),
    service_time: Yup.string().required('Service time is required.'),
    service_date: Yup.string().required('Service type is required.'),
    // job_desc: Yup.string().required('Job description is required.'),
  });


  export const validationSchemaForAddress = Yup.object().shape({
    country: Yup.string().required('Please select a country.'),
    state: Yup.string().required('Please select a state.'),
    city: Yup.string().required('Please select a city.'),
    land_mark: Yup.string().required('landmark is required.'),
    // address1: Yup.string().required('Address line 1 is required.'),
    // address2: Yup.string().required('Address line 2 is required.'),
    postal_code: Yup.string().required('Postal Code is required.'),
  });
  
  
  export const validationSchemaForEditAddress = Yup.object().shape({
    land_mark: Yup.string().required('landmark is required.'),
    // address1: Yup.string().required('Address line 1 is required.'),
    // address2: Yup.string().required('Address line 2 is required.'),
    postal_code: Yup.string().required('Postal Code is required.'),
  });
  



  export const SlotBookingSchema = Yup.object().shape({
    service_location: Yup.string().required('Service location is required'),
    service_date: Yup.string().required('Service date is required'),
    service_time: Yup.string().required('Service time is required'),
    // service_type: Yup.string().required('Service type is required'),
    provider_id: Yup.string().required('Provider ID is required'),
    platform: Yup.string().required('Platform is required'),
    // job_desc: Yup.string().required( 'Job description must be at most 200 characters'),
    // jobImage: Yup.string().required('Job image must be a valid URL'),
    // latitude: Yup.string().required('Latitude is required'),
    // longitude: Yup.string().required('Longitude is required'),
    // ipAddress: Yup.string().required('IP address is required'),
  });