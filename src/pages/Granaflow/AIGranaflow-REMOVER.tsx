import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../util/URLUtil/URLUtil';

interface Lancamento {
  id?: number;
  valorCusto: number;
  tipoCusto: string;
  ultimoCustoRegistrado: Date;
}

const AIGranaflow: React.FC = () => {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [resumoLLM, setResumoLLM] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const HUGGINGFACE_API_KEY = process.env.REACT_APP_HUGGINGFACE_API_KEY; // Certifique-se de configurar isso no seu .env

  useEffect(() => {
    buscarLancamentos();
  }, []);

  const buscarLancamentos = async () => {
    try {
      const response = await axios.get<Lancamento[]>(`${API_BASE_URL}/lancamentos`);
      setLancamentos(response.data);
      if (response.data.length > 0) {
        gerarResumo(response.data);
      } else {
        setResumoLLM("Nenhum lançamento encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
      setError("Erro ao buscar dados da API.");
    }
  };

  const gerarResumo = async (lancamentos: Lancamento[]) => {
    try {
        setLoading(true);
      const lancamentosStr = lancamentos.map(l => `${l.tipoCusto}, ${l.valorCusto} gasto, ${l.ultimoCustoRegistrado} Data de registro`).join('\n');
      const prompt = `
        Dada a seguinte lista de lançamentos com valorCusto, tipoCusto e ultimoCustoRegistrado, gere um resumo que descreva as características gerais dessa lista.

        Lista de lançamentos:
        ${lancamentosStr}

        Por favor, gere um resumo claro e coerente em português com base nas informações fornecidas acima.
      `;

      const response = await axios.post(
        'https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct',
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          },
        }
      );

      const generatedText = response.data.generated_text || response.data[0]?.generated_text;

        if (typeof generatedText === "string"){
            setResumoLLM(generatedText.trim());
        }
        else {
            setResumoLLM("A LLM retornou uma resposta inválida ou vazia.");
        }

    } catch (error) {
      console.error("Erro na chamada da LLM:", error);
      setResumoLLM("Erro ao gerar resumo.");
    } finally {
        setLoading(false);
    }
  };
  
  return (
    <div>
      <h1>Interface Dinâmica com LLM e API Spring</h1>

      <h2>Lista de Lançamentos</h2>
      <ul>
        {lancamentos.map(lancamento => (
          <li key={lancamento.id}>
            ${lancamento.tipoCusto}, ${lancamento.valorCusto}, ${lancamento.ultimoCustoRegistrado.toString()} Data de registro
          </li>
        ))}
      </ul>

      <h2>Resumo da LLM</h2>
      {loading ? <p>Carregando...</p> : <p>{resumoLLM}</p>}

        {error && <p style={{ color: 'red' }}>{error}</p>}

    </div>
  );
};

export default AIGranaflow;