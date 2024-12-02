import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatInputState } from "./types";

const initialState: ChatInputState = {
  inputText: "",
  error: "",
  loading: false,
  onClick: false,
};

const slice = createSlice({
    name: 'chatInputSlice',
    initialState,
    reducers: {
      resetChatInputSlice: () => initialState,
      updateInputText(state, action: PayloadAction<string>) {
        state.inputText = action.payload;
      },
      updateError(state, action: PayloadAction<string>) {
        state.error = action.payload;
      },
      updateLoading(state, action: PayloadAction<boolean>) {
        state.loading = action.payload;
      },
      updateOnClick(state, action: PayloadAction<boolean>) {
        state.onClick = action.payload;
      },
    },
  });

export const { 
  resetChatInputSlice, 
  updateInputText,
  updateError,
  updateLoading,
  updateOnClick,
} = slice.actions;

export default slice.reducer;
