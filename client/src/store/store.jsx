import { configureStore } from "@reduxjs/toolkit";
import conterReducer from './couterSlice'


export const store = configureStore({
    reducer:{
        counter : conterReducer
    },
})