import './styles/global.css'

import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
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

import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { getUsers } from '@/api/get-users'

import { CreateUser } from '@/components/create-user'

import { ModeToggle } from '@/components/theme-toggle'

export function App() {
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

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
          <div className="flex gap-2 items-center justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Adicionar novo usuário</Button>
              </DialogTrigger>
              <CreateUser />
            </Dialog>
            <ModeToggle />
          </div>
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
              {users?.map((user) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
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
