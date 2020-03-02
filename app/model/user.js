const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userSchema = new schema({
    contact:{type:String , required:true},
    userName:{type:String , required:true},
    imgID:{type:String , default:''},
    imgUrl:{type:String , default:''},
    Token:{type:Number},
    status:{type:Boolean },
    publicId:{type:mongoose.SchemaTypes.ObjectId}
})

module.exports = mongoose.model('user', userSchema);