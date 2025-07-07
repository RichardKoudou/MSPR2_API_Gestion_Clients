import type { HttpContext } from '@adonisjs/core/http'
import { httpRequestDurationMicroseconds } from '../services/prometheus_service.js'

export default class MetricsMiddleware {
  async handle(ctx: HttpContext, next: () => Promise<void>) {
    const start = process.hrtime()

    await next()

    const diff = process.hrtime(start)
    const responseTimeInSeconds = diff[0] + diff[1] / 1e9

    const route = ctx.route?.pattern ?? ctx.request.url()

    httpRequestDurationMicroseconds.observe(
      {
        method: ctx.request.method(),
        route: route,
        status_code: ctx.response.response.statusCode?.toString() ?? 'unknown',
      },
      responseTimeInSeconds
    )
  }
}
