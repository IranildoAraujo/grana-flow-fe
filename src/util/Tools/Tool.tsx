import { useAuthenticatedHttpClient } from "../../hooks";
import { API_BASE_AUTH_URL } from "../URLUtil/URLUtil";

// Tool para buscar dados financeiros
export const fetchFinancialData = async (): Promise<string> => {
    const httpClient = useAuthenticatedHttpClient();
  try {
    const response = await httpClient.get(`${API_BASE_AUTH_URL}/lancamentos`);
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
