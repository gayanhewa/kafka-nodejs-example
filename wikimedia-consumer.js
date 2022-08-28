const { Kafka } = require('kafkajs');
const { Client } = require("@opensearch-project/opensearch");

const client = new Client({
  node: process.env.OS_HOST,
  auth: {
    username: process.env.OS_USERNAME,
    password: process.env.OS_PASSWORD
  },
});

const kafka = new Kafka({
  clientId: 'wikimedia-producer',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'wikimedia-group-v2' })

const runConsumer = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: 'wikimedia-topics', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const {id} = JSON.parse(message.value.toString());
            await client.index({
                id: id,
                index: 'wikimedia',
                body: message.value.toString(),
                refresh: true,
            });
        },
    });
};

runConsumer()
    .then(() => console.log('Running consumer'))
    .catch(console.log)
    .finally(() => console.log('Done'));
