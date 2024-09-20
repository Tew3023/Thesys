import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    name: '',
    url: '',
    price: 0,
  },
}

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.data.name = action.payload;
    },
    setUrl: (state, action) => {
      state.data.url = action.payload;
    },
    setPrice: (state, action) => {
      state.data.price = action.payload;
    },
  },
});

export const { setName, setUrl, setPrice } = counterSlice.actions;
export default counterSlice.reducer;