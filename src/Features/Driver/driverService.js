import axios from "../../Utils/Axios/axios";

export const registerDriverService = async (formDetails) => {
  try {
    const response = await axios.post("auth/driver/signup",formDetails);

    return response;
  } catch (error) {

    throw error
    // console.error(error);
  }
};

export const verifyOtpService = async (otp) => {
  try {
    const response = await axios.post("auth/driver/verify-otp", { otp });

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const resendOtpService = async (email) => {
  try {
    return await axios.post("auth/driver/resend-otp", { email });
  } catch (error) {
    console.error(error);
  }
};

export const completeProfileService = async (formdata) => {
  try {
    console.log("from", formdata);
    return await axios.post("auth/driver/complete-profile", formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.error(error);
  }
};

export const confirmUpdateService = async (email) => {
  try {
    const response = await axios.post("auth/driver/confirmUpdate", { email });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const driverLoginService = async()=>{
  return await axios.post('auth/driver/login')
}
