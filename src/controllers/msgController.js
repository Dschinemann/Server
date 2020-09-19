const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');
const Sequelize = require('sequelize');
const { Op } = Sequelize;


module.exports = {

    async conversation(req, res) {
        const user_id = parseInt(req.headers.authorization)
        const { user_id_selecao,nome,url,receiver_name } = req.body

        try {

            const response = await Conversation.findAll({
                where: {
                    user_id1: {
                        [Op.or]: [user_id, user_id_selecao]
                    },
                    user_id2: {
                        [Op.or]: [user_id, user_id_selecao]
                    }
                }
            }).then(async response => {
                
                if (response && response.length) {     //se existe elementos no array
                    
                    const mensagem = await Message.create({
                        id_message:response[0].id,
                        sender:user_id,
                        sender_name:nome,
                        receiver: user_id_selecao,
                        receiver_name:receiver_name,
                        text:'você foi selecionado',
                        url
                    })
                    
                    return res.json({ users: response })
                }else{                                          //se array for vazio
                    const users = await Conversation.create({
                        user_id1: user_id,
                        user_id2: user_id_selecao
                    }).then( async (users)=>{                        
                        const mensagem = await Message.create({
                            id_message:users.id,
                            sender:user_id,
                            receiver:user_id_selecao,
                            text:'você foi selecionado',
                            sender_name:nome,
                            receiver_name:receiver_name,
                            url
                        })
                        return res.json({ user: users })
                    })
                    
                }
                
            })

        } catch (error) {
            console.log(error)
        }
    },

    async indexConverMsg(req, res){
        const user_id = req.headers.authorization
        const { page = 1} = req.query
       

        try {
            const response = await Conversation.findAll({
                where:{
                    [Op.or]:[{user_id1: user_id}, {user_id2: user_id}]
                },
                include:{
                    association:'id_msgs',
                    limit:10,
                    offset: ((page - 1) * 10),
                    order:[
                        ['created_at','DESC']
                    ]
                },
                limit:10,
                offset: ((page - 1) * 10),
                order:[
                    ['created_at','DESC']
                ]
            })
            // res.status(200).send(response.map(ele => ele.id_msgs))
            res.status(200).send(response)

        } catch (error) {
            console.log(error)
        }
    },

    async indexChat(req,res){
        const {id_message} = req.body
        const { page = 1} = req.query
        try {
            const response = await Message.findAll({
                where:{
                    id_message
                },
                offset: ((page - 1) * 10),
                order:[
                    ['created_at','DESC']
                ],
                limit:10,
            })
            res.status(200).send({message:response})
        } catch (error) {
            res.status(401).send({message:"Não há mensagens a serem exibidas!"})
        }
    }

}