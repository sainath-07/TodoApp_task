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
      return { ...state, error: "Something went wrong..." };
  }
};

export default todoReducer;
