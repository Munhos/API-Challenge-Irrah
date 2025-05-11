'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('messages', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: true
      },
      conversationId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'conversations',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      senderId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'clients',
          key: 'id'
        }
      },
      recipientId: Sequelize.STRING,
      content: Sequelize.TEXT,
      timestamp: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      priority: Sequelize.ENUM('normal', 'urgent'),
      status: {
        type: Sequelize.ENUM('queued', 'processing', 'sent', 'delivered', 'read', 'failed'),
        defaultValue: 'queued'
      },
      cost: Sequelize.FLOAT,
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('messages');
  }
};
