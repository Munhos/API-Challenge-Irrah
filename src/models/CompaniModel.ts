import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database/db';

export interface CompaniAttributes {
  id: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface CompaniCreationAttributes extends Optional<CompaniAttributes, 'id'> {}

export const Compani = sequelize.define<Model<CompaniAttributes, CompaniCreationAttributes>>(
  'Compani',
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  {
    tableName: 'compani',
    timestamps: true,
    underscored: true
  }
);
