import { KafkaConsumerService, KafkaService } from '#services/kafka_service'
import { KAFKA_TOPICS } from '#config/kafka'

/**
 * Initialisation des services Kafka pour le microservice Clients
 *
 * Ce fichier configure et initialise les services Kafka nécessaires
 * pour la communication entre microservices.
 */
export default async function setupKafka() {
  // Initialisation du service Kafka pour la production de messages
  const kafkaService = new KafkaService()
  await kafkaService.connect()

  // Enregistrement du service Kafka dans l'application pour l'injection de dépendance
  global.kafkaService = kafkaService

  // Initialisation du service consommateur Kafka
  const kafkaConsumerService = new KafkaConsumerService()
  await kafkaConsumerService.connect()

  // Abonnement aux topics Kafka pertinents
  await kafkaConsumerService.subscribeToTopics()

  // Affichage des topics écoutés pour le débogage
  console.log('Kafka consumer service is listening to topics:')
  Object.values(KAFKA_TOPICS.CONSUMED).forEach((topic) => {
    console.log(`  - ${topic}`)
  })

  // Gestion de l'arrêt propre de l'application
  process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing Kafka consumer')
    await kafkaConsumerService.disconnect()
    await kafkaService.disconnect()
  })

  process.on('SIGINT', async () => {
    console.log('SIGINT signal received: closing Kafka consumer')
    await kafkaConsumerService.disconnect()
    await kafkaService.disconnect()
  })
}
