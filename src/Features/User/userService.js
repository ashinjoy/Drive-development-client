import axios from '../../Utils/Axios/baseUrl'
import {UserPrivate} from "../../Utils/Axios/userInterceptor";


export const googleAuthService = async (token) => {
  try {
    const data = { token };
    const response = await axios.post("auth/user/login/google", data);
    console.log("response", response);
    return response;
  } catch (error) {
    console.error(error);
    throw error
  }
};

export const emailAuthService = async (email) => {
  try {
    const response = await axios.post("auth/user/login/email",{email})
    console.log("email response", response);
    return response
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const verifyOtpService = async (otp) => {
  try {
    const response = await axios.post("auth/user/verify-otp",{otp})
    console.log("otp response", response);
    return response
  } catch (error) {
    console.error(error);
    throw error
  }
};

export const resendOtpService = async(email)=>{
  try {
    console.log('email in resendOtp',email);
    return await axios.post('auth/user/resend-otp',{email})
  } catch (error) {
    console.error(error)
  }
}

export const userProfileUpdateService = async(formdata)=>{
  return await UserPrivate.put(`auth/user/userProfileUpdate`,formdata,{headers:{'Content-Type':'multipart/form-data'}})
}

export const userLogoutService = async()=>{
  return await axios.get('auth/user/logout')
}

export const userCurrentLocationService = async(coordinates)=>{
  console.log(coordinates);
  return await axios.post('trip/users/location',coordinates)
}