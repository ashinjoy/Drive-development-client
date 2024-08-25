import React, { useState } from 'react'
import { TfiLocationPin } from "react-icons/tfi";
import { ImLocation2 } from "react-icons/im";
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { acceptTrip,rejectTrip } from '../../../Features/Trip/tripActions';


function RideRequestNotifications({trip,setOpenNotification}) {
    const [isExpand,setExpand] = useState(false)
    const {driver} = useSelector(state=>state.driver)
    const  dispatch = useDispatch()
    const acceptRide = ()=>{
      const data = {
        driverId:driver?.id,
        status:'accepted',
        tripId:trip?._id
      }
      dispatch(acceptTrip(data))
      setOpenNotification(false)
    }
    const rejectRide = ()=>{
      const data = {
        driverId:driver?.id,
        status:'rejected',
        tripId:trip?._id
      }
      dispatch(rejectTrip(data))
      setOpenNotification(false)
    }
  return (
    <motion.div 
    initial={{x:1000}}
    animate={{x:0}}
    exit={{x:1000}}
    className='fixed p-2 top-11 right-6 flex flex-col gap-3  w-[29rem] min-h-[5rem] border-2 bg-white border-black bg-gradient-to-tr from-white to-yellow-200 shadow-xl z-50'>
        <div className='flex gap-2 px-5'>
        <TfiLocationPin size={20}  />
        <span className=''>Kakkanad</span>
        </div>
        <div className='flex gap-2 px-5'>
        <ImLocation2 size={20} />
        <span>Angamaly</span>
        </div>
        <div className='flex justify-around'>
        <button className='py-1 bg-green-400 rounded-sm w-[40%]' onClick={()=>acceptRide()}>Accept</button>
        <button className='py-1 bg-red-400 rounded-sm w-[40%]' onClick={()=>rejectRide()}>Reject</button>
        </div>
        <button className='w-[90%] border-2 rounded-sm border-black bg-black text-white mx-auto py-1' onClick={()=>setExpand(!isExpand)}>{isExpand ? 'Hide' : 'View'} Ride Details</button>
        <div className='absolute right-7 text-xl font-bold'>₹150</div>
       {isExpand && <div className='bg-red-500'>
        <h2>Heello</h2>
        </div> } 
    </motion.div>
  )
}

export default RideRequestNotifications
