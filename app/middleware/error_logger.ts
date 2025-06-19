import type { HttpContext } from '@adonisjs/core/http'
import logger from '#services/logger'

export default class ErrorLoggerMiddleware {
  async handle(ctx: HttpContext, next: () => Promise<void>) {
    try {
      await next()
    } catch (error) {
      logger.error(` ${ctx.request.method()} ${ctx.request.url()}`, {
        status: error.status || 500,
        message: error.message,
        stack: error.stack,
      })

      throw error
    }
  }
}
