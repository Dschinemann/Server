require('dotenv').config()
const express = require('express')
const UserController = require('./controllers/userController')
const Authenticate = require('../src/controllers/authenticate')
const Alerta = require('./controllers/alertController')
const Insc = require('./controllers/inscController')
const multer =require('multer')
const multerConfig = require('./config/multer')
const Ocupacao = require('./controllers/funcController')
const FeedBack = require('./controllers/feedbackController')
const Message = require('./controllers/msgController')
const Chat = require('./controllers/chatController')
const userController = require('./controllers/userController')
const UpdateBio = require('./controllers/profileController')



const routes = express.Router() 

routes.post('/users',UserController.Store )
routes.post('/users/login',Authenticate.singin)
routes.put('/users/forgotPassword',userController.updatePass)
routes.put('/users/bio',multer(multerConfig).single('file'),UpdateBio.updateBio)
routes.get('/users/bio',UpdateBio.index)

routes.post('/users/novoAlerta', Alerta.Store)
routes.get('/alert/allAlerts',Alerta.Index)
routes.post('/alert/allAlerts',Alerta.IndexUser)
routes.post('/alert/:alert_id/allAlerts/insc',Insc.StoreInsc)
routes.put('/alert/:alert_id/allAlerts/insc',Alerta.UpdateStatus)
routes.get('/alert/allAlerts/insc',Insc.Index)
routes.get('/alert/:alert_id/allAlerts/myinsc',Insc.indexUserAlert)
routes.delete('/alert/:alert_id/alertaDel',Alerta.DeleteAlert)
routes.put('/alert/:id/insc',Insc.Selecao)
routes.put('/alert/:id/aceite',Insc.Aceite)

routes.post('/user/uploadFoto',multer(multerConfig).single('file'),UserController.FotoCreate)
routes.put('/user/uploadFoto',multer(multerConfig).single('file'),UserController.updateFoto)
routes.get('/user/minhaFoto',UserController.FotoPerfil)

routes.get('/ocupacao',Ocupacao.index)
routes.post('/ocupacao/create',Ocupacao.Store)
routes.get('/ocupacao/userOcup', Ocupacao.indexUserOcup)
routes.put('/ocupacao/userUpdate', Ocupacao.userOcupUpdate)

routes.post('/user/alert/feedback', FeedBack.Store)
routes.post('/user/rating', FeedBack.Rating)
routes.get('/user/feedback', FeedBack.index)


routes.get('/',Chat.start)
routes.post('/conversation',Message.conversation)
routes.post('/conversation/index',Message.indexConverMsg)
routes.post('/conversation/messages',Message.indexChat)



/*routes.post('/mensagem/:id_mensagem/chat', Mensagem.indexChat)
routes.post('/mensagem/chat', Mensagem.indexMsgUser)
routes.post('/mensagem/:id_mensagem/msg', Mensagem.indexMsg)*/





module.exports = routes
