const User = require('../models/User')
const Feedback = require('../models/FeedBack')
const UploadFoto = require('../models/UploadFotos')
const Inscricao = require('../models/inscricao')


module.exports = {
    async Store(req, res) {
        const user_id_feedback = req.headers.authorization
        const { user_id_avaliado, nota, feedback, avaliado } = req.body
        const { alert_id } = req.query


        const userAvaliado = await User.findOne({
            where: {
                id: user_id_avaliado
            }
        }).then(userAvaliado => {
            if (!userAvaliado) {
                return res.send('Usuario avaliado não encontrado!')
            }
            useravaliado = userAvaliado.id
            user_name_avaliado = userAvaliado.name

        })


        const userFoto = await UploadFoto.findOne({
            where: {
                user_id: user_id_avaliado
            }
        }).then(userFoto => {
            if (!userFoto) {
                return res.send('Usuario sem foto!!')
            }
            user_avaliado_url = userFoto.url

        })


        const userFeedback = await User.findOne({
            where: {
                id: user_id_feedback
            }
        }).then(userFeedback => {
            if (!userFeedback) {
                return res.send('Usuario não encontrado!')
            }

            user_name_feedback = userFeedback.name

        })


        try {
            const response = await Feedback.create({
                user_id_avaliado: useravaliado,
                user_name_avaliado,
                user_avaliado_url,
                nota,
                user_id_feedback,
                feedback,
                user_name_feedback
            })

            Inscricao.update({ avaliado: avaliado }, {
                where: {
                    user_id: user_id_avaliado,
                    alert_id: alert_id
                }
            })
            res.send('Seu FeedBack foi enviado com sucesso')
        } catch (error) {
            console.log(error)
            res.send('erro, tente novamente.')
        }

    },

    async Rating(req, res) {
        const { user_id } = req.query

        try {
            const response = await Feedback.findAll({
                where: {
                    user_id_avaliado: user_id
                }
            })
            const totalNota = response.reduce((primeiroVal, outros) => primeiroVal + outros.nota, 0) / response.length
            
            if(isNaN(totalNota) == true){
                mediaNota = 0
            }else{
                mediaNota = response.reduce((primeiroVal, outros) => primeiroVal + outros.nota, 0) / response.length
            }
            

            try {
               
                await User.update({ rating: mediaNota }, {
                    where: {
                        id: user_id
                    }
                })
            } catch (error) {
                console.log(error)
            }

            return res.json(totalNota)
        } catch (error) {
            console.log(error)
            res.send('erro! tente novamente')
        }
    },
    async index(req,res){
        const  user_id  = req.headers.authorization
        try {
            const response = await Feedback.findAll({
                where: {
                    user_id_avaliado: user_id
                }
            }).then(response => {
                if(!response){
                    return res.status(401).send('Você ainda não foi avaliado por ninguém')
                }
                return res.status(200).send(response)
            })
            
        } catch (error) {
            console.log(error)
        }
    }
}