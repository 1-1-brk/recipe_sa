import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
  name: "common",
  initialState: {
    randomMenu: null,
    breakfast: null,
    recipeToUpdate: {},
  },
  reducers: {
    setRandomMenu(state, action) {
      console.log("setting Random Menu in state");
      state.randomMenu = action.payload;
    },
    setRecipeToUpdate(state, action) {
      console.log("setting recipeToUpdate common slice: ", action.payload);
      state.recipeToUpdate = action.payload;
    },
  },
});

export const commonActions = commonSlice.actions;
export default commonSlice;
