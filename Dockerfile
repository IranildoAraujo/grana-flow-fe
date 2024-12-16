# Usar imagem oficial do Node.js para build
FROM node:18 AS build

# Criar diretório de trabalho dentro do container
WORKDIR /app

# Copiar arquivos necessários para o build
COPY package.json package-lock.json ./  

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Gerar o build da aplicação
RUN npm run build

# Usar Nginx como servidor estático
FROM nginx:1.25-alpine

# Copiar os arquivos do build para o Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar configuração customizada do Nginx (opcional, ajustar conforme necessário)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta 3000 para o Nginx
EXPOSE 3000

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
