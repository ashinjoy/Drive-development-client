import React from 'react'
import AdminNavbar from '../../Components/Navbar/AdminNavbar'
import AdminSideBar from '../../Components/Navbar/AdminSidebar'
import Home from '../../Components/Admin/Home/Home'
import Cards from '../../Components/Admin/DashBoard/Cards'
import Table from '../../Components/Admin/DashBoard/Table'


function AdminDashBoard() {
  return (
    <>
    <AdminNavbar/>
    <AdminSideBar/>
    <div className='relative '>
    <div className='absolute  top-[7rem] left-[13rem] min-h-screen  flex  gap-[10rem]'>
    <Cards type={"companyBalance"}/>
    <Cards type={"trips"}/>
    </div>
    <div className='absolute top-[20rem] left-64 w-1/2 h-[55vh]  p-4'>
    <Home/>
    </div>
    <div className='absolute flex flex-col  top-[50rem] gap-[4rem] left-64 w-full'>
    <Table type={"mostActiveDrivers"}/>
    <Table type={"latestRide"}/>
    </div>
    </div>
    </>
  )
}

export default AdminDashBoard
