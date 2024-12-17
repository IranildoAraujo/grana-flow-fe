import React, { useCallback, useEffect } from "react";
import { applyPromptTemplateWithTools, createModelProvider, PromptTemplate } from "../../../util/ModelProvider";
import { answerPtBr, templatePtBr2 } from "../../../util/TemplateUtil";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { updateError, updateLoading } from "../../../store/slices/chatInput";
import ChatInput from "./ChatInput";
import ChatOutPut from "./ChatOutput";
import { updateOutputText, updateVerboseLogs } from "../../../store/slices/metaLLM";
import './styles.css';

const MetaLLM: React.FC = () => {
  const dispatch = useAppDispatch()
  const { lancamentos } = useAppSelector((state) => state.lancamentoStore);
  const { inputText, onClick } = useAppSelector((state) => state.chatInputStore);

  const financialData = lancamentos.map(item => {
    return `${item.tipoCusto}: R$${item.valorCusto.toFixed(2)} registrado em ${new Date(
      item.dataRegistro
    ).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}`
  }).join("\n");

  const modelConfig = {
    model: "Qwen/Qwen2.5-Coder-32B-Instruct",
    temperature: 0.1,
    top_p: 0.95, // Reduzir diversidade
    top_k: 40, // Priorizar termos relevantes
    maxNewTokens: 250,
    returnFullText: false,
    verbose: false,
  };

  const callModel = createModelProvider(modelConfig);

  const configTemplate = useCallback(async () => {
    const promptTemplate: PromptTemplate = {
      template: templatePtBr2,
      variables: {
        input: inputText,
        financial_data: financialData,
        answer: answerPtBr,
      },
    };

    try {
      const prompt = await applyPromptTemplateWithTools(
        promptTemplate.template,
        promptTemplate.variables
      );

      const { result, logs } = await callModel(prompt);

      dispatch(updateOutputText(result));
      dispatch(updateVerboseLogs(logs || undefined));
    } catch (error) {
      dispatch(updateError("Desculpe, algo deu errado. Por favor, tente novamente."));
      dispatch(updateOutputText("Falha ao buscar a resposta."));
      dispatch(updateVerboseLogs(undefined));
    } finally {
      dispatch(updateLoading(false));
    }
  }, [    
    financialData,
    inputText,
    dispatch,
    callModel]);

  useEffect(() => {
    if(onClick) {
      configTemplate();
    }
  }, [configTemplate, onClick])

  return (
    <div className="container">
      <h1 className="header">Assistente Financeiro</h1>
      <div className="chat-container">
        <ChatOutPut />

        <ChatInput />
      </div>
    </div>
  );
};

export default MetaLLM;
