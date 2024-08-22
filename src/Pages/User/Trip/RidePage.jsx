import React, { useState, useRef, useEffect } from "react";
import UserNavbar from "../../../Components/Navbar/UserNavbar";
import SearchLocation from "../../../Components/User/SearchLocations/SearchLocation";
import Maps from "../../../Components/User/Maps/Maps";
import { useDispatch, useSelector } from "react-redux";
import LiveMapUpdates from "../../../Components/User/Maps/LiveMap";
// import { userCurrentLocation } from "../../../Features/User/userActions";

function RidePage() {
  const [pickUpCoords,setPickUpCoords] = useState([])
  const [dropCoords,setDropCoords] = useState([])
  const [isSearch,setSearch] = useState(false)
  const [live,setLive] = useState(false)
  const {tripDetail} = useSelector(state=>state.trip)
  useEffect(()=>{
    if(tripDetail){
      setSearch(false)
      setLive(true)
return
    }
  },[tripDetail])
  
  return (
    <>
      <UserNavbar />  
      <div className="flex  w-screen gap-3">
        <SearchLocation isSearch={isSearch} setSearch={setSearch}/>
        <Maps pickUpCoords={pickUpCoords} dropCoords={dropCoords}/>  
      </div>
    </>
  );
}

export default RidePage;
