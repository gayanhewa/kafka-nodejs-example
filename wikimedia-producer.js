// https://wikitech.wikimedia.org/wiki/Event_Platform/EventStreams
const EventSource = require('eventsource');
const { Kafka } = require('kafkajs');
const kafka = new Kafka({
  clientId: 'wikimedia-producer',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const url = 'https://stream.wikimedia.org/v2/stream/recentchange';
const eventSource = new EventSource(url);

eventSource.onopen = async () => {
    console.info('Opened connection.');
    await producer.connect();
};
eventSource.onerror = async (event) => {
    console.error('Encountered error', event);
    await producer.disconnect();
};
eventSource.onmessage = async (event) => {
    const data = JSON.parse(event.data);
    if (data.server_name === 'en.wikipedia.org') {
        await producer.send({
            topic: 'wikimedia-topics',
            messages: [
                { value: event.data }
            ],
        })
    }
};

eventSource.onclose = async () => {
    console.log('done');
    await producer.disconnect();
}
