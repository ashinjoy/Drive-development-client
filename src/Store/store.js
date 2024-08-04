import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/User/userSlice";
import driverReducer from "../Features/Driver/driverSlice";
import adminReducer from "../Features/Admin/adminSlice";

console.log('this is store');
const store = configureStore({
  reducer: {
    user: userReducer,
    driver:driverReducer,
    admin:adminReducer
  },
});

export default store;
