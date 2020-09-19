'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {        
    return queryInterface.createTable('users_fotos', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      },        
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{ model:'users', key:'id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
        unique:true    
        
      },
      name:{
        type:Sequelize.STRING,
        allowNull:false,
      },
      key:{
        type:Sequelize.STRING,
        allowNull:false,
      },
      url:{
        type:Sequelize.STRING,        
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
    
      return queryInterface.dropTable('users_fotos');
    
  }
};