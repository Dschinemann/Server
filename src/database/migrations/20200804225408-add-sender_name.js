'use strict';



module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'messages',
      'sender_name',
      {
        allowNull: false,
        type:Sequelize.STRING        
      },
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'messages',
      'sender_name',
    )
  }
};

