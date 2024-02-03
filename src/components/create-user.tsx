import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import { createUser } from '@/api/create-user'

import { v4 as uuidv4 } from 'uuid'

const createUserFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
})

type createUserFormData = z.infer<typeof createUserFormSchema>

export function CreateUser() {
  const { handleSubmit, register } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  })

  const { mutateAsync: createUserFn } = useMutation({
    mutationFn: createUser,
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

      alert('Create user successfully')
    } catch (error) {
      alert(error)
    }
  }

  return (
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
          <Input id="name" className="col-span-3" {...register('name')} />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input id="email" className="col-span-3" {...register('email')} />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">
            Phone
          </Label>
          <Input id="phone" className="col-span-3" {...register('phone')} />
        </div>

        <Button type="submit">Create user</Button>
      </form>
    </DialogContent>
  )
}
