'use strict';



module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'userocup',
      'tokenfirebase',
      {     
        type:Sequelize.STRING,       
      },
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'userocup',
      'tokenfirebase',
    )
  }
};