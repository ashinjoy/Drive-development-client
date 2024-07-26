import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { BiUpload } from "react-icons/bi";
import { MdCancel } from "react-icons/md";

import UserNavbar from '../../../Components/Navbar/UserNavbar'

function DriverProfilePage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseImg, setLicenseImg] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [VehicleRC, setVehicleRC] = useState("");
  const [VehiclePermit, setVehiclePermit] = useState("");
  const [update, setUpdate] = useState(false);
  const profileImgRef = useRef(null);

  // const dispatch = useDispatch();

  const driverState = useSelector((state) => state.driver);
  const driverDetails = driverState?.driver;

  useEffect(() => {
    setName(driverDetails?.name);
    setEmail(driverDetails?.email);
    setPhone(driverDetails?.phone);
    setLicenseNumber(driverDetails?.licenseNumber);
    setVehicleType(driverDetails?.vehicleType);
    setVehicleRC(driverDetails?.rc_Number);
    setLicenseImg(driverDetails?.licenseUrl);
    setProfileImg(driverDetails?.profileUrl);
    setVehiclePermit(driverDetails?.permitUrl);
    console.log(driverDetails?.vehicleType);
  }, []);

  const handleImgUpdate = ()=>{
    profileImgRef.current.click()
  }
useEffect(()=>{
console.log('pro',profileImg);
console.log('rc',driverDetails?.profileUrl)
console.log('hehe',profileImg == driverDetails?.profileUrl)
},[profileImg])
  // const confirmUpdate = () =>{
  //     dispatch()
  // }
  return (
    <>
    <UserNavbar/>
    <section className="bg-gray-50 bg-gradient-to-r from-white to-yellow-50 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py- 8 mt-28 mx-auto  lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-lg sm:max-w-xl xl:p-0 border border-yellow-300 bg-gradient-to-t from-white to-yellow-100">
          <div className="p-6 space-y-6 md:space-y-9 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
              My Profile
            </h1>
            <form className="space-y-6" action="">
              <div className="w-1/3">
                <label
                  for="licenseFrontImage"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Profile
                </label>
                <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center h-32 cursor-pointer hover:border-yellow-500 transition duration-200">
               {(profileImg == driverDetails?.profileUrl) ? (<img
                    src={profileImg}
                    className="w-full h-full object-contain"
                    alt=""
                    onClick={handleImgUpdate}
                  />) : (<img
                    src={URL.createObjectURL(profileImg)}
                    className="w-full h-full object-contain"
                    alt=""
                    onClick={handleImgUpdate}
                  />)} 
                <input type="file" className="hidden" ref={profileImgRef} onChange={(e)=>{console.log('ejeeh');  setProfileImg(e.target.files[0])}} />
                </div>
              </div>
              <div>
            <label for="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Name</label>
            <input type="text" name="" id="" class="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-yellow-500 focus:border-yellow-500" value={name} onChange={(e)=>{setName(e.target.value)}} />
          </div>
          <div>
            <label for="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email</label>
            <input type="text" name="" id="" class="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-yellow-500 focus:border-yellow-500" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
          </div>
          <div>
            <label for="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Phone</label>
            <input type="text" name="" id="" class="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-yellow-500 focus:border-yellow-500" value={phone} onChange={(e)=>{setPhone(e.target.value)}} />
          </div>
          <div>
            <label for="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"> LicenseNumber</label>
            <input type="text" name="" id="" class="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-yellow-500 focus:border-yellow-500" value={licenseNumber} onChange={(e)=>setPhone(e.target.value)}/>
          </div>
          <div className="w-1/3">
                <label
                  for="licenseFrontImage"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  License Image
                </label>
                <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center h-32 cursor-pointer hover:border-yellow-500 transition duration-200">
                  <img
                    src={licenseImg}
                    className="w-full h-full object-contain"
                    alt=""
                  />
                </div>
              </div>
              <hr className="border-2" />
              <h1 className="text-center">Vehicle Details</h1>
              <div className="w-[80%]">
            <label htmlFor="vehicleType" className="block text-left text-sm font-medium text-gray-900 dark:text-black mb-2">Vehicle Type</label>
             <div className="flex items-center w-[40%]">
                <label htmlFor="auto" className="flex items-center w-full cursor-pointer">
                  <img src={vehicleType == 'Auto' ? "/assets/TukTuk_Green_v1.png" : '/assets/scooter-illustration-vintage-vehicle-sign-and-symbol-vector-removebg-preview.png' }alt="Auto" className="w-full h-auto" />
                </label>

              {/* <div className="flex items-center w-[40%]">
                <label htmlFor="bike" className="flex items-center w-full cursor-pointer">
                  <img src="/assets/scooter-illustration-vintage-vehicle-sign-and-symbol-vector-removebg-preview.png" alt="Bike" className="w-full h-auto" />
                </label>
              </div> */}
            </div>
          </div>
              <div>
            <label for="license" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Vehicle RC_Number</label>
            <input type="text" name="license" id="license" class="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-yellow-500 focus:border-yellow-500" value={VehicleRC} onChange={(e)=>setLicenseNumber(e.target.value)} />
          </div>

          {vehicleType == 'Auto' && ( <div className="w-1/3">
                <label
                  for=""
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                Vehicle Permit
                </label>
                <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center h-32 cursor-pointer hover:border-yellow-500 transition duration-200">
                  <img
                    src={VehiclePermit}
                    className="w-full h-full object-contain"
                    alt=""
                  />
                </div>
              </div>)}
              
              <button
                type="submit"
                class="w-full text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200"
              >
                Save Changes
              </button>
              <button
                type="submit"
                class="w-full text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    
    </>
  )
}

export default DriverProfilePage
