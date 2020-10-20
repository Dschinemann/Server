const { Model, DataTypes } = require('sequelize')
const userNotification = require('../Notifications/firebase')
const UserOpcup = require('../models/UserOcup')

class Inscricao extends Model {
    static init(sequelize) {
        super.init({
            titulo: DataTypes.STRING,
            name: DataTypes.STRING,
            url: DataTypes.STRING,
            telefone: DataTypes.STRING,
            email: DataTypes.STRING,
            selecao: DataTypes.BOOLEAN,
            avaliado: DataTypes.BOOLEAN,
            rating: DataTypes.FLOAT,
            valor: DataTypes.FLOAT,
            aceite: DataTypes.STRING,
            local: DataTypes.STRING,

        }, {
            hooks: {
                afterUpdate: async (inscricao) => {
                    if(inscricao.selecao === true) {
                        let response = await UserOpcup.findOne({where: {
                            user_id: inscricao.user_id
                        }})
                        userNotification.sendNotificationSelectionsUser(response.tokenfirebase,inscricao.dataValues)
                    }
                }
            },
            sequelize,
            tableName: "inscricoes"
        })
    }
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
        this.belongsTo(models.Alertas, { foreignKey: 'alert_id', as: 'alert' })

    }
}

module.exports = Inscricao