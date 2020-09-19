const Insc = require('../models/inscricao');
const User = require('../models/User');
const Alerta = require('../models/alerts');
const UploadFoto = require('../models/UploadFotos');
const UserOcup = require('../models/UserOcup');
const Sequelize = require('sequelize');
const { Op } = Sequelize;


module.exports = {
    async StoreInsc(req, res) {
        const { alert_id } = req.params
        const user_id = req.headers.authorization

        const urlUser = await UploadFoto.findOne({
            where: {
                user_id: user_id
            }
        }).then(urlUser => {
            if (!urlUser) {
                return res.send('ops! atualize sua foto de Perfil para continuar!')
            }
            url = urlUser.url
        })

        const titulo = await Alerta.findOne({
            where: {
                id: alert_id
            }
        }).then(titulo => {
            if (!titulo) {
                return res.send('Alerta não encontrado!')
            }
            title = titulo.titulo
        })


        const user = await User.findOne({
            where: {
                id: user_id
            }

        }).then(user => {
            if (!user) {
                return res.send('Usuario não encontrado!')
            }
            name = user.name
            telefone = user.telefone
            email = user.email
            userRating = user.rating
        })

        const ocup = await UserOcup.findOne({
            where: {
                user_id: user_id
            }

        }).then(ocup => {
            if (!ocup) {
                return res.send('Ops! Antes você precisa cadastrar sua profissão para continuar')
            }
           tituloProfissao = ocup.ocup_id
        })


        const alert = await Alerta.findOne({
            where: {
                id: alert_id
            }
        }).then(alert => {
            if (!alert) {
                return res.send('Alerta não encontrado')
            }
           tipoProfissao = alert.ocup_id
           valor = alert.valor
        })


        try {
            if (tipoProfissao == tituloProfissao) {
                
                const validation = await Insc.findOne({
                    where: {
                        user_id: user_id,
                        alert_id: alert_id
                    }
                }).then(async (validation) => {
                    if (!validation) {
                        try {
                            const insc = await Insc.create({
                                titulo: title,
                                valor,
                                user_id,
                                alert_id,
                                url,
                                name,
                                telefone,
                                email,
                                selecao: 'false',
                                avaliado: 'NAO',
                                rating: userRating
                            })
                            res.send('Inscrito com sucesso. Boa Sorte!')
                        } catch (error) {
                            console.log(error)
                            res.send('Tente novamente')
                        }
                    }
                    return res.send('Você ja esta Inscrito nesse Alerta')
                })
            }else
            res.send('A profissão que esta cadastrada, não é igual ao solicitado no alerta, provavelmente você acabou de atualizar sua profissão e o app ainda não foi atualizado, para resolver este problema reinicie o aplicativo!')
        } catch (error) {
            console.log(error)
        }

    },

    async Index(req, res) { //todos os alertas que o user esta inscrito
        const user_id = req.headers.authorization
        const { page = 1 } = req.query
        const { count } = await Insc.findAndCountAll({
            where: {
                user_id: user_id,             
            }
        })

        try {
            const response = await Insc.findAll({
                where: {
                    user_id: user_id
                },
                limit: 5,
                offset: ((page - 1) * 5)
            })
            res.header('X-Total-Count', `${count}`)
            res.json(response)
        } catch (error) {
            res.json('Envie seu dados Novamente')
            console.log(error)
        }

    },

    async indexUserAlert(req, res) {  // todos os inscritos por alerta
        const { alert_id } = req.params
        const { page = 1, status = 'false', avaliado = 'NAO' } = req.query


        const { count } = await Insc.findAndCountAll({
            where: {
                alert_id: alert_id
            }
        })

        try {
            const response = await Insc.findAll({
                where: {
                    alert_id: alert_id,
                    selecao: status,
                    avaliado: avaliado
                },
                limit: 5,
                offset: ((page - 1) * 5)

            })
            res.header('X-Total-Count', `${count}`)
            res.json(response)
        } catch (error) {
            res.json('Envie seu dados Novamente')
            console.log(error)
        }
    },

    async Selecao(req, res) {
        const user_id = req.headers.authorization
        const { id } = req.params
        const { selecao, user_id_insc } = req.body

        const user = await User.findOne({
            where: {
                id: user_id
            }

        }).then(user => {
            if (!user) {
                return res.send('Usuario não encontrado!')
            }

        })

        const alert = await Insc.findOne({
            where: {
                alert_id: id,
            }
        }).then(alert => {
            if (!alert) {
                return res.send('Alerta não encontrado')
            }
        })


        const inscrito = await Insc.findOne({
            where: {
                alert_id: id,
                user_id: user_id_insc
            }
        }).then(inscrito => {
            if (!inscrito) {
                return res.send('Inscrito não encontrado')
            }
        })



        if (selecao === undefined) {
            return res.send('Seleção Inválida!')
        }


        try {
           
            const response = await Insc.update({ selecao: selecao, },
                {
                    where: {
                        alert_id: id,
                        user_id: user_id_insc
                    },
                    individualHooks: true
                })
            res.send('Selecionado')

        } catch (error) {
            res.send('erro ao selecionar!')
            console.log(error)
        }

    },

    async Aceite(req, res){
        const user_id = req.headers.authorization
        const { id } = req.params
        const { aceite } = req.body
        
        try {
           
            const response = await Insc.update({ aceite },
                {
                    where: {
                        user_id: user_id,
                        alert_id: id                     
                    }
                })
            res.status(200).send({message:'Atualizado com sucesso'})

        } catch (error) {
            res.status(400).send({message:'Não foi possivel atualizar o status no momento, tente mais tarde!'})
            console.log(error)
        }
    }


}