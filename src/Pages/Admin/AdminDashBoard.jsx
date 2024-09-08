import React from 'react'
import AdminNavbar from '../../Components/Navbar/AdminNavbar'
import AdminSideBar from '../../Components/Navbar/AdminSidebar'
import Home from '../../Components/Admin/Home/Home'


function AdminDashBoard() {
  return (
    <>
    <AdminNavbar/>
    <AdminSideBar/>
    <Home/>
    </>
  )
}

export default AdminDashBoard
