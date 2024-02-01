import './styles/global.css'

import { Button } from '@/components/ui/button'


export function App() {
  return (
    <div className='flex h-screen justify-center items-center gap-5'>
      hello world
      <Button variant={'destructive'}>Click me pleaseeee</Button>
    </div>
  )
}

