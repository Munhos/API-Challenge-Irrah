// src/routes/clients.routes.ts
import { Router } from "express";
import { ClientsController } from "../../controllers/ClientsController/ClientsController";

const router = Router();
const controller = new ClientsController();

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Criar um novo cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: { nome: "Maria", email: "maria@email.com" }
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 */
router.post("/clients", () => {controller.createClient});

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Listar todos os clientes
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
router.get("/clients", () => {controller.getAllClients});

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Buscar cliente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente encontrado
 */
router.get("/clients/:id", () => {controller.getClientById});

/**
 * @swagger
 * /clients/{id}:
 *   patch:
 *     summary: Atualizar dados do cliente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: { nome: "Maria Atualizada" }
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 */
router.patch("/clients/:id", () => {controller.updateClient});

/**
 * @swagger
 * /clients/{id}/balance:
 *   get:
 *     summary: Verificar saldo ou dívida do cliente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Saldo verificado
 */
router.get("/clients/:id/balance", () => {controller.getClientBalance});

export default router;
