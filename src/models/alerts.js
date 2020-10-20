const { Model, DataTypes } = require('sequelize');
const sendNotification = require('../Notifications/firebase');
const UserOcup = require('../models/UserOcup');

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
      ConnOnSignal: DataTypes.VIRTUAL,
      vagas: DataTypes.INTEGER,
      agendado: DataTypes.BOOLEAN,
      dtFinal: DataTypes.DATE,
      dtInicial: DataTypes.DATE,
      hrFinal: DataTypes.DATE,
      hrInicial: DataTypes.DATE,
      imediato: DataTypes.BOOLEAN,
      intervalo: DataTypes.BOOLEAN,
      intervaloFin: DataTypes.DATE,
      intervaloInit: DataTypes.DATE,
    }, {
      hooks: {
        afterCreate: async (alert) => {
          if (alert.imediato) {
            let response = await UserOcup.findAll({
              where: {
                ocup_id: alert.ocup_id
              }
            })
            let arrayUser = response.map(ele => ele.dataValues.tokenfirebase)
            return sendNotification.urgentMessage(arrayUser, alert);
          } else {
            let response = await UserOcup.findAll({
              where: {
                ocup_id: alert.ocup_id
              }
            })
            let arrayUser = response.map(ele => ele.dataValues.tokenfirebase)
            sendNotification.sendMessage(arrayUser);
          }
        }
      },
      sequelize
    });
    return this
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    this.hasMany(models.Inscricao, { foreignKey: 'alert_id', as: 'alert' })
  }
}

module.exports = Alertas;