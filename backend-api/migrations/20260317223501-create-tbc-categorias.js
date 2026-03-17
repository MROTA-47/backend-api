'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tbc_categorias', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: Sequelize.STRING,
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tbc_categorias');
  }
};