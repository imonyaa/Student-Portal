import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    _id: "",
    userID: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    academicLevel: "",
    academicYear: 0,
    major: "",
    group: 0,
    token: "",
    profileImage: "",
  },
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
