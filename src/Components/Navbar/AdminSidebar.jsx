import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineDashboard } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";

function AdminSidebar() {
  
  return (

    <div className='fixed top-0 bottom-0 left-0 h-screen w-[12rem] shadow-xl border-r-2'>
      <div><img src="/assets/logo-cl.png" alt="drive logo" className='w-full h-full object-contain'/></div>
      <div className='flex flex-col justify-between h-2/3'>
      <div className="flex flex-row w-full justify-center">
      <NavLink to="/" className="flex  gap-2">
        <MdOutlineDashboard size={20} />
        <span>DashBoard</span>
      </NavLink>
    </div>
      <div className="flex flex-row w-full justify-center">
      <NavLink to="/admin/driver-list" className="flex  gap-2">
        <FaUserCheck size={20} />
        <span>Drivers List</span>
      </NavLink>
    </div>
    <div className="flex flex-row w-full justify-center">
      <NavLink to="/admin/Users-list" className="flex  gap-2">
        <FaUserCheck size={20} />
        <span>Users List</span>
      </NavLink>
    </div>
      
      </div>
    </div>
    
  )
}

export default AdminSidebar
