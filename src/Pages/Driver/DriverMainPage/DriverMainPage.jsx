import React from 'react'
import DriverNavBar from '../../../Components/Navbar/DriverNavBar'
import Home from '../../../Components/Driver/Home/Home'
import Card from '../../../Components/Driver/DashBoard/Card'
import Table from '../../../Components/Driver/DashBoard/Table'

function DriverMainPage() {
  return (
    <>
    <DriverNavBar/>
     <div className='relative '>
    
  <div className='absolute  top-[5rem] left-[13rem] min-h-screen  flex  gap-10'>
    <Card type={"wallet"}/>
    <Card type={"totalTrips"}/>
    </div>
    <div className='absolute top-[27rem] left-64 w-1/2 h-[55vh]  p-4'>
    <Home/>
    </div>
    <div className='absolute flex flex-col  top-[50rem] gap-[4rem] left-64 w-full'>
    <Table type={"topTrips"}/>
    <Table type={"latestTrips"}/>
    </div> 
    </div> 
</>
  )
}

export default DriverMainPage
