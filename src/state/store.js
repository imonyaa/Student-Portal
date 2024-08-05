import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";

const store = configureStore({
  reducer: { userReducer },
});
export default store;
export const getState = () => store.getState();
export const dispatch = (action) => store.dispatch(action);
