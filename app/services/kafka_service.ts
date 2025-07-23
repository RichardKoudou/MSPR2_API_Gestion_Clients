import KafkaStandaloneService from '#services/kafka_standalone_service'
import { KAFKA_TOPICS } from '#config/kafka'

/**
 * Service Kafka pour la production de messages
 */
export class KafkaService {
  private isConnected = false

  /**
   * Connecte le service Kafka
   */
  async connect(): Promise<void> {
    if (!this.isConnected) {
      // Le service standalone gère déjà la connexion
      this.isConnected = true
      console.log('Kafka producer service connected')
    }
  }

  /**
   * Déconnecte le service Kafka
   */
  async disconnect(): Promise<void> {
    if (this.isConnected) {
      await KafkaStandaloneService.disconnect()
      this.isConnected = false
      console.log('Kafka producer service disconnected')
    }
  }

  /**
   * Envoie un événement de création de client
   */
  async sendClientCreatedEvent(clientData: any): Promise<void> {
    const event = {
      type: 'CLIENT_CREATED',
      timestamp: new Date().toISOString(),
      service: 'clients-service',
      data: clientData,
    }
    await KafkaStandaloneService.send(KAFKA_TOPICS.PRODUCED.CLIENT_CREATED, event)
  }

  /**
   * Envoie un événement client générique
   */
  async sendClientEvent(clientData: any): Promise<void> {
    const event = {
      type: 'CLIENT_EVENT',
      timestamp: new Date().toISOString(),
      service: 'clients-service',
      data: clientData,
    }
    await KafkaStandaloneService.send(KAFKA_TOPICS.PRODUCED.CLIENT_EVENTS, event)
  }

  /**
   * Envoie un message à un topic spécifique
   */
  async sendMessage(topic: string, message: any): Promise<void> {
    await KafkaStandaloneService.send(topic, message)
  }

  /**
   * S'abonne à un topic avec un handler
   */
  async subscribeToTopic(topic: string, handler: (data: any) => Promise<void>): Promise<void> {
    await KafkaStandaloneService.createConsumer(topic, 'micro-1-micro2-listener', handler)
  }

  /**
   * Envoie un événement utilisateur
   */
  async sendUserEvent(userEvent: any): Promise<void> {
    await KafkaStandaloneService.send('user.events', userEvent)
  }
}

/**
 * Service Kafka pour la consommation de messages
 */
export class KafkaConsumerService {
  private isConnected = false

  /**
   * Connecte le service consommateur Kafka
   */
  async connect(): Promise<void> {
    if (!this.isConnected) {
      this.isConnected = true
      console.log('Kafka consumer service connected')
    }
  }

  /**
   * Déconnecte le service consommateur Kafka
   */
  async disconnect(): Promise<void> {
    if (this.isConnected) {
      await KafkaStandaloneService.disconnect()
      this.isConnected = false
      console.log('Kafka consumer service disconnected')
    }
  }

  /**
   * S'abonne aux topics Kafka pertinents
   */
  async subscribeToTopics(): Promise<void> {
    // Écoute des événements de commande
    await KafkaStandaloneService.createConsumer(
      KAFKA_TOPICS.CONSUMED.COMMANDE_EVENTS,
      'clients-commande-events-group',
      this.handleCommandeEvent.bind(this)
    )

    await KafkaStandaloneService.createConsumer(
      KAFKA_TOPICS.CONSUMED.COMMANDE_CREATED,
      'clients-commande-created-group',
      this.handleCommandeCreated.bind(this)
    )

    await KafkaStandaloneService.createConsumer(
      KAFKA_TOPICS.CONSUMED.COMMANDE_UPDATED,
      'clients-commande-updated-group',
      this.handleCommandeUpdated.bind(this)
    )

    await KafkaStandaloneService.createConsumer(
      KAFKA_TOPICS.CONSUMED.COMMANDE_DELETED,
      'clients-commande-deleted-group',
      this.handleCommandeDeleted.bind(this)
    )

    // Écoute des événements de produit
    await KafkaStandaloneService.createConsumer(
      KAFKA_TOPICS.CONSUMED.PRODUIT_EVENTS,
      'clients-produit-events-group',
      this.handleProduitEvent.bind(this)
    )

    await KafkaStandaloneService.createConsumer(
      KAFKA_TOPICS.CONSUMED.PRODUIT_STOCK_UPDATED,
      'clients-produit-stock-group',
      this.handleProduitStockUpdated.bind(this)
    )

    console.log('Kafka consumer subscribed to all topics')
  }

  /**
   * Traite les événements de commande
   */
  private async handleCommandeEvent(data: any): Promise<void> {
    try {
      console.log('Received commande event:', data)
      
      // Logique de traitement des événements de commande
      // Par exemple, mettre à jour le cache local des commandes client
      if (data.type === 'COMMANDE_CREATED' && data.data?.clientId) {
        // Traiter la création d'une nouvelle commande pour un client
        console.log(`New order created for client ${data.data.clientId}`)
      }
    } catch (error) {
      console.error('Error processing commande event:', error)
    }
  }

  /**
   * Traite les événements de création de commande
   */
  private async handleCommandeCreated(data: any): Promise<void> {
    try {
      console.log('Received commande created event:', data)
      
      // Logique spécifique à la création de commande
      if (data.data?.clientId) {
        // Mettre à jour les statistiques du client
        console.log(`Order created for client ${data.data.clientId}`)
      }
    } catch (error) {
      console.error('Error processing commande created event:', error)
    }
  }

  /**
   * Traite les événements de mise à jour de commande
   */
  private async handleCommandeUpdated(data: any): Promise<void> {
    try {
      console.log('Received commande updated event:', data)
      
      // Logique spécifique à la mise à jour de commande
      if (data.data?.clientId) {
        console.log(`Order updated for client ${data.data.clientId}`)
      }
    } catch (error) {
      console.error('Error processing commande updated event:', error)
    }
  }

  /**
   * Traite les événements de suppression de commande
   */
  private async handleCommandeDeleted(data: any): Promise<void> {
    try {
      console.log('Received commande deleted event:', data)
      
      // Logique spécifique à la suppression de commande
      if (data.data?.clientId) {
        console.log(`Order deleted for client ${data.data.clientId}`)
      }
    } catch (error) {
      console.error('Error processing commande deleted event:', error)
    }
  }

  /**
   * Traite les événements de produit
   */
  private async handleProduitEvent(data: any): Promise<void> {
    try {
      console.log('Received produit event:', data)
      
      // Logique de traitement des événements de produit
      // Par exemple, mettre à jour le cache local des produits
      if (data.type === 'PRODUIT_UPDATED') {
        console.log(`Product updated: ${data.data?.id}`)
      }
    } catch (error) {
      console.error('Error processing produit event:', error)
    }
  }

  /**
   * Traite les événements de mise à jour de stock
   */
  private async handleProduitStockUpdated(data: any): Promise<void> {
    try {
      console.log('Received produit stock updated event:', data)
      
      // Logique spécifique à la mise à jour de stock
      if (data.data?.productId && data.data?.newStock !== undefined) {
        console.log(`Stock updated for product ${data.data.productId}: ${data.data.newStock}`)
      }
    } catch (error) {
      console.error('Error processing produit stock updated event:', error)
    }
  }
}

export default KafkaService
