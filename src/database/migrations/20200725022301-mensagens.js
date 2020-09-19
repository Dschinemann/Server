'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {        
    return queryInterface.createTable('messages', {
      id: {
        type: Sequelize.INTEGER, 
        allowNull:false,
        primaryKey:true,       
        autoIncrement:true,  
      },
      id_message: {
        type: Sequelize.INTEGER, 
        allowNull:false,        
        references:{ model:'conversation', key:'id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE'   
      },
      sender: {
        allowNull: false,
        type: Sequelize.INTEGER,      
      },
      receiver: {
        allowNull: false,
        type: Sequelize.INTEGER,         
      },
      text:{
        type: Sequelize.STRING,
        allowNull:false
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
    
      return queryInterface.dropTable('messages');
    
  }
};

