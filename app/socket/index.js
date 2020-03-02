const groupChat = require('./groupChat');
exports.indexSocket = function(server){
const Gchat = new groupChat(server)
Gchat.GroupChats();
}