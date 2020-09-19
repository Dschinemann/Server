const {Model, DataTypes} = require('sequelize')

class Message extends Model{
    static init(sequelize){
        super.init({
            text: DataTypes.STRING,
            sender_name:DataTypes.STRING,
            url:DataTypes.STRING,
            receiver_name:DataTypes.STRING,
        }, {
            sequelize
        })
    }
      static associate(models){
        this.belongsTo(models.Conversation,{foreignKey:'id_message', as:'idsMsg'}) 
        this.belongsTo(models.User,{foreignKey:'sender', as:'sender1'})
        this.belongsTo(models.User,{foreignKey:'receiver',as:'receiver1'})    
                   
    }

}

module.exports = Message  