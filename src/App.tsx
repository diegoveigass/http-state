import './styles/global.css'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { api } from './lib/axios'

interface User {
  id: string
  name: string
  email: string
  phone: string
  status: boolean
}

export function App() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    api.get<User[]>('/users').then((response) => setUsers(response.data))
  }, [])

  console.log(users)

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <div className="w-[1200px] mx-auto py-8 space-y-4">
        <header className="h-18 flex items-center justify-between">
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/diegoveigass.png" />
              <AvatarFallback>DV</AvatarFallback>
            </Avatar>
            <h1 className="font-bold text-2xl">Diego Veiga</h1>
          </div>
          <Button>Adicionar novo usuário</Button>
        </header>
        <main className="flex-1">
          <Table>
            <TableCaption>A list of users registred in app.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Id</TableHead>
                <TableHead className="w-[300px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length > 0 &&
                users.map((user) => {
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell className="text-right">
                        {user.status ? '✅' : '❌'}
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </main>
      </div>
    </div>
  )
}
