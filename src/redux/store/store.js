import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "../reducers/index";



const store=configureStore({
    reducer:rootReducers
})

export default store;