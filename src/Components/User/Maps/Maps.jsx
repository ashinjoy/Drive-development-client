import React, { useContext, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import Map, { Marker, Source, Layer } from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import { searchLocationContext } from "../../../Context/UserSearchContext";
import axios from "axios";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function Maps() {
  //context for pickupLocation-coordinates and dropOff Location Coordinates
  // const { pickUpCoords, dropCoords } = useContext(searchLocationContext);

  // const [pickupLongitude, setPickUpLng] = useState(null);
  // const [pickupLatitude, setPickUpLat] = useState(null);

  // const [dropoffLongitude, setdropOffLng] = useState(null);
  // const [dropoffLatitude, setdropOffLat] = useState(null);

  // const [route, setRoute] = useState(null);

  // //Get the Nearby-Drivers
  // const { nearbyDrivers } = useSelector((state) => state.trip);
  // // const {user} = useSelector(state=>state.user)
  // // console.log('nearBy',nearbyDrivers);

  // const [nearByDriverLocation, setNearByDriverLocation] = useState(null);

  // // const dispatch = useDispatch()

  // const [viewState, setViewState] = useState({});

  // const mapRef = useRef(null);

  // useEffect(() => {
  //   let isMount = true;
  //   if (nearbyDrivers && nearbyDrivers.length > 0) {
  //     const nearByDriversCoordinates = nearbyDrivers.map((driver) => {
  //       if (driver?.vehicleDetails?.vehicle_type == "Bike") {
  //         return {
  //           type: "Bike",
  //           coordinates: driver?.currentLocation?.coordinates,
  //         };
  //       } else if (driver?.vehicleDetails?.vehicle_type == "Auto") {
  //         return {
  //           type: "Auto",
  //           coordinates: driver?.currentLocation?.coordinates,
  //         };
  //       }
  //       return driver?.currentLocation?.coordinates;
  //     });

  //     setNearByDriverLocation(nearByDriversCoordinates);
  //   }
  // }, [nearbyDrivers]);

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (pos) => {
  //         console.log("onload", pos.coords);
  //         setViewState({
  //           latitude: pos.coords.latitude,
  //           longitude: pos.coords.longitude,
  //           zoom: 12,
  //         });
  //       },
  //       (err) => {
  //         console.error(err);
  //       },
  //       {
  //         enableHighAccuracy: true,
  //         maximumAge: 0,
  //       }
  //     );
  //   }
  // }, []);

  // useEffect(() => {
  //   let isMount = true;
  //   if (pickUpCoords.length > 0) {
  //     setPickUpLng(pickUpCoords[0]);
  //     setPickUpLat(pickUpCoords[1]);

  //     setViewState((prev) => ({
  //       ...prev,
  //       longitude: pickUpCoords[0],
  //       latitude: pickUpCoords[1],
  //     }));
  //   }

  //   if (dropCoords.length > 0) {
  //     setdropOffLng(dropCoords[0]);
  //     setdropOffLat(dropCoords[1]);
  //   }

  //   if (pickUpCoords.length > 0 && dropCoords.length > 0) {
  //     const getRoute = async () => {
  //       const response = await axios.get(
  //         `https://api.mapbox.com/directions/v5/mapbox/driving/${pickUpCoords[0]},${pickUpCoords[1]};${dropCoords[0]},${dropCoords[1]}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
  //       );
  //       console.log("routegeojson", response.data);
  //       setRoute(response.data?.routes[0]?.geometry);
  //     };
  //     const bounds = [
  //       [
  //         Math.min(pickUpCoords[0], dropCoords[0]),
  //         Math.min(pickUpCoords[1], dropCoords[1]),
  //       ], // Southwest coordinates
  //       [
  //         Math.max(pickUpCoords[0], dropCoords[0]),
  //         Math.max(pickUpCoords[1], dropCoords[1]),
  //       ], // Northeast coordinates
  //     ];

  //     if (mapRef.current) {
  //       mapRef.current.fitBounds(bounds, {
  //         padding: 20, // Padding around the bounds
  //       });
  //     }
  //     getRoute();
  //   }
  // }, [
  //   pickUpCoords,
  //   dropCoords,
  //   pickupLongitude,
  //   pickupLatitude,
  //   dropoffLongitude,
  //   dropoffLatitude,
  // ]);

  // const routeLine = {
  //   id: "route",
  //   type: "line",
  //   source: "route",
  //   layout: {
  //     "line-join": "round",
  //     "line-cap": "round",
  //   },
  //   paint: {
  //     "line-color": "#3887be",
  //     "line-width": 5,
  //     "line-opacity": 0.75,
  //   },
  // };

    // Extract coordinates from the context
    const { pickUpCoords, dropCoords } = useContext(searchLocationContext);

    // State to manage pickup and drop-off coordinates
    const [pickupLongitude, setPickUpLng] = useState(null);
    const [pickupLatitude, setPickUpLat] = useState(null);
    const [dropoffLongitude, setDropOffLng] = useState(null);
    const [dropoffLatitude, setDropOffLat] = useState(null);
  
    // State to store the calculated route
    const [route, setRoute] = useState(null);
  
    // Retrieve nearby drivers from Redux store
    const { nearbyDrivers } = useSelector((state) => state.trip);
  
    // State to store nearby drivers' locations
    const [nearbyDriverLocations, setNearbyDriverLocations] = useState(null);
  
    // Map state to manage view and map reference
    const [viewState, setViewState] = useState({});
    const mapRef = useRef(null);
  
    // Effect to set nearby drivers' locations when they are available
    useEffect(() => {
      if (nearbyDrivers && nearbyDrivers.length > 0) {
        const driverCoordinates = nearbyDrivers.map((driver) => ({
          type: driver?.vehicleDetails?.vehicle_type,
          coordinates: driver?.currentLocation?.coordinates,
        }));
  
        setNearbyDriverLocations(driverCoordinates);
      }
    }, [nearbyDrivers]);
  
    // Effect to get the current user's location on component mount
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            console.log("User location on load", pos.coords);
            setViewState({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              zoom: 12,
            });
          },
          (err) => console.error(err),
          {
            enableHighAccuracy: true,
            maximumAge: 0,
          }
        );
      }
    }, []);
  
    // Effect to handle pickup and drop-off coordinates, calculate the route and fit map bounds
    useEffect(() => {
      // Ensure coordinates are valid before proceeding
      if (pickUpCoords.length > 0) {
        setPickUpLng(pickUpCoords[0]);
        setPickUpLat(pickUpCoords[1]);
  
        setViewState((prev) => ({
          ...prev,
          longitude: pickUpCoords[0],
          latitude: pickUpCoords[1],
        }));
      }
  
      if (dropCoords.length > 0) {
        setDropOffLng(dropCoords[0]);
        setDropOffLat(dropCoords[1]);
      }
  
      if (pickUpCoords.length > 0 && dropCoords.length > 0) {
        const getRoute = async () => {
          try {
            const response = await axios.get(
              `https://api.mapbox.com/directions/v5/mapbox/driving/${pickUpCoords[0]},${pickUpCoords[1]};${dropCoords[0]},${dropCoords[1]}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
            );
            console.log("Route GeoJSON", response.data);
            setRoute(response.data?.routes[0]?.geometry);
          } catch (error) {
            console.error("Failed to fetch the route", error);
          }
        };
  
        // Calculate the bounding box for the map to fit the route
        const bounds = [
          [
            Math.min(pickUpCoords[0], dropCoords[0]),
            Math.min(pickUpCoords[1], dropCoords[1]),
          ], // Southwest coordinates
          [
            Math.max(pickUpCoords[0], dropCoords[0]),
            Math.max(pickUpCoords[1], dropCoords[1]),
          ], // Northeast coordinates
        ];
  
        // Adjust the map to fit the calculated bounds
        if (mapRef.current) {
          mapRef.current.fitBounds(bounds, {
            padding: 20, // Padding around the bounds
          });
        }
  
        // Fetch the route
        getRoute();
      }
    }, [pickUpCoords, dropCoords]);
  
    // Define the route line properties for Mapbox
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

  return (
    <>
      <div className="w-[100%]">
        <Map
          ref={mapRef}
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          style={{
            marginTop: "8rem",
            width: "95%",
            height: 560,
            overflow: "hidden",
            marginRight: 12,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          attributionControl={false}
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        >
          {pickupLongitude && pickupLatitude && (
            <Marker
              longitude={pickupLongitude}
              latitude={pickupLatitude}
              style={{ width: "2rem" }}
            >
              <img src="/assets/pickup_marker.png" alt="Pickup Marker" />
            </Marker>
          )}
          {dropoffLongitude && dropoffLatitude && (
            <Marker
              longitude={dropoffLongitude}
              latitude={dropoffLatitude}
              style={{ width: "2rem" }}
            >
              <img src="/assets/dest_marker.png" alt="Dropoff Marker" />
            </Marker>
          )}
          {route && (
            <Source id="route" type="geojson" data={route}>
              <Layer {...routeLine} />
            </Source>
          )}
          {nearbyDriverLocations &&
            nearbyDriverLocations.length > 0 &&
            nearbyDriverLocations.map((driver, i) => {
              return (
                <Marker
                  key={i}
                  longitude={driver?.coordinates[0]}
                  latitude={driver?.coordinates[1]}
                  style={{ width: "5rem" }}
                >
                  {driver?.type == "Auto" ? (
                    <img
                      src="/assets/TukTuk_Green_v1.png"
                      alt="AutoDriver_Marker"
                    />
                  ) : (
                    <img
                      src="/assets/scooter-illustration-vintage-vehicle-sign-and-symbol-vector-removebg-preview.png"
                      alt="AutoDriver_Marker"
                    />
                  )}
                </Marker>
              );
            })}
        </Map>
      </div>
    </>
  );
}

export default Maps;
