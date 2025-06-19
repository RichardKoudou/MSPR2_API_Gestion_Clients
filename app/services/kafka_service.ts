/*import { Kafka, Producer, Consumer } from 'kafkajs'

export class KafkaService {
  private kafka: KafkaClient
  private producer: Producer
  private consumer: Consumer

  constructor() {
    this.kafka = new KafkaClient({
      clientId: 'client-service',
      brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
    })

    this.producer = this.kafka.producer()
    this.consumer = this.kafka.consumer({ groupId: 'client-service-group' })
  }

  async connect() {
    await this.producer.connect()
    await this.consumer.connect()
  }

  async disconnect() {
    await this.producer.disconnect()
    await this.consumer.disconnect()
  }

  async publishMessage(topic: string, message: any) {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      })
    } catch (error) {
      console.error('Error publishing message:', error)
      throw error
    }
  }

  async subscribeToTopic(topic: string, messageHandler: (message: any) => Promise<void>) {
    try {
      await this.consumer.subscribe({ topic })
      
      await this.consumer.run({
        eachMessage: async ({ message }) => {
          const messageValue = message.value?.toString()
          if (messageValue) {
            await messageHandler(JSON.parse(messageValue))
          }
        },
      })
    } catch (error) {
      console.error('Error subscribing to topic:', error)
      throw error
    }
  }
}*/