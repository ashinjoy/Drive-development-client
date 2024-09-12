import React, { useState } from "react";
import UserNavbar from "../../../Components/Navbar/UserNavbar";
import SearchLocation from "../../../Components/User/SearchLocations/SearchLocation";
import Maps from "../../../Components/User/Maps/Maps";



function RidePage() {
  return (
    <>
      <UserNavbar />  
      <div className="flex  w-screen h-[100vh] gap-3">
        <SearchLocation />
        <Maps /> 
         
      </div>
    </>
  );
}

export default RidePage;
