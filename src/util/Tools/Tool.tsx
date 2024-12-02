import axios from "axios";

// Tool para buscar dados financeiros
export const fetchFinancialData = async (): Promise<string> => {
  try {
    const response = await axios.get("http://localhost:8080/grana-flow/api/v1/lancamentos");
    const data = response.data;

    // Formata os dados para exibição no prompt
    return data
      .map(
        (item: { tipoCusto: string; valorCusto: number; ultimoCustoRegistrado: string }) =>
          `${item.tipoCusto}: R$${item.valorCusto.toFixed(2)} registrado em ${new Date(
            item.ultimoCustoRegistrado
          ).toLocaleDateString()}`
      )
      .join("\n");
  } catch (error) {
    console.error("Erro ao buscar dados financeiros:", error);
    return "Erro ao buscar dados financeiros.";
  }
};
