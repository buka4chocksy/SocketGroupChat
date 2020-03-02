const mongoose = require('mongoose');
const schema = mongoose.Schema;
const groupChatSchema = new schema({
    roomId:{type: mongoose.Types.ObjectId, ref: 'room', autopopulate: true},
    chats:[{
        userId:{type: mongoose.Types.ObjectId, ref: 'user', autopopulate: true},
        message:{type:String},
        chattime:{type:Date}
    }]
})

module.exports = mongoose.model('groupChat', groupChatSchema);