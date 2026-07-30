import { Outlet } from 'react-router'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Layout() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-cream text-night">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
