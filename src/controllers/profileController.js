const User = require('../models/User')
const aws = require("aws-sdk");

module.exports = {
    async updateBio(req, res) {
        let s3 = new aws.S3()
        const user_id = req.headers.authorization
                
        

        if (req.file) {
            const { key: key_cv, location: curriculum_url = '' } = req.file
            User.findByPk(user_id)
                .then(user => {
                    if (!user) {
                        return res.status(404).send({ message: "Arquivo não encontrado!" })
                    }
                    s3.deleteObject({
                        Bucket: process.env.BUCKET_NAME,
                        Key: user.key_cv
                    }, function (err, data) {
                        if (err) {
                            return res.status(503).send({ message: "Serviço Indisponível" })
                        } else {
                            console.log(data)
                        }
                    })
                }).then(() => {
                    User.update({ curriculum_url, key_cv, }, {
                        where: {
                            id: user_id
                        }
                    }).then(resolve => {
                        if (!resolve) {
                            return res.status(500).send({ message: "Erro interno do servidor" })
                        }
                        return res.status(200).send({ message: "Arquivo salvo com sucesso" })
                    })

                })

        }else{
            const { sobre_mim } = req.body
            const response = User.update({ sobre_mim }, {
                where: {
                    id: user_id
                }
            }).then(response => {
                if (!response) {
                    return res.status(500).send({ message: "Erro interno do servidor" })
                }
                return res.status(200).send({ message: "Atualização salva com sucesso" })
            })
        }
    },

    async index(req, res) {
        let user_id = req.headers.authorization

        let response = User.findByPk(user_id).then(
            resolve => {
                if (!resolve) {
                    return res.status(404).send({ message: "User Not found." })
                }
                return res.json({ sobre: resolve.sobre_mim, cv: resolve.curriculum_url })
            }
        )
    },

}