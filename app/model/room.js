const mongoose = require('mongoose');
const schema = mongoose.Schema;
const roomSchema = new schema({
    name:{type:String , required:true},
})

module.exports = mongoose.model('room', roomSchema);