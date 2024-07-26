import axios from "../../Utils/Axios/axios";
console.log('services');

export const googleAuthService = async (token) => {
  try {
    const data = { token };
    const response = await axios.post("auth/user/login/google", data);
    console.log("response", response);
    return response;
  } catch (error) {
    console.error(error);
    throw error
  }
};

export const emailAuthService = async (email) => {
  try {
    const response = await axios.post("auth/user/login/email",{email})
    console.log("email response", response);
    return response
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const verifyOtpService = async (otp) => {
  try {
    const response = await axios.post("auth/user/verify-otp",{otp})
    console.log("otp response", response);
    return response
  } catch (error) {
    console.error(error);
    throw error
  }
};

export const resendOtpService = async(email)=>{
  try {
    console.log('email in resendOtp',email);
    return await axios.post('auth/user/resend-otp',{email})

  } catch (error) {
    console.error(error)
  }
}
