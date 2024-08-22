import React, {  createContext,useState } from 'react'
export const driverLiveLocation = createContext(null)


function DriverLocation({children}) {

    const [driverLive,setDriverLive] = useState([])



 

  return (
    <driverLiveLocation.Provider value ={{driverLive,setDriverLive}}>
       { children}
    </driverLiveLocation.Provider>
  )
}

export default DriverLocation