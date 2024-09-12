import todoReducer from "./reducer";
import { legacy_createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // Import redux-thunk middleware

// Create store and apply middleware
const todoStore = legacy_createStore(
  todoReducer, // Your root reducer
  composeWithDevTools(applyMiddleware(thunk))
);

export default todoStore;
