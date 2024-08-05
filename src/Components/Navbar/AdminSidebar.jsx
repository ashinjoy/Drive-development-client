import React  from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineDashboard } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaTaxi } from "react-icons/fa6";

function AdminSidebar() {

  
  return (

    <div className='fixed top-0 bottom-0 left-0 h-screen w-[12rem] shadow-xl border-r-2 z-40 bg-white'>
      <div><img src="/assets/logo-cl.png" alt="drive logo" className='w-full h-full object-contain'/></div>
      <div className='flex flex-col gap-10 h-2/3'>
      <div className="flex flex-row w-full justify-center">
      <NavLink 
      to='/admin/home'
      className={({isActive})=>`flex  gap-2 ${isActive ? `text-[#FEB71B]` :'text-black'}`}
      >
        <MdOutlineDashboard size={20} />
        <span>DashBoard</span>
      </NavLink>
    </div>
      <div className="flex flex-row w-full justify-center">
      <NavLink to="/admin/driver-list" className={({isActive})=>`flex  gap-3 ${isActive ?  `text-[#FEB71B]` :'text-black' }`}>
        <FaTaxi size={19} />
        <span>Drivers List</span>
      </NavLink>
    </div>
    <div className="flex flex-row w-full justify-center">
      <NavLink to="/admin/Users-list" className={({isActive})=>`flex  gap-3 ${isActive ?  `text-[#FEB71B]` :'text-black' }`}>
        <FaUsers size={20} />
        <span>Users List</span>
      </NavLink>
    </div>
      
      </div>
    </div>
    
  )
}

export default AdminSidebar
