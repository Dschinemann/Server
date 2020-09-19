'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {        
    return queryInterface.createTable('inscricoes', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      },
      titulo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      valor:{
        allowNull:false,
        type:Sequelize.FLOAT
      },             
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{ model:'users', key:'id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      alert_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{ model:'alertas', key:'id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      name:{
        allowNull:false,
        type:Sequelize.STRING
      },
      rating:{
        allowNull:false,
        type:Sequelize.FLOAT
      },    
      email:{
        allowNull:false,
        type:Sequelize.STRING
      },
      url:{
        allowNull:false,
        type:Sequelize.STRING
      },
      telefone:{
        allowNull:false,
        type:Sequelize.STRING
      },
      selecao:{
        allowNull:false,
        type:Sequelize.STRING
      },
      avaliado:{
        allowNull:false,
        type:Sequelize.STRING
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
    
      return queryInterface.dropTable('inscricoes');
    
  }
};
