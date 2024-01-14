import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    status: 'ok'
  },
});

export default homeSlice.reducer;