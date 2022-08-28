import { createSlice, configureStore } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "system",
  initialState: {
    name: "",
    value: 0,
    category: -1,
  },
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    },
    addName: (state, action) => {
      state.name = action.payload;
    },
    selectFlag: (state) => {
      state.category = 1;
    },
    selectCapital: (state) => {
      state.category = 2;
    },
  },
});

const store = configureStore({
  reducer: globalSlice.reducer,
});

store.subscribe(() => console.log(store.getState()));

export default store;
