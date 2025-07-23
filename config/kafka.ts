import env from '#start/env'
import { KafkaConfig } from 'kafkajs'

/**
 * Configuration Kafka pour le microservice Clients
 *
 * Cette configuration définit les paramètres de connexion à Kafka
 * pour le microservice Clients dans l'architecture microservices.
 */
const kafkaConfig: KafkaConfig & { logLevel?: string } = {
  // Brokers Kafka - par défaut localhost:9092, mais configurable via variable d'environnement
  brokers: env.get('KAFKA_BROKERS', 'localhost:9092').split(','),

  // ID client pour ce microservice
  clientId: env.get('KAFKA_CLIENT_ID', 'clients-service'),

  // Niveau de log pour Kafka
  logLevel: env.get('KAFKA_LOG_LEVEL', 'info') as any,

  // Retry configuration
  retry: {
    initialRetryTime: 300,
    retries: 10,
  },

  // Décommentez et configurez si vous utilisez SSL en production
  // ssl: true,

  // Décommentez et configurez si vous utilisez SASL en production
  // sasl: {
  //   mechanism: 'plain',
  //   username: env.get('KAFKA_SASL_USERNAME'),
  //   password: env.get('KAFKA_SASL_PASSWORD'),
  // },
}

// Topics Kafka utilisés par ce microservice
export const KAFKA_TOPICS = {
  // Topics produits par ce microservice
  PRODUCED: {
    CLIENT_EVENTS: 'client-events',
    CLIENT_CREATED: 'client-created',
  },

  // Topics consommés par ce microservice
  CONSUMED: {
    COMMANDE_EVENTS: 'commande-events',
    COMMANDE_CREATED: 'commande-created',
    COMMANDE_UPDATED: 'commande-updated',
    COMMANDE_DELETED: 'commande-deleted',
    PRODUIT_EVENTS: 'produit-events',
    PRODUIT_STOCK_UPDATED: 'produit-stock-updated',
  },
}

export default kafkaConfig
