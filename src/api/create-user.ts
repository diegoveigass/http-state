import { api } from '@/lib/axios'

interface CreateUserBody {
  id: string
  name: string
  email: string
  phone: string
  status: boolean
}

export async function createUser({
  id,
  email,
  name,
  phone,
  status,
}: CreateUserBody) {
  await api.post('/users', { id, email, name, phone, status })
}
