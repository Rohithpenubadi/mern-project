import { combineReducers } from "redux";
import posts from './Posts';
import authReducer from './auth';
export default combineReducers({posts, authReducer})