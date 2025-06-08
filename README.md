# API de Produtos em Node.js

Este é um projeto de API simples desenvolvido em Node.js para gerenciar um cadastro de produtos. Ele utiliza um arquivo de backup (`.bak`) como banco de dados para persistência dos dados.

## 🚀 Começando

Estas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### ✅ Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:
* [Node.js](https://nodejs.org/en/) (que inclui o npm)
* Um editor de código de sua preferência (ex: [VS Code](https://code.visualstudio.com/))
* A extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) para o VS Code (ou similar para o seu editor)

### ⚙️ Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

1.  **Clone o repositório para a sua máquina local:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    ```

2.  **Acesse o diretório do projeto:**
    ```bash
    cd <NOME_DO_SEU_PROJETO>
    ```

3.  **Instale as dependências do Node.js:**
    ```bash
    npm install
    ```

## ▶️ Executando o Projeto

Para colocar a aplicação em funcionamento, o backend (servidor) e o frontend (interface do usuário) devem ser iniciados separadamente.

### 1. Iniciando o Servidor (Backend)

O servidor Node.js é o coração da aplicação, responsável por toda a lógica de negócio.

* **Navegue até a pasta do servidor:**
    ```bash
    cd node.app
    ```
* **Execute o script para iniciar o servidor:**
    ```bash
    npm run start
    ```
    (ou `npm run dev`, dependendo de como o seu arquivo `package.json` está configurado).

O terminal deverá indicar que o servidor está rodando, geralmente na porta `3000` ou `3001`.

### 2. Abrindo a Interface do Usuário (Frontend)

A interface do usuário é um arquivo HTML que consome os dados do servidor.

* No seu editor de código (VS Code), clique com o botão direito no arquivo `index.html` (ou o arquivo HTML principal).
* Selecione a opção **"Open with Live Server"**.

Isso abrirá a página no seu navegador padrão, e você poderá interagir com a aplicação.

## 🗃️ Banco de Dados

O banco de dados utilizado neste projeto é um arquivo de backup chamado **`DB.bak`**.

Este arquivo contém todos os dados dos produtos e é utilizado pela API para as operações de **CRUD** (Criar, Ler, Atualizar e Excluir). Certifique-se de que o arquivo `DB.bak` esteja no local esperado pelo servidor para que a aplicação funcione corretamente.
![{45023D0E-49F2-433D-A830-6DD8C018085A}](https://github.com/user-attachments/assets/d9c7047c-2bfd-401c-ab2f-ce1386bdf13c)
![{7A9F2E2B-3550-4116-8B6D-04C35D779D70}](https://github.com/user-attachments/assets/77c2bb0a-1363-4ec8-95f3-8b313eaa98ac)
![{36186504-FAC3-4B54-A875-15981039A2EF}](https://github.com/user-attachments/assets/89282856-d212-4c21-a45e-46c12e42f9a4)
![{5752967C-3762-4137-87C1-98F791D31606}](https://github.com/user-attachments/assets/5f928513-034e-4ecf-a65a-78eff2b8723f)
