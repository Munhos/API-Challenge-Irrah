import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/db';
import { Client } from './ClientModel';
import { Message } from './MessageModel';

export interface ConversationAttributes {
  id: number;
  clientId: number;
  recipientId: string;
  recipientName: string;
  lastMessageContent: string;
  lastMessageTime: Date;
  unreadCount: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface ConversationCreationAttributes extends Optional<ConversationAttributes, 'id'> {}

export const Conversation = sequelize.define<Model<ConversationAttributes, ConversationCreationAttributes>>(
  'Conversation',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: { model: 'clients', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
      allowNull: false,
    },
    recipientId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastMessageContent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lastMessageTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    unreadCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    }
  },
  {
    tableName: 'conversations',
    timestamps: true,
    underscored: true,
  }
);

// Associações
Conversation.belongsTo(Client, { foreignKey: 'clientId' });
Conversation.hasMany(Message, { foreignKey: 'conversationId' });
