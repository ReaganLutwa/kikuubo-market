import { Link, useLocation } from 'react-router'
import { motion } from 'framer-motion'
import {
  Store, Building2, UtensilsCrossed, Timer, Bike, Wheat, Recycle, Wallet,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface ServiceTile {
  name: string
  to: string
  icon: LucideIcon
  /** tailwind bg class for the icon square */
  bg: string
  /** active-state path matcher */
  match: (pathname: string, search: string) => boolean
  badge?: string
  badgeClass?: string
}

const tiles: ServiceTile[] = [
  {
    name: 'Kikuubo',
    to: '/',
    icon: Store,
    bg: 'bg-sunset',
    match: (p) => p === '/',
  },
  {
    name: 'Super Mall',
    to: '/mall',
    icon: Building2,
    bg: 'bg-[#1E3A8A]',
    match: (p) => p === '/mall',
  },
  {
    name: 'Kikuubo Food',
    to: '/food',
    icon: UtensilsCrossed,
    bg: 'bg-rose-600',
    match: (p) => p === '/food',
    badge: 'FOOD',
    badgeClass: 'text-rose-600',
  },
  {
    name: 'Kikuubo Fresh',
    to: '/fresh',
    icon: Timer,
    bg: 'bg-airtel',
    match: (p) => p === '/fresh',
    badge: '45 MINUTES',
    badgeClass: 'text-white bg-airtel rounded-full px-1.5 py-px',
  },
  {
    name: 'Boda Send',
    to: '/send',
    icon: Bike,
    bg: 'bg-purple-700',
    match: (p) => p === '/send',
  },
  {
    name: 'Farm Direct',
    to: '/category?c=agriculture',
    icon: Wheat,
    bg: 'bg-leaf',
    match: (p, s) => p === '/category' && s.includes('c=agriculture'),
  },
  {
    name: 'Refurbished',
    to: '/category?c=refurbished',
    icon: Recycle,
    bg: 'bg-teal-600',
    match: (p, s) => p === '/category' && s.includes('c=refurbished'),
  },
  {
    name: 'Pay',
    to: '/pay',
    icon: Wallet,
    bg: 'bg-momo',
    match: (p) => p === '/pay',
  },
]

export default function ServiceSwitcher() {
  const { pathname, search } = useLocation()
  return (
    <div className="bg-cream border-b border-night/5">
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar py-3 -mx-4 px-4 md:mx-0 md:px-0">
          {tiles.map((t, i) => {
            const active = t.match(pathname, search)
            const Icon = t.icon
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
                className="shrink-0"
              >
                <Link
                  to={t.to}
                  className={`flex flex-col items-center gap-1.5 w-[74px] rounded-2xl px-1 py-2 transition-all ${
                    active ? 'bg-white shadow-md ring-2 ring-sunset/60' : 'hover:bg-white/70'
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${t.bg} ${
                      t.name === 'Pay' ? 'text-night' : 'text-white'
                    } shadow-sm`}
                  >
                    <Icon size={20} />
                  </span>
                  {t.badge && (
                    <span className={`text-[8px] font-extrabold tracking-wide ${t.badgeClass ?? ''}`}>
                      {t.badge}
                    </span>
                  )}
                  <span
                    className={`text-[10px] leading-tight text-center font-semibold ${
                      active ? 'text-sunset' : 'text-night/70'
                    }`}
                  >
                    {t.name}
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
