const os = require('os')
const fs = require('fs')
const cluster = require('cluster')
const {spawn, fork} = require('child_process')

exports.runEngine = (input, contentType) => {
    let genFileName = 'med_', extn

    // for(let i=0;i<20;i++)
    //     genFileName += Math.floor( Math.random()*16 ).toString(16)
    
    // switch(contentType) {
    //     case 'image/jpeg':
    //         extn = '.jpeg'
    //         break
    //     case 'image/png':
    //         extn = '.png'
    //         break
    //     case '':
    //         extn = '.mp4'
    //         break
    //     default: 
    //         extn = ''
    // }

    // fs.writeFileSync('./inputmedia/' + genFileName + extn, input)
    console.time('Engine Run')
    // const engine = spawn('python', [
    //     './Engine/engine.py', 
    //     'FUCKALL', 
    //     // contentType
    // ])
    
    const engine = fork('./Engine/engine.py')
    // engine.send({ pid: __pid, payload: payload[i], delay: (1000/count)*(i+1) })

    // engine.on('message', (res)=>{
    //     if(res==='COMPLETE')
    //         console.timeEnd('Engine Run')
    //     else
    //         console.log('ENGINE FAILED')
    //     engine.unref()
    // })

    engine.stdout.on('data', (data) => {
        if(data==='COMPLETE')
            console.timeEnd('Engine Run')
        else
            console.log('ENGINE FAILED')
        engine.unref()
    })
}