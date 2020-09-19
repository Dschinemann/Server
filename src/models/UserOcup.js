const {Model, DataTypes} = require('sequelize')

class UserOcup extends Model{
    static init(sequelize){
        super.init({            
            name:DataTypes.STRING,
            ocup_titulo:DataTypes.STRING,           
            
        }, {
            sequelize,
            tableName:"userocup"
        })
      }
      static associate(models){
        this.belongsTo(models.User,{foreignKey:'user_id', as:'user'}) 
        this.belongsTo(models.Ocupacao,{foreignKey:'ocup_id', as:'ocup'})
          
      }
}

module.exports = UserOcup