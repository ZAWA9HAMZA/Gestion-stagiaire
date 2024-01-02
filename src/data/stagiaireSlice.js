// stagiaireSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { nom: "Ezzouek", prenom: "Hamza", age: 19, isUpdated: false },
  { nom: "Bouzidi", prenom: "Mohammed", age: 18, isUpdated: false },
  { nom: "Maizat", prenom: "Hamza", age: 17, isUpdated: false },
];

const stagiaireSlice = createSlice({
  name: "stagiaire",
  initialState,
  reducers: {
    addStagiaire: (state, action) => {
      state.push(action.payload);
    },
    deleteStagiaire: (state, action) => {
      const index = state.findIndex((stagiaire) => stagiaire.nom === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    updateStagiaire: (state, action) => {
      const { nom, ...updatedData } = action.payload;

      state.forEach((stagiaire, index) => {
        if (stagiaire.nom === nom) {
          state[index] = { ...stagiaire, ...updatedData, isUpdated: true };
        }
      });
    },
    deleteAllStagiaires: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const { addStagiaire, deleteStagiaire, updateStagiaire, deleteAllStagiaires } = stagiaireSlice.actions;

export default stagiaireSlice.reducer;
