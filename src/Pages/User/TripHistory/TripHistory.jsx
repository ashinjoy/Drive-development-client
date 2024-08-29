import React, { useEffect, useState } from 'react'
import UserNavbar from '../../../Components/Navbar/UserNavbar'
import TripCard from '../../../Components/TripCard/TripCard'
import { getAllTripsService } from '../../../Features/Trip/tripService'

function TripHistory() {
    const [tripDetails,settripDetails] = useState([])
    useEffect(()=>{
        const getAllTrips=async()=>{
        const response = await getAllTripsService()
        console.log("response of the trips",response);
        
        settripDetails(response?.getTripDetails)
        }
        getAllTrips()
    },[])
  return (
    <>
    <UserNavbar/>
    <div className="p-6 h-[80%] mt-[8rem]">
      <h1 className="text-2xl font-bold mb-6">My Trips</h1>
       {(tripDetails && tripDetails.length > 0 ) && tripDetails.map((trip)=>{
        const dateFormat = new Date(trip?.createdAt)
        const formattedDate =dateFormat.toLocaleString('en-US',{
            month:'short',
            day:'2-digit'
        })
        const formattedTime = dateFormat.toLocaleString('en-US', {
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
          }).replace(":", ".");
      return ( <TripCard
        title={trip?.pickUpLocation}
        date={formattedDate}
        time={formattedTime}
        price={trip?.fare}
        status={trip?.tripStatus}
      />)
       })
        } 
     
     
    </div>

    </>
  )
}

export default TripHistory
