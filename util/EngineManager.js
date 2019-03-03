const os = require('os')
const fs = require('fs')
const cluster = require('cluster')
const request = require('request')
const {spawn, fork, exec} = require('child_process')
const Database = require('./Database')
const ContentDelivery = require('./ContentDelivery')
const fcm = require('fcm-node')

const SERVER_KEY = require('../config.json').firebaseAdmin

exports.runEngine = (inputURL) => {
    return new Promise((resolve,reject)=>{

        const uri = 'https://api.openalpr.com/v2/recognize_url?' + 
            'recognize_vehicle=1&country=in&secret_key=sk_754e94eb5420ecaaf0fb2f7a&return_image=true'

        request.post(uri, {
            formData: {
                image_url: inputURL
            }
        }, (err, res)=>{
            if(err) return console.error(err)
            console.log(res.body)
        })

        // DL9CM3884
        let read_plate = 'DL9CM3884'

        Database.firestore.collection('vehicles')
        .where('numberPlate', '==', read_plate)
        .get()
        .then((notifQuery)=>{
            let { messagingToken, isInside } = notifQuery.docs[0].data()
            let vehicleDocKey = notifQuery.docs[0].id

            // Change state of the vehicle
            Database.firestore.collection('vehicles')
            .doc(vehicleDocKey)
            .update({
                isInside: !isInside
            })
            .then(()=>{
                var messageSender = new fcm(SERVER_KEY);
                var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                    to: messagingToken, 
                    notification: {
                        title: 'Yo nigger', 
                        body: 'Your fuckin car was moved' 
                    },                    
                    data: {
                        my_key: 'my value',
                        my_another_key: 'my another value'
                    }
                };
                
                messageSender.send(message, (err, response)=>{
                    if (err) console.log("Something has gone wrong!", err)
                    else console.log("Successfully sent with response: ", response)
                    
                    console.log('NOTIF')
                })
            })
            .catch((err)=>{
                console.error(err)
            })
        })
        .catch((err)=>{
            console.error(err)
        })

        // const engine = exec('python', [
        //     './Engine/engine.py', 
        //     , 
        //     // contentType
        // ])
        
        // const engine = exe
        // fork('./util/Engine/engine.py')
        // engine.send({ pid: __pid, payload: payload[i], delay: (1000/count)*(i+1) })

        // engine.on('message', (res)=>{
        //     if(res==='COMPLETE')
        //         console.timeEnd('Engine Run')
        //     else
        //         console.log('ENGINE FAILED')
        //     engine.unref()
        // })

        // engine.stdout.on('data', (data) => {
        //     if(data==='COMPLETE')
        //         console.timeEnd('Engine Run')
        //     else
        //         console.log('ENGINE FAILED')
        //     engine.unref()
        // })   

        resolve('DONE')
    })
}

exports.run = () => {

}

exports.TestAPI = () => {
    const path = './inputmedia/Sequence 01070.jpg'

    alpr.Start()
    alpr.GetVersion()

    console.log(alpr.IdentifyLicense(path, function (error, output) {
        var results = output.results
        console.log (output.processing_time_ms +" "+ ((results.length > 0) ? results[0].plate : "No results"))
    }))
}