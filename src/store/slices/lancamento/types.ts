import { Lancamento } from "../../../components/dto/lancamento-dto";

export interface LancamentoState {
    lancamentos: Lancamento[];
    error: string;
}