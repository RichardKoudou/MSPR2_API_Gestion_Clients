/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import CustomerController from '#controllers/customerController';
import router from '@adonisjs/core/services/router'


//import { middleware } from './kernel.js';

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.post('storeCustomer', [CustomerController, 'store']);
  router.get('customers', [CustomerController, 'index']);
  router.get('customer/:id', [CustomerController, 'show']);
  router.patch('updateCustomer/:id', [CustomerController, 'update']);
  router.delete('deleteCustomer/:id', [CustomerController, 'destroy']);
}).prefix('payetonkawa/api/v1/')
