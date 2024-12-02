import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LancamentoState } from "./types";
import { Lancamento } from "../../../components/dto/lancamento-dto";

const initialState: LancamentoState = {
  lancamentos: [],
  error: "",
};

const slice = createSlice({
    name: 'lancamentoSlice',
    initialState,
    reducers: {
      resetLancamentoSlice: () => initialState,
      updateLancamento(state, action: PayloadAction<Lancamento[]>) {
        state.lancamentos = action.payload;
      },
      updateError(state, action: PayloadAction<string>) {
        state.error = action.payload;
      },
    },
  });

export const { 
  resetLancamentoSlice, 
  updateLancamento,
  updateError,
} = slice.actions;

export default slice.reducer;
