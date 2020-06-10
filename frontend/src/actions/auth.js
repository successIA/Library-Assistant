import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  USER_LOADED,
  USER_LOADING_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from "./types";
import { message, error } from "./messages";

export const register = user => {
  return dispatch => {
    console.log(user);
    axios
      .post("http://127.0.0.1:8000/auth/register", user)
      .then(res => {
        dispatch(message({ body: "Your registration was successful!" }));
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch(error(err.response.data));
        dispatch({ type: REGISTER_FAIL });
      });
  };
};

export const loadUser = () => {
  return dispatch => {
    axios
      .get("http://127.0.0.1:8000/auth/user", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        dispatch({
          type: USER_LOADED,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({ type: USER_LOADING_FAIL });
      });
  };
};

export const logout = () => {
  return dispatch => {
    axios
      .post("http://127.0.0.1:8000/auth/logout", null, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        dispatch(message({ body: "Logout successful!" }));
        dispatch({
          type: LOGOUT_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch(message({ body: "Logout failed", type: "error" }));
        dispatch({ type: LOGOUT_FAIL });
      });
  };
};

export const login = user => {
  return dispatch => {
    axios
      .post("http://127.0.0.1:8000/auth/login", user)
      .then(res => {
        dispatch(message({ body: "Login successful!" }));
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch(error(err.response.data));
        dispatch({ type: LOGIN_FAIL });
      });
  };
};
