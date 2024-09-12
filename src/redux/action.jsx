import axios from "axios";

const todoActioncreater = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "TODOLIST_RETERIVE_LOADING",
      });

      let response = await axios.get("https://dummyjson.com/todos");

      dispatch({
        type: "TODOLIST_RETERIVE_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: "TODOLIST_RETERIVE_FAILURE",
      });
    }
  };
};

export default todoActioncreater;
