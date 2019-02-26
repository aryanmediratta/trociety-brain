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

api.use(cookieParser(ServerConfig.clientKey, {}))
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: true }))
api.use(express.json())
api.use(express.urlencoded({ extended: true }))

// Statically Served Directories
frontend.use('/static', express.static( path.join(__dirname, 'frontend', 'src', 'static') ))

// Frontend ---------------------- Frontend //
// ======================================= //
frontend.get('/', (req,res)=>{
    res.sendFile( path.resolve(__dirname, 'frontend', 'build', 'index.html') )
})

// frontend.post('/_register/society', (req,res)=>{
//     let { name,
//     ad_email,
//     ad_phone,
//     ad_name,
//     sc_location,
//     gates,
//     vehicles,
//     info } = req.body
// })

// APIs ------------------------------ APIs //
// ======================================= //
api.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

api.get('/', (req,res)=>{
    res.sendStatus(200)
})

api.post('/_validate/society', (req,res)=>{
    let { society_ref } = req.body
    if(society_ref!==undefined && society_ref!==null) {
        Database.firestore.collection('societies')
        .where('ref', '==', society_ref)
        .limit(1)
        .get()
        .then((querySnapshot)=>{
            let society_data = querySnapshot.docs[0].data()
            res.json({ data: society_data })
        })
        .catch(()=>{
            res.sendStatus(404)
        })
    } else {
        res.sendStatus(403)
    }
})

api.post('/_validate/user', (req,res)=>{
    let { user_email } = req.body
    if(user_email!==undefined && user_email!==null) {
        Database.firestore.collection('society')
        .where('ref', '==', user_email)
        .limit(1)
        .get()
        .then((querySnapshot)=>{
            let user_data = querySnapshot.docs[0].data()
            res.json({ data: user_data })
        })
        .catch(()=>{
            res.sendStatus(404)
        })
    } else {
        res.sendStatus(403)
    }
})

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