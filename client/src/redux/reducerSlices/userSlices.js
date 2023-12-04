import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {},
  isLoggedIn:false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginDetails: (state, actions) => {
      state.userDetails= actions.payload
    },
    handleLogout: (state) => {
      
    },
   
  }
});

export const { setLoginDetails, handleLogout } = userSlice.actions;
export default userSlice.reducer;
