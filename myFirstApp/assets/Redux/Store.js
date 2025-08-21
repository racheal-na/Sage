import { configureStore } from "@reduxjs/toolkit";
import couterReducer from "./counterSlice"

export const store=configureStore({
    reducer:{
        counter:couterReducer
    }
});