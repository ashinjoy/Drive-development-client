import React, { useEffect, useState } from "react";
import { TfiLocationPin, TfiFlag } from "react-icons/tfi";
import { FaLocationArrow } from "react-icons/fa6";
import { motion } from "framer-motion";
import { reset } from "../../../Features/User/userSlice";
import { useDispatch } from "react-redux";
import { geoCodeService } from "../../../Features/User/userService";

function Home() {
  const dispatch = useDispatch();
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [showSuggestion,setShowSuggestion]  = useState(false)
  const [suggestions,setSuggestions] = useState([])

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      const success = async (position) => {
        const response = await geoCodeService(
          position?.coords?.longitude,
          position?.coords?.latitude
        );
        console.log(response.data);

        setPickupLocation(response.data.data);

        return position;
      };
      const error = (err) => {
        console.log("err", err);
      };
      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
        maximumAge: 0,
      });
    }
  };

  const handleDropOff = (e)=>{
setDropLocation(e.target.value)
  }

  const handleSuggestions = ()=>{
    showSuggestion(true)
  }

  useEffect(() => {
    dispatch(reset());
  }, []);

  return (
    <>
      
      <div className="flex justify-between items-center min-h-[50vh] bg-white ml-10 pt-[8rem]">
        <div className="sm:ml-10">
          <h1 className="text-4xl font-bold tracking-wide">Always There to</h1>
          <span className="text-4xl font-bold tracking-wide">Take You </span>
          <span className="text-4xl font-bold text-[#FEB71B]">Anywhere</span>
          <h3 className="mt-4 text-lg tracking-wide">
            Choose the Ride According to your Price Range
          </h3>

          <div className="flex flex-col gap-3 mt-6 ">
            <div className="flex border-2 h-12 border-black">
              <div className="w-1/6 flex justify-center items-center">
                <TfiLocationPin size={24} />
              </div>
              <input
                type="text"
                value={pickupLocation}
                placeholder="Please Enter Your Location"
                className="border-none outline-none  pl-2 w-[75%]"
                onChange={(e) => {
                  setPickupLocation(e.target.value);
                }}
                onFocus={handleSuggestions}
              />
              <button onClick={getCurrentLocation}>
                <FaLocationArrow size={20} />
              </button>
            </div>
            
            <div className="flex border-2 h-12 border-black items-center relative">
              <div className="w-1/6 flex justify-center items-center">
                <TfiFlag size={24} />
              </div>
              <input
                type="text"
                value={dropLocation}
                placeholder="Please Enter Your Destination"
                className="border-none outline-none flex-grow px-2"
                onChange={handleDropOff}
              />
            </div>
          </div>
          <button className="mt-6 px-6 py-2 bg-[#FEB71B] text-white font-bold rounded hover:bg-[#FFA500]">
            See Prices
          </button>
        </div>

        <div className="relative md:block hidden ">
          <div className="lg:block hidden absolute bottom-0 right-0 w-[50vw] h-[50vh] border-b-[60vh] border-b-[#FEB71B] border-l-[50vw] border-l-transparent "></div>
          <motion.div
            initial={{ x: 1000 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.9 }}
            className="w-[35vw] mr-[7rem] mb-[4rem]"
          >
            <img
              src="/assets/Bike-Taxi-App-Bike-Taxi-Kolkata-Bike-Taxi-Number-Bike-Taxi-BroomBoom-1.webp"
              alt="Bike Riders"
              className="relative z-10 w-[100%]"
            />
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Home;
