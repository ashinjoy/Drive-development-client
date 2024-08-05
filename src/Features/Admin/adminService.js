import axios from "../../Utils/Axios/baseUrl";
import { adminPrivate } from "../../Utils/Axios/adminInterceptor";

export const adminLoginService = async (formdata) => {
  return await axios.post("auth/admin/login", formdata);
};

export const getDriverDetailService = async () => {
  console.log("enterd get req");
  return adminPrivate.get("auth/admin/getAllDrivers");
};

export const blockUnblockDriverService = async (driverId) => {
  return adminPrivate.patch(
    `/auth/admin/blockUnblockDrivers/${driverId}`
  );
};

export const driverDetailService = async (driverId) => {
  return adminPrivate.get(
    `/auth/admin/viewDriver-Detail/${driverId}`
  );
};

export const approveDriverService =async(driverId)=>{
  return adminPrivate.patch(`/auth/admin/approveDriver/${driverId}`)
}

export const approveDriverProfileUpdateService =async(driverId)=>{
  return adminPrivate.patch(`/auth/admin/verify-driverProfileUpdate/${driverId}/approval`)
}

export const getUserDetailService =async(driverId)=>{
  return adminPrivate.get(`/auth/admin/getAllUsers`)
}

export const blockUnblockUserService = async(userId)=>{
  return adminPrivate.patch(`/auth/admin/blockunblockUser/${userId}`)
}

export const searchDriverService = async(search)=>{
  return adminPrivate.get(`/auth/admin/drivers?search=${search}`)
}

