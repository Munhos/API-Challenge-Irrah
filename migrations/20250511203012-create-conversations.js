'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('conversations', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      clientId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'clients',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      recipientId: Sequelize.STRING,
      recipientName: Sequelize.STRING,
      lastMessageContent: Sequelize.TEXT,
      lastMessageTime: Sequelize.DATE,
      unreadCount: { type: Sequelize.INTEGER, defaultValue: 0 },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('conversations');
  }
};
