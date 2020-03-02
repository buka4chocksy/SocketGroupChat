const roomController = require('../controller/roomController')
const middleware = require('../middleware/authmiddleware');
var router = require('express').Router();
module.exports = function(){
    const roomCntrl = new roomController();
    router.post('/create', middleware.authenticate, roomCntrl.create );
    router.get('/',middleware.authenticate ,roomCntrl.getRooms);
    router.get('/roomId/', middleware.authenticate, roomCntrl.findSingleRoom);
    router.put('/', middleware.authenticate , roomCntrl.updateRoomName)
    router.delete('/', middleware.authenticate , roomCntrl.deleteRoom)
    return router;
}