import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    // if there is a token, set it as a global header for axios
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    // delete it from the global header
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
