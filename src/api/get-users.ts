import { api } from '../lib/axios'

export type GetUsersResponse = {
  id: string
  name: string
  email: string
  phone: string
  status: boolean
}[]

export async function getUsers() {
  const response = await api.get<GetUsersResponse>('/users')

  return response.data
}
