// store.js
import { configureStore } from "@reduxjs/toolkit";
import stagiaireReducer from './stagiaireSlice';

const store = configureStore({
  reducer: {
    stagiaires: stagiaireReducer
  },
});

export default store;