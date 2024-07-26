import React from 'react'
function Footer() {
  return (
    <>
    <div className='flex justify-around bg-black bg-opacity-5 h-[13rem] mt-10'>
      <div className='flex flex-col gap-3 mt-10'>
      <h1 className='text-lg font-bold'>Basic Info</h1>
        <a href="/">Home</a>
        <a href="/">About Us</a>
        <a href="/">Contact Us</a>
      </div>
      <div className='md:flex flex-col items-center hidden'>
        <div className='flex  w-40 mt-4  items-center '>
        <img src="/assets/logo-cl.png" alt="drive logo" className='w-fit'/>
        </div>
        <h3>Made by a common man for all the common People</h3>
      </div >
      <div className='flex flex-col mt-10 gap-3 '>
        <h1 className='font-bold text-lg'>Our services</h1>
        <a href="/" className='text-black'>Start Your Ride</a>
        <a href="/" className='text-black'>Join as Driver</a>
        <a href="/" className='text-black'>Book a Ride</a>
      </div>
    </div>
    </>
    
  )
}

export default Footer
