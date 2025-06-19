import winston from 'winston'
import LokiTransport from 'winston-loki'

// Création du logger Winston avec tous les transports
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      return `[${timestamp}] ${level.toUpperCase()} - ${message} ${
        Object.keys(meta).length ? JSON.stringify(meta) : ''
      }`
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/api.log' }),
    new winston.transports.File({ filename: 'logs/errors.log', level: 'error' }),
    new LokiTransport({
      host: 'http://localhost:3100', // URL du serveur Loki
      labels: { job: 'adonis-api', env: 'local' },
      json: true, // format JSON pour Loki
      batching: true,
      interval: 5, // Envoie toutes les 5s
    }),
  ],
})

export default logger
