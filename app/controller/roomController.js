const service = require('../service/roomService');

module.exports = function roomController (){
    this.create = (req,res)=>{
        service.createRoom(req.body).then(data =>{
            res.status(200).send(data)
        }).catch(err => res.status(500).send(err))
    }

    this.getRooms = (req,res)=>{
        service.getAllRooms({}).then(data =>{
            res.status(200).send(data)
        }).catch(err => res.status(500).send(err))
    }

    this.findSingleRoom = (req,res)=>{
        service.getRoomById(req.query.Id).then(data =>{
            res.status(200).send(data)
        }).catch(err => res.status(500).send(err))
    }
}