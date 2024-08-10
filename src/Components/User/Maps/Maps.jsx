import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import "mapbox-gl/dist/mapbox-gl.css"
import MapboxGeocoding from "@mapbox/mapbox-sdk/services/geocoding"


function Maps() {
const mapContainerRef = useRef(null)
const [mapStyle,setMapStyle] = useState('mapbox://styles/mapbox/streets-v12')
const geoCodingClient = MapboxGeocoding({
    accessToken:process.env.REACT_APP_MAPBOX_TOKEN
})
useEffect(()=>{
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
const map = new mapboxgl.Map({
    container:mapContainerRef.current,
    style:mapStyle,
    center: [76.323204, 9.936811],
    zoom:13,
    attributionControl: false
})
},[])



  return (
    <>
    <div className='mt-[7rem] h-1/2 w-1/2' ref={mapContainerRef}></div>
    </>
  )
}

export default Maps