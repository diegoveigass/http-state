import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Pagination } from '@/components/ui/pagination'

import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { useQuery } from '@tanstack/react-query'

import { getUsers } from '@/api/get-users'

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = z.coerce.number().parse(searchParams.get('_page') ?? '1')

  const { data: result } = useQuery({
    queryKey: ['users', page],
    queryFn: () => getUsers({ page }),
  })

  function handlePaginate(page: number) {
    setSearchParams((prev) => {
      prev.set('_page', page.toString())

      return prev
    })
  }

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
          {result?.data.map((user) => {
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
      {result && (
        <Pagination
          page={page}
          totalCount={result.items}
          pages={result.pages}
          onPageChange={handlePaginate}
        />
      )}
    </main>
  )
}
