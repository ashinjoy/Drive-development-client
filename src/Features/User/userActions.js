import { createAsyncThunk } from "@reduxjs/toolkit";

import { googleAuthService ,emailAuthService ,verifyOtpService,resendOtpService,userProfileUpdateService,userLogoutService,userCurrentLocationService,saveContactServices} from "../../Features/User/userService";
console.log('userAction');

export const googleAuth = createAsyncThunk("googleAuth", async (token,{rejectWithValue}) => {
  try {
    // console.log('token',token);
console.log('inside action of gogle auth 1');

   const response =  await googleAuthService(token)
console.log('inside action of gogle auth 2');

   return response.data
  } catch (error) {
    console.error(error);
    return rejectWithValue(error?.response?.data?.error)
  }
});

export const emailAuth = createAsyncThunk('emailAuth',async(email,{rejectWithValue})=>{
  try {
    const response = await emailAuthService(email)
    console.log(response)
    return response.data
  } catch (error) {
    console.error(error)
    return rejectWithValue(error?.response?.data?.error)
  }
})
  
export const verifyOtp = createAsyncThunk('verifyOtp',async(otp,{rejectWithValue})=>{
  try {
    
    const response = await verifyOtpService(otp)
    return response.data
  } catch (error) {
    console.error(error);
    return rejectWithValue(error?.response?.data?.error)
  }
})

export const resendOtp = createAsyncThunk('resendOtp',async(email)=>{
  try {
    const response = await resendOtpService(email)
    return response.data
  } catch (error) {
    console.error(error)
  }

})

export const userProfileUpdate = createAsyncThunk('userProfileUpdate',async(formData,{rejectWithValue})=>{
  try {
    const response = await userProfileUpdateService(formData)
    return response.data
  } catch (error) {
    console.error(error)
    rejectWithValue(error?.response?.data?.error)
  }
})

export const userLogout = createAsyncThunk('userLogout',async()=>{
  try {
    await userLogoutService()
  } catch (error) {
    
  }
})

export const userCurrentLocation =createAsyncThunk('userCurrentLocation',async(coordinates)=>{
  try {
  const response = await userCurrentLocationService(coordinates) 
  return response.data
  } catch (error) {
    
  }
})

export const saveContacts = createAsyncThunk('saveContacts',async(contactDetails)=>{
  try {
    console.log("contactDetails",contactDetails);
    
    const response = await saveContactServices(contactDetails)
    return response.data
  } catch (error) {
    console.log(error);
  }
})

