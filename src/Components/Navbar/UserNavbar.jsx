import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'
import { BiUserCircle } from "react-icons/bi";
import { useNavigate} from 'react-router-dom';
function UserNavbar() {
  const userData = useSelector((state)=>state.user)
  console.log('userData',userData);
  const navigate = useNavigate()
  const userId = userData?.user?.id
  const  {token} = userData
  const showProfile = (userId)=>{
    navigate(`/userProfile`)
  }

  return ( 
    <nav className='fixed top-0 flex flex-row justify-between items-cenimport { BiUserCircle } from "react-icons/bi";ter h-[6rem] drop-shadow-lg w-[100vw] 9 bg-white z-40 border'>
      <div className='ml-10 w-44'>
        <img src="/assets/logo-cl.png" alt="drive logo" className='w-full h-full object-contain'/>
      </div>
      <div className='hidden md:flex  text-sm lg:text-lg items-center gap-x-16 tracking-wider'>
        <NavLink to='/' className={'text-lg font-medium leading-tight'}>Home</NavLink>
        <NavLink to='/driver/signup' className={'text-lg font-medium leading-tight'}>Drive</NavLink>
        <NavLink className={'text-lg font-medium leading-tight'}>Ride</NavLink>
        <NavLink className={'text-lg font-medium leading-tight'}>Contact Us</NavLink>
      </div>
      <div className='hidden md:flex text-sm lg:text-lg items-center gap-x-16 mr-10'>
      {token ?<NavLink to='/userprofile'><BiUserCircle size={'28px'}/></NavLink>:<NavLink to='/login'className={'text-lg font-medium leading-tight'}>Login</NavLink>}
      </div>
    </nav>
  )
}

export default UserNavbar
