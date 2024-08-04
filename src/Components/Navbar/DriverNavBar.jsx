import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'
import { BiUserCircle } from "react-icons/bi";
import { useNavigate} from 'react-router-dom';
// import { logoutAction } from '../../Features/Driver/driverActions';
function DriverNavBar() {
 const {token,driver} =  useSelector(state =>state.driver)
 const dispatch = useDispatch()
//  const handleLogout = ()=>{
//     dispatch(logoutAction(driver?.id))
//  }
  return (
    <nav className='fixed top-0 flex flex-row justify-between  h-[6rem] drop-shadow-lg w-[100vw] 9 bg-white z-40 border'>
    <div className='ml-10 w-44'>
      <img src="/assets/logo-cl.png" alt="drive logo" className='w-full h-full object-contain'/>
    </div>
    <div className='hidden md:flex  text-sm lg:text-lg items-center gap-x-16 tracking-wider'>
      <NavLink to='/' className={'text-lg font-medium leading-tight'}>Home</NavLink>
      <NavLink to='/driver/signup' className={'text-lg font-medium leading-tight'}>Drive</NavLink>
      <NavLink className={'text-lg font-medium leading-tight'}>Contact Us</NavLink>
    </div>
    <div className='hidden md:flex text-sm lg:text-lg items-center gap-x-16 mr-10'>
    {token ?(<NavLink to='/logout'className='text-lg font-medium leading-tight'>Logout</NavLink>)
    (<BiUserCircle size={'28px'}/> ):
    <NavLink to='/login'className={'text-lg font-medium leading-tight'}>Login</NavLink>
}
    </div>
  </nav>
  )
}

export default DriverNavBar