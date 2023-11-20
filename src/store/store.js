import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import formSlice from "./formSlice";

 const store = configureStore({
    reducer:{
        auth: authSlice,
        formDt:formSlice
    }
})

export default store;