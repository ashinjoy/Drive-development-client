import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Chat from '../../Chat/Chat'

function BookingInfo() {
  const {tripDetail} = useSelector(state =>state.trip)
  const [openChat,setOpenChat] = useState(false)
  const [senderId,setSenderId] = useState(null)
  const [recieverId,setRecieverId] =useState(null)
  const {user} = useSelector(state=>state.user)


  useEffect(()=>{
if(tripDetail){
  setRecieverId(tripDetail?.driverId)
  setSenderId(tripDetail?.userId)
}
  },[tripDetail])
  return (


    <div className="w-[20rem] mt-[7rem] ml-[2rem] h-[35rem] border-2 border-gray-300 shadow-lg rounded-lg overflow-hidden">
    {openChat && <Chat openChat={openChat} user={user} />}

  <div className="relative h-[14rem] p-4 bg-gradient-to-r from-purple-50 to-blue-100 text-black">
    <h1 className="text-center text-xl font-bold tracking-wide">{tripDetail ? 'Driver Details' :'Looking For NearBy Drivers'}</h1>
    {!tripDetail ? (
      <img
        src="/assets/ai-generated-magnifying-glass-cartoon-png-transformed.webp"
        alt="img"
        className="h-[50%] w-auto mx-auto mt-6 opacity-90 animate-pulse"
      />
    ) :
   
    tripDetail?.driverDetails && 
    <>
     <img
        src={tripDetail?.driverDetails?.profileImg}
        alt="img"
        className="h-[45%] w-auto mx-auto mt-2 "
      />
      <div className='w-full flex items-around'>
    <h1 className="font-semibold text-gray-600">Name:</h1>
    <span>{tripDetail?.driverDetails?.name}</span>
      </div>
      <div className='w-full flex items-around'>
    <h1 className="font-semibold text-gray-600">Email:</h1>
    <span>{tripDetail?.driverDetails?.email}</span>
      </div>
      <div className='w-full flex items-around'>
    <h1 className="font-semibold text-gray-600">Phone:</h1>
    <span>{tripDetail?.driverDetails?.phone}</span>
      </div>


    
    </>
   }
    
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
  <button className="bg-red-500 w-[60%] p-2 rounded-full text-white font-semibold mx-auto mt-4 hover:bg-red-600 transition-colors shadow-md ml-[3rem]" onClick={()=>{setOpenChat(true)}}>
    chat
  </button>
</div>

  )
}

export default BookingInfo