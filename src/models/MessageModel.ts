import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/db';
import { Client } from './ClientModel';
import { Conversation } from './ConversationModel';

export interface MessageAttributes {
  id: string;
  conversationId: number;
  senderId: number;
  recipientId: string;
  content: string;
  timestamp: Date;
  priority: 'normal' | 'urgent';
  status: 'queued' | 'processing' | 'sent' | 'delivered' | 'read' | 'failed';
  cost: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface MessageCreationAttributes extends Optional<MessageAttributes, 'id'> {}

export const Message = sequelize.define<Model<MessageAttributes, MessageCreationAttributes>>(
  'Message',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    conversationId: {
      type: DataTypes.INTEGER,
      references: { model: 'conversations', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false
    },
    senderId: {
      type: DataTypes.INTEGER,
      references: { model: 'clients', key: 'id' },
      allowNull: false
    },
    recipientId: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    timestamp: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    priority: { type: DataTypes.ENUM('normal', 'urgent'), allowNull: false },
    status: {
      type: DataTypes.ENUM('queued', 'processing', 'sent', 'delivered', 'read', 'failed'),
      allowNull: false,
      defaultValue: 'queued'
    },
    cost: { type: DataTypes.FLOAT, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  {
    tableName: 'messages',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

