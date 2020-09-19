'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {        
    return queryInterface.createTable('userocup', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      }, 
      user_id: {
        allowNull: false,
        unique:true,
        type: Sequelize.INTEGER,
        references:{ model:'users', key:'id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE' 
      },
      name:{  
        type: Sequelize.STRING,
        allowNull:false      
      },
      ocup_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{ model:'ocupacao', key:'id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE' 
      },
      ocup_titulo:{
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
    
      return queryInterface.dropTable('userocup');
    
  }
};