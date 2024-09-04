import React, {  createContext,useState } from 'react'
export const driverLiveLocation = createContext(null)


function DriverLocation({children}) {

    const [driverLive,setDriverLive] = useState([])

    const [tripCoordinates,setTripCoordintes] =  useState([])

    const [enableChat,setEnableChat] = useState(false)
  return (
    <driverLiveLocation.Provider value ={{driverLive,setDriverLive,enableChat,setEnableChat,tripCoordinates,setTripCoordintes}}>
       { children}
    </driverLiveLocation.Provider>
  )
}

export default DriverLocation