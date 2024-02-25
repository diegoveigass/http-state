import { api } from '../lib/axios'

interface GetUserProps {
  page: number
  userName: string
  userEmail: string
  userPhone: string
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

export async function getUsers({
  page,
  userEmail,
  userName,
  userPhone,
}: GetUserProps) {
  const response = await api.get<GetUsersResponse>('/users', {
    params: {
      _page: page,
      name: userName,
      email: userEmail,
      phone: userPhone,
    },
  })

  return response.data
}
