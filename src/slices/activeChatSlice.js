import { createSlice } from "@reduxjs/toolkit";

export const activeUserSlice = createSlice({
  name: "activeUser",
  initialState: {
    activeChatUser: null,
  },
  reducers: {
    activeChatUser: (state, action) => {
      state.activeChatUser = action.payload;
    },
  },
});

export const { activeChatUser } = activeUserSlice.actions;

export default activeUserSlice.reducer;

// export default activeSlice
