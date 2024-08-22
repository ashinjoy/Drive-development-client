import React from 'react'
import DriverNavBar from '../../../Components/Navbar/DriverNavBar'

function Approval() {
  return (
    <>
    {/* <div className='flex h-screen gap-[23rem] items-center'>
    <DriverNavBar/>
   <div className='w-[500px] h-[500px] mt-24  border-2 rounded-full border-slate-100 drop-shadow-md py-10 flex items-center justify-center text-5xl font-bold bg-gradient-to-br from-white to-yellow-200 text-red-300'>
    Approval Pending
   </div>
   </div> */}
   <div className="flex h-screen gap-[15rem] items-center ">
    <DriverNavBar />
    <div className="flex flex-col items-center justify-center">
        <div className="w-[500px] h-[500px] border-4 rounded-full border-yellow-400 shadow-lg flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300">
            <span className="text-4xl font-bold text-yellow-700">Approval Pending</span>
        </div>
        <div className="mt-8 text-center">
            <p className="text-lg text-gray-600">We are reviewing your profile. You will be notified once it is approved.</p>
            <button className="mt-4 px-6 py-2 bg-yellow-400 text-white rounded-full shadow-md hover:bg-yellow-500 transition duration-300 ease-in-out">
                Learn More
            </button>
        </div>
    </div>
</div>

  </>
  )
}

export default Approval
