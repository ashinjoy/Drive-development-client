import React from 'react'
import { PiUserCirclePlusBold } from "react-icons/pi";

import { LuUserCircle2 } from "react-icons/lu";
function UserProfile() {
  return (
    <div className='flex justify-center items-center mt-[6rem] h-[80vh] min-w-screen bg-gradient-to-r from-white to-yellow-50'>
     <div className='h-[90%] w-[37%] border-[2px] border-black'>
    <div className='flex flex-col gap-10'>
    <h1 className='text-xl font-semibold text-center mt-4'>User Profile</h1>
      <form action="">
    <div className='flex flex-col items-center gap-3'>
     <PiUserCirclePlusBold size={'6rem'}/> 
     <input type="text" name="" id="" className=' w-[50%] border-2 border-black rounded-md h-9' /> 
     <input type="text" name="" id="" className=' w-[50%] border-2 border-black rounded-md h-9' />
    <input type="text" name="" id="" className=' w-[50%] border-2 border-black rounded-md h-9' /> 
    <button className='bg-[#FEB71B] hover:text-white w-[50%] rounded-md h-9 text-xl shadow-md' >Save Changes</button>
    {/* <button className='bg-[#FEB71B] hover:text-white w-[50%] rounded-md h-9 text-xl shadow-md' >Logout</button> */}    
    </div>
    </form>
    </div>
     </div>
      
     
    </div>
  )
}

export default UserProfile
