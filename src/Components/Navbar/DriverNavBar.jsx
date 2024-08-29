import React, { useContext, useEffect, useState } from "react";
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
 
  const { setDriverLive,enableChat,setEnableChat } = useContext(driverLiveLocation);


  const { token, driver } = useSelector((state) => state.driver);
  const { tripDetail } = useSelector((state) => state.trip);
  const {socket,chatSocket} = useSocket();
  useEffect(() => {
    let timeOut;
    const handleRideRequest =()=>{
      
    }
    if (token && driver) {
      socket?.on("ride-request", (tripData) => {
        setTrip(tripData);
        setOpenNotification(true);
        console.log("chatSocket",chatSocket);
        chatSocket?.emit("driver-chat-connect",{driverId:driver?.id})
        setEnableChat(true)
        timeOut = setTimeout(() => {
          setOpenNotification(false);
        }, 13000);
      });
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [socket,chatSocket]);

  useEffect(() => {
    if (token && driver && tripDetail) {
      if (navigator.geolocation) {
        navigator.geolocation?.watchPosition(
          (pos) => {
            const drivercooordinates = [
              pos?.coords?.longitude,
              pos?.coords?.latitude,
            ];

            setDriverLive(drivercooordinates);
            socket?.emit("location-update", {
              pos,
              userId: tripDetail?.userId,
            });
          },
          (err) => {
            console.error(err);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
          }
        );
      }
    }
  }, [socket, tripDetail]);

  return (
    <>
      <nav className="flex flex-col min-h-screen gap-11 items-center  max-w-[12rem] bg-white border border-gray-300 bg-gradient-to-t from-yellow-50 to-white text-black rounded-md shadow-xl p-3">
        <div>
          <img src="/assets/logo-cl.png" alt="logo" />
        </div>
        <NavLink className={"flex gap-2 text-lg font-bold"}>
          <IoHome className="mt-1" />
          Home
        </NavLink>
        <NavLink className={"flex gap-2 text-lg font-bold"}>
          <MdSpaceDashboard className="mt-1" />
          DashBoard
        </NavLink>
        <NavLink className={"flex gap-2 text-lg font-bold"} to="/driver/trip">
          <GiJourney className="mt-1" />
          Trip
        </NavLink>
        <NavLink className={"flex gap-2 text-lg font-bold"}>
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
