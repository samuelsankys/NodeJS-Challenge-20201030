# NodeJs Challenge 20201030

## Introdução

Esse Projeto trata-se de um desafio de desenvolver uma REST API que utiliza os dados do projeto Open Food Facts.

## Como instalar

### Variáveis de Ambiente

Para rodar esse projeto, você vai precisar realizar duas cópias do arquivo `.env.example` e renomeá-lo para `.env` e `.env.development`.

A senha deve ser de acordo com seu banco de dados local.

### Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/samuelsankys/NodeJS-Challenge-20201030.git
```

#### Iniciando o servidor

- Entre no diretório do projeto `Ex.: NodeJS-Challenge-20201030
`

- Instale as dependências.

```bash
  npm install
```

- Crie o banco de dados do projeto e as tabelas, com os seguintes comandos.

```bash
  npx sequelize-cli db:create
```

e

```bash
  npx sequelize-cli db:migrate
```

- Depois de criado o banco de dados, inicialize o servidor

```bash
  npm run dev
```

em modo de desenvolvimento, e

```bash
  npm run start
```

em modo de produção

### Como acessar as Rotas

O botão abaixoirá exportar a configuração do projeto para testar as rotas.

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=NodeJs-Challenge-20201030%20-%20Samuel%20Santana&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fsamuelsankys%2FNodeJS-Challenge-20201030%2Fmain%2FnodeChallenge.json)

### Observações

- O servidor deve ser inicializado somente após a criação do banco de dados.
- Ao inicializar o servidor pela primeira vez, ele verificará se existe algum dado sincronizado e sincronizará trazendo 100 produtos de cada arquivo. Após essa primeira sincronização, ele só irá sincronizar às 3 da manhã de cada dia, através de uma cron.
- No carregamento dos dados, foi necessário modificar a estrutura do dos campos url, categories e ingredients_text para o tipo TEXT por conta de seu tamanho.

## O projeto

- Para desenvolvimento do projeto foi escolhido o banco de dados MySQL, e o drive sequelize.

## Processo de Criação e desenvolvimento

1. Inicialmente foi instalados os pacotes básicos para inicialização do servidor, tais como express, nodemon, body-parser e morgan.

2. Inicialização da porta e criação das configurações do app

3. Configuração do ESLint e prettier

4. Foi utilizado Stream para manipulação dos dados, e carregado na memória, somente os que seriam necessários para carregar no banco de dados.
