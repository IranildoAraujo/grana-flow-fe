import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MetaLLMState } from "./types";
import { VerboseLogs } from "../../../util/ModelProvider";

const initialState: MetaLLMState = {
  outputText: "",
  verboseLogs: undefined,
};

const slice = createSlice({
    name: 'metaLLMSlice',
    initialState,
    reducers: {
      resetMetaLLMSlice: () => initialState,
      updateOutputText(state, action: PayloadAction<string>) {
        state.outputText = action.payload;
      },
      updateVerboseLogs(state, action: PayloadAction<VerboseLogs | undefined>) {
        state.verboseLogs = action.payload;
      },
    },
  });

export const { 
  resetMetaLLMSlice, 
  updateOutputText,
  updateVerboseLogs,
} = slice.actions;

export default slice.reducer;
