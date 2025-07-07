import axios, { AxiosInstance } from 'axios'
import MockAdapter from 'axios-mock-adapter'

export function setupAxiosMock(): { api: AxiosInstance; mock: MockAdapter } {
  // Crée l'instance Axios à utiliser dans l'app
  const api: AxiosInstance = axios.create({
    baseURL: 'https://payetonkawa/api/v1', // à modifier après dev de l'api orders
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' },
  })

  
  const mock = new MockAdapter(api as any)

  // Mock pour la route GET /api/v1/orders?customerId=...
  mock.onGet(/orders\?customerId=\d+/).reply((config) => {
    const customerId = config.url?.match(/customerId=(\d+)/)?.[1]

    return [
      200,
      {
        orders: [
          { id: 1, customerId: Number(customerId), item: 'Example Item' },
        ],
      },
    ]
  })

  return { api, mock }
}
