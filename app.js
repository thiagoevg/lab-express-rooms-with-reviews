// Configurando o servidor para ter acesso às variáveis de ambiente do sistema operacional
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const PORT = 4000;

const app = express();

// Importando as configurações do banco de dados e inicializando a conexão
const db = require("./config/db.config");
db();

// Configurar o express para entender requisições contendo JSON no corpo
app.use(express.json());

// Configurar o CORS (Cross-Origin-Resource-Sharing) para permitir que o nosso cliente React acesse este servidor de um domínio diferente
app.use(cors({ origin: "http://localhost:3000" }));

// Importa e configura nossas rotas
const roomsRouter = require("./routes/room.routes");
app.use("/", roomsRouter);

// const productRouter = require("./routes/product.routes");
// app.use("/", productRouter);

// const transactionRouter = require("./routes/transaction.routes");
// app.use("/", transactionRouter);

// Inicia o servidor para escutar requisições HTTP na porta 4000
app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
