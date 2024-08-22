import React, { useContext, useEffect, useState } from 'react'
import { FaLocationArrow } from "react-icons/fa6";
import { useDispatch, useSelector, } from 'react-redux';
// import {userCurrentLocation} from '../../../Features/User/userActions'
import SuggesstionBox from '../SuggestionBox/SuggesstionBox';
import { UserPrivate } from '../../../Utils/Axios/userInterceptor';
import { Geocoder } from '@mapbox/search-js-react';
import { seacrhNearByDriver } from '../../../Features/Trip/tripActions';
import { searchLocationContext } from '../../../Context/UserSearchContext';
// import { requestRideAction } from '../../../Features/Trip/tripActions';
import ListVehiclePriceDetails from '../Trip/ListVehiclePriceDetails';



function SearchLocation({isSearch,setSearch}) {
  

// const {selectDropOffLocation,pickUpCoords,dropCoords} = useContext(searchLocationContext)
//   const [dropoffCoords,SetDropCoordinates] = useState(null)
//   const [isPickUpSuggestion,setPickupSuggestion] = useState(false)
//   const [pickupLocation,setPickupLocation] =useState('')
//   const [dropLocation,setDropLocation] = useState('')
//   const [suggestions,setSuggestions] = useState([])
//   const {user}= useSelector(state=>state.user)
//   const {nearbyDrivers,additionalSearchMetaData} = useSelector(state=>state.trip)
//   const dispatch = useDispatch()
//   const handlePickUpLocation = async(e)=>{
//     const {value} = e.target
//     setPickupLocation(value)
//    const response =  await UserPrivate.get(`trip/users/pickup-location-autocomplete?search=${value}`)
//    const data = response.data
//    setSuggestions(data?.searchResults)
//    console.log('respinse',data); 
//   }

//  const handleDropoffLocation = (evt)=>{
// setDropLocation(evt)

//  }

//  const handelResult =(result)=>{
// console.log('result',result);
// // setDropCoords(result?.geometry?.coordinates)
// selectDropOffLocation(result?.geometry?.coordinates)
//  }

//   useEffect(()=>{
// console.log('pickupLocation',pickupLocation);

//   },[pickupLocation])

  


//   const handleSearchRide =(event)=>{
//     event.preventDefault()
//     console.log('usercoordinates',user?.id,pickUpCoords);
//     const formData = {
//       userId:user?.id,
//       pickupLocation:pickUpCoords,
//       dropoffLocation:dropCoords
//     }
//     dispatch(seacrhNearByDriver(formData))
//   }

//   useEffect(()=>{
//     if(additionalSearchMetaData){
//       setSearch(true)
//     }
    
//   },[additionalSearchMetaData])

 // Extracting values from the context
 const { selectDropOffLocation, pickUpCoords, dropCoords } = useContext(searchLocationContext);
  
 // State to manage drop-off coordinates
 const [dropoffCoords, setDropCoordinates] = useState(null);

 // State to manage suggestions for pickup location
 const [isPickUpSuggestion, setPickupSuggestion] = useState(false);

 // State to hold user input for pickup and drop-off locations
 const [pickupLocation, setPickupLocation] = useState('');
 const [dropLocation, setDropLocation] = useState('');

 // State to store autocomplete suggestions
 const [suggestions, setSuggestions] = useState([]);

 // Redux selectors to get user, nearby drivers, and additional search metadata from the store
 const { user } = useSelector(state => state.user);
 const { nearbyDrivers, additionalSearchMetaData } = useSelector(state => state.trip);

 // Redux dispatch function
 const dispatch = useDispatch();

 // Handle user input for pickup location and fetch suggestions from the server
 const handlePickUpLocation = async (e) => {
   const { value } = e.target;
   setPickupLocation(value);
   
   // Fetch autocomplete suggestions for the pickup location
   try {
     const response = await UserPrivate.get(`trip/users/pickup-location-autocomplete?search=${value}`);
     const data = response.data;
     setSuggestions(data?.searchResults);
     console.log('response', data);
   } catch (error) {
     console.error('Error fetching pickup location suggestions:', error);
   }
 };

 // Handle user input for drop-off location
 const handleDropoffLocation = (evt) => {
   setDropLocation(evt);
 };

 // Handle the selection of an autocomplete result for drop-off location
 const handleResult = (result) => {
   console.log('result', result);
   selectDropOffLocation(result?.geometry?.coordinates);
 };


 // Handle the search for nearby drivers based on user coordinates and selected locations
 const handleSearchRide = (event) => {
   event.preventDefault();
   console.log('usercoordinates', user?.id, pickUpCoords);

   // Prepare form data for searching nearby drivers
   const formData = {
     userId: user?.id,
     pickupLocation: pickUpCoords,
     dropoffLocation: dropCoords,
   };
   
   // Dispatch the action to search for nearby drivers
   dispatch(seacrhNearByDriver(formData));
 };

 // Effect to monitor changes in additional search metadata and set the search state accordingly
 useEffect(() => {
   if (additionalSearchMetaData) {
     setSearch(true);
   }else{
    console.log('mo metdata')
   }
 }, [additionalSearchMetaData, setSearch]);

  
 
 
  return (
    <>
    <div className="flex w-[40%]">
    <div className='mt-[8rem] ml-[2rem]  '>
      <div className='w-[100%] h-auto p-8  shadow-xl border-2 border-slate-300 rounded-lg bg-white flex flex-col gap-7'>
        <h1 className='font-medium text-xl text-gray-700'>Start The Ride</h1>
        <form action="" onSubmit={handleSearchRide}>
        <div className="flex flex-col w-full max-w-md mx-auto relative">
          <label htmlFor="pickup" className="text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
          <div className='flex items-center border-2 border-gray-300 rounded-md overflow-hidden focus-within:border-blue-500 transition duration-200'>
            <input
              type="text"
              id="pickup"
              placeholder="Enter pickup location"
              className='w-full h-12 px-4 text-gray-700 outline-none flex-1'
              onFocus={()=>setPickupSuggestion(true)}
              value={pickupLocation}
              onChange={handlePickUpLocation}
            />
            <button className='h-12 w-12 text-black flex items-center justify-center transition duration-200'>
              <FaLocationArrow />
            </button>
          </div>
         
          {isPickUpSuggestion && <SuggesstionBox suggestions={suggestions} setPickupLocation={setPickupLocation} setSuggestions={setSuggestions} setPickupSuggestion={setPickupSuggestion} />}
        </div>
        <div className="flex flex-col relative mt-3">
          <label htmlFor="dropoff" className="text-sm font-medium text-gray-600 mb-2">Dropoff Location</label>
          <Geocoder
          value={dropLocation}
          placeholder='Dropoff Location'
          onRetrieve={handleResult}
          onChange={handleDropoffLocation}
          accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          />
          {/* {isDropSuggestion && <SuggesstionBox/>} */}
        </div>
        {/* <div className="flex flex-col">
          <label htmlFor="date" className="text-sm font-medium text-gray-600 mb-2">Date</label>
          <input
            type="date"
            id="date"
            className='w-full h-12 px-4 outline-none border-2 border-gray-300 rounded-md focus:border-blue-500 focus:shadow-md transition duration-200'
          />
        </div> */}
        <button
          type="submit"
          className='w-full h-12 bg-yellow-400 mt-4 text-white font-semibold rounded-md hover:bg-yellow-500 focus:bg-yellow-600 transition duration-200'
        >
          Search Ride
        </button>
        </form>
      </div>
    </div>
    </div>
   {isSearch && <ListVehiclePriceDetails pickUpCoords={pickUpCoords} dropCoords={dropCoords} pickupLocation={pickupLocation} dropLocation={dropLocation}/>}
    </>
  )
}

export default SearchLocation