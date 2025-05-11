'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clients', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      name: Sequelize.STRING,
      documentId: { type: Sequelize.STRING, unique: true },
      documentType: Sequelize.ENUM('CPF', 'CNPJ'),
      planType: Sequelize.ENUM('prepaid', 'postpaid'),
      balance: { type: Sequelize.FLOAT, defaultValue: 0 },
      limit: { type: Sequelize.FLOAT, defaultValue: 0 },
      active: { type: Sequelize.BOOLEAN, defaultValue: true },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('clients');
  }
};
