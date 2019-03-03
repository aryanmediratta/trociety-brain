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

frontend.post('/_register/society', (req,res)=>{
    var {
        address,
        location,
        soc_ref,
        master_email,
        master_phone,
        master_name,
    } = req.body

    let master_key = ''
    for(let i=0;i<24;i++)
        master_key += Math.floor( Math.random()*62 ).toString(62)
    // REPLACE with real crypto ECDH

    Database.firestore.collection('societies')
    .doc(soc_ref)
    .set({
        address: address,
        location: {
            _lat: location.split('/')[0],
            _lon: location.split('/')[1]
        },
        isActive: false,
        isValidated: false,
        ref: soc_ref,
        master_email: master_email,
        master_phone: master_phone,
        master_name: master_name,
        master_key: master_key
    })
    .then(()=>{
        Gmailer.SingleDataDelivery({
            from: 'zrthxn@gmail.com',
            to: master_email,
            subject: '',
        },
        fs.readFileSync('./util/MailTemplates/onboarding.html').toString(),
        [
            {id: 'masterName', data: master_email},
            {id: 'masterPhone', data: master_phone},
            {id: 'masterkey', data: master_key},
        ])
    })
})

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
            let { sid, ref, society_name } = querySnapshot.docs[0].data()
            let hmac = crypto.createHmac('sha256', ServerConfig.clientKey).update(sid).digest('hex')
            res.json({
                checksum: hmac,
                data: { 
                    ref: ref, society_name: society_name 
                }
            })
        })
        .catch(()=>{
            res.sendStatus(404)
        })
    } else {
        res.sendStatus(403)
    }
})

api.post('/_validate/user', (req,res)=>{
    var { auth_user_email, society_ref } = req.body
    if(auth_user_email!==undefined && auth_user_email!==null) {
        Database.firestore.collection('users').doc(society_ref)
        .where('email', '==', auth_user_email)
        .limit(1)
        .get()
        .then((residentQuery)=>{
            var { email, society_ref, isValidated } = residentQuery.docs[0].data()

            // Get SID by S_REF
            Database.firestore.collection('societies')
            .where('ref', '==', society_ref)
            .limit(1)
            .get()
            .then((socQuery)=>{
                var { sid } = socQuery.docs[0].data()
                if(!isValidated) {
                    let gen_uid = ''
                    for(let i=0;i<24;i++)
                        gen_uid += Math.floor( Math.random()*16 ).toString(16)
                    gen_uid += '@' + society_ref

                    // Add user to auth_users collection                     
                    Database.firestore.collection('auth_users').doc(gen_uid)
                    .set({
                        uid: gen_uid,
                        email: email,
                        isValidated: true,
                        validatedOn: Date.now(),
                        ref: society_ref,
                        registered_vehicles: []
                    })
                    .then(()=>{
                        console.log('NUNNA')
                        res.json({ 
                            hmac: null,
                            data: {
                                sid: sid,
                                uid: gen_uid,
                                society_ref: society_ref, 
                                isValidated: true
                            } 
                        })
                    })
                    .catch(()=>{
                        res.sendStatus(500)
                    })
                } else {
                    Database.firestore.collection('societies').doc(society_ref)
                    .collection('auth_users')
                    .where('email', '==', auth_user_email)
                    .limit(1)
                    .get()
                    .then((authUserQuery)=>{
                        var { uid } = authUserQuery.docs[0].data()
                        res.json({ 
                            hmac: null,
                            data: {
                                sid: sid,
                                uid: uid,
                                society_ref: society_ref,
                                isValidated: true
                            }
                        })
                    })
                }
            })
            .catch(()=>{
                res.json({ hmac: null, data: { isValidated: false } })
            })
        })
        .catch(()=>{
            res.sendStatus(404)
            // OTP validation here
        })
    } else {
        res.sendStatus(403)
    }
})

api.post('/', ()=>{

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