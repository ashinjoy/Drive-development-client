
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { driverCompleteProfile } from "../../../Features/Driver/driverActions";
import {resestAll} from '../../../Features/Driver/driverSlice'
import { toast } from "react-toastify";
import { BiUpload } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import UserNavbar from '../../../Components/Navbar/UserNavbar'

function CompleteProfilePage() {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licensePhoto, setLicenseImage] = useState("");
  const [proImg, setProfileImg] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleRC, setVehicleRC] = useState("");
  const [vehiclePermit, setVehiclePermit] = useState("");
  const dispatch = useDispatch();
  const driverDetails = useSelector(state => state.driver)

  const proImgRef = useRef(null)
  const licenseImgRef = useRef(null)
  const permitRef = useRef(null)

  const handleProfileImg = ()=> {
    console.log(proImgRef.current);
    if(proImgRef.current){
      proImgRef.current.click()
  
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("licensePhoto", licensePhoto);
    formdata.append("ProfileImg", proImg);
    formdata.append("permit", vehiclePermit);
    formdata.append("licenseNumber", licenseNumber);
    formdata.append("vehicleType", vehicleType);
    formdata.append("vehicleRC", vehicleRC);
    formdata.append('driverId',driverDetails?.driver?.id)
    dispatch(resestAll())
    dispatch(driverCompleteProfile(formdata));
  };
  useEffect(()=>{
 if(driverDetails?.message === 'You have completed your profile successfully'){
  toast('Profile is Completed')
 }
    
  },[driverDetails?.message])

  useEffect(()=>{
console.log('proImg',proImg);
  },[proImg])

const handleLicenseUpload = ()=>{
  licenseImgRef.current.click()
}

const handlePermitUpload =()=>{
permitRef.current.click()
}
  return (
    <>
    <UserNavbar/>
    <section className="bg-gray-50 bg-gradient-to-r from-white to-yellow-50 h-screen">
  <div className="flex flex-col items-center justify-center px-6 py-8 mt-24 mx-auto  lg:py-0">
    <div className="w-full bg-white rounded-lg shadow-lg sm:max-w-xl xl:p-0 border border-yellow-300 bg-gradient-to-t from-white to-yellow-100">
      <div className="p-6 space-y-6 md:space-y-9 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
          Complete Profile
        </h1>
        <form className="space-y-6" action="" onSubmit={(e) => handleSubmit(e)}>
{  proImg == "" ? (<div className="w-full">
        <label for="" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Profile Image</label>
        <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center h-32 cursor-pointer hover:border-yellow-500 transition duration-200"
          >
          <BiUpload size={'44'} className="text-gray-400 hover:text-yellow-500" onClick={handleProfileImg}/>
          <span className="text-gray-400">Click to upload</span>
          <input  type="file" ref={proImgRef}  className="hidden" onChange={(e)=>{
            
            setProfileImg(e.target.files[0])
          }} />
        </div>
      </div> ) :
     ( <div className="w-1/3">
      <label for="licenseFrontImage" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">profile Image</label>
      <MdCancel size={'30'} onClick={()=>{
        setProfileImg('')
      }}/>

      <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center h-32 cursor-pointer hover:border-yellow-500 transition duration-200"
        >

<img src={URL.createObjectURL(proImg)} className="object-contain w-full h-full" alt="" />
      </div>
    </div>)}
      
          <div>
            <label for="license" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">License Number</label>
            <input type="text" name="license" id="license" class="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-yellow-500 focus:border-yellow-500" placeholder="Enter your license number" required  
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)} />
          </div>
          {licensePhoto == "" ? (<div className="w-full">
            <label for="licenseFrontImage" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">License Front Image</label>
            <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center h-32 cursor-pointer hover:border-yellow-500 transition duration-200"
              >
              <BiUpload size={'44'} className="text-gray-400 hover:text-yellow-500" onClick={handleLicenseUpload} />
              <span className="text-gray-400">Click to upload</span>
              <input type="file" ref={licenseImgRef} className="hidden" onChange={(e) => setLicenseImage(e.target.files[0])} />
            </div>
          </div>) :
          (<div className="w-1/3">
          <label for="licenseFrontImage" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">License Front Image</label>
          <MdCancel size={'30'} onClick={()=>{
            setLicenseImage('')
          }}/>
    
          <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center h-32 cursor-pointer hover:border-yellow-500 transition duration-200"
            >
    <img src={URL.createObjectURL(licensePhoto)} className="object-contain w-full h-full" alt="" />
          </div>
        </div>)

          }
          <div className="w-[80%]">
            <label htmlFor="vehicleType" className="block text-left text-sm font-medium text-gray-900 dark:text-black mb-2">Select Vehicle Type</label>
            <div className="flex gap-4">
              <div className="flex items-center w-[40%]">
                <input
                  type="radio"
                  id="auto"
                  name="vehicle"
                  className="mr-2"
                  value="Auto"
                  checked={vehicleType === "Auto"}
                  onChange={(e) => setVehicleType(e.target.value)}
                />
                <label htmlFor="auto" className="flex items-center w-full cursor-pointer">
                  <img src="/assets/TukTuk_Green_v1.png" alt="Auto" className="w-full h-auto" />
                </label>
              </div>
              <div className="flex items-center w-[40%]">
                <input
                  type="radio"
                  id="bike"
                  name="vehicle"
                  className="mr-2"
                  value="Bike"
                  checked={vehicleType === "Bike"}
                  onChange={(e) => setVehicleType(e.target.value)}
                />
                <label htmlFor="bike" className="flex items-center w-full cursor-pointer">
                  <img src="/assets/scooter-illustration-vintage-vehicle-sign-and-symbol-vector-removebg-preview.png" alt="Bike" className="w-full h-auto" />
                </label>
              </div>
            </div>
          </div>
          <div>
            <label for="rcNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">RC Number</label>
            <input type="text" name="rcNumber" id="rcNumber" class="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-yellow-500 focus:border-yellow-500" placeholder="Enter your RC number" required 
            value={vehicleRC}
            onChange={(e) => setVehicleRC(e.target.value)} />
          </div>
          {vehicleType === 'Auto' && 
           (vehiclePermit == "" ? (<div>
              <label for="permit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Permit</label>
              <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center h-32 cursor-pointer hover:border-yellow-500 transition duration-200"
                >
                <BiUpload size={'44'} className="text-gray-400 hover:text-yellow-500" onClick={handlePermitUpload} />
                <span className="text-gray-400">Click to upload</span>
                <input type="file" ref={permitRef} className="hidden" onChange={(e) => setVehiclePermit(e.target.files[0])} />
              </div>
            </div>):
            <div className="w-1/3">
            <label for="licenseFrontImage" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Vehicle Permit</label>
            <MdCancel size={'30'} onClick={()=>{
              console.log('heheh');
              setVehiclePermit('')
            }} />
      
            <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center h-32 cursor-pointer hover:border-yellow-500 transition duration-200"
              >
      <img src={URL.createObjectURL(vehiclePermit)} className="object-contain w-full h-full" alt="" />
            </div>
          </div>
            )
          }
          <button type="submit" class="w-full text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200">
            Create an account
          </button>
        </form>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default CompleteProfilePage
