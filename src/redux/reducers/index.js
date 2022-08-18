
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import todoReducer from "./todoReducer";


const rootReducers=combineReducers({
authReducer,todoReducer
})

export default rootReducers;