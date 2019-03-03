const os = require('os')
const fs = require('fs')
const cluster = require('cluster')
const request = require('request')
const alpr = require("node-openalpr")
const {spawn, fork, exec} = require('child_process')

exports.runEngine = (input, contentType) => {
    let genFileName = 'med_', extn, filepath

    for(let i=0;i<20;i++)
        genFileName += Math.floor( Math.random()*16 ).toString(16)
    
    switch(contentType) {
        case 'image/jpeg':
            extn = '.jpeg'
            break
        case 'image/png':
            extn = '.png'
            break
        case '':
            extn = '.mp4'
            break
        default: 
            extn = ''
    }

    filepath = __dirname + '/inputmedia/' + genFileName + extn
    fs.writeFileSync(filepath, input)
    console.time('Engine Run')
    const engine = spawn('python', [
        './Engine/engine.py', 
        'FUCKALL', 
        // contentType
    ])

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
}

exports.run = () => {

}

exports.TestAPI = () => {
    const path = './inputmedia/Sequence 01070.jpg'

    alpr.Start()
    alpr.GetVersion()

    console.log(alpr.IdentifyLicense(path, function (error, output) {
        var results = output.results
        console.log (id +" "+ output.processing_time_ms +" "+ ((results.length > 0) ? results[0].plate : "No results"))
    
        if (id == 349) {
            console.log (alpr.Stop ())
        }
    }))
}