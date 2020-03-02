const socket = require('socket.io')
const groupChatModel = require('../model/groupChat');
const user = require('../model/user');
const connectedUsers = [];
const userIds = {}

function addUser (detail){
   var logo =  connectedUsers.indexOf(detail)
   console.log(logo , 'fffff')
    if(connectedUsers.indexOf(detail) === -1){
        connectedUsers.push(detail);
    }else{
        return null
    }
    return null
}
function GroupChat(server) {
    io = socket(server)
    this.GroupChats = () => {
        io.of("/groupChat").on("connection", (socket) => {
       socket.on('online' , (data)=>{
            getUserDetails(data.userId).then(details =>{
                addUser(details)
                socket.details = details
                userIds[details] = socket.id;
                socket.join(data.roomId)
                socket.broadcast.in(data.roomId).emit("online",details )
                getAllMessages(data.roomId , data.userId).then(chats =>{
                    if(chats){
                        socket.emit("previousChat" ,chats )
                    }else{
                        socket.emit("previousChat" , 'No current chat')
                    }
                })

           })
       })

       socket.on('typing', (data)=>{
           getUserDetails(data.sender).then(details =>{
            socket.broadcast.in(data.roomId).emit("typings",details )
       })
       })
       
       socket.on('sendMessage',(data)=>{
           saveGroupMessage(data.roomId,data).then(saved =>{
               if(saved){
                getUserDetails(data.userId).then(details =>{
                 const userDetails =   Object.assign(data ,{contact:details.contact},{userName:details.userName})
                 socket.broadcast.in(data.roomId).emit("messages",userDetails )  
               })
 
               }else{
                   console.log('message was not saved');
               }
           })
       })

            })


        }
    }

    function getUserDetails(id){
        return new Promise((resolve,reject)=>{
            user.findById({_id:id}).exec((err, found)=>{
                if(found){
                    resolve(found)
                }else{
                    reject(err)
                }
            })
        })
    }

    function getAllMessages(roomId ,userId ){
        return new Promise((resolve , reject)=>{
            groupChatModel.find({$and:[{roomId:roomId},{"chats.userId":userId}] },(err , found)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(found);
                }
            })
        })
    }

    function saveGroupMessage(roomId ,data){
        return new Promise((resolve , reject)=>{
            groupChatModel.findOneAndUpdate({roomId:roomId},{$push:{chats:data}},{upsert:true , new:true},(err,updated)=>{
                if(err){
                    reject(err)
                }else{
                   resolve(updated)
                }
            })
        })
    }

    module.exports = GroupChat;
