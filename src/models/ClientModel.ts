import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/db';

export interface ClientAttributes {
  id?: string; 
  name: string;
  documentId: string;
  documentType: 'CPF' | 'CNPJ';
  planType: 'prepaid' | 'postpaid';
  balance: number;
  limit: number;
  active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface ClientCreationAttributes extends Optional<ClientAttributes, 'id'> {}

export const Client = sequelize.define<Model<ClientAttributes, ClientCreationAttributes>>(
  'Client',
  {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: false},
    name: { type: DataTypes.STRING },
    documentId: { type: DataTypes.STRING, unique: true },
    documentType: { type: DataTypes.ENUM('CPF', 'CNPJ') },
    planType: { type: DataTypes.ENUM('prepaid', 'postpaid') },
    balance: { type: DataTypes.FLOAT, defaultValue: 0 },
    limit: { type: DataTypes.FLOAT, defaultValue: 0 },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: 'clients',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
