import React, { useContext, useEffect, useRef, useState } from "react";
// import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, Source, Layer } from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as turf from "@turf/turf";

import { driverLiveLocation } from "../../../Context/DriverLocation";
import {
  driverActive,
  driverInctive,
} from "../../../Features/Driver/driverActions";
import { startTrip, finishRide } from "../../../Features/Trip/tripActions";
import { useSocket } from "../../../Hooks/socket";
import { toast } from "react-toastify";
import DriverNearByPickup from "../Notifications/DriverNearByPickup";
import { AnimatePresence } from "framer-motion";
import DriverNearByDropOff from "../Notifications/DriverNearByDropOff";
import Chat from "../../Chat/Chat";
import RideStartConfirmationModal from "../Modal/RideStartConfirmationModal";

function DriverMap() {
  const mapContainerRef = useRef(null);
  const [recieverId,setRecieverId] = useState(null)
  const [senderId,setSenderId] = useState(null)
  const { token, driver, currentStatus } = useSelector((state) => state.driver);
  const { tripDetail, message } = useSelector((state) => state.trip);
  const { driverLive,setTripCoordintes} = useContext(driverLiveLocation);
  const dispatch = useDispatch();

  const [openChat,setOpenChat] = useState(false) 

  const [pickup, setPickUp] = useState([]);
  const [dropOff, setDropoff] = useState([]);
  const [driverCoords, setDriverCoords] = useState([]);
  const [viewState, setViewState] = useState({});
  const [route, setRoute] = useState(null);
  const [startRide, setStartRide] = useState(false);
  const [rideStarted,setRideStarted] = useState(false)
  const [endRide, setEndRide] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [tripOtp, setOtp] = useState("");

  const {socket} = useSocket();
  useEffect(() => {
    if (!tripDetail) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          setViewState({
            longitude: pos?.coords?.longitude,
            latitude: pos?.coords?.latitude,
            zoom: 13,
          });
        });
      }
    }
  }, []);

  useEffect(()=>{
if(tripDetail){
  setRecieverId(tripDetail?.userId)
  setSenderId(tripDetail?.driverId?._id)
}
  },[tripDetail])

  useEffect(() => {
    if (tripDetail) {
      setPickUp(tripDetail?.startLocation?.coordinates);
      setDropoff(tripDetail?.endLocation?.coordinates);
      setDriverCoords(tripDetail?.driverId?.currentLocation?.coordinates);
      const getRoute = async () => {
        const response = await axios.get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${tripDetail?.driverId?.currentLocation?.coordinates[0]},${tripDetail?.driverId?.currentLocation?.coordinates[1]};${tripDetail?.startLocation?.coordinates[0]},${tripDetail?.startLocation?.coordinates[1]};${tripDetail?.endLocation?.coordinates[0]},${tripDetail?.endLocation?.coordinates[1]}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
        );
        console.log(
          "Coordintaes For Testing Purpose of Live Location ===>",
          response.data
        );
        const routeInfo = response.data;
        setRoute(routeInfo?.routes[0]?.geometry);
        setTripCoordintes(routeInfo?.routes[0]?.geometry?.coordinates)
      };
      const bounds = [
        [
          Math.min(
            tripDetail?.startLocation?.coordinates[0],
            tripDetail?.endLocation?.coordinates[0],
            tripDetail?.driverId?.currentLocation?.coordinates[0]
          ),
          Math.min(
            tripDetail?.startLocation?.coordinates[1],
            tripDetail?.endLocation?.coordinates[1],
            tripDetail?.driverId?.currentLocation?.coordinates[1]
          ),
        ],
        [
          Math.max(
            tripDetail?.startLocation?.coordinates[0],
            tripDetail?.endLocation?.coordinates[0],
            tripDetail?.driverId?.currentLocation?.coordinates[0]
          ),
          Math.max(
            tripDetail?.startLocation?.coordinates[1],
            tripDetail?.endLocation?.coordinates[1],
            tripDetail?.driverId?.currentLocation?.coordinates[1]
          ),
        ],
      ];

      if (mapContainerRef.current) {
        mapContainerRef.current.fitBounds(bounds, {
          padding: 20,
        });
      }
      getRoute();
    }
  }, [tripDetail]);

useEffect(() => {
  if (!driverLive || !tripDetail) return;
  console.log("driverLive in useEffect",driverLive);
  
  setDriverCoords(driverLive);
  const approx = checkApproxDistance(driverLive, pickup);
  const dropDestination = checkApproxDistance(driverLive, dropOff);
  
  // console.log('approx', approx);
  console.log('dropDestination', dropDestination);

  // if (approx < 2 && approx > 1) {
  //   console.log('nearBy Aprrox');
  //   setNearByPickup(true);
  //   setStartRide(false);
  //   setEndRide(false);
  //   socket?.emit("driver-NearBy-pickup", {
  //     userId: tripDetail?.userId,
  //     distance: approx,
  //   });
  // } 
   if (approx <= 0.5) { 
    if(!rideStarted){
      setStartRide(true);
    // setEndRide(false);
    setRideStarted(true)
    socket.emit("ride-started", {
      userId: tripDetail?.userId,
      duration: tripDetail?.duration,
    })

    }
    ;
  }
  //  else if (dropDestination < 2 && dropDestination > 1) {
  //   console.log('nearby dropOff');
  //   setNearByDropOff(true);
  //   setStartRide(false);
  //   setEndRide(false);
  //   socket.emit("nearby-dropoff", {
  //     userId: tripDetail?.userId,
  //     distance: dropDestination,
  //   });
  // } 
  
  else if (dropDestination < 0.1 ) {
    // console.log('dropoff');
    completeJourney()
    // setEndRide(true);
    // setStartRide(false);
    // socket.emit("ride-complete", {
    //   userId: tripDetail?.userId,
    //   distance: dropDestination,
    // });
  }
   else {
    setEndRide(false);
    setStartRide(false);
  }
}, [socket, driverLive, tripDetail]);
useEffect(()=>{
console.log('drivreLive',driverLive);

},[driverLive])

  const checkApproxDistance = (driverLocation, destination) => {
    if (
      driverLocation &&
      driverLocation.length > 0 &&
      destination &&
      destination.length > 0
    ) {
      const approx = turf.distance(driverLocation, destination, {
        units: "kilometers",
      });
      return approx;
    }
  };

  const routeLine = {
    id: "route",
    type: "line",
    source: "route",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#3887be",
      "line-width": 5,
      "line-opacity": 0.75,
    },
  };

  const handleDriverActive = () => {
    let currentLocation;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coordinates = [pos?.coords?.longitude, pos?.coords?.latitude];
        currentLocation = coordinates;
        dispatch(driverActive({ driverId: driver?.id, currentLocation }));
      });
    } else {
      console.log("handle this case when location is not kitiyillrnkil");
    }
  };

  const handleDriverInactive = () => {
    dispatch(driverInctive(driver?.id));
  };

  const verifyRide = () => {
    setStartRide(false);
    setShowOtp(true);
  };


  const completeJourney = () => {
    dispatch(
      finishRide({ userId: tripDetail?.userId, tripId: tripDetail?._id })
    );
  };

  useEffect(() => {

    if (message == "Ride Completed SuccessFully") {
      setEndRide(true)
    }
  }, [socket, message, tripDetail]);

  return (
    
    <div className="flex w-full h-screen">
     {showOtp && <RideStartConfirmationModal setShowOtp={setShowOtp} setStartRide={setStartRide} />}
      <div className="flex flex-col w-[24rem] p-4 items-center justify-around  ">
        <div className="w-full bg-white rounded-lg p-4 flex flex-col items-center justify-between h-[20%] shadow-md relative">
          <h1 className="text-2xl font-bold text-gray-800">Driver Status</h1>
          {currentStatus?.currentStatus == "inactive" ? (
            <button
              className="absolute bottom-10 right-20 z-50 rounded-full w-28 h-14 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-xl font-bold shadow-lg flex items-center justify-center transition-transform duration-200 transform hover:scale-105 active:scale-95 "
              onClick={() => {
                handleDriverActive();
              }}
            >
              Go Online
            </button>
          ) : (
            <button
            className="absolute bottom-10 right-20 z-50 rounded-full w-28 h-14 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-xl font-bold shadow-lg flex items-center justify-center transition-transform duration-200 transform hover:scale-105 active:scale-95 "
            onClick={() => {
              handleDriverInactive();
            }}
          >
            Go Offline
          </button>
          )}
          <p className="text-lg text-gray-600">
            You are currently {!currentStatus?.currentStatus ? "Active" : currentStatus?.currentStatus == "active" ? "Active"  : "InActive" }
            <span className="font-semibold">
              {/* {currentStatus?.currentStatus == "active" ? "Online" : "Offline"} */}
            </span>
          </p>
        </div>

        <div className="w-full bg-white rounded-lg p-4 flex flex-col items-center justify-between h-[24%] shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Ride Controls</h2>
         {tripDetail && <button onClick={()=>setOpenChat(true)}>Chat</button>}
          {/* <p className="text-gray-600">No active ride</p> */}

          <div className="flex w-full justify-around mt-4">
            {startRide &&
              <button
                className="w-32 h-12 bg-green-600 text-white rounded-md font-bold shadow-md hover:bg-green-700 transition-colors duration-200"
                onClick={() => verifyRide()}
              >
                Start Ride
              </button>
            }
            
          </div>
        </div>

        <div className="w-full bg-white rounded-lg p-4 flex flex-col items-center justify-between h-[40%] shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">
            Driver Information
          </h2>
          <div className="w-full flex justify-between mt-4">
            <div className="text-left">
              <p className="text-gray-600">Name: {driver?.name}</p>
              <p className="text-gray-600">Earnings: {driver?.walletBalance}</p>
              <p className="text-gray-600">Rating: 4.8 ⭐</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">Trips: 34</p>
              {/* <p className="text-gray-600">Online: 3h 20m</p> */}
            </div>
          </div>
        </div>
      </div>

      <div className=" ml-5 w-[95%] h-full">
        {openChat && <Chat driver={driver} recieverId={recieverId} senderId={senderId} setOpenChat={setOpenChat}/>}
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          ref={mapContainerRef}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          style={{ width: "95%", height: "95%", marginTop: "1rem" }}
          attributionControl={false}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        >
          {pickup.length > 0 && (
            <Marker
              longitude={pickup[0]}
              latitude={pickup[1]}
              style={{ width: "2rem" }}
            >
              <img src="/assets/pickup_marker.png" alt="Pickup Marker" />
            </Marker>
          )}
          {dropOff.length > 0 && (
            <Marker
              longitude={dropOff[0]}
              latitude={dropOff[1]}
              style={{ width: "2rem" }}
            >
              <img src="/assets/dest_marker.png" alt="Dropoff Marker" />
            </Marker>
          )}
          {driverCoords.length > 0 && (
            <Marker
              longitude={driverCoords[0]}
              latitude={driverCoords[1]}
              style={{ width: "2.5rem" }}
            >
              <img src="/assets/wifi-tracking.png" alt="Driver Marker" />
            </Marker>
          )}
          {route && (
            <Source id="route" type="geojson" data={route}>
              <Layer {...routeLine} />
            </Source>
          )}
        </Map>
      </div>
          <AnimatePresence mode="wait">
            
             
           { endRide &&
          <DriverNearByDropOff setEndRide={setEndRide}/>
            }

          </AnimatePresence>
    </div>
  );
}

export default DriverMap;
