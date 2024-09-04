import axios from '../../Utils/Axios/baseUrl'
import {UserPrivate} from "../../Utils/Axios/userInterceptor";


export const googleAuthService = async (token) => {
  try {
    const data = { token };
console.log('inside action of gogle service 1');

    const response = await axios.post("auth/user/login/google", data);
console.log('inside action of gogle service 2');

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
  return await UserPrivate.post('trip/users/location',coordinates)
}

export const stripePaymentService = async(data)=>{
  try {
   const response =  await UserPrivate.post('payment/stripe-session',data)
   return response.data
  } catch (error) {
    console.error(error);
    
  }
}

export const walletPaymentService = async(data)=>{
  try {
    const response = await UserPrivate.post('payment/wallet',data)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const addMoneyToWalletService = async(data)=>{
  try {
    const response = await UserPrivate.post('payment/wallet/addmoney',data)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getWalletBalance = async(userId)=>{
  try {
    const response = await UserPrivate.get(`payment/user/get-walletbalance/${userId}`)
    return response.data
  } catch (error) {
    
  }
}

export const getWalletHistoryService = async(userId)=>{
  try {
    const response = await UserPrivate.get(`payment/user/wallethistory/${userId}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const saveContactServices = async(contactDetails)=>{
  try {
    return await UserPrivate.post('auth/user/save-contacts',contactDetails)
  } catch (error) {
    
  }
}