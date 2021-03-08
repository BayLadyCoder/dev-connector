import axios from "axios";
import { setAlert } from "./alerts";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

// Register user
export const register = ({ name, email, password }) => async (dispatch) => {
  const newUser = {
    name,
    email,
    password,
  };
  const body = JSON.stringify(newUser);

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
