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
      
      {/* <div className="flex justify-between items-center min-h-[50vh] bg-white ml-10 pt-[8rem]">
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
      </div> */}
      {/* <div className="flex flex-col h-[40rem] min-w-full"> */}
      {/* <div className="flex justify-center items-center min-h-[70%]"> 
  <div class="bg-white shadow-lg rounded-lg p-6 max-w-full  flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
    
   
    <div class="w-full md:w-1/2">
      <img src="https://via.placeholder.com/400x300" alt="Uber Illustration" class="rounded-lg shadow-lg"/>
    </div>
    
    
    <div class="w-full md:w-1/2 text-center md:text-left space-y-4">
      <h1 class="text-3xl font-bold text-gray-900">Drive when you want, make what you need</h1>
      <p class="text-gray-600">Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through Uber.</p>
      
      <div class="flex justify-center md:justify-start space-x-4">
        <a href="#" class="bg-black text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-gray-800">Get started</a>
        <a href="#" class="text-gray-500 underline">Already have an account? Sign in</a>
      </div>
    </div>

  </div>
       
        </div> */}

<div class="bg-gray-50 flex flex-col min-h-screen">
  
  
  <section class="relative bg-gradient-to-r from-blue-600 to-blue-400 text-white min-h-[70vh] flex justify-center items-center">
    <div class="absolute inset-0 bg-black opacity-40"></div>

    <div class="relative z-10 max-w-5xl text-center px-4 sm:px-0">
      <h1 class="text-5xl font-bold tracking-wide mb-4">Your Ride, Your Way</h1>
      <p class="text-xl mb-8">Fast, reliable, and affordable rides at your fingertips. Choose the ride that fits your needs and budget.</p>
      <button class="bg-[#FEB71B] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#FFA500] transition duration-300 ease-in-out">
        Book Your Ride Now
      </button>
    </div>

   
    <div class="absolute bottom-0 right-0 w-[50vw] h-[50vh] border-b-[60vh] border-b-[#FEB71B] border-l-[50vw] border-l-transparent"></div>
    <motion.div
      initial={{ x: 1000 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.9 }}
      class="relative z-10 mr-[5rem] hidden lg:block">
      <img
        src="/assets/Bike-Taxi-App-Bike-Taxi-Kolkata-Bike-Taxi-Number-Bike-Taxi-BroomBoom-1.webp"
        alt="Ride Service Illustration"
        class="w-[35vw] mt-[4rem]"/>
    </motion.div>
  </section>

  
  <section class="flex flex-col md:flex-row justify-between items-center min-h-[50vh] bg-white p-6 mt-10">
    
    <div class="w-full md:w-1/2 space-y-6">
      <h1 class="text-4xl font-bold tracking-wide">Always There to Take You <span class="text-[#FEB71B]">Anywhere</span></h1>
      <h3 class="text-lg mt-4 tracking-wide">Choose the ride according to your price range.</h3>
      
      
      <div class="flex flex-col gap-4">
        
        <div class="flex border-2 h-12 border-gray-400 rounded-lg">
          <div class="w-1/6 flex justify-center items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17.657 16.657A8 8 0 106.343 5.343a8 8 0 0011.314 11.314z"></path>
              <path d="M12 8v4l3 3"></path>
            </svg>
          </div>
          <input type="text" placeholder="Enter Pickup Location" class="border-none outline-none w-full px-3"/>
        </div>
        
       
        <div class="flex border-2 h-12 border-gray-400 rounded-lg">
          <div class="w-1/6 flex justify-center items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17.657 16.657A8 8 0 106.343 5.343a8 8 0 0011.314 11.314z"></path>
              <path d="M12 8v4l3 3"></path>
            </svg>
          </div>
          <input type="text" placeholder="Enter Dropoff Location" class="border-none outline-none w-full px-3"/>
        </div>
      </div>
      
      <button class="bg-[#FEB71B] text-black px-6 py-2 font-bold rounded hover:bg-[#FFA500] transition duration-300 ease-in-out mt-4">See Prices</button>
    </div>

  
    <div class="hidden md:block relative">
      <img src="/assets/infographics1.webp" alt="Ride Illustration" class="rounded-lg shadow-lg mt-6 w-[35vw]"/>
    </div>
  </section>

 
  <section class="bg-blue-600 text-white py-8">
    <div class="container mx-auto text-center">
      <h2 class="text-4xl font-bold mb-4">Welcome to Drive ! Enjoy Your Ride</h2>
      <p class="text-lg mb-6">Sign up today and enjoy  on your first ride. Fast, easy, and affordable rides are just a click away.</p>
      <button class="bg-[#FEB71B] text-black px-8 py-3 rounded-lg font-bold hover:bg-[#FFA500] transition duration-300 ease-in-out">Sign Up Now</button>
    </div>
  </section>

</div>




    </>
  );
}

export default Home;
