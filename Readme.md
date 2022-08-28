## WTF is this?

Simple project to experiment with kafka. As a part of learning material - https://www.udemy.com/course/apache-kafka/

### Project 1

The goal of the project is simple, the produce messages from the wikimedia recent changes to a kafka topic, and implement a consumer that will consume these messages and push them to Opensearch. For this round of learning we are avoiding kafka streams and the elasticsearch sink that simplifies most of the development required for this.

Wikimedia --> Producer --> Kafka --> Consumer --> Opensearch

First pass of this activity is adding the wikimedia-producer.js , uses eventsource and kafkaja packages under the hood to read the events from the stream and publish them to the topic.

#### Starting opensearch locally
Running it with docker-compose is documented here:
https://opensearch.org/docs/latest/opensearch/install/docker#sample-docker-compose-file

For those of you running colima instead of Docker Desktop will have run into a issue when starting the ELK stack. You need to set the vm.max_map_count to a high enough value in your colima host config.

```
sysctl -w vm.max_map_count=262144
```

The default credentials for opensearch dashboard running on https://localhost:5601 is admin/admin
