import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from './ui/button'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { createUser } from '@/api/create-user'

import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import { GetUsersResponse, getUsers } from '@/api/get-users'
import { toast } from 'sonner'
import { useSearchParams } from 'react-router-dom'

const createUserFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'E-mail is required').email('Invalid e-mail format'),
  phone: z.string().min(1, 'Phone is required'),
})

type createUserFormData = z.infer<typeof createUserFormSchema>

export function CreateUser() {
  const [dialogOpen, setDialogOpen] = useState(false)

  const [searchParams] = useSearchParams()

  const page = z.coerce.number().parse(searchParams.get('_page') ?? '1')

  const { data: result } = useQuery({
    queryKey: ['users', page],
    queryFn: () => getUsers({ page }),
  })

  const queryClient = useQueryClient()

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })

  const { mutateAsync: createUserFn, isPending: createUserLoading } =
    useMutation({
      mutationFn: createUser,
      async onSuccess(_, variables) {
        const userListCache = queryClient.getQueriesData<GetUsersResponse>({
          queryKey: ['users', result?.pages],
        })

        userListCache.forEach(([cacheKey, cacheData]) => {
          if (!cacheData) {
            return
          }

          queryClient.setQueryData(cacheKey, {
            ...cacheData,
            items: cacheData.items + 1,
            data: [...cacheData.data, variables],
          })
        })
      },
    })

  async function handleCreateUser(data: createUserFormData) {
    try {
      await createUserFn({
        id: uuidv4(),
        email: data.email,
        name: data.name,
        phone: data.phone,
        status: true,
      })

      toast.success('User has been created')
      setDialogOpen(false)
      reset()
    } catch (error) {
      toast.error(String(error))
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>Add new user</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create user</DialogTitle>
        <DialogDescription>Create a new user.</DialogDescription>
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <div className="col-span-3 space-y-1">
              <Input id="name" {...register('name')} />
              {errors.name && (
                <span className="text-sm text-red-800 dark:text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <div className="col-span-3 space-y-1">
              <Input id="email" className="col-span-3" {...register('email')} />
              {errors.email && (
                <span className="text-sm text-red-800 dark:text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <div className="col-span-3 space-y-1">
              <Input id="phone" className="col-span-3" {...register('phone')} />
              {errors.phone && (
                <span className="text-sm text-red-800 dark:text-red-500">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>

          <Button disabled={createUserLoading} type="submit">
            Create user
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
