const Funcoes = require('../models/ocupacao')
const UserOcup = require('../models/UserOcup')
const Ocupacao = require('../models/ocupacao')
const User = require('../models/User')
const sequelize = require('sequelize')



module.exports = {
    async index(req, res) {
        const op = sequelize.Op
        const { search, page = 1 } = req.query

        try {
            const response = await Funcoes.findAll({
                where: {
                    titulo: {
                        [op.like]: `${search}%`,
                    }
                },
                limit: 5,
                offset: ((page - 1) * 20)
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
        }).then(name => {
            if (!name) {
                return res.send('Usuario não encontrado!')
            }
            nome = name.name
        })


        const ocupacao = await Ocupacao.findOne({
            where: {
                id: codigo
            }
        }).then(ocupacao => {
            if (!ocupacao) {
                return res.send('Ocupação não encontrada!')
            }
            ocup_id = ocupacao.id
            ocup_titulo = ocupacao.titulo
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
                            user_id: user_id,
                            name: nome,
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
    async indexUserOcup(req, res) {
        const user_id = req.headers.authorization

        const response = await UserOcup.findOne({
            where: {
                user_id: user_id
            }
        })
        return res.status(200).json(response)

    },
    async userOcupUpdate(req, res) {
        const user_id = req.headers.authorization
        const { codigo } = req.body;
        let array = codigo;
        let professions = array.map(ele => ele.id);
        let profession = []; 

        const name = await User.findOne({
            where: {
                id: user_id
            }
        }).then(name => {
            if (!name) {
                return res.send('Usuario não encontrado!')
            }
            nome = name.name
        })
        UserOcup.destroy({ where: { user_id } }).then().catch(() => { return })

        for (let index = 0; index < array.length; index++) {
            let response = Ocupacao.findByPk(professions[index]).then((resolve) => {
                if (!resolve) {
                    return
                } else {
                    let { titulo } = resolve
                    return UserOcup.create({ user_id, name: nome, ocup_id: professions[index], ocup_titulo: titulo }).then((response) => {                                            
                        profession.push(response.dataValues);                
                        if(profession.length == array.length) {                         
                            return res.status(200).send({ message: 'Atualiazo com sucesso!', profession: profession })
                        }
                    })
                    .catch(e => console.log(e));
                }
            }).catch(err => {
                return
            });
        }                
    }
}