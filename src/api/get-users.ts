import { api } from '../lib/axios'

interface GetUserProps {
  page: number
}

export type UsersResponse = {
  id: string
  name: string
  email: string
  phone: string
  status: boolean
}[]

export type GetUsersResponse = {
  first: number
  prev: number | null
  next: number | null
  last: number
  pages: number
  items: number
  data: UsersResponse
}

export async function getUsers({ page }: GetUserProps) {
  const response = await api.get<GetUsersResponse>('/users', {
    params: {
      _page: page,
    },
  })

  return response.data
}
