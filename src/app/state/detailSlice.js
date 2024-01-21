import { createSlice } from "@reduxjs/toolkit";

export const detailSlice = createSlice({
  name: "detail",
  initialState: {
    detail: JSON.parse(localStorage.getItem('donna-calzados-detalle')) || {}
  },
  reducers: {
    setDetail: (state, action) => {
      state.detail = action.payload;
      localStorage.setItem('donna-calzados-detalle', JSON.stringify(action.payload));
    },
  },
});

export const { setDetail } = detailSlice.actions;

export default detailSlice.reducer;