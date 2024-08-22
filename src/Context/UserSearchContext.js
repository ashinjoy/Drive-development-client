import React, { createContext,useState} from 'react'
export  const searchLocationContext = createContext(null)

function UserSearchContext({children}) {
    const [pickUpCoords,setPickUpCoords] = useState([])
    const [dropCoords,setDropCoords] = useState([])

    const selectPickupLocation = (value)=>{
        setPickUpCoords(value)
    }
    const selectDropOffLocation = (value)=>{
        setDropCoords(value)
    }
    return (
    <searchLocationContext.Provider  value={{pickUpCoords,selectPickupLocation,dropCoords,selectDropOffLocation}}>
        {children}
    </searchLocationContext.Provider>
  )
}

export default UserSearchContext