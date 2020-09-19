const express = require('express')
const routes = require('./routes')
const connection = require('./database/index')
const cors = require('cors')
const Message = require('../src/models/Message')
const usersConnect = []


const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
    usersConnect.push({user:socket.handshake.headers.user, socketId:socket.id})
   
    socket.on('sendMessage', data  => {        
        const mensagem = Message.create({
            id_message: data.id_message,
            sender: data.sender,
            receiver: data.receiver,
            receiver_name:data.receiver_name,
            text: data.text,
            sender_name:data.nome,
            url:data.url
        }).then( mensagem => {
            try {
                const {socketId}  = usersConnect.find(ele => ele.user == data.receiver)
                io.to(socketId).emit('returnMsgUser', mensagem.dataValues)
            } catch (error) {
               return 
            }
      
            
        })
    })

    socket.on('disconnect', () => {
        const index = usersConnect.indexOf(socket.id)
        usersConnect.splice(index, 1)
        
    })
    
})


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.use(cors())


http.listen(process.env.SERVER_SOCKET)
app.listen(process.env.SERVER_APP)
    


