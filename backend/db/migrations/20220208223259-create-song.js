'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      public_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      picture_url: {
        type: Sequelize.STRING,
        allowNull: true,
        default: 'https://images.prismic.io/milanote/f98c1fa182f20a22c8889b93c6ab72a17ff59d0d_thumbnail.jpg?auto=compress,format'
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Songs');
  }
};