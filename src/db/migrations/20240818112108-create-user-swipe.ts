import { QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async up (queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.createTable('user_swipes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      target_user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      swipe_direction: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.dropTable('user_swipes');
  }
};
