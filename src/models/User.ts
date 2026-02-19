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
    matricule: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    present: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  }
);

export default User;