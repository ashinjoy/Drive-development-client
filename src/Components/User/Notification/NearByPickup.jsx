import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function NearByPickup({setShowNotification,notifyData}) {
  const timerRef = useRef(null)
  useEffect(()=>{
timerRef.current = setTimeout(()=>{
setShowNotification(false)
},3000)
  })
  return (

<motion.div 
  className='z-50 w-[20rem] h-[8rem] bottom-10 left-1/2  fixed bg-gradient-to-t from-red-600 to-orange-400 rounded-lg shadow-lg p-4 top-20'
  // initial={{ y: 1000, opacity: 0 }} 
  // animate={{ y: 0, opacity: 1 }} 
  // exit={{ y: 1000, opacity: 0 }}
  // transition={{ duration: 0.7, ease: "easeOut" }}
>
  <div className='flex items-center justify-between'>
    <div>
      <h1 className='text-xl font-bold text-white'>Ride Started =</h1>
      <p className='text-md text-gray-200'>{notifyData?.data?.distance} miles away | ETA: {Math.ceil(notifyData?.data?.duration/60)} mins</p>
    </div>
    <svg className='w-8 h-8 text-white' fill='currentColor' viewBox='0 0 24 24'>
      <path d='M12 2C8.13 2 5 5.13 5 9c0 4.55 6.5 13 6.5 13S18 13.55 18 9c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 7a2.5 2.5 0 0 1 0 5z'/>
    </svg>
  </div>
  {/* <div className='mt-3 flex justify-between'>
    <button className='bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-400 transition duration-150'>
      Confirm Arrival
    </button>
    <button className='bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-400 transition duration-150'>
      Call Passenger
    </button>
  </div> */}
</motion.div>
  )
}

export default NearByPickup
