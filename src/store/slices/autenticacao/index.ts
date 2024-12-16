import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AutenticacaoState } from "./types";
import { AutenticacaoDTO } from "../../../dto/autenticacao-dto";

const initialState: AutenticacaoState = {
  autenticacao: {} as AutenticacaoDTO,
};

const slice = createSlice({
    name: 'autenticacaoSlice',
    initialState,
    reducers: {
      resetAutenticacaoSlice: () => initialState,
      updateAutenticacao(state, action: PayloadAction<AutenticacaoDTO>) {
        state.autenticacao = action.payload;
      },
    },
  });

export const { 
  resetAutenticacaoSlice, 
  updateAutenticacao,
} = slice.actions;

export default slice.reducer;
