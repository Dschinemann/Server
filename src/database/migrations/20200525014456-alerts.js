'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {        
    return queryInterface.createTable('alertas', { 
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
      descricao: {
        allowNull: false,
        type: Sequelize.STRING,
        
      },
      valor: {
        allowNull: false,
        type:Sequelize.FLOAT(11,2)        
      },
      local: {
        allowNull: false,
        type: Sequelize.STRING,
        
      },
      CEP: {
        allowNull: false,
        type: Sequelize.STRING,
        
      },        
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{ model:'users', key:'id'},
        onUpdate:'CASCADE',
        onDelete:'CASCADE' 
      },
      status:{
        allowNull: false,
        type: Sequelize.STRING,
      },      
      tipo_de_profissão:{
        allowNull: false,
        type: Sequelize.STRING,
      },
      ocup_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
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
    
      return queryInterface.dropTable('alertas');
    
  }
};
