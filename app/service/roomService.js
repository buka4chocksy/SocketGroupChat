const model = require('../model/room');

exports.createRoom = (data)=>{
    return new Promise((resolve , reject)=>{
        model.findOne({name:data.name}).then(exists =>{
            if(exists){
                resolve({success:false , message:'Room already exists'})
            }else{
                const details = {name:data.name}
                model.create(details).then(created =>{
                    if(created){
                        resolve({success:true , message:'room was created successfully'})
                    }else{
                        resolve({success:false , message:'could not create room !!'})
                    }
                })
            }
        }).catch(err =>{
            reject(err);
        })
    })
}

exports.getAllRooms = ()=>{
    return new Promise((resolve, reject)=>{
        model.find({}).then(found =>{
            if(found){
                resolve({success:true ,message:'Rooms found' , data:found })
            }else{
                resolve({success:false , message:'no room available '})
            }
        }).catch(err =>{
            reject(err);
        })
    })
}

exports.getRoomById = (id)=>{
    return new Promise((resolve , reject)=>{
        model.findById({_id:id}).then(found =>{
            if(found){
                resolve({success:true ,message:'Rooms found' , data:found })
            }else{
                resolve({success:false , message:'room not available '})
            }
        }).catch(err =>{
            reject(err);
        })
    })
}