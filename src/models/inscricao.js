const { Model, DataTypes } = require('sequelize')
const userNotification = require('../Notifications/notifications')

class Inscricao extends Model {
    static init(sequelize) {
        super.init({
            titulo: DataTypes.STRING,
            name: DataTypes.STRING,
            url: DataTypes.STRING,
            telefone: DataTypes.STRING,
            email: DataTypes.STRING,
            selecao: DataTypes.STRING,
            avaliado: DataTypes.STRING,
            rating: DataTypes.FLOAT,
            valor: DataTypes.FLOAT,
            aceite: DataTypes.STRING,
            local: DataTypes.STRING,

        }, {
            hooks: {
               beforeUpdate: async (inscricao) => {
                    
                    let Message = {
                        app_id: process.env.APP_ID,
                        template_id: "80dd01ed-8f3e-4189-b855-a839bee1861f",
                        contents: { "en": `Você foi selecionado para o alerta\n código:  ${inscricao.alert_id} titulo:  ${inscricao.titulo},\nverifique nos alertas que você esta inscrito e responda o anunciante o mais rápido possível! `},
                        filters: [
                            { "field": "tag", "key": "user_id", "relation": "=", "value": inscricao.user_id }                           
                        ]
                    }
                    userNotification.userNotification(Message)
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