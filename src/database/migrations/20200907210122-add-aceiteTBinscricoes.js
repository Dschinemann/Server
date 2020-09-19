'use strict';



module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'inscricoes',
      'aceite',
      {  
        allowNull: false,     
        type:Sequelize.STRING,       
      },
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'inscricoes',
      'aceite',
    )
  }
};