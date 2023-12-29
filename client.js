const {Kafka} = require("kafkajs")

exports.kf = new Kafka({
    clientId:'my-app',
    brokers:['192.168.1.36:9092']
})