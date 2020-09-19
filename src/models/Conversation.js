const {Model, DataTypes} = require('sequelize')

class Conversation extends Model{
    static init(sequelize){
        super.init({
  
                
        }, {
            sequelize,
            tableName:"conversation"
        })
    }
      static associate(models){
        this.hasMany(models.Message,{ foreignKey:'id_message', as:'id_msgs'})
        this.belongsTo(models.User,{ foreignKey:'user_id1', as:'id1'})
        this.belongsTo(models.User,{ foreignKey:'user_id2', as:'id2'})
              
    }

}

module.exports = Conversation