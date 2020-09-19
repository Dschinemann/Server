const { Model, DataTypes } = require('sequelize')
const sendNotification = require('../Notifications/notifications')

class Alertas extends Model {
  static init(sequelize) {
    super.init({
      titulo: DataTypes.STRING,
      descricao: DataTypes.STRING,
      valor: DataTypes.FLOAT,
      local: DataTypes.STRING,
      cep: DataTypes.STRING,
      tipo_de_profissão: DataTypes.STRING,
      status: DataTypes.STRING,
      ocup_id: DataTypes.INTEGER,
      ConnOnSignal:DataTypes.VIRTUAL,
      vagas:DataTypes.INTEGER,

    }, {
      hooks: {
        afterCreate: async (alert) => {
           
          let Message = {
            app_id: process.env.APP_ID,
            template_id: "80dd01ed-8f3e-4189-b855-a839bee1861f",
            contents: { "en": "Um novo alerta foi cadastrado para seu perfil, verifique agora!" },            
            filters: [
              { "field": "tag", "key": "ocup_id", "relation": "=", "value": alert.ocup_id },            
              { "field": "tag", "key": "user", "relation": "!=", "value": alert.ConnOnSignal} // ${alert.ocup_id}
            ]
          }
          sendNotification.sendNotification(Message)
        }
      },
      sequelize
    })

    return this
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    this.hasMany(models.Inscricao, {foreignKey:'alert_id', as:'alert'})
  }
}

module.exports = Alertas