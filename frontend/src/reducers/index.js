import { combineReducers } from "redux";
import bookReducer from "./books";
import messageReducer from "./messages";
import authReducer from "./auth";

export default combineReducers({
  bookReducer,
  messageReducer,
  authReducer
});
