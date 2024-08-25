import { createSlice } from "@reduxjs/toolkit";
import { seacrhNearByDriver,requestRideAction,acceptTrip,startTrip,finishRide } from "./tripActions";

const trip = JSON.parse(localStorage.getItem('tripDetail'))
const initialState = {
    tripDetail:trip || null,
    nearbyDrivers:null,
    additionalSearchMetaData:'',
    loading:false,
    success:false,
    message:'',
    error:'' 
}
const tripSlice = createSlice({
    name:'tripSlice',
    initialState,
    reducers:{
        setTripData:(state,action)=>{
            console.log('action',action);
            localStorage.setItem('tripDetail',JSON.stringify(action?.payload))
            state.tripDetail = action?.payload
        },
        resetTripDetails:(state,action)=>{
            localStorage.removeItem('tripDetail')
            state.tripDetail = null
        }
    },
    extraReducers(builder){
        builder.addCase(seacrhNearByDriver.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(seacrhNearByDriver.fulfilled,(state,action)=>{
            state.success =true
            state.nearbyDrivers = action?.payload?.getNearByDrivers
            state.additionalSearchMetaData = action?.payload?.getAdditionalTripData
        })
        .addCase(seacrhNearByDriver.rejected,(state,action)=>{
            state.error = ''
        })
        .addCase(requestRideAction.pending,(state,action)=>{
            // state.loading = true
        })
        .addCase(requestRideAction.fulfilled,(state,action)=>{
            // state.success = true
            // state.tripDetail = action?.payload
        })
        .addCase(requestRideAction.rejected,(state,action)=>{
            // state.error = action?.payload
        })
        .addCase(acceptTrip.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(acceptTrip.fulfilled,(state,action)=>{
            console.log(action?.payload)
            
            localStorage.setItem('tripDetail',JSON.stringify(action?.payload?.acceptRide))
            state.tripDetail = action?.payload?.acceptRide
        })
        // .addCase(acceptTrip.rejected,(state,action)=>{
            
        // })
        .addCase(startTrip.pending,(state,action)=>{
            state.loading = true
        })
        .addCase(startTrip.fulfilled,(state,action)=>{
            localStorage.setItem('tripDetail',JSON.stringify(action?.payload?.tripDetail))
            state.tripDetail = action?.payload?.tripDetail
            state.message = action?.payload?.message
        })
        .addCase(startTrip.rejected,(state,action)=>{
            // state.error = action?.payload
        })
        .addCase(finishRide.pending,(state)=>{
            state.loading = true
        })
        .addCase(finishRide.fulfilled,(state,action)=>{
            localStorage.removeItem('tripDetail')
            state.success = true
            state.message = action?.payload?.message
        })
        .addCase(finishRide.rejected,(state,action)=>{
            // state.error = 
        })
    }
})
export const {setTripData,resetTripDetails} = tripSlice.actions
export default tripSlice.reducer