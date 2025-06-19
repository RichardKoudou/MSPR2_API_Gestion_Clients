import type { HttpContext } from '@adonisjs/core/http'
import logger from '#services/logger'

export default class HttpLoggerMiddleware {
  async handle(ctx: HttpContext, next: () => Promise<void>) {
    const start = performance.now()

    await next()

    const duration = (performance.now() - start).toFixed(2)

    logger.info(`HTTP ${ctx.request.method()} ${ctx.request.url()}`, {
      status: ctx.response.response.statusCode,
      duration: `${duration}ms`,
      ip: ctx.request.ip(),
      userAgent: ctx.request.header('user-agent'),
    })
  }
}
