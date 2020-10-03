const Funcoes = require('../models/ocupacao')
const UserOcup = require('../models/UserOcup')
const Ocupacao = require('../models/ocupacao')
const User = require('../models/User')
const sequelize = require('sequelize')



module.exports = {
    async index(req, res) {
        const op = sequelize.Op
        const { search, page=1 } = req.query
        
        try {
            const response = await Funcoes.findAll({
                where: {
                    titulo: {
                        [op.like]: `${search}%`,
                    }
                },
            })
            
            return res.json(response)
        } catch (error) {
            res.send('Desculpe, tente novamente')
        }
        
    },
    async Store(req, res) {

        const user_id = req.headers.authorization
        const { codigo } = req.body
       
        const name = await User.findOne({
            where: {
                id: user_id
            }
        }).then(name =>{
            if(!name){
                return res.send('Usuario não encontrado!')
            }
            nome = name.name
        })
        
        
        const ocupacao = await Ocupacao.findOne({
            where: {
                id: codigo
            }
        }).then(ocupacao =>{
            if(!ocupacao){
                return res.send('Ocupação não encontrada!')
            }
            ocup_id = ocupacao.id
            ocup_titulo =ocupacao.titulo
        })
        try {

            const validation = await UserOcup.findOne({
                where: {
                    user_id: user_id
                    
                }
            }).then(async (validation) => {
                if (!validation) {
                    try {
                        const userocup = await UserOcup.create({
                            user_id:user_id,
                            name:nome,
                            ocup_id,
                            ocup_titulo
                        })
                        res.send('Profissão cadastrada')
                    } catch (error) {
                       
                        res.send('Tente novamente')
                    }
                }
                return res.send('Você ja cadastrou uma ocupação para seu perfil!')
            })
        } catch (error) {
            res.send('erro ao atualizar profissão!')
            console.log(error)
        }
    },
    async indexUserOcup(req,res){
        const user_id = req.headers.authorization

            const response = await UserOcup.findOne({
                where:{
                user_id:user_id
                }
            })
            return res.status(200).json(response)

    },
    async userOcupUpdate(req, res){
        const user_id = req.headers.authorization
        const { codigo } = req.body

        const name = await User.findOne({
            where: {
                id: user_id
            }
        }).then(name =>{
            if(!name){
                return res.send('Usuario não encontrado!')
            }
            nome = name.id
        })
        
        
        const ocupacao = await Ocupacao.findOne({
            where: {
                id: codigo
            }
        }).then(ocupacao =>{
            if(!ocupacao){
                return res.send('Ocupação não encontrada!')
            }
            ocup_id = ocupacao.id
            ocup_titulo =ocupacao.titulo
        })
        try {
            const response = await UserOcup.update({ocup_id,ocup_titulo},{
                where:{
                    user_id
                }
            })
            res.send('Atualizado com Sucesso!')
        } catch (error) {
            console.log(error)
            res.send('Tente Novamente')
        }
    }

}