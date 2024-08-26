import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'
import { BiUserCircle } from "react-icons/bi";
import { useNavigate} from 'react-router-dom';
import { useSocket } from '../../Hooks/socket';
import { resetTripDetails, setTripData } from '../../Features/Trip/tripSlice';
function UserNavbar() {
  const userData = useSelector((state)=>state.user)
  const {tripDetail} = useSelector(state=>state.trip)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userId = userData?.user?.id
  const  {token} = userData
  const {socket,chatSocket} = useSocket()

  const handleUserLogout =()=>{
  }

  useEffect(()=>{
    if(token && userData?.user){
      socket?.on('rideAccepted',(tripData)=>{
        console.log("ride  accepted");   
        console.log(tripData);  
    dispatch(setTripData(tripData))
      })
    }
  },[socket,userData?.user])

  useEffect(()=>{
    if(token && userData?.user && tripDetail){
      socket?.on('live-location',(data)=>{
        console.log('positional Coordinates-Live Tracking',data); 
      })

      socket?.on('driver-NearBy-pickup',(data)=>{
        console.log('data in nearby',data);
      })

      socket?.on('ride-start',(data)=>{
        console.log('ride started',data);
        // dispatch(setTripData(data))
        
      })

      socket?.on('nearby-dropoff',(data)=>{
        console.log('nearby-dropoff',data);
      })

      socket?.on('ride-complete',()=>{
        dispatch(resetTripDetails())
        console.log('ride finished')
      })
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
      <div className='hidden md:flex text-sm lg:text-lg items-center gap-x-16 mr-10'>
      {token ?<>
      <NavLink to={`/userprofile/${userId}`}><BiUserCircle size={'28px'}/></NavLink>
      <NavLink className={'text-lg font-medium leading-tight'} onClick={handleUserLogout}>Logout</NavLink>
      </>
      :<NavLink to='/login'className={'text-lg font-medium leading-tight'}>Login</NavLink>}
      </div>
    </nav>
  )
}

export default UserNavbar
