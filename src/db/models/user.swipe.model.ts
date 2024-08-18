import { Model, DataTypes, Association } from 'sequelize';
import sequelize from '../../configs/db.config';

import UserModel from './user.model';

interface UserSwipeAttributes {
  id: string;
  user_id: string;
  target_user_id: string;
  swipe_direction: string;
  created_at?: Date;
  updated_at?: Date;
}

class UserSwipeModel extends Model<UserSwipeAttributes> implements UserSwipeAttributes {
  public id!: string;
  public user_id!: string;
  public target_user_id!: string;
  public swipe_direction!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public static associations: {
    user: Association<UserSwipeModel, UserModel>;
    target_user: Association<UserSwipeModel, UserModel>;
  };
}

UserSwipeModel.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    user_id: DataTypes.UUID,
    target_user_id: DataTypes.UUID,
    swipe_direction: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'UserSwipe',
    tableName: 'user_swipes',
  }
);

UserSwipeModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE' });
UserSwipeModel.belongsTo(UserModel, { foreignKey: 'target_user_id', as: 'target_user', onDelete: 'CASCADE' });

export default UserSwipeModel;