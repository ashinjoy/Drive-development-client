import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/User/userSlice";
import driverReducer from "../Features/Driver/driverSlice";

console.log('this is store');
const store = configureStore({
  reducer: {
    user: userReducer,
    driver:driverReducer
  },
});

export default store;
