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
    // const body = JSON.stringify(user);
    axios
      .post("http://127.0.0.1:8000/auth/register", user)
      .then(res => {
        // console.log(res);
        dispatch(message({ body: "Your registration was successful!" }));
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        console.log(err.response.data);
        // dispatch(message({ body: "Registration failed", type: "error" }));
        dispatch(error(err.response.data));
        dispatch({ type: REGISTER_FAIL });
        console.log("There was an error registering user from the server");
      });
  };
};

export const loadUser = () => {
  return dispatch => {
    // const body = JSON.stringify(user);
    axios
      .get("http://127.0.0.1:8000/auth/user", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        // console.log(res);
        // dispatch(message({ body: "User loaded successfully" }));
        dispatch({
          type: USER_LOADED,
          payload: res.data
        });
      })
      .catch(err => {
        // console.log(err);
        // dispatch(message({ body: "Your registration was successful!" }));
        // dispatch(message({ body: "User loading failed", type: "error" }));
        dispatch({ type: USER_LOADING_FAIL });
        console.log("There was an error loading user from the server");
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
        // console.log(res);
        dispatch(message({ body: "Logout successful!" }));
        dispatch({
          type: LOGOUT_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        // console.log(err);
        dispatch(message({ body: "Logout failed", type: "error" }));
        dispatch({ type: LOGOUT_FAIL });
        console.log("There was an error logging out user from the server");
      });
  };
};

export const login = user => {
  return dispatch => {
    axios
      .post("http://127.0.0.1:8000/auth/login", user)
      .then(res => {
        // console.log(res);
        dispatch(message({ body: "Login successful!" }));
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        console.log(err.response);
        dispatch(error(err.response.data));
        // dispatch(message({ body: "Login failed", type: "error" }));
        dispatch({ type: LOGIN_FAIL });
        console.log("There was an error logging in user from the server");
      });
  };
};
