Data de criação: 21/11/2024 00:23

## INSTALAÇÕES NECESSÁRIAS:

 - No terminal execute para instalar o nodejs e NPM:
```
	curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
	sudo apt-get install -y nodejs
```

 - Após verifique a versão:
```
	node -v && npm -v
```

## Nesse momento as versões exibidas são : 
v18.20.2
10.5.0

 - Instalar o axios para consumir serviços:
```
	npm install axios
```

 - Instale o Redux:
```
	npm install react-redux
```

 - Instale os tipos do Redux ao usar TypeScript:
```
	npm install --save-dev @types/react-redux
```


 - Instale o `@reduxjs/toolkit`
```
	npm install @reduxjs/toolkit
```

 - Instale um tradutor para traduzir o retorno das LLMs, caso queira.
```
	npm install google-translate-api @types/google-translate-api
```

 - Instale `@huggingface/inference` para carregar a(s) LLM(s)
```
	npm install @huggingface/inference
```

> IMPORTANTE: Crie uma conta na plataforma e geri seu token para autenticação.

 - Instale a biblioteca react-markdown para renderização en Markdown no layout do componente:
```
	npm install react-markdown remark-gfm
```
 - `react-markdown`: Renderiza o Markdown.
 - `remark-gfm`: Adiciona suporte para sintaxe como tabelas, listas de tarefas e outros.
 
 - Instalar ícones do Antd:
```
	npm install @ant-design/icons
```

* * *
## Esse processo deve remover as bibliotecas problemáticas e restaurar o seu projeto ao estado anterior à instalação desses pacotes.

 - Resolvendo problema com o babel:
```
One of your dependencies, babel-preset-react-app, is importing the
"@babel/plugin-proposal-private-property-in-object" package without
declaring it in its dependencies. This is currently working because
"@babel/plugin-proposal-private-property-in-object" is already in your
node_modules folder for unrelated reasons, but it may break at any time.

babel-preset-react-app is part of the create-react-app project, which
is not maintianed anymore. It is thus unlikely that this bug will
ever be fixed. Add "@babel/plugin-proposal-private-property-in-object" to
your devDependencies to work around this error. This will make this message
go away.
```

A mensagem de erro fornece a solução: instale @babel/plugin-proposal-private-property-in-object explicitamente como uma dependência de desenvolvimento (devDependencies) em seu projeto. Você pode fazer isso usando npm ou yarn:
```
	npm install --save-dev @babel/plugin-proposal-private-property-in-object
```

 - Limpar cache do npm (opcional): Caso o erro persista, você pode tentar limpar o cache do npm, o que pode ajudar a resolver dependências corrompi
```
	npm cache clean --force
```

 - Reinstalar as dependências: Após limpar o cache, você pode reinstalar as dependências restantes, caso necessário, com o comando:
```
	npm install
```
* * *

# Variáveis de ambiente(.env):
```
REACT_APP_HUGGINGFACE_API_KEY==##########
HUGGINGFACEHUB_API_TOKEN=##########
REACT_OPENAI_API_KEY==##########
TAVILY_API_KEY=##########
SERPAPI_API_KEY=##########
LANGCHAIN_API_KEY==##########
```

 - Inicializar o projeto:
```
	npm start -- --reset-cache
```

![12e705b26146a7aa6b86012ee13e9fe6.png](../../_resources/12e705b26146a7aa6b86012ee13e9fe6.png)

