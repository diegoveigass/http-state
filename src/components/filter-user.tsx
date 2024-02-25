import { Search, X } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'react-router-dom'

const userFilterSchema = z.object({
  userName: z.string().optional(),
  userEmail: z.string().optional(),
  userPhone: z.string().optional(),
})

type UserFilterSchema = z.infer<typeof userFilterSchema>

export function FilterUser() {
  const [searchParams, setSearchParams] = useSearchParams()

  const userName = searchParams.get('userName')
  const userEmail = searchParams.get('userEmail')
  const userPhone = searchParams.get('userPhone')

  const { register, handleSubmit, reset } = useForm<UserFilterSchema>({
    resolver: zodResolver(userFilterSchema),
    defaultValues: {
      userName: userName ?? '',
      userEmail: userEmail ?? '',
      userPhone: userPhone ?? '',
    },
  })

  function handleFilter({ userEmail, userName, userPhone }: UserFilterSchema) {
    setSearchParams((state) => {
      if (userEmail) {
        state.set('userEmail', userEmail)
      } else {
        state.delete('userEmail')
      }

      if (userName) {
        state.set('userName', userName)
      } else {
        state.delete('userName')
      }

      if (userPhone) {
        state.set('userPhone', userPhone)
      } else {
        state.delete('userPhone')
      }

      return state
    })
  }

  function handleClearFilters() {
    reset({
      userEmail: '',
      userName: '',
      userPhone: '',
    })
    setSearchParams((state) => {
      state.delete('userEmail')
      state.delete('userName')
      state.delete('userPhone')

      state.set('page', '1')

      return state
    })
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleFilter)}>
      <span className="text-xl font-bold">Filters</span>
      <div className="flex items-center justify-between">
        <div className="flex max-w-[640px] gap-2">
          <Input placeholder="User name" {...register('userName')} />
          <Input placeholder="User email" {...register('userEmail')} />
          <Input placeholder="User phone" {...register('userPhone')} />
        </div>

        <div className="space-x-2">
          <Button type="submit" variant="secondary">
            <Search className="mr-2 h-4 w-4" />
            Filter results
          </Button>

          <Button type="button" variant="outline" onClick={handleClearFilters}>
            <X className="mr-2 h-4 w-4" />
            Remove filters
          </Button>
        </div>
      </div>
    </form>
  )
}
