import { configureStore } from '@reduxjs/toolkit';
import lancamentoReducer from './slices/lancamento';
import formGranaFlowReducer from './slices/formgranaflow'
import chatInputReducer from './slices/chatInput';
import metaLLMReducer from './slices/metaLLM';

export const store = configureStore({
  reducer: {
    lancamentoStore: lancamentoReducer,
    formGranaFlowStore: formGranaFlowReducer,
    chatInputStore: chatInputReducer,
    metaLLMStore: metaLLMReducer
  },
});

// Inferindo o tipo RootState a partir do store.getState()
export type RootState = ReturnType<typeof store.getState>;

// Inferindo o tipo AppDispatch a partir do store.dispatch
export type AppDispatch = typeof store.dispatch;