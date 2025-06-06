API-Challenge-Irrah | Desafio Backend - BCB
Visão Geral
Este projeto implementa um sistema de filas para mensagens de chat com priorização, conforme proposto no Desafio Backend - BCB. A aplicação foi desenvolvida com foco em eficiência, validações e organização de código, utilizando Node.js e banco de dados relacional.

Funcionalidades Implementadas
Parte 1: Funcionalidades Essenciais
API de autenticação e gerenciamento de clientes
Envio e recebimento de mensagens via endpoints RESTful
Fila de mensagens em memória (FIFO)
Processamento síncrono de mensagens
Validação de saldo/limite conforme plano (pré ou pós-pago)
Parte 2: Aprimoramentos
Autenticação via CPF/CNPJ no header
Fila com dois níveis de prioridade: normal e urgent
Balanceamento de ordem/urgência para evitar starvation
Status detalhado das mensagens: queued, sent, delivered, etc.
Parte 3: Recursos Adicionais
Fila assíncrona com worker em background
Simulação de comunicação em tempo real
Endpoints de monitoramento: tamanho da fila, mensagens processadas
Sistema de cache para performance (em progresso/opcional)
Tecnologias Utilizadas
Node.js com Express.js
PostgreSQL com Prisma ORM
JWT para autenticação
Passo a Passo para Execução da API
Em uma pasta execute os comandos a seguir no cmd:

git init
git clone https://github.com/Munhos/API-Challenge-Irrah.git
cd .\API-Challenge-Irrah\
npm install
code .
Ao acessar o projeto:

Crie uma pasta "seeders" na raiz do projeto
Modifique ".envexample" para ".env"
Execute os comandos:

npm run init ( inicia o banco de dados )
npm run dev
Estrutura de dados: Cliente: { "id": "client123", "name": "Empresa ABC Ltda", "documentId": "12345678000199", // CPF ou CNPJ "documentType": "CNPJ", // "CPF" ou "CNPJ" "planType": "prepaid", // "prepaid" ou "postpaid" "balance": 100.00, // saldo (para pré-pago) "limit": 0, // limite (para pós-pago) "active": true // status do cliente } Mensagens: { "id": "msg123", "conversationId": "conv456", // ID da conversa "senderId": "client123", // ID do cliente que enviou "recipientId": "user789", // ID do destinatário "content": "Olá, como vai?", // conteúdo da mensagem "timestamp": "2023-07-15T10:30:00Z", "priority": "normal", // "normal" ou "urgent" "status": "queued", // "queued", "processing", "sent", "delivered", "read", "failed" "cost": 0.25 // custo da mensagem (0.25 normal, 0.50 urgente) } Conversas: { "id": "conv456", "clientId": "client123", // ID do cliente "recipientId": "user789", // ID do usuário/destinatário "recipientName": "Maria Silva", // Nome do destinatário "lastMessageContent": "Olá, como vai?", "lastMessageTime": "2023-07-15T10:30:00Z", "unreadCount": 0 // contador de mensagens não lidas }

Rotas POST /auth - Autenticação simples do cliente (CPF/CNPJ) GET /clients - Lista clientes (admin) POST /clients - Cria novo cliente GET /clients/:id - Obtém detalhes de um cliente PUT /clients/:id - Atualiza um cliente GET /clients/:id/balance - Consulta saldo/limite do cliente

GET /conversations - Lista conversas do cliente autenticado GET /conversations/:id - Obtém detalhes de uma conversa GET /conversations/:id/messages - Obtém mensagens de uma conversa

POST /messages - Envia nova mensagem GET /messages - Lista mensagens com filtros GET /messages/:id - Obtém detalhes de uma mensagem GET /messages/:id/status - Verifica status de uma mensagem

GET /queue/status - Estatísticas da fila (tamanho, processadas, etc)
