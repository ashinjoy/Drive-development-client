import React from 'react'
import { useSelector } from 'react-redux'

function BookingInfo() {
  const {tripDetail} = useSelector(state =>state.trip)
  return (
    // <div className='w-[20rem] mt-[7rem] ml-[2rem] h-[35rem] border-2 border-gray-500 shadow-sm rounded-md'>
    //     <div className='h-[14rem] p-3 '>
    //         <h1 className='text-center text-lg font-semibold '>Looking For NearBy Drivers</h1>
    //        {!tripDetail && <img src="/assets/ai-generated-magnifying-glass-cartoon-png-transformed.webp" alt="img" className='h-[60%] ml-[6rem] mt-[2rem]'/>}
    //     </div>
    //     <div className='p-3 flex flex-col gap-5'>
    //         <h1>PickUpLocation:{tripDetail?.pickUpLocation}</h1>
    //         <h1>DropOffLocation:{tripDetail?.dropOffLocation}</h1>
    //         <h1>Fare:{tripDetail?.fare}</h1>
    //         <h1>Estimated Time:{parseFloat(tripDetail?.duration)/60}min</h1>
    //     </div>
    //     <button className='bg-red-400 w-[50%] p-1 rounded-md text-white ml-10'>Cancel Ride</button>
    // </div>
    <div className="w-[20rem] mt-[7rem] ml-[2rem] h-[35rem] border-2 border-gray-300 shadow-lg rounded-lg overflow-hidden">
  <div className="relative h-[14rem] p-4 bg-gradient-to-r from-purple-50 to-blue-100 text-black">
    <h1 className="text-center text-xl font-bold tracking-wide">{tripDetail ? 'Driver Details' :'Looking For NearBy Drivers'}</h1>
    {!tripDetail &&(
      <img
        src="/assets/ai-generated-magnifying-glass-cartoon-png-transformed.webp"
        alt="img"
        className="h-[50%] w-auto mx-auto mt-6 opacity-90 animate-pulse"
      />
    )}
    {tripDetail?.driverId?.vehicleDetails?.vehicle_type == 'Auto ' ? (<img
        src="/assets/TukTuk_Green_v1.png"
        alt="img"
        className="h-[50%] w-auto mx-auto mt-6 "
      />):(<img
        src="/assets/scooter-illustration-vintage-vehicle-sign-and-symbol-vector-removebg-preview.png"
        alt="img"
        className="h-[50%] w-auto mx-auto mt-6 "
      />) }
  </div>
  <div className="p-4 flex flex-col gap-4">
    <div className="flex justify-between items-center">
      <h1 className="font-semibold text-gray-600">Pick-Up Location:</h1>
      <span className="text-gray-800 font-medium">{tripDetail?.pickUpLocation || 'N/A'}</span>
    </div>
    <div className="flex justify-between items-center">
      <h1 className="font-semibold text-gray-600">Drop-Off Location:</h1>
      <span className="text-gray-800 font-medium">{tripDetail?.dropOffLocation || 'N/A'}</span>
    </div>
    <div className="flex justify-between items-center">
      <h1 className="font-semibold text-gray-600">Fare:</h1>
      <span className="text-gray-800 font-medium">{tripDetail?.fare ? `₹${tripDetail.fare}` : 'N/A'}</span>
    </div>
    <div className="flex justify-between items-center">
      <h1 className="font-semibold text-gray-600">Estimated Time:</h1>
      <span className="text-gray-800 font-medium">{tripDetail?.duration ? `${Math.ceil(parseFloat(tripDetail.duration) / 60)} min` : 'N/A'}</span>
    </div>
  </div>
  <button className="bg-red-500 w-[60%] p-2 rounded-full text-white font-semibold mx-auto mt-4 hover:bg-red-600 transition-colors shadow-md ml-[3rem]">
    Cancel Ride
  </button>
</div>

  )
}

export default BookingInfo