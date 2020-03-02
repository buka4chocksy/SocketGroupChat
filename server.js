const express = require('express');
const morgan = require('morgan')
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const http = require('http');
const router = express.Router()
const rootRouter = require('./app/routes/index')(router)
const DBConfig = require('./app/config/DB')
//MiddleWare
app.use(morgan('dev'));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors())
app.use('/api', rootRouter)

app.get('/', function(req, res){
    res.json({message:"hello world"});
});

DBConfig()
app.get("/groupChat", (req,res)=>{
     return res.sendFile(__dirname + "/public/groupChat.html");
})

module.exports = app;