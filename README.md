# Desafio Aionz

Siga os passos abaixo para executar o projeto em seu ambiente local. O Container do Docker já sobe as imagens do frontend, backend e banco de dados. O frontend possui um Storybook configurado para visualizar os componentes, e caso o projeto rode pelo docker, um servidor do nginx serve como proxy, servindo os arquivos estáticos, evitando problemas de origem.

---

## Pré-requisitos

* **Docker**
* **Docker Compose**

---

## Passos para Execução (Com Docker Compose)

1. **Clone o repositório:**
    ```sh
    git clone https://github.com/verezeeee/desafio-aionz.git
    cd desafio-aionz
    ```

2. **Suba os containers:**
    Execute o seguinte comando na raiz do projeto para construir as imagens e iniciar os containers:
    ```sh
    docker-compose up -d --build
    ```
    Isso iniciará o **Frontend**, **Backend** e o **Banco de Dados** (PostgreSQL).

---

## Acesso

Após a execução, a aplicação estará disponível nos seguintes endereços:

* **Frontend:** [http://localhost:4200](http://localhost:4200)
* **Backend:** [http://localhost:3000](http://localhost:3000)

---

## Alternativa: Rodando os Serviços Separadamente

Caso prefira rodar o frontend e backend sem o Docker Compose (assumindo que o banco de dados esteja rodando separadamente ou você configure o acesso):

### Backend (Nest.js)

1. Entre na pasta do backend:
    ```sh
    cd backend-aionz
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Inicie o servidor:
    ```sh
    npm run start:dev
    ```
    O backend estará disponível em `http://localhost:3000`.
    O Acesso a documentação do Swagger estará disponível em `http://localhost:3000/api`

### Frontend (Angular)

1. Entre na pasta do frontend:
    ```sh
    cd ../frontend-aionz
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Inicie a aplicação:
    ```sh
    ng dev
    ```
    O frontend estará disponível em `http://localhost:4200`.
    O projeto contém sstorybook configurado também, e para iniciar ele, execute:
    ```sh
    npm run storybook
    ```
    O comando `npm run storybook` irá iniciar o Storybook na porta [6006](http://localhost:6006).

---

## Para Parar os Containers

Execute o comando na raiz do projeto:

```sh
docker-compose down
