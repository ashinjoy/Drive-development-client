import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'
import { BiUserCircle } from "react-icons/bi";
import { useNavigate} from 'react-router-dom';
import { useSocket } from '../../Hooks/socket';
import { resetTripDetails, setTripData } from '../../Features/Trip/tripSlice';
import { AnimatePresence } from 'framer-motion';
import NearByPickup from '../User/Notification/NearByPickup';
function UserNavbar() {
  const {user,token} = useSelector((state)=>state.user)
  const {tripDetail} = useSelector(state=>state.trip)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showNotification,setShowNofication] = useState(false)
  const [notifyData,setNotifyData] = useState('')
  const userId = user?.id
  
  const {socket,chatSocket} = useSocket()

  const handleUserLogout =()=>{
  }

  useEffect(()=>{
    console.log("useEffect Running");    
    if(!token || !user ||!socket){
      console.log("inside the if");
    return
    }
    console.log("outside the if");
    socket?.emit('user-connected',userId)
    socket?.on('rideAccepted',(tripData)=>{ 
   dispatch(setTripData(tripData))
    })
    return ()=>{
      socket?.off('user-connected')
      socket?.off('rideAccepted')
    }
  },[socket,user])

  useEffect(()=>{
    if(!token || !user || !tripDetail){
      
      return
      // socket?.on('live-location',(data)=>{
      //   console.log('positional Coordinates-Live Tracking',data); 
      // })

      // socket?.on('driver-NearBy-pickup',(data)=>{
      //   console.log('data in nearby',data);
      // })



      // socket?.on('nearby-dropoff',(data)=>{
      //   console.log('nearby-dropoff',data);
      // })

    
    }

    const handleRideStartSocket = (data)=>{
      console.log('ride started');
      setNotifyData(data)
    }

    const handleRideEndSocket = ()=>{
      dispatch(resetTripDetails())
      console.log('ride finished')
    }
    socket?.on('ride-start',handleRideStartSocket)
    socket?.on('ride-complete',handleRideEndSocket)

    return ()=>{
      socket?.off('ride-start')
      socket?.off('ride-complete')
    }
    
  },[socket,tripDetail])


  

  return ( 
    <nav className='fixed top-0 flex flex-row justify-between  h-[6rem] drop-shadow-lg w-[100vw] 9 bg-white z-40 border'>
      <div className='ml-10 w-44'>
        <img src="/assets/logo-cl.png" alt="drive logo" className='w-full h-full object-contain'/>
      </div>
      <div className='hidden md:flex  text-sm lg:text-lg items-center gap-x-16 tracking-wider'>
        <NavLink to='/' className={'text-lg font-medium leading-tight'}>Home</NavLink>
        <NavLink to='/driver/signup' className={'text-lg font-medium leading-tight'}>Drive</NavLink>
        <NavLink to='/search-ride' className={'text-lg font-medium leading-tight'}>Ride</NavLink>
        <NavLink className={'text-lg font-medium leading-tight'}>Contact Us</NavLink>
      </div>
      <div className='hidden md:flex text-sm lg:text-lg items-center mr-16'>
      {token ?
      <NavLink to={`/userprofile/${userId}`}><BiUserCircle size={'28px'}/></NavLink>:
     <NavLink to='/login'className={'text-lg font-medium leading-tight'}>Login</NavLink>}
      </div>
    <AnimatePresence mode='wait'>
   {showNotification && <NearByPickup setShowNofication={setShowNofication} notifyData={notifyData} />}
    </AnimatePresence>
    </nav>
  )
}

export default UserNavbar
