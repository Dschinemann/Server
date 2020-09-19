const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const User = require('../models/User')
const Alertas = require('../models/alerts')
const Inscricao = require('../models/inscricao')
const UploadFoto = require('../models/UploadFotos')
const Ocupacao = require('../models/ocupacao')
const UserOcup = require('../models/UserOcup')
const FeedBack = require('../models/FeedBack')
const Message = require('../models/Message')
const Conversation = require('../models/Conversation')



const connection = new Sequelize(dbConfig)


User.init(connection)
Alertas.init(connection)
Inscricao.init(connection)
UploadFoto.init(connection)
Ocupacao.init(connection)
UserOcup.init(connection)
FeedBack.init(connection)
Message.init(connection)
Conversation.init(connection)

User.associate(connection.models)
Alertas.associate(connection.models)
Inscricao.associate(connection.models)
UploadFoto.associate(connection.models)
UserOcup.associate(connection.models)
FeedBack.associate(connection.models)
Message.associate(connection.models)
Conversation.associate(connection.models)




module.exports=connection