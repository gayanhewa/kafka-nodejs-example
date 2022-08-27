const { Kafka } = require('kafkajs');
const kafka = new Kafka({
  clientId: 'wikimedia-producer',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'wikimedia-group' })

const runConsumer = async () => {
await consumer.connect()
await consumer.subscribe({ topic: 'wikimedia-topics', fromBeginning: true })

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      value: message.value.toString(),
    })
  },
});
};

runConsumer()
    .then(() => console.log('Running consumer'))
    .catch(console.log)
    .finally(() => console.log('Done'));
