/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import CustomerController from '#controllers/customerController';
import { register } from '#services/prometheus_service';
import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';




//import { middleware } from './kernel.js';

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.post('register', [CustomerController, 'store'])
  router.post('login', [CustomerController, 'login'])
}).prefix('payetonkawa/api/v1/auth/')

router.group(() => {
  router.get('customer/:id', [CustomerController, 'show']);
  router.patch('updateCustomer/:id', [CustomerController, 'update']);
  router.post('customer/:id/logout', [CustomerController, 'logout']);
  router.delete('deleteCustomer/:id', [CustomerController, 'destroy']);
}).prefix('payetonkawa/api/v1/').use(middleware.auth({
    guards: ['api']}));

router.get('customers', [CustomerController, 'index']).prefix('payetonkawa/api/v1/').use(middleware.auth({
    guards: ['api']}));


router.get('/metrics', async ({ response }) => {
  response.header('Content-Type', register.contentType)
  return register.metrics()
})