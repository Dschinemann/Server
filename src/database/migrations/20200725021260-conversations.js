'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {        
    return queryInterface.createTable('conversation', {
      id: {
        type: Sequelize.INTEGER,        
        primaryKey:true,        
        allowNull:false,
        autoIncrement:true,
      }, 
      user_id1: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{ model:'users', key:'id'}, 
      },
      user_id2: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{ model:'users', key:'id'}, 
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
    
      return queryInterface.dropTable('conversation');
    
  }
};
