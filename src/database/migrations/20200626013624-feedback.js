'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {        
    return queryInterface.createTable('feedBack', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      }, 
      user_id_avaliado: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{ model:'users', key:'id'}, 
      },
      user_name_avaliado:{  
        type: Sequelize.STRING,
        allowNull:false      
      },
      user_avaliado_url:{
        type: Sequelize.STRING,
        allowNull:false 
      },
      nota:{
        type: Sequelize.INTEGER,
        allowNull:false 
      },
      user_id_feedback: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{ model:'users', key:'id'},
      },
      feedback:{
        type: Sequelize.STRING,
        allowNull:false
      },
      user_name_feedback:{
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
    
      return queryInterface.dropTable('feedBack');
    
  }
};