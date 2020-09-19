const { Model, DataTypes } = require('sequelize')

class UploadFoto extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            key: DataTypes.STRING,
            url: DataTypes.STRING,
        },
            {
                sequelize,
                tableName: 'users_fotos'
            })

        return this

    }
    static associate(models) {

        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'upload' })

    }
}

module.exports = UploadFoto