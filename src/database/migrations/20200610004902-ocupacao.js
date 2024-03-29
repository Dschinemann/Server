'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {        
    return queryInterface.createTable('ocupacao', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      }, 
      codigo:{
        type:Sequelize.INTEGER,
        allowNull:false,
      },
      titulo:{
        type:Sequelize.STRING,
        allowNull:false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable('ocupacao');
    
  }
};