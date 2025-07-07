import axios, { AxiosInstance } from 'axios'
import MockAdapter from 'axios-mock-adapter'

export function setupAxiosMock(): { api: AxiosInstance; mock: MockAdapter } {
  const api: AxiosInstance = axios.create({
    baseURL: 'https://payetonkawa',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' },
  })

  const mock = new MockAdapter(api as any)

  mock.onGet(/\/api\/v1\/orders\?customerId=\d+/).reply((config) => {
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
