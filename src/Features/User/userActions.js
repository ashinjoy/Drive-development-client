import { createAsyncThunk } from "@reduxjs/toolkit";

import { googleAuthService ,emailAuthService ,verifyOtpService,resendOtpService } from "../../Features/User/userService";
console.log('userAction');

export const googleAuth = createAsyncThunk("googleAuth", async (token,{rejectWithValue}) => {
  try {
    console.log('token',token);
   const response =  await googleAuthService(token)
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

