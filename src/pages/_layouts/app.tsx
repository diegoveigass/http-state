import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <div className="w-[1200px] mx-auto py-8 space-y-4">
        <Header />

        <Outlet />
      </div>
    </div>
  )
}
