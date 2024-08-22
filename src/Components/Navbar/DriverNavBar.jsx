import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'
import { IoHome } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { GiJourney } from "react-icons/gi";
import { FaWallet } from "react-icons/fa6";
import { IoIosChatbubbles } from "react-icons/io";
import { MdPayments } from "react-icons/md";
import { BiSidebar, BiUserCircle } from "react-icons/bi";
import { useNavigate} from 'react-router-dom';
import { useSocket } from '../../Hooks/socket';
import { toast } from 'react-toastify';
import RideRequestToast from  '../Driver/CustomToast/RideRequestToast'
import RideRequestNotifications from '../Driver/Notifications/RideRequestNotifications';
import { AnimatePresence } from 'framer-motion';
import { driverLiveLocation } from '../../Context/DriverLocation';
import * as turf from '@turf/turf'

// import { logoutAction } from '../../Features/Driver/driverActions';
function DriverNavBar() {
  const [openNoti,setOpenNoti] = useState(false);
  const [trip,setTrip] = useState(null)
  const {setDriverLive} = useContext(driverLiveLocation)

 const {token,driver} =  useSelector(state =>state.driver)
 const {tripDetail} = useSelector(state =>state.trip)
 const socket = useSocket()
 useEffect(()=>{
  let timeOut
if(token && driver){ 
socket?.on('ride-request',(tripData)=>{
  console.log('entry inside client socket');
  console.log('tripdataa in socket',tripData)
  
  setTrip(tripData)
  setOpenNoti(true)
   timeOut = setTimeout(()=>{
  setOpenNoti(false)
  },13000)
})
}
return ()=>{
  clearTimeout(timeOut)
}
 },[socket])

useEffect(()=>{
  console.log('use');
  
if(token && driver && tripDetail){
  if(navigator.geolocation){
    navigator.geolocation?.watchPosition((pos)=>{
      // console.log('watching chnages',pos);
      // console.log('wat',pos.coords.longitude,pos.coords.latitude);
      console.log('position in driverNavbar',pos);
      
      const drivercooordinates = [pos?.coords?.longitude,pos?.coords?.latitude]
      // const dropoff = [tripDetail?.endLocation?.coordinates]
      // console.log('dropOff',dropoff)
      // console.log('driverLive',drivercooordinates)
      setDriverLive(drivercooordinates)
      socket?.emit('location-update',{pos,userId:tripDetail?.userId})

    // const approx =   checkApproxDistance(drivercooordinates,dropoff[0])
    // console.log('approx ',approx);
    
    // if(approx < 200){
    //   console.log('inside the endRifde')
    // }
      // console.log('driverend',drivercooordinates,dropoff[0]);
      // console.log('equal',drivercooordinates == dropoff[0]);
      
      
      // if(drivercooordinates == dropoff[0] ){
        
        // socket?.emit('ride-finished',{tripId:tripDetail?._id})
      // }
    },(err)=>{
      console.error(err)
    },{
      enableHighAccuracy:false,
      maximumAge:0
    })
  }
}
},[socket,tripDetail])

// const checkApproxDistance =(driverLocation,dropOffLocation)=>{
//   // console.log('driverLo',driverLocation,dropOffLocation);
  
//   const approx = turf.distance(driverLocation,dropOffLocation,{units:'meters'})
//   // console.log('approx',approx)
//   return approx

// }

//  const dispatch = useDispatch()
//  const handleLogout = ()=>{
//     dispatch(logoutAction(driver?.id)) 
//  }
  return (
    
//     <nav className='fixed top-0 flex flex-row justify-between  h-[6rem] drop-shadow-lg w-[100vw] 9 bg-white z-40 border'>
//     <div className='ml-10 w-44'>
//       <img src="/assets/logo-cl.png" alt="drive logo" className='w-full h-full object-contain'/>
//     </div>
//     <div className='hidden md:flex  text-sm lg:text-lg items-center gap-x-16 tracking-wider'>
//       <NavLink to='/' className={'text-lg font-medium leading-tight'}>Home</NavLink>
//       <NavLink to='/driver/signup' className={'text-lg font-medium leading-tight'}>Drive</NavLink>
//       <NavLink className={'text-lg font-medium leading-tight'}>Contact Us</NavLink>
//     </div>
//     <div className='hidden md:flex text-sm lg:text-lg items-center gap-x-16 mr-10'>
//     {/* {token ?(<NavLink to='/logout'className='text-lg font-medium leading-tight'>Logout</NavLink>)
//     (<BiUserCircle size={'28px'}/> ):
//     <NavLink to='/login'className={'text-lg font-medium leading-tight'}>Login</NavLink>
// } */}
//     </div>
//   </nav>
<>
 <nav className='flex flex-col min-h-screen gap-11 items-center  max-w-[12rem] bg-white border border-gray-300 bg-gradient-to-t from-yellow-50 to-white text-black rounded-md shadow-xl p-3'>
  <div>
    <img src="/assets/logo-cl.png" alt="logo" />
  </div>
  <NavLink className={'flex gap-2 text-lg font-bold'}>
    <IoHome className='mt-1'/>
    Home
  </NavLink>
  <NavLink className={'flex gap-2 text-lg font-bold'}>
    <MdSpaceDashboard className='mt-1'/>
    DashBoard
  </NavLink>
  <NavLink className={'flex gap-2 text-lg font-bold'} to='/driver/trip'>
    <GiJourney className='mt-1'/>
    Trip
  </NavLink>
  <NavLink className={'flex gap-2 text-lg font-bold'}>
    <FaWallet className='mt-1'/>
    Wallet
  </NavLink>
  <NavLink className={'flex gap-2 text-lg font-bold'}>
    <IoIosChatbubbles className='mt-1'/>
    Messages
  </NavLink>
  <NavLink className={'flex gap-2 text-lg font-bold'}>
    <MdPayments className='mt-1'/>
    Payments
  </NavLink>
  <NavLink className={'flex gap-2 text-lg font-bold'} to='/driver/profile'>
    <MdPayments className='mt-1'/>
    Profile
  </NavLink>


</nav> 
  <AnimatePresence mode='wait' >
    {
      openNoti &&
      <RideRequestNotifications trip={trip}/>
    }
  </AnimatePresence>
</>
  )
}

export default DriverNavBar