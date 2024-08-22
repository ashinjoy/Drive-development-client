import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  searchNearByDriverService,
  requestRideService,
  acceptTripService,
  rejectTripService,
  startRideService
} from "./tripService";
import { UserPrivate } from "../../Utils/Axios/userInterceptor";

export const seacrhNearByDriver = createAsyncThunk(
  "searchNearByDrivers",
  async (details, { rejectWithValue }) => {
    try {
      const { userId, pickupLocation, dropoffLocation } = details;
      const response = await searchNearByDriverService(
        userId,
        pickupLocation,
        dropoffLocation
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const requestRideAction = createAsyncThunk(
  "requestRide",
  async (data, { rejectWithValue }) => {
    try {
      const response = await requestRideService(data);
      return response.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);

export const acceptTrip = createAsyncThunk(
  "acceptTrip",
  async (details, { rejectWithValue }) => {
    try {
      const response = await acceptTripService(details);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const rejectTrip = createAsyncThunk(
    "acceptTrip",
    async (details, { rejectWithValue }) => {
      try {
        const response = await rejectTripService(details);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
  );

  export const startTrip = createAsyncThunk('startRide',async(data)=>{
    try {
    const response =   await startRideService(data)
    return response.data
    } catch (error) {
     console.error(error) 
    }
  })
