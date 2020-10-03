const User = require('../models/User');
const Upload = require('../models/UploadFotos');
const UserOcup = require('../models/UserOcup');
const Ocupacao = require('../models/ocupacao');
const generateToken = require('../config/generateToken');
const aws = require("aws-sdk");
const { Op } = require('sequelize');




module.exports = {

    async Store(req, res) {
        const usuario = req.body.user
        const user = JSON.parse(usuario)
        const { name, password, idade, sexo, cep, email, anunciante, possui_mei_ou_cnpj, telefone, nasc } = user.user
        const id_profissao  = user.id_profissao
        
       
        let response = User.findAll({
            where: {
                email: email
            }
        }).then(resolve => {            
            if (resolve.length >0) {
                return res.status(404).send({ message: "Já temos um perfil cadastrado com esse email!" })
            } else {
                sequence()
            }
        })

        const sequence = () => {
            const user = User.create({
                name,
                idade,
                nasc,
                sexo,
                cep,
                email,
                anunciante,
                possui_mei_ou_cnpj,
                telefone,
                password,
                rating: 0,
                id_profissao                                
            }).then(resolve => {
                resolve.password_hash = undefined
                resolve.password = undefined
                return res.status(200).json({
                    resolve,
                    token: generateToken({ id: resolve.id })
                })
            })
            .catch(err =>{res.status(403).send({message:'Não foi possivel se cadastrar no momento, tente mais tarde'})})
        }
    },



    async FotoCreate(req, res) {
        const user_id = req.headers.authorization
        const { originalname: name, key, location: url = '' } = req.file

        const { name: nome } = await User.findByPk(user_id)

        try {
            const [validation, created] = await Upload.findOrCreate({
                where: {
                    user_id: user_id
                },
                defaults: {
                    user_id,
                    name,
                    key,
                    url,
                    nome
                }

            })

            if (!created) {
                res.send("ja temos uma foto sua, quer troca-la? Utilize o botão Atualizar!")

            } else {
                res.send('Foto enviada!')
            }
        } catch (error) {
            res.send('Tivemos um erro! tente novamente!')


        }
    },

    async FotoPerfil(req, res) {
        const user_id = req.headers.authorization


        try {
            const foto = await Upload.findOne({
                where: {
                    user_id: user_id
                }
            })
            return res.json(foto)

        } catch (error) {
            res.json('https://th.bing.com/th/id/OIP.ehFdDj_opqs8MF9a7I5DfgHaHa?w=209&h=199&c=7&o=5&pid=1.7')
        }
    },

    async updateFoto(req, res) {
        let s3 = new aws.S3()
        const user_id = req.headers.authorization
        const { originalname: name, key, location: url = '' } = req.file

        const user = Upload.findOne({
            where: {
                user_id: user_id
            },
        }).then(user => {
            if (!user) {
                return res.status(404).send({ message: "Photo Not found." })
            }
            s3.deleteObject({
                Bucket: process.env.BUCKET_NAME,
                Key: user.key
            }, function (err, data) {
                if (err) {
                    return res.status(503).send({ message: "Serviço Indisponível" })
                } else {
                    console.log(data)
                }
            })
        }).then(async () => {
            let response = await Upload.update({ url, name, key }, {
                where: {
                    user_id: user_id
                }
            }).then(resolve => {
                if (!resolve) {
                    return res.status(500).send({ message: "Erro interno do servidor" })
                }
                return res.status(200).send({ message: 'Foto atualizada' })
            })
        })
    },

    async updatePass(req, res) {
        const { password, email } = req.body

        const response = User.findOne({
            where: {
                email
            },
        }).then(resolve => {
            if (!resolve) {
                return res.status(404).send("User Not found.")
            }
            let response = User.update({ password }, {
                where: {
                    email
                },
                individualHooks: true
            }).then(resolve => {                
                resolve[0].password_hash = undefined
                resolve[0].passwordpassword = undefined
                res.status(200).send({message: 'Senha atualizada'})
            })
        })


    }

}