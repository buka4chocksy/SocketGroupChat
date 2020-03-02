const userAuthRoutes = require('./userAuthRoutes');
const roomRoutes = require('./roomRoutes');
module.exports =  function(router){
    router.use('/auth' , userAuthRoutes());
    router.use('/room', roomRoutes());
    return router
}