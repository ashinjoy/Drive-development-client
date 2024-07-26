import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerDriverService,
  verifyOtpService,
  resendOtpService,
  completeProfileService,
  confirmUpdateService,
  driverLoginService
} from "./driverService";

export const registerDriver = createAsyncThunk(
  "registerDriver",
  async (formDetails, { rejectWithValue }) => {
    try {
      const response = await registerDriverService(formDetails);
      return response?.data
    } catch (error) {
      console.log('errr in register acrtion');
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const verifyDriverOtp = createAsyncThunk(
  "verifyDriverOtp",
  async (otp,{rejectWithValue}) => {
    try {
      const response = await verifyOtpService(otp);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error?.response?.data?.error)
    }
  }
);

export const resendDriverOtp = createAsyncThunk(
  "resendDriverOtp",
  async (email,{rejectWithValue}) => {
    try {
      const response = await resendOtpService(email);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error?.response?.data?.error)
    }
  }
);

export const driverCompleteProfile = createAsyncThunk(
  "driverCompleteProfile",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await completeProfileService(formdata);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const driverLogin = createAsyncThunk("driverLogin", async (formdata,{rejectWithValue}) => {
  try {
    const response = await driverLoginService(formdata);
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error?.response?.data?.error)
  }
});

// export const confirmUpdate = createAsyncThunk(
//   "confirmProfileUpdation",
//   async (email) => {
//     try {
//       const response = await confirmUpdateService(email);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//     }
//   }
// );
