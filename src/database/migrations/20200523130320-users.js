'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {        
    return queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nasc: {
        allowNull: false,
        type: Sequelize.DATE,
        
      },
      idade: {
        allowNull: false,
        type: Sequelize.INTEGER,        
      },
      sexo: {
        allowNull: false,
        type: Sequelize.STRING,
        
      },
      cep: {
        allowNull: false,
        type: Sequelize.STRING,
        
      },        
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      password_hash: {
        allowNull: false,
        type: Sequelize.STRING,
        select:false
        
      }, 
      telefone:{
        allowNull: false,
        type: Sequelize.STRING,
      },
      anunciante: {
        allowNull: false,
        type: Sequelize.STRING,        
      },
      possui_mei_ou_cnpj: {
        allowNull: false,
        type: Sequelize.STRING,        
      },
      rating:{
        allowNull:false,
        type:Sequelize.FLOAT
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
    
      return queryInterface.dropTable('users');
    
  }
};
