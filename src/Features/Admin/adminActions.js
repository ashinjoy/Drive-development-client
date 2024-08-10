import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  adminLoginService,
  getDriverDetailService,
  blockUnblockDriverService,
  driverDetailService,
  approveDriverService,
  approveDriverProfileUpdateService,
  getUserDetailService,
  blockUnblockUserService,
  searchDriverService
} from "./adminService";


export const adminLogin = createAsyncThunk(
  "adminLogin",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await adminLoginService(formdata);
      return response.data;
    } catch (error) {
      console.log("errin catch", error);
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const getDriverDetails = createAsyncThunk(
  "getDriverDetails",
  async (data, { rejectWithValue }) => {
    try {
      console.log("enterd list");
      const response = await getDriverDetailService();
      console.log("resp", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const blockUnblockDriver = createAsyncThunk(
  "blockUnblockDriver",
  async (driverId, { rejectWithValue }) => {
    try {
      const response = await blockUnblockDriverService(driverId);
      console.log("resp", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const driverDetails = createAsyncThunk(
  "driverDetails",
  async (driverId, { rejectWithValue }) => {
    try {
      const response = await driverDetailService(driverId);
      console.log("resp", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const approveDriver = createAsyncThunk(
  "approveDriver",
  async (driverId, { rejectWithValue }) => {
    try {
      const response = await approveDriverService(driverId);
       return response.data
    } catch (error) {
      console.error(error);
      rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const approveDriverProfileUpdate = createAsyncThunk(
  "approveDriverProfileUpdate",
  async (driverId, { rejectWithValue }) => {
    try {
      const response = await approveDriverProfileUpdateService(driverId);
      return response.data;
    } catch (error) {
      console.error(error);
      rejectWithValue(error?.response?.data?.error);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "getUserDetails",
  async (data, { rejectWithValue }) => {
    try {
      console.log("enterd list");
      const response = await getUserDetailService();
      console.log("resp", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      rejectWithValue(error)
    }
  }
);

export const blockUnblockUser = createAsyncThunk(
  "blockUnblockUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await blockUnblockUserService(userId);
      console.log("resp", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const searchDrivers = createAsyncThunk(
  "driverSearch",
  async (search,{rejectWithValue}) => {
    try {
        console.log('data to be lodade');
        
      const response = await searchDriverService(search);
      console.log('response',response.data)
      return response.data  
    } catch (error) {
        console.error(error)
    }
  }
)
