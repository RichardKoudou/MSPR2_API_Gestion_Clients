// app/Middleware/HttpLogger.ts
import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'

export default class HttpLogger {
  public async handle({ request, response }: HttpContext, next: () => Promise<void>) {
    const start = Date.now()

    await next()

    const duration = Date.now() - start
    const log = {
      method: request.method(),
      url: request.url(),
      status: response.response?.statusCode,
      duration,
      timestamp: new Date().toISOString(),
    }

    // Appel à Better Stack
    try {
      await axios.post(
        'https://in.logs.betterstack.com',
        {
          message: `[HTTP] ${log.method} ${log.url} - ${log.status} (${log.duration}ms)`,
          level: 'info',
          timestamp: log.timestamp,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.BETTER_STACK_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      )
    } catch (error) {
      console.error('[Better Stack] Failed to log HTTP event:', error.message)
    }
  }
}
