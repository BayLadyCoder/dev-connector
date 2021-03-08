import axios from "axios";
import { setAlert } from "./alerts";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Load user
export const loadUser = () => async (dispatch) => {
  // check the local storage first
  // if there is a token in local storage, set it as a global header for axios
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  // get user data from the backend
  try {
    const res = await axios.get("/api/auth");
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: AUTH_ERROR });
  }
};

// Register user
export const registerNewUser = (newUserData) => async (dispatch) => {
  const body = JSON.stringify(newUserData);

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
