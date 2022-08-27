## WTF is this?

Simple project to experiment with kafka. As a part of learning material - https://www.udemy.com/course/apache-kafka/

### Project 1

The goal of the project is simple, the produce messages from the wikimedia recent changes to a kafka topic, and implement a consumer that will consume these messages and push them to Opensearch. For this round of learning we are avoiding kafka streams and the elasticsearch sink that simplifies most of the development required for this.

Wikimedia --> Producer --> Kafka --> Consumer --> Opensearch

First pass of this activity is adding the wikimedia-producer.js , uses eventsource and kafkaja packages under the hood to read the events from the stream and publish them to the topic.
