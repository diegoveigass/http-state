import './styles/global.css'
import { Toaster } from '@/components/ui/sonner'

import { Header } from '@/components/header'
import { Home } from '@/pages/home'

export function App() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <div className="w-[1200px] mx-auto py-8 space-y-4">
        <Header />
        <Home />
        <Toaster />
      </div>
    </div>
  )
}
