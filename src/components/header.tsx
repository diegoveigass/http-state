import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import { CreateUser } from '@/components/create-user'

import { ThemeToggle } from '@/components/theme-toggle'

export function Header() {
  return (
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
            <Button>Add new user</Button>
          </DialogTrigger>
          <CreateUser />
        </Dialog>
        <ThemeToggle />
      </div>
    </header>
  )
}
