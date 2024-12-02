import React from 'react';
import axios from "axios";

const HUGGINGFACE_API_KEY = !process.env.REACT_APP_HUGGINGFACE_API_KEY ? "" : process.env.REACT_APP_HUGGINGFACE_API_KEY; // Certifique-se de configurar isso no seu .env  

// Tipos de configuração do modelo
interface ModelConfig {
  model: string;
  temperature: number;
  maxNewTokens: number;
  returnFullText: boolean;
  verbose?: boolean; // Log detalhado opcional
}

// Tipos de template de prompt
export interface PromptTemplate {
  template: string;
  variables: Record<string, string>;
}

// Tipos de logs detalhados
export interface VerboseLogs {
  prompt: string; // Prompt gerado
  response: Array<{ generated_text: string }>; // Resposta da API
}

/**
 * Substitui os placeholders do template pelos valores fornecidos.
 * @param template String do template com placeholders.
 * @param variables Objeto com valores para substituir os placeholders.
 * @returns String do prompt com os valores aplicados.
 */
const applyPromptTemplate = (template: string, variables: Record<string, string>): string => {
  let filledTemplate = template;
  for (const [key, value] of Object.entries(variables)) {
    const placeholder = `{${key}}`;
    filledTemplate = filledTemplate.replaceAll(placeholder, value);
  }
  return filledTemplate;
};

// Função para aplicar variáveis ao template
export const applyPromptTemplateWithTools = async (
  template: string,
  variables: Record<string, string | (() => Promise<string>)>
): Promise<string> => {
  const resolvedVariables: Record<string, string> = {};

  for (const [key, value] of Object.entries(variables)) {
    if (typeof value === "function") {
      resolvedVariables[key] = await value(); // Executa funções assíncronas (tools)
    } else {
      resolvedVariables[key] = value;
    }
  }

  return template.replace(/\{(\w+)\}/g, (_, key) => resolvedVariables[key] || `{${key}}`);
};


// Função do provedor de modelo
export const createModelProvider = (config: ModelConfig) => {
  const { model, temperature, maxNewTokens, returnFullText, verbose } = config;

  const callModel = async (
    userInput: string,
    promptTemplate?: PromptTemplate
  ): Promise<{ result: string; logs?: VerboseLogs }> => {
    // Gerar prompt com base no template ou usar o input diretamente
    const prompt = promptTemplate
      ? applyPromptTemplate(promptTemplate.template, {
          ...promptTemplate.variables,
          input: userInput,
        })
      : userInput;

    if (verbose) {
      console.log("Generated Prompt:");
      console.log(prompt);
    }

    try {
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/${model}`,
        {
          inputs: prompt,
          parameters: {
            temperature,
            max_new_tokens: maxNewTokens,
            return_full_text: returnFullText,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (verbose) {
        console.log("Model Response:", response.data);
      }

      // Extrair o resultado e os logs detalhados
      const result = response.data[0]?.generated_text || "No text returned";
      const logs: VerboseLogs = { prompt, response: response.data };

      return verbose ? { result, logs } : { result };
    } catch (error) {
      if (verbose) {
        console.error("Error during model call:", error);
      }
      throw new Error("Failed to fetch response from the model.");
    }
  };

  return callModel;
};
