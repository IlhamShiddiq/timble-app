import { Model, DataTypes } from 'sequelize';
import sequelize from '../../configs/db.config';

interface UserAttributes {
  id: string;
  name: string;
  username: string;
  password: string;
  gender: string;
  is_premium: boolean;
  created_at?: Date;
  updated_at?: Date;
}

class UserModel extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public name!: string;
  public username!: string;
  public password!: string;
  public gender!: string;
  public is_premium!: boolean;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

UserModel.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    is_premium: DataTypes.BOOLEAN,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'UserModel',
    tableName: 'users',
  }
);

export default UserModel;