const {Model, DataTypes} = require('sequelize')

class FeedBack extends Model{
    static init(sequelize){
        super.init({            
            user_name_avaliado:DataTypes.STRING,
            user_avaliado_url:DataTypes.STRING,
            nota:DataTypes.INTEGER,
            feedback:DataTypes.STRING,
            user_name_feedback:DataTypes.STRING,
            
        }, {
            sequelize,
            tableName:"feedBack"
        })
      }
      static associate(models){
          this.belongsTo(models.User,{foreignKey:'user_id_avaliado', as:'user'})
          this.belongsTo(models.User,{foreignKey:'user_id_feedback', as:'userFeedBack'})          
      }
}

module.exports = FeedBack