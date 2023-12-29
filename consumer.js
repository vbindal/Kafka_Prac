const { kf } = require("./client")
const group = process.argv[2]

async function init(){

    const consumer  = kf.consumer({groupId:group})

    console.log("connecting the consumer...")
    consumer.connect()

    await consumer.subscribe({topics:["rider-updates"], fromBeginning:true})

    console.log("consumer subscribe to a topic: rider-updates")

    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log(`Group : ${group}, Topic : [${topic}], PART: [${partition}], Msg:`,message.value.toString())
        },
    })
}

init()