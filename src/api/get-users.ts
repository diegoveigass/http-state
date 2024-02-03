import { api } from '../lib/axios'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  status: boolean
}

export async function getUsers() {
  const response = await api.get<User[]>('/users')

  return response.data
}
