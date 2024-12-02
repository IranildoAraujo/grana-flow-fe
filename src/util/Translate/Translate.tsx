// Função para verificar se a resposta está em português
export const isPortuguese = (text: string): boolean => {
    return /[a-zà-ú]/i.test(text) && !/[a-z]{3,}/i.test(text); // Detecção simples de idioma
};
  