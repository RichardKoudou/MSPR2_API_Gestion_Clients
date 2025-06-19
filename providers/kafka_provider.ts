/*import type { ApplicationService } from '@adonisjs/core/types'
import { KafkaService } from '#services/kafka_service'

export default class KafkaProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    this.app.container.singleton('kafka.service', () => {
      const kafkaService = new KafkaService()
      return kafkaService
    })
  }

  async boot() {
    const kafkaService = this.app.container.resolve('kafka.service')
    await kafkaService.connect()

    // Subscribe to relevant topics for data synchronization
    await kafkaService.subscribeToTopic('user.updates', async (message) => {
      // Handle user updates
      console.log('Received user update:', message)
    })

    await kafkaService.subscribeToTopic('product.updates', async (message) => {
      // Handle product updates
      console.log('Received product update:', message)
    })
  }

  async shutdown() {
    const kafkaService = this.app.container.resolve('kafka.service')
    await kafkaService.disconnect()
  }
}*/