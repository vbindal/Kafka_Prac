const { kf } = require("./client")



async function init(){
    const admin = kf.admin()
    console.log('admin is connecting...')
    admin.connect()
    console.log('admin connected')


    console.log("Creating topic: rider-updates")
    await admin.createTopics({
        topics:[
            {
                topic:"rider-updates",
                numPartitions:2
            }
        ]
    })
    console.log("created the topic: rider-updates")

    console.log("Disconnecting...")
    await admin.disconnect()
    console.log("Disconnected...")
}

init()

