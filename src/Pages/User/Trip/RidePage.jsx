import React,{useState,useRef,useEffect}from 'react'
import UserNavbar from '../../../Components/Navbar/UserNavbar'
import SearchLocation from '../../../Components/User/SearchLocations/SearchLocation'
import Maps from '../../../Components/User/Maps/Maps'


function RidePage() {
  // mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
  // console.log(mapboxgl.accessToken);

  const mapRef = useRef(null)
  return (
    <>
    <UserNavbar/>
    <div className='flex gap-[11rem]  h-screen w-screen'>
    <SearchLocation/>
    <Maps/>
    </div>
    </>
      
    
  )
}

export default RidePage
