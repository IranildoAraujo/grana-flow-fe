import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormGranaFlowState } from "./types";

const initialState: FormGranaFlowState = {
  onSaved: false,
};

const slice = createSlice({
    name: 'formGranaFlowSlice',
    initialState,
    reducers: {
      resetFormGranaFlowSlice: () => initialState,
      updateOnSaved(state, action: PayloadAction<boolean>) {
        state.onSaved = action.payload;
      },
    },
  });

export const { 
  resetFormGranaFlowSlice, 
  updateOnSaved,
} = slice.actions;

export default slice.reducer;
