'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('alertas', 'agendado', {
        type: Sequelize.BOOLEAN,
        allowNull: false
      });
      await queryInterface.addColumn('alertas', 'dt_Final', {
        type: Sequelize.DATE,
        allowNull: false
      });
      await queryInterface.addColumn('alertas', 'dt_Inicial', {
        type: Sequelize.DATE,
        allowNull: false
      });
      await queryInterface.addColumn('alertas', 'hr_Final', {
        type: Sequelize.DATE,
        allowNull: false
      });
      await queryInterface.addColumn('alertas', 'hr_Inicial', {
        type: Sequelize.DATE,
        allowNull: false
      });
      await queryInterface.addColumn('alertas', 'imediato', {
        type: Sequelize.BOOLEAN,
        allowNull: false
      });
      await queryInterface.addColumn('alertas', 'intervalo', {
        type: Sequelize.BOOLEAN,
        allowNull: false
      });
      await queryInterface.addColumn('alertas',  'intervalo_Fin', {
        type: Sequelize.DATE,
        allowNull: false
      });
      await queryInterface.addColumn('alertas', 'intervalo_Init', {
        type: Sequelize.DATE,
        allowNull: false
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('alertas','agendado');
      await queryInterface.removeColumn('alertas','dt_Final');
      await queryInterface.removeColumn('alertas','dt_Inicial');
      await queryInterface.removeColumn('alertas','hr_Final');
      await queryInterface.removeColumn('alertas','hr_Inicial');
      await queryInterface.removeColumn('alertas','imediato');
      await queryInterface.removeColumn('alertas','intervalo');
      await queryInterface.removeColumn('alertas','intervalo_Fin');
      await queryInterface.removeColumn('alertas','intervalo_Init');
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
