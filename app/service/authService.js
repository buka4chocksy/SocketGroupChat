const model = require('../model/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
var secret = process.env.secret
exports.signupUser = (data)=>{
    return new Promise((resolve , reject)=>{
        model.findOne({contact:data.contact}).then(found =>{
            if(found){
                resolve({success:false ,message:'Sorry User already Exists !!' })
            }else{
                var gen =  Math.floor(1000 + Math.random() * 9000);
                const detail = {contact:data.contact ,userName:data.userName,Token:gen , status:false , publicId:mongoose.Types.ObjectId()}
               model.create(detail).then(added =>{
                   if(added){
                       resolve({success:true , message:'user signup successfull'})
                   }else{
                    resolve({success:false , message:'unable to signUp user'})
                   }
               })
            }
        }).catch(err =>{
            reject(err)
        })
    })
}

exports.authenticate = (data)=>{
    return new Promise((resolve , reject)=>{
        model.findOne({contact:data.contact}).then(added =>{
            if(added){
               // if(added.status == true){
                    generateToken(added).then(token =>{
                        if(token){
                            resolve({success:true , message:'Authentication Successfull', token:token})
                        }else{
                            resolve({success:false , message:'Authentication was not Successfull'}) 
                        }
                    })
                // }else{
                //     resolve({success:false ,message: 'please verify your account !!'})
                // }
            }else{
                resolve({success:false ,message: 'Sorry user does not exist'}) 
            }
            
        })
    })
}

function generateToken(data = {}) {
    return new Promise((resolve, reject) => {
        jwt.sign({ ...data }, secret, { expiresIn: '24hrs' }, function (err, token) {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    })
}

exports.generateToken = generateToken;

function verifyToken(token = "") {
    return new Promise((resolve, reject) => {
        jwt.verify(token.replace("Bearer", ""), secret, function (err, decodedToken) {
            if (err) {
                reject(err);
            } else {
                resolve(decodedToken);
            }
        });
    });
};
exports.verifyToken = verifyToken;