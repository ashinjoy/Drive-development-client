import React, { useState,  useEffect } from "react";
import UserNavbar from "../../../Components/Navbar/UserNavbar";
import SearchLocation from "../../../Components/User/SearchLocations/SearchLocation";
import Maps from "../../../Components/User/Maps/Maps";
import {  useSelector } from "react-redux";
// import LiveMapUpdates from "../../../Components/User/Maps/LiveMap";
// import { userCurrentLocation } from "../../../Features/User/userActions";

function RidePage() {
  // const [pickUpCoords,setPickUpCoords] = useState([])
  // const [dropCoords,setDropCoords] = useState([])
  const [isSearch,setSearch] = useState(false)
  // const [live,setLive] = useState(false)
  const {tripDetail} = useSelector(state=>state.trip)
  useEffect(()=>{
    if(!tripDetail){
      return
      
      // setLive(true)
    }
    setSearch(false)
  },[tripDetail])
  
  return (
    <>
      <UserNavbar />  
      <div className="flex  w-screen gap-3">
        <SearchLocation isSearch={isSearch} setSearch={setSearch}/>
        <Maps /> 
         
      </div>
    </>
  );
}

export default RidePage;
