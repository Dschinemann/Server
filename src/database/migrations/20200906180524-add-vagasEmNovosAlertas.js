'use strict';



module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'alertas',
      'vagas',
      {  
        allowNull: false,     
        type:Sequelize.INTEGER,       
      },
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'alertas',
      'vagas',
    )
  }
};