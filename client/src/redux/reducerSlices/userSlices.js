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
    //   state.userDetails= actions.payload
    return{
        ...state, // rest operator
        userDetails: actions.payload,
        isLoggedIn: true
    }
    },
    handleLogout: (state) => {
      
    },
   
  }
});

export const { setLoginDetails, handleLogout } = userSlice.actions;
export default userSlice.reducer;
