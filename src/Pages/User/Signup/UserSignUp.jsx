import React from "react";
import { useNavigate} from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { googleAuth, emailAuth } from "../../../Features/User/userActions";
import UserNavbar from "../../../Components/Navbar/UserNavbar";
import OtpModal from '../../../Components/User/Modal/OtpModal'
import { useSocket } from "../../../Hooks/socket";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate()
  const socket = useSocket()

  const handleEmailLogin = (e) => {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(email == ''){
      toast('Please Enter your Email')
      return
    }else if(!emailRegex.test(email)){
      toast('Enter valid Email')
      return
    }
    dispatch(emailAuth(email));
    setTimeout(() => {
      setShowModal(!showModal);
    }, 1000);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      const token = codeResponse.access_token;
      dispatch(googleAuth(token));
    },
    onError: (error) => console.error("Login has Failed", error),
  });

  useEffect(()=>{
    if(userData?.message == 'Google Authentication SuccessFull'){
      socket?.emit('user-connected',userData?.user?.id)
      setTimeout(()=>{
        navigate('/',{replace:true})
      },1000)
      return
    }else if(userData?.error === 'You are Currently blocked by the Admin'){
      toast('Your Account has been temporarily Suspended ')
      return
    }else if(userData?.error === 'Your Google Account is not Verified'){
      toast('Your Google Account is not Verified')
      return
    }

  },[userData?.message,userData?.error])

  return (
    <>
    <UserNavbar/>
    {showModal && <OtpModal email={email} setShowModal = {setShowModal} />}
    <div className="flex justify-center items-center mt-12 bg-gradient-to-r from-white to-yellow-50 h-screen">
      <div className="w-2/5 h-3/4 border-2 rounded-lg shadow-2xl border-yellow-300 bg-gradient-to-t from-white to-yellow-100">
        <h1 className="text-center mt-10 font-semibold text-2xl text-gray-700">
          Start Your Journey With Us
        </h1>
        <div className="flex justify-center items-center mt-10">
          <div className="w-full flex flex-col items-center">
            <div className="flex border-gray-400 border-2 rounded-full w-80 h-12 mt-10 hover:border-black">
              <input
                type="text"
                className="border-none outline-none flex-grow rounded-full pl-6 text-gray-700 placeholder-gray-400"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <button
              className="border-2 border-black rounded-full w-80 h-12 mt-8 hover:bg-yellow-400 hover:text-black font-medium text-lg bg-white transition-colors"
              onClick={handleEmailLogin}
            >
              Continue
            </button>
            <button
              className="flex items-center justify-center border-2 border-black rounded-full w-80 h-12 mt-8 gap-2 bg-white hover:bg-yellow-400 transition-colors"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="w-6 h-6" />
              <span className="font-medium text-lg">
                Sign Up with Google
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
export default SignupForm;
