# QA-Commerce

<img src="https://visitor-badge.laobi.icu/badge?page_id=edcaetanoguedes&" />

<div class="author">
  <p>Autor <a href="https://github.com/edcaetanoguedes">Ednaldo Guedes</a></p>
</div>

## Clone e execução local

### Pré-requisitos
- Node.js - Você encontra em: https://nodejs.org/en/
- VSCode (ou editor de sua prefrência) - você encontra em: https://code.visualstudio.com/download
- Git: você encontra em: https://git-scm.com/downloads

### Instalação

- Clone o repositório `git clone https://github.com/edcaetanoguedes/qa-commerce.git`.
- Acesse a pasta do repósitorio `cd qa-commerce`.
- Execute `npm update` para atualizar as dependências do projeto.
- Execute `npm install` para instalar as dependências do projeto.
- Execute `npm install cypress cypress-cucumber-preprocessor` para instalar `Cypress` e `Cucumber`.
- Altere o arquivo `package.json` (isso permitirá rodar os testes Cypress com `npm run cy:open`).
```
"scripts": {
    ...,
    "cy:open": "cypress open"
  }
```

### Principais dependências
- @badeball/cypress-cucumber-preprocessor - permite a execução de testes escritos no formato Cucumber/Gherkin (`.feature` file).
- @bahmutov/cypress-esbuild-preprocessor - permite que o cypress processe arquivos `.feature` combinados com `javascript`.
- @bahmutov/cypress-esbuild-preprocessor - é um preprocessador para o Cypress baseado no esbuild, que melhora o desempenho dos testes ao compilar arquivos JavaScript e TypeScript.

### Para rodar o projeto

- É necessário criar o arquivo `.env`, e inserir a chave `SECRET_KEY` com o valor `77fd45e9dd8d1de57e2f3bac9430930bcd9baebdb3144ea5e4f414435659fd81`.
  É estritamente não recomendado o compartilhamento de qualquer tipo de credenciais publicamente, esta é uma exceção.
- Execute `npm start` para rodar o servidor e o banco de dados.
- Acesse o site em  `http://localhost:3000`.
- Acesse a documentação em  `http://localhost:3000/api-docs`.

## Documentação
- API: Documentada em `Swagger` (https://swagger.io/).

## Testes
As ferramentas utilizadas para testes foram `Cypress` e `Cucumber`.

### Rodar testes

- Execute `npm run cy:open`.
- Abrirá uma janela do Cypress no navegador.
- Selecione `E2E` e o navegador que deseja utilizar.
- Outra janela de navegador abrirá.
- No menu esquerdo selecione `Spec`, aparecerá uma lista de `.feature`.
  - checkout-simples
  - checkout-completo
  - api
- Execute o teste sequencialmente.


## Créditos

Projeto original de `Fábio Araújo`, `Bruna Emerich` e `Tamara Fontanella`.