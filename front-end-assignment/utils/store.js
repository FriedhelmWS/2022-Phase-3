import { createSlice, configureStore } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "system",
  initialState: {
    name: "",
    value: 0,
    category: -1,
    question: [],
    answer: "",
    correct: null,
    xp: 0,
    numOfCorrect: 0,
  },
  reducers: {
    addName: (state, action) => {
      state.name = action.payload;
    },
    selectFlag: (state) => {
      state.category = 1;
    },
    selectCapital: (state) => {
      state.category = 2;
    },
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
    setAnswer: (state, action) => {
      state.answer = action.payload;
    },
    answerCorrect: (state) => {
      state.correct = true;
    },
    answerWrong: (state) => {
      state.correct = false;
    },
    resetAnswer: (state) => {
      state.correct = null;
    },
    resetQuestion: (state) => {
      state.question = [];
    },
    setXp: (state, action) => {
      state.xp = action.payload;
    },
    setNumOfCorrect: (state, action) => {
      state.numOfCorrect = action.payload;
    },
  },
});

const store = configureStore({
  reducer: globalSlice.reducer,
});

store.subscribe(() => console.log(store.getState()));

export default store;
