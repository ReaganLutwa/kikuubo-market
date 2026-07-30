import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ChevronDown, Send, CreditCard, Truck, BadgeCheck } from 'lucide-react'
import { categories } from '@/data/products'

const columns = [
  {
    title: 'Shop',
    links: categories.map((c) => ({ label: c.label, to: `/category?c=${c.id}` })),
  },
  {
    title: 'Customer Service',
    links: [
      { label: 'Track your order', to: '/cart' },
      { label: 'Returns & refunds', to: '/cart' },
      { label: 'Payment options', to: '/cart' },
      { label: 'Delivery info', to: '/cart' },
    ],
  },
  {
    title: 'Sell with us',
    links: [
      { label: 'Start selling', to: '/sell' },
      { label: 'Seller pricing', to: '/sell' },
      { label: 'Seller hub', to: '/sell' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About Kikuubo', to: '/' },
      { label: 'Flash deals', to: '/deals' },
      { label: 'Careers', to: '/' },
    ],
  },
]

function FooterColumn({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-cream/10 md:border-0">
      <button
        className="md:hidden flex w-full items-center justify-between py-4 font-sora font-semibold text-cream"
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <h4 className="hidden md:block font-sora font-semibold text-cream mb-4">{title}</h4>
      <motion.ul
        initial={false}
        animate={{ height: open || undefined ? 'auto' : 'auto' }}
        className={`space-y-2.5 overflow-hidden pb-4 md:pb-0 ${open ? 'block' : 'hidden md:block'}`}
      >
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-sm text-cream/60 hover:text-sunset transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </motion.ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-night text-cream">
      <div className="px-4 md:px-8 max-w-7xl mx-auto py-12 md:py-16">
        <div className="grid md:grid-cols-6 gap-8">
          <div className="md:col-span-2">
            <img src="/logo.svg" alt="Kikuubo" className="h-10 w-auto mb-4 [filter:brightness(0)_invert(1)] opacity-90" />
            <p className="text-sm text-cream/60 mb-6 max-w-xs">
              Uganda's Market, In Your Pocket. Phones, fashion, fresh farm produce — pay with mobile money, delivered anywhere in Uganda.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center rounded-full bg-cocoa border border-cream/10 overflow-hidden max-w-sm"
            >
              <input
                placeholder="Get deals every Friday"
                className="flex-1 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-cream/40"
              />
              <button className="bg-sunset hover:bg-sunset-hover transition-colors p-3 text-white" aria-label="Subscribe">
                <Send size={16} />
              </button>
            </form>
          </div>
          <div className="md:col-span-4 grid md:grid-cols-4 gap-2 md:gap-6">
            {columns.map((col) => (
              <FooterColumn key={col.title} {...col} />
            ))}
          </div>
        </div>

        {/* Payment trust strip */}
        <div className="mt-10 pt-8 border-t border-cream/10">
          <p className="text-xs uppercase tracking-widest text-cream/40 mb-4">We accept</p>
          <div className="flex flex-wrap items-center gap-3">
            <img src="/payment-momo.svg" alt="MTN MoMo" className="h-9 w-auto" />
            <img src="/payment-airtel.svg" alt="Airtel Money" className="h-9 w-auto" />
            <span className="flex items-center gap-2 rounded-lg border border-cream/15 px-4 h-9 text-sm font-semibold text-cream/80">
              <CreditCard size={15} /> VISA
            </span>
            <span className="flex items-center gap-2 rounded-lg border border-cream/15 px-4 h-9 text-sm font-semibold text-cream/80">
              <Truck size={15} /> Pay on Delivery
            </span>
            <span className="flex items-center gap-2 rounded-lg border border-cream/15 px-4 h-9 text-sm font-semibold text-leaf">
              <BadgeCheck size={15} /> Buyer Protection
            </span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-cream/40">
          <p>🇺🇬 Made in Kampala · © 2025 Kikuubo Uganda Ltd</p>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-sunset transition-colors">Privacy</Link>
            <Link to="/" className="hover:text-sunset transition-colors">Terms</Link>
            <Link to="/" className="hover:text-sunset transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
      {/* spacer for mobile bottom nav */}
      <div className="h-16 md:hidden" />
    </footer>
  )
}
