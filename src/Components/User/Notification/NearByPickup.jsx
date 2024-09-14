import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function NearByPickup({setRideComplete,rideCompleteData}) {
  const timerRef = useRef(null)
  useEffect(()=>{
timerRef.current = setTimeout(()=>{
  setRideComplete(false)
},4000)
  })
  return (

<motion.div 
  className='z-50 w-[20rem] h-[8rem] bottom-10 left-1/2  fixed bg-gradient-to-t from-red-600 to-orange-400 rounded-lg shadow-lg p-4 top-20'
  initial={{ y: 1000, opacity: 0 }} 
  animate={{ y: 0, opacity: 1 }} 
  exit={{ y: 1000, opacity: 0 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
>
  <div className='flex items-center justify-between'>
    <div>
      <h1 className='text-xl font-bold text-white'>Jourey completed SucessFully</h1>
      <p className='text-md text-gray-200'>{rideCompleteData.distance} miles away | ETA: {Math.ceil(rideCompleteData.duration/60)} mins</p>
      <p>Payment Status : {rideCompleteData?.isPaymentComplete ? "completed"  : "not completed"}</p>
      <p>Fare:{rideCompleteData?.fare}</p>
    </div>
    <svg className='w-8 h-8 text-white' fill='currentColor' viewBox='0 0 24 24'>
      <path d='M12 2C8.13 2 5 5.13 5 9c0 4.55 6.5 13 6.5 13S18 13.55 18 9c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 7a2.5 2.5 0 0 1 0 5z'/>
    </svg>
  </div>

</motion.div>
  )
}

export default NearByPickup
