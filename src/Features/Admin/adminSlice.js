import { createSlice } from "@reduxjs/toolkit";

import {adminLogin,getDriverDetails,blockUnblockDriver,driverDetails,getUserDetails, blockUnblockUser,searchDrivers} from './adminActions'

const adminData = JSON.parse(localStorage.getItem('adminData'))
const adminAccessToken = localStorage.getItem('adminAccessToken')

const initialState = {
    adminData: adminData ? adminData : '',
    adminToken:adminAccessToken ? adminAccessToken: null,
    userData:'',
    driverData:null,
    loading:false,
    success:false,
    message:'',
    error:''
  };
  
  const adminSlice = createSlice({
      name: "adminSlice",
      initialState,
      reducers: {
        resetAdminState: () => {
         return initialState   
        },
      },
      extraReducers(builder) {
        builder
          .addCase(adminLogin.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(adminLogin.fulfilled, (state, action) => {
            localStorage.setItem('adminAccessToken',action?.payload?.accessToken)
            localStorage.setItem('adminData',JSON.stringify(action?.payload?.data))
              state.success = true
              state.adminData = action?.payload?.data
              state.adminToken = action?.payload?.accessToken
              state.message = action?.payload?.message
          })
          .addCase(adminLogin.rejected, (state, action) => {
            state.error = action?.payload
          })
          .addCase(getDriverDetails.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(getDriverDetails.fulfilled, (state, action) => {
              state.success = true
              state.driverData = action?.payload?.driverDetails
              state.message = action?.payload?.message
          })
          .addCase(getDriverDetails.rejected, (state, action) => {
            // state.error = action?.payload
          })
          .addCase(blockUnblockDriver.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(blockUnblockDriver.fulfilled, (state, action) => {
              state.success = true
              state.driverData = state.driverData.map((data)=>{
                if(data._id == action?.payload?.id){
                  return {...data,isBlocked:action?.payload?.isBlocked}
                }
                return data
              })
              state.message = 'DriverManaged '
          })
          .addCase(blockUnblockUser.rejected, (state, action) => {
            console.log('action')
            state.error = action?.payload
          })
          .addCase(blockUnblockUser.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(blockUnblockUser.fulfilled, (state, action) => {
              state.success = true
              state.userData = state.userData.map((data)=>{
                if(data._id == action?.payload?.id){
                  return {...data,isBlocked:action?.payload?.isBlocked}
                }
                return data
              })
              state.message = 'UserManaged '
          })
          .addCase(blockUnblockDriver.rejected, (state, action) => {
            console.log('action')
            state.error = action?.payload
          })
          .addCase(driverDetails.pending, (state,action) => {
            state.loading = true;
          })
          .addCase(driverDetails.fulfilled, (state,action) => {
              state.success = true
              state.driverData = action?.payload?.driverDetails
              state.message = action?.payload?.message
          })
          .addCase(driverDetails.rejected, (state, action) => {
            state.error = action?.payload
          })
          .addCase(getUserDetails.pending, (state,action) => {
            state.loading = true;
          })
          .addCase(getUserDetails.fulfilled, (state,action) => {
            console.log('acacac',action )
              state.success = true
              state.userData = action?.payload?.userDetails
              state.message = action?.payload?.message
          })
          .addCase(getUserDetails.rejected, (state, action) => {
          })
          .addCase(searchDrivers.pending,(state,action)=>{
            state.loading = true
          })
          .addCase(searchDrivers.fulfilled,(state,action)=>{
            state.success = true
            state.driverData =action?.payload?.driverDetails
          })
          .addCase(searchDrivers.rejected,(state,action)=>{
            state.error = 'err'
          })
        }      
  })

  export const {resetAdminState} = adminSlice.actions

  export default adminSlice.reducer