const {Model, DataTypes} = require('sequelize')

class Ocupacao extends Model{
    static init(sequelize){
        super.init({
            codigo: DataTypes.STRING,
            titulo: DataTypes.STRING,
                      
        }, {
            sequelize,
            tableName:'ocupacao'
        })
    }
}

module.exports = Ocupacao