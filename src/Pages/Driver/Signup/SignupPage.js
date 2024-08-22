import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../Components/Driver/Modal/OtpModal";
import UserNavbar from "../../../Components/Navbar/UserNavbar";
import { registerDriver } from "../../../Features/Driver/driverActions";
import { resestAll } from "../../../Features/Driver/driverSlice";

function SignupPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showModal, setModal] = useState(false);
  const dispatch = useDispatch();
  const { error,success } = useSelector((state) => state.driver);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\d{10}$/;
  const passwordRegex = /^.{8,}$/;
  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    if (
      formState.name.trim() === "" &&
      formState.email.trim() === "" &&
      formState.phone.trim() === "" &&
      formState.password.trim() === ""
    ) {
      toast("Please fill All fields");
    } else if (formState.name.trim() == "") {
      toast("Please Enter your Name");
    } else if (formState.email.trim() === "") {
      toast("Please Enter your Email");
    } else if (!emailRegex.test(formState.email)) {
      console.log("formstateEmaail", formState.email);
      toast("Please Enter a Valid Email");
    } else if (formState.phone.trim() === "") {
      toast("please Enter valid Phone");
    } else if (!phoneRegex.test(formState.phone)) {
      toast("Please Enter Valid Phone");
    } else if (formState.password.trim() === "") {
      toast("Please Enter valid paswword");
    } else if (!passwordRegex.test(formState.password)) {
      toast("Password must contain minimum of 8 characters");
    } else {
      dispatch(registerDriver(formState));
    }
  };
  useEffect(() => {
    if (error) {
      console.log(error);
      toast(error);
      dispatch(resestAll())
      return;
    } else if (success) {
        setModal(true);
      dispatch(resestAll())
    }
  }, [error,success]);

  return (
    <>
      <UserNavbar />
      {showModal && (
        <Modal email={formState.email} setShowModal={setModal} role="driver" />
      )}
      <section class="bg-gray-50 bg-gradient-to-r from-white to-yellow-50 h-screen">
        <div class="flex flex-col items-center justify-center px-6 py-8 mt-6 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow-xl md:mt-16 sm:max-w-md xl:p-0 border border-yellow-200 ">
            <div class="p-6 space-y-6 md:space-y-8 sm:p-8 border-yellow-300 bg-gradient-to-t from-white to-yellow-100">
              <h1 class="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-black md:text-3xl">
                Join As a Driver
              </h1>
              <form
                class="space-y-6 md:space-y-5"
                action=""
                onSubmit={(event) => {
                  handleRegisterSubmit(event);
                }}
              >
                <div>
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Enter your name"
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    for=""
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Enter your email"
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    for="phone"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    class="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Enter your phone number"
                    onChange={(e) =>
                      setFormState({ ...formState, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    class="border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Enter your password"
                    onChange={(e) =>
                      setFormState({ ...formState, password: e.target.value })
                    }
                  />
                </div>
                <button
                  type="submit"
                  class="w-full text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200"
                >
                  Create an account
                </button>
                {/* <button type="submit" class="w-full text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200">
            Create an account
          </button> */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignupPage;
