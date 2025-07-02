// start/logger/betterstack_logger.js
import axios from 'axios'
import { Transform } from 'stream'

const stream = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    try {
      // Vérifier que chunk est un objet valide
      if (!chunk || typeof chunk !== 'object') {
        console.error('Invalid log chunk received:', chunk)
        callback(null)
        return
      }

      // Ensure chunk has required properties with safe defaults
      const safeChunk = chunk || {}
      
      // Safely extract and transform log data
      const logData = {
        level: (safeChunk.level || 'info').toLowerCase(),
        message: safeChunk.msg ? (typeof safeChunk.msg === 'string' ? safeChunk.msg : JSON.stringify(safeChunk.msg)) : 'No message',
        timestamp: safeChunk.time ? new Date(safeChunk.time).toISOString() : new Date().toISOString(),
        metadata: {
          ...(typeof safeChunk === 'object' ? safeChunk : {}),
          level: undefined,
          msg: undefined,
          time: undefined
        }
      }

      // Envoyer à BetterStack
      axios.post(
        'https://in.logs.betterstack.com',
        logData,
        {
          headers: {
            Authorization: `Bearer ${process.env.BETTER_STACK_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      ).catch(err => {
        console.error('Failed to send log to Better Stack:', err.message)
      })

      // Passer au prochain middleware
      callback(null, chunk)
    } catch (err) {
      console.error('Error processing log:', err)
      callback(null, chunk)
    }
  }
})

export default stream