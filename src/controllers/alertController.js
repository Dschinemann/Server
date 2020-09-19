const Alert = require('../models/alerts')
const Ocupacao = require('../models/ocupacao')
const sequelize = require('sequelize')
const User = require('../models/User')


module.exports = {
    async Store(req, res) {
        const { titulo, descricao, valor, local, cep, tipoDeProfissão,ConnOnSignal,vagas } = req.body
        const user_id = req.headers.authorization


        const response = await Ocupacao.findOne({
            where: {
                id: `${tipoDeProfissão}`
            }
        })
  
        const tipo_de_profissão = response.titulo
        const ocup_id = response.id

        try {

            const alert = await Alert.create({
                titulo,
                descricao,
                valor,
                local,
                cep,
                tipo_de_profissão,
                ocup_id,
                user_id,
                status: 'ativo',
                ConnOnSignal,
                vagas
            })

            return res.status(200).send({ message:'Alerta Criado com Sucesso!' })
        } catch (error) {

            console.log(error)
            return res.status(400).send({ error: 'falha no registro' })


        }
    },

    async Index(req, res) {
        const op = sequelize.Op
        const { page = 1, search = '%' } = req.query
        const { count } = await Alert.findAndCountAll({
            where:{
                ocup_id: search,                      
                status: 'ativo'
            }
        })

        try {
            const response = await Alert.findAll({
                where: {
                    ocup_id: search,                      
                    status: 'ativo'
                },
                limit: 5,
                order: [['createdAt','DESC']],                
                offset: ((page - 1) * 5)
            })
            
            res.header('X-Total-Count', `${count}`)
            return res.json(response)

        } catch (error) {
            console.log(error)
        }
    },

    async IndexUser(req, res) {  //lista todos os alertas desse usuario
        const { page = 1 } = req.query
        const user_id = req.headers.authorization
        const { count } = await Alert.findAndCountAll()
        try {
            const response = await Alert.findAll({
                where: {
                    user_id: user_id
                },
                include:{
                    association:'alert',
                },
                limit: 5,
                order: [['status','ASC'],['createdAt','DESC']],
                offset: ((page - 1) * 5)
            })
            res.header('X-Total-Count', `${count}`)
            res.json(response)
        } catch (error) {
            console.log(error)
        }
    },
    async DeleteAlert(req, res) {
        const user_id = req.headers.authorization
        const { alert_id } = req.params


        const user = await User.findOne({
            where: {
                id: user_id
            }
        }).then(user => {
            if (!user) {
                return res.send('Usuario não encontrado!')
            }

        })

        const alertId = await Alert.findOne({
            where: {
                id: alert_id,
                user_id
            }
        }).then(alertId => {
            if (!alertId) {
                return res.send('Alerta não encontrado!')
            }

        })

        try {
            const response = await Alert.destroy({
                where: {
                    id: alert_id,
                    user_id
                }
            })
            res.send('Deletado!')
        } catch (error) {
            res.send('Tente Novamente!')
            console.log(error)
        }
    },

    async UpdateStatus(req, res) { //Atualiza o status do alerta
        const user_id = req.headers.authorization
        const { alert_id } = req.params
        const {status} = req.body

        const user = await User.findOne({
            where: {
                id: user_id
            }
        }).then(user => {
            if (!user) {
                return res.send('Usuario não encontrado!')
            }

        })

        const alertId = await Alert.findOne({
            where: {
                id: alert_id,
                user_id
            }
        }).then(alertId => {
            if (!alertId) {
                return res.send('Alerta não encontrado!')
            }

        })

        try {
            const response = await Alert.update({ status }, {
                where: {
                    id: alert_id,
                    user_id
                }
            })
            res.send('Status Atualizado')
        } catch (error) {
            res.send('Tente Novamente!')
            console.log(error)
        }
    }




}