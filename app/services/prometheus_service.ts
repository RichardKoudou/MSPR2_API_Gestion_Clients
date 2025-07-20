import client from 'prom-client'

export const register = new client.Registry()

// Collecte des métriques systèmes par défaut (RAM, CPU, etc.)
client.collectDefaultMetrics({ register })

// Histogramme pour les requêtes HTTP
export const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Durée des requêtes HTTP',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.005, 0.01, 0.05, 0.1, 0.5, 1, 2, 5], // en secondes
})

register.registerMetric(httpRequestDurationMicroseconds)
