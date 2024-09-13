import { type } from "@testing-library/user-event/dist/type";
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
        payload: response.data.todos,
      });
    } catch (error) {
      dispatch({
        type: "TODOLIST_RETERIVE_FAILURE",
        payload: "Something went wrong...",
      });
    }
  };
};

export const addTodo=(newTodo)=>{
    return{
      type  :"ADDTODO",
      payload : newTodo
    }
}

export const clearTodo=()=>{
  return{
     type : "CLEARTODO",
    
  }
}

export const deleteTodo=(todoId)=>{
  return{
    type : "DELETETODO",
    payload:todoId
  }
}

export const updateTodo=(todotext,checkId)=>{
  return{
    type :"UPDATETODO",
    payload:todotext,
    todoId :checkId
  }
}

export default todoActioncreater;
