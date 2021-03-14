import axios from "axios";
import { setAlert } from "./alerts";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  UPDATE_LIKES_ERROR,
  DELETE_POST,
  ADD_POST,
} from "./types";

// Get all posts
export const getAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Add like
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/${postId}/like/`);
    console.log(res.data);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: UPDATE_LIKES_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Remove like
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/${postId}/unlike/`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: UPDATE_LIKES_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Delete post
export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postId}/`);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });

    dispatch(setAlert("Post Removed", "success"));
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/api/posts`, formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert("Post Created", "success"));
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
