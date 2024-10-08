import todoReducer from "./reducer";
import { legacy_createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit';

const todoStore = legacy_createStore(
  todoReducer, // Your root reducer
  composeWithDevTools(applyMiddleware(thunk))
);





export default todoStore;