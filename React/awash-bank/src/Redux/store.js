import { configureStore } from "@reduxjs/toolkit";
import couterReducer from "./counterSlice.js";

export const store=configureStore({
    reducer:{
        counter:couterReducer
    }
});