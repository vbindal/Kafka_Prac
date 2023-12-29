const {kf} = require("./client")
const readline  = require("readline")


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function init(){
    console.log("connecting the producer")
    const producer = kf.producer()
    await producer.connect()
    console.log("producer connected")
    
    console.log("sending the message")

    rl.setPrompt('>')
    rl.prompt()

    rl.on('line',async function(line){
        const [riderName,location] = line.split(' ')

        await producer.send({
            topic:"rider-updates",
            messages:[{
                partition:location.toLowerCase()==='north'? 0 : 1,
                key:"location-updates",
                value:JSON.stringify({name:riderName,location})
            }]
        })
    }).on("close",async()=>{
        await producer.disconnect()
        console.log("producer disconnected")
    })
    
    
}

init()
