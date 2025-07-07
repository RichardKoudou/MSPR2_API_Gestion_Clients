/*
|--------------------------------------------------------------------------
| HTTP kernel file
|--------------------------------------------------------------------------
|
| The HTTP kernel file is used to register the middleware with the server
| or the router.
|
*/

import router from '@adonisjs/core/services/router'
import server from '@adonisjs/core/services/server'

/**
 * The error handler is used to convert an exception
 * to an HTTP response.
 */
server.errorHandler(() => import('#exceptions/handler'))

/**
 * The server middleware stack runs middleware on all HTTP
 * requests, even if no route is matched.
 */
server.use([
  // Middleware qui logue les erreurs avant toute chose
  () => import('#middleware/error_logger'),

  // Middleware qui injecte les bindings du container
  () => import('#middleware/container_bindings_middleware'),

  // Force les réponses JSON
  () => import('#middleware/force_json_response_middleware'),

  // Gestion du CORS
  () => import('@adonisjs/cors/cors_middleware'),
  () => import('#middleware/prometheus_middleware'),
])

/**
 * The router middleware stack runs middleware on all HTTP
 * requests with a registered route.
 */
router.use([
  () => import('@adonisjs/core/bodyparser_middleware'),
  () => import('@adonisjs/auth/initialize_auth_middleware'),

  // Middleware qui logue les requêtes HTTP (durée, statut...)
  () => import('#middleware/http_logger'),
])

/**
 * Named middleware collection must be explicitly assigned to
 * the routes or the routes group.
 */
export const middleware = router.named({
  auth: () => import('#middleware/auth_middleware'),
})
