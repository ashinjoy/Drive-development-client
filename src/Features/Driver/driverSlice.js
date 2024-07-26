import { createSlice } from "@reduxjs/toolkit";
import {
  driverCompleteProfile,
  registerDriver,
  resendDriverOtp,
  verifyDriverOtp,
  driverLogin,
  confirmUpdate
} from "./driverActions";


const driverData  =JSON.parse(localStorage.getItem('driverData'))
const initialState = {
  driver: driverData ? driverData :'',
  token: null,
  loading: false,
  success: false,
  message:'',
  error: "",
};

const driverSlice = createSlice({
    name: "driverSlice",
    initialState,
    reducers: {
      resestAll: (state) => {
        state.driver = "";
          state.token = null;
          state.loading = false;
          state.success = "";
          state.error = "";
          
      },
    },
    extraReducers(builder) {
      builder
        .addCase(registerDriver.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(registerDriver.fulfilled, (state, action) => {
            state.success = true
            state.message = action?.payload?.message
        })
        .addCase(registerDriver.rejected, (state, action) => {
          state.error = action?.payload
        })
        .addCase(verifyDriverOtp.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(verifyDriverOtp.fulfilled, (state, action) => {
          console.log('action',action);

          // localStorage.setItem('driverToken',action?.payload?.accessToken)
          state.driver = action?.payload?.data
          // state.token = action?.payload?.accessToken
          state.message = action?.payload?.message
        })
        .addCase(verifyDriverOtp.rejected, (state, action) => {
          state.error = action?.payload?.error
        })
        .addCase(resendDriverOtp.pending, (state, action) => {
          
        })
        .addCase(resendDriverOtp.fulfilled, (state, action) => {})
        .addCase(resendDriverOtp.rejected, (state, action) => {})
        // .addCase(login.pending, (state, action) => {
        //   state.loading = true;
        // })
      //   .addCase(login.fulfilled, (state, action) => {})
      //   .addCase(login.rejected, (state, action) => {})
        .addCase(driverCompleteProfile.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(driverCompleteProfile.fulfilled, (state, action) => {
          localStorage.setItem('driverData',JSON.stringify(action?.payload?.data))
          state.success = true
          state.driver = action?.payload?.data
          state.message = action?.payload?.message
          
        })
        .addCase(driverCompleteProfile.rejected, (state, action) => {});
    }
})  
export const {resestAll} = driverSlice.actions
export default driverSlice.reducer;
