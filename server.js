const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const vhost = require('vhost');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const request = require('request');
const fileUpload = require('express-fileupload');

const trociety = express();
const frontend = express();
const api = express();

const PORT = process.env.PORT || 3000;
const ServerConfig = require('./config.json');
const __domain = require('./config.json').domain;

const Security = require('./util/Security');
const Gmailer = require('./util/Gmailer');
const GSheets = require('./util/GSheets');
const Database = require('./util/Database');
const Payments = require('./util/Payments');

trociety.listen(PORT, ()=>{
    console.log('Listening')
})

trociety.use(vhost(__domain, frontend))
trociety.use(vhost('www.' +  __domain, frontend))
trociety.use(vhost('api.' +  __domain, api))

// ====================================================================================== //
// ====================================================================================== //

frontend.use(cookieParser(ServerConfig.clientKey, {}))
frontend.use(bodyParser.json())
frontend.use(bodyParser.urlencoded({ extended: true }))
frontend.use(express.json())
frontend.use(express.urlencoded({ extended: true }))

// Statically Served Directories
frontend.use('/static', express.static( path.join(__dirname, 'frontend', 'src', 'static') ))

// Frontend ---------------------- Frontend //
// ======================================= //
frontend.get('/', (req,res)=>{
    res.sendFile( path.resolve(__dirname, 'frontend', 'build', 'index.html') )
})

// APIs ------------------------------ APIs //
// ======================================= //
api.get('/:func/', (req,res)=>{
    var { func } = req.params
    switch(func) {
        case '_database':
            res.sendStatus(200)
            break
        case '_mail':
            break
        default:
            res.end()
            break
    }
})

api.post('', ()=>{
    
})