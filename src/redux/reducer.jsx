import { updateTodo } from "./action";

let initialState = {
  todoList: [],
  loading: false,
  error: "",
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TODOLIST_RETERIVE_LOADING":
      return { ...state, loading: true };
    case "TODOLIST_RETERIVE_SUCCESS":
      return { ...state, todoList: action.payload, loading: false };
    case "TODOLIST_RETERIVE_FAILURE":
      return { ...state, error: action.payload };
    case "ADDTODO":
      let addtodo = {
        id: state.todoList.length + 1,
        todo: action.payload,
        completed: false,
        userId: 152,
      };
      return {
        ...state,
        todoList: [...state.todoList, addtodo],
      };

    case "CLEARTODO":
      return {
        ...state,
        todoList: [],
      };

    case "DELETETODO":
      let todoId = action.payload;
      const deleteTodo = state.todoList.filter(
        (todoObj) => todoObj.id !== todoId
      );
      return {
        ...state,
        todoList: deleteTodo,
      };

    case "UPDATETODO":
      const updateTodo = state.todoList.map((todoObj) => {
        if (action.todoId === todoObj.id) {
          let changeText = {
            id : action.todoId,
            todo: action.payload,
          };
          return changeText;
        } else {
          return todoObj;
        }
      });
      return {
        ...state,
        todoList: updateTodo,
      };

    default:
      return state;
  }
};

export default todoReducer;
