import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { GiJourney } from "react-icons/gi";
import { FaWallet } from "react-icons/fa6";
import { IoIosChatbubbles } from "react-icons/io";
import { MdPayments } from "react-icons/md";

import { useSocket } from "../../Hooks/socket";

import RideRequestNotifications from "../Driver/Notifications/RideRequestNotifications";
import { AnimatePresence } from "framer-motion";
import { driverLiveLocation } from "../../Context/DriverLocation";

// import { logoutAction } from '../../Features/Driver/driverActions';
function DriverNavBar() {
  const [openNotification, setOpenNotification] = useState(false);
  const [trip, setTrip] = useState(null);
  const notificationDuration = useRef(null);
  const liveIntervalRef = useRef(null)

  const { setDriverLive, driverLive,tripCoordinates, enableChat, setEnableChat } =
    useContext(driverLiveLocation);

  const { token, driver } = useSelector((state) => state.driver);
  const { tripDetail } = useSelector((state) => state.trip);
  const { socket, chatSocket } = useSocket();
  useEffect(() => {
    // let timeOut

    const handleRideRequest = (tripData) => {
      setTrip(tripData);
      setOpenNotification(true);
      // console.log("chatSocket",chatSocket);
      chatSocket?.emit("driver-chat-connect", { driverId: driver?.id });
      setEnableChat(true);
      notificationDuration.current = setTimeout(() => {
        setOpenNotification(false);
      }, 13000);
    };
    if (token && driver) {
      socket?.emit("driver-connected", driver.id);
      socket?.on("ride-request", (tripData) => {
        handleRideRequest(tripData);
      });
    }
    return () => {
      clearTimeout(notificationDuration.current);
      socket?.off("ride-request");
    };
  }, [socket, chatSocket]);

  useEffect(() => {
    // if (token && driver && tripDetail) {
    //   if (navigator.geolocation) {
    //     navigator.geolocation?.watchPosition(
    //       (pos) => {
    //         const drivercooordinates = [
    //           pos?.coords?.longitude,
    //           pos?.coords?.latitude,
    //         ];

    //         setDriverLive(drivercooordinates);
    //         socket?.emit("location-update", {
    //           pos,
    //           userId: tripDetail?.userId,
    //         });
    //       },
    //       (err) => {
    //         console.error(err);
    //       },
    //       {
    //         enableHighAccuracy: false,
    //         maximumAge: 0,
    //       }
    //     );
    //   }
    // }
    if(!token || !driver || !tripDetail){
      return
    }
    // console.log("driverLives============>",driverLive);
    // for(const liveLocation of tripCoordinates){
    console.log("reacgedced");
    
    let i = 0
      liveIntervalRef.current =   setInterval(()=>{
      if(i < tripCoordinates.length){
        console.log("tripcoord",tripCoordinates);
        
    setDriverLive(tripCoordinates[i])
       socket?.emit("location-update", {
                   liveLocation:tripCoordinates[i],
                   userId: tripDetail?.userId,
                })
    i++

      }else{
        clearInterval(liveIntervalRef.current)
      }

      },5000)
      return ()=>{
        clearInterval(liveIntervalRef.current)
      }
      
    } ,[socket, tripDetail,tripCoordinates]);

  return (
    <>
      <nav className="flex flex-col min-h-screen gap-11 items-center  max-w-[12rem]  bg-white border border-gray-300 bg-gradient-to-t from-yellow-50 to-white text-black rounded-md shadow-xl p-3">
        <div>
          <img src="/assets/logo-cl.png" alt="logo" />
        </div>
        <NavLink className={"flex gap-2 text-lg font-bold"}>
          <MdSpaceDashboard className="mt-1" />
          DashBoard
        </NavLink>
        <NavLink className={"flex gap-2 text-lg font-bold"} to="/driver/trip">
          <GiJourney className="mt-1" />
          Trip
        </NavLink>
        <NavLink className={"flex gap-2 text-lg font-bold"} to="/driver/wallet">
          <FaWallet className="mt-1" />
          Wallet
        </NavLink>
        <NavLink className={"flex gap-2 text-lg font-bold"}>
          <MdPayments className="mt-1" />
          Payments
        </NavLink>
        <NavLink
          className={"flex gap-2 text-lg font-bold"}
          to="/driver/profile"
        >
          <MdPayments className="mt-1" />
          Profile
        </NavLink>
      </nav>
      <AnimatePresence mode="wait">
        {openNotification && (
          <RideRequestNotifications
            trip={trip}
            setOpenNotification={setOpenNotification}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default DriverNavBar;
