import React, { useRef } from "react";

import { MdOnlinePrediction } from "react-icons/md";
import UserNavbar from "../../../Components/Navbar/UserNavbar";
import Map from "../../../Components/Driver/Trips/DriverMap";
import { useDispatch, useSelector } from "react-redux";
import { driverOnlineAction } from "../../../Features/Location/locationActions";
import DriverNavBar from "../../../Components/Navbar/DriverNavBar";

function Trip() {
  const mapContainerRef = useRef(null);
  const { driver } = useSelector((state) => state.driver);
  const dispatch = useDispatch();

  const handleOnline = () => {
    let location;
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (pos) => {
    //       const data = {
    //         location: pos.coords,
    //         driverId: driver?.id,
    //       };
    //       dispatch(driverOnlineAction(data));
    //     },
    //     (err) => {
    //       console.error(err);
    //     },
    //     { enableHighAccuracy: true, maximumAge: 0 }
    //   );
    // }
  };

  return (
    <>
    <div className="flex gap-1">
      <DriverNavBar/>
         <Map />
 </div>
    </>
  );
}

export default Trip;
