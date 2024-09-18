import React from 'react'
import AdminNavbar from '../../Components/Navbar/AdminNavbar'
import AdminSideBar from '../../Components/Navbar/AdminSidebar'
import Home from '../../Components/Admin/Home/Home'
import Cards from '../../Components/Admin/DashBoard/Cards'
import Table from '../../Components/Admin/DashBoard/Table'


function AdminDashBoard() {
  return (
    <>
    <div className='flex flex-row'>
    <AdminSideBar/>
    <div className='flex flex-1 flex-col ml-[19rem] mt-[4rem] gap-[2.5rem] '>
    <div className='flex flex-row  gap-[1rem] '>
    <Cards type={"companyBalance"}/>
    <Cards type={"trips"}/>
    <Cards type={"trips"}/>
    <Cards type={"trips"}/>
    </div>
    <div className=''>
      <div className='w-[70%]'>
      <Home/>
      </div>
      {/* <div className='w-[30%]'> */}
      {/* <div className='max-w-xl rounded-lg bg-white p-6 shadow-lg flex flex-col gap-6'>
        <h1 className=''> Drivers with Maximum Completed Trips</h1>
      <Table type={"mostActiveDrivers"} />
      </div> */}
      {/* </div> */}
    </div>
    <div className='flex flex-col  gap-[4rem]'>
      <div className='max-w-[90%] rounded-lg bg-white p-4 shadow-lg '>
        <h1 className='text-lg font-semibold'>Latest Trips</h1>
    <Table type={"latestRide"}/>
      </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default AdminDashBoard
