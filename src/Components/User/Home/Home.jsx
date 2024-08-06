import React, { useEffect, useState } from 'react'
import { TfiLocationPin,TfiFlag } from "react-icons/tfi";

import LocationModal from '../Modal/LocationModal';

function Home() {
    const [modal,setModal] = useState(false)
useEffect(()=>{
setModal(true)
return ()=>{
    setModal(false)
}
},[])
  return (
    <>
    {modal && <LocationModal isOpen={modal} setModal={setModal}/>}
    <div className='flex justify-between items-center min-h-[50vh] bg-white ml-10 pt-[8rem]'>
            <div className='sm:ml-10'>
                <h1 className='text-4xl font-bold tracking-wide'>Always There to</h1>
                <span className='text-4xl font-bold tracking-wide'>Take You </span>
                <span className='text-4xl font-bold text-[#FEB71B]'>Anywhere</span>
                <h3 className='mt-4 text-lg tracking-wide'>Choose the Ride According to your Price Range</h3>
                <div className='flex flex-col gap-3 mt-6'>
                    <div className='flex border-2 h-12 border-black items-center'>
                        <div className='w-1/6 flex justify-center items-center'>
                            <TfiLocationPin size={24} />
                        </div>
                        <input type="text" placeholder="Please Enter Your Location" className='border-none outline-none flex-grow px-2' />
                    </div>
                    <div className='flex border-2 h-12 border-black items-center'>
                        <div className='w-1/6 flex justify-center items-center'>
                            <TfiFlag size={24} />
                        </div>
                        <input type="text" placeholder="Please Enter Your Destination" className='border-none outline-none flex-grow px-2' />
                    </div>
                </div>
                <button className='mt-6 px-6 py-2 bg-[#FEB71B] text-white font-bold rounded hover:bg-[#FFA500]'>
                    See Prices
                </button>
            </div>

            <div className='relative md:block hidden'>
                <div className='lg:block hidden absolute bottom-0 right-0 w-[50vw] h-[50vh] border-b-[60vh] border-b-[#FEB71B] border-l-[50vw] border-l-transparent '></div>
                <div className='w-[35vw] mr-[7rem] mb-[4rem]'>
                <img src="/assets/Bike-Taxi-App-Bike-Taxi-Kolkata-Bike-Taxi-Number-Bike-Taxi-BroomBoom-1.webp" alt="Bike Riders" className='relative z-10 w-[100%]' />
                </div>
            </div>
        </div>
        </>
  )
}

export default Home
