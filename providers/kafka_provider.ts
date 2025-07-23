import type { ApplicationService } from '@adonisjs/core/types'
import { KafkaService, KafkaConsumerService } from '#services/kafka_service'

export default class KafkaProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    // Enregistrement du service Kafka pour la production
    this.app.container.singleton('kafka.service', () => {
      const kafkaService = new KafkaService()
      return kafkaService
    })

    // Enregistrement du service Kafka pour la consommation
    this.app.container.singleton('kafka.consumer.service', () => {
      const kafkaConsumerService = new KafkaConsumerService()
      return kafkaConsumerService
    })
  }

  async boot() {
    const kafkaService = await this.app.container.make('kafka.service')
    const kafkaConsumerService = await this.app.container.make('kafka.consumer.service')

    // Connexion des services Kafka
    await kafkaService.connect()
    await kafkaConsumerService.connect()

    // Abonnement aux topics pertinents
    await kafkaConsumerService.subscribeToTopics()
  }

  async shutdown() {
    const kafkaService = await this.app.container.make('kafka.service')
    const kafkaConsumerService = await this.app.container.make('kafka.consumer.service')

    await kafkaConsumerService.disconnect()
    await kafkaService.disconnect()
  }
}
