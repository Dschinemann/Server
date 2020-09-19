'use strict';



module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',
      'key_cv',
      {        
        type:Sequelize.STRING        
      },
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'users',
      'key_cv',
    )
  }
};

