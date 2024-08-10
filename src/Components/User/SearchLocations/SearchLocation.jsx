import React, { useState } from 'react'
import { FaLocationArrow } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import {userCurrentLocation} from '../../../Features/User/userActions'


function SearchLocation() {
  const [pickupLocation,setPickupLocation] = useState('')
  const dispatch = useDispatch()
  const getCurrentLocation =()=>{
    if(navigator.geolocation){
      const success = (position) =>{
       console.log(position.coords.latitude);
       console.log(position.coords.longitude);
       console.log(position.coords.accuracy);
       const locationCoordinate  = {
        latitude:position?.coords?.latitude,
        longitude:position?.coords?.longitude
       }
      
  dispatch(userCurrentLocation(locationCoordinate))
      
      }
      const error =(error)=>{
        console.error(error);
      }
      
      navigator.geolocation.getCurrentPosition(success,error,{
        maximumAge:0,
        enableHighAccuracy:true
      })
    }
  }

  return (
    <div className='mt-[8rem] ml-[2rem] h-screen'>
      <div className='w-[100%] h-auto p-8 shadow-xl border-2 border-slate-300 rounded-lg bg-white flex flex-col gap-5'>
        <h1 className='font-medium text-xl text-gray-700'>Start The Ride</h1>
        {/* <form action="" className='flex flex-col space-y-6' autoComplete='on' > */}
        <div className="flex flex-col w-full max-w-md mx-auto">
      <label htmlFor="pickup" className="text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
      <div className='flex items-center border-2 border-gray-300 rounded-md overflow-hidden focus-within:border-blue-500 transition duration-200'>
        <input
          type="text"
          id="pickup"
          placeholder="Enter pickup location"
          className='w-full h-12 px-4 text-gray-700 outline-none flex-1'
        />
        <button className='h-12 w-12 text-black flex items-center justify-center transition duration-200' onClick={getCurrentLocation}>
          <FaLocationArrow />
        </button>
      </div>
    </div>
          <div className="flex flex-col">
            <label htmlFor="dropoff" className="text-sm font-medium text-gray-600 mb-2">Dropoff Location</label>
            <input
              type="text"
              id="dropoff"
              placeholder="Enter dropoff location"
              className='w-full h-12 px-4 outline-none border-2 border-gray-300 rounded-md focus:border-blue-500 focus:shadow-md transition duration-200'
            />
           
          </div>
          <div className="flex flex-col">
            <label htmlFor="date" className="text-sm font-medium text-gray-600 mb-2">Date</label>
            
            <input
              type="date"
              id="date"
              className='w-full h-12 px-4 outline-none border-2 border-gray-300 rounded-md focus:border-blue-500 focus:shadow-md transition duration-200'
            />
          
          </div>
          <button
            type="submit"
            className='w-full h-12 bg-yellow-400 text-white font-semibold rounded-md hover:bg-yellow-500 focus:bg-yellow-600 transition duration-200'
          >
            Search Ride
          </button>
        {/* </form> */}
      </div>
    </div>
  )
}

export default SearchLocation