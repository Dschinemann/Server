
const {Model, DataTypes} = require('sequelize')
const bcrypt = require ('bcryptjs')
const Ocupacao = require('../models/ocupacao');
const UserOcup = require('../models/UserOcup');



class User extends Model{
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            idade:DataTypes.INTEGER,
            nasc:DataTypes.DATE,
            sexo:DataTypes.STRING,
            cep:DataTypes.STRING,
            email:DataTypes.STRING,
            password:DataTypes.VIRTUAL, 
            password_hash:DataTypes.STRING,   
            telefone:DataTypes.STRING,   
            anunciante:DataTypes.BOOLEAN,   
            possui_mei_ou_cnpj:DataTypes.BOOLEAN,
            rating:DataTypes.FLOAT,
            curriculum_url:DataTypes.STRING,
            sobre_mim:DataTypes.STRING,
            key_cv:DataTypes.STRING,
            id_profissao:DataTypes.VIRTUAL,    
            
        }, {
            hooks:{
                beforeUpdate: async (user)=>{                  
                    if (user.password){
                        user.password_hash = await bcrypt.hash(user.password,8)
                    }
                },
                beforeSave: async (user) =>{
                    if (user.password){
                        user.password_hash = await bcrypt.hash(user.password,8)
                    }
                },
                afterCreate: async (user) =>{
                    let array = user.id_profissao
                    
                    async function create(item, indice) {
                        let response = await Ocupacao.findByPk(array[indice].id).then(
                            resolve => { 
                                if(!resolve){
                                    return
                                }else{
                                    let {id,titulo} = resolve
                                    return UserOcup.create({
                                        user_id:user.id,
                                        name:user.name,
                                        ocup_id:id,
                                        ocup_titulo:titulo
                                    })
                                }
                            }
                        )
                        .catch(err => {
                            return
                        })
                    }
                    array.forEach(create);

                }
            },
            sequelize,
            tableName:"users"            
        })
        
        return this

    }
    checkpassword(password){
        return bcrypt.compare(password,this.password_hash)
    }
    static associate(models){ 
        this.hasMany(models.UserOcup,{foreignKey:'user_id', as:'user1'})
        this.hasMany(models.Conversation,{ foreignKey:'user_id1', as:'ids1'})
        this.hasMany(models.Conversation,{ foreignKey:'user_id2', as:'ids2'})
        this.hasMany(models.Message,{ foreignKey:'sender', as:'sender'})
        this.hasMany(models.Message,{ foreignKey:'receiver', as:'receiver'})                
        this.hasOne(models.UploadFoto,{foreignKey:'user_id', as:'upload'})
    }
      
          
      
}

module.exports = User