import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useQuery } from '@tanstack/react-query'

import { getUsers } from '@/api/get-users'

export function Home() {
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  return (
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
  )
}
