// src/index.ts
import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./database/db";
import { Sequelize } from "sequelize";

dotenv.config();

const app = express();
export const router = express.Router();
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3001;

const createDatabaseIfNotExists = async () => {
  const tempSequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "123456",
    database: "postgres",
    logging: false,
  });

  const dbName = process.env.DB_NAME || "Big-Chat-DEV";

  try {
    await tempSequelize.query(`CREATE DATABASE "${dbName}"`);
    console.log(`Banco de dados "${dbName}" criado com sucesso.`);
  } catch (error: any) {
    if (error.original?.code === "42P04") {
      console.log(`Banco de dados "${dbName}" já existe.`);
    } else {
      console.error("Erro ao criar o banco de dados:", error);
      throw error;
    }
  } finally {
    await tempSequelize.close();
  }
};

const startServer = async () => {
  try {
    await createDatabaseIfNotExists();

    await sequelize.authenticate();
    console.log("Conexão com o banco de dados foi bem-sucedida!");

    await sequelize.sync({ force: false });
    console.log("Tabelas sincronizadas com sucesso!");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
};

startServer();