// src/models/User.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {}

User.init(
  {
    nom: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users', // la table s'appellera "users"
  }
);

export default User;