import axios from '../../Utils/Axios/baseUrl'

import {driverPrivate} from "../../Utils/Axios/driverInterceptor";

export const registerDriverService = async (formDetails) => {
  try {
    const response = await axios.post("auth/driver/signup",formDetails);

    return response;
  } catch (error) {

    throw error
    // console.error(error);
  }
};

export const verifyOtpService = async (otp) => {
  try {
    const response = await axios.post("auth/driver/verify-otp", { otp });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const resendOtpService = async (email) => {
  try {
    return await axios.post("auth/driver/resend-otp", { email });
  } catch (error) {
    console.error(error);
  }
};

export const completeProfileService = async (formdata) => {
  try {
    console.log("from", formdata);
    return await axios.post("auth/driver/complete-profile", formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.error(error);
  }
};

export const profileUpdateService = async (formDetails) => {
  return driverPrivate.put('auth/driver/profileUpdate-request',formDetails,{headers:{'Content-Type':'multipart/form-data'}})
 };


export const driverLoginService = async(formDetails)=>{
  return await axios.post('auth/driver/login',formDetails)
}

export const logoutService = async()=>{
  return await axios.get('auth/driver/logout')
}

export const driverActiveService = async(driverDetails)=>{
return await driverPrivate.put('trip/driver/online',driverDetails)
}

export const driverInactiveService = async(driverId)=>{
  return await driverPrivate.put('trip/driver/offline',{driverId})
  }