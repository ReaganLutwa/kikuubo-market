import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ChevronDown, CreditCard, Truck, BadgeCheck, Facebook, Twitter, Instagram, Linkedin, HeartHandshake } from 'lucide-react'
import { categories } from '@/data/products'
import { A } from '@/lib/asset'
import WhatsAppDeals from '@/components/WhatsAppDeals'

const columns = [
  {
    title: 'Shop',
    links: categories.map((c) => ({ label: c.label, to: `/category?c=${c.id}` })),
  },
  {
    title: 'Customer Service',
    links: [
      { label: 'Track Order', to: '/cart' },
      { label: 'Return & Refund Policy', to: '/returns' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Cookie Notice', to: '/cookies' },
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
      { label: 'Seller Terms & Credit', to: '/seller-terms' },
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
            <img src={A('/logo.svg')} alt="Kikuubo" className="h-10 w-auto mb-4 [filter:brightness(0)_invert(1)] opacity-90" />
            <p className="text-sm text-cream/60 mb-6 max-w-xs">
              Uganda's Market, In Your Pocket. Phones, fashion, fresh farm produce — pay with mobile money, delivered anywhere in Uganda.
            </p>
            <WhatsAppDeals dark />
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
            <img src={A('/payment-momo.svg')} alt="MTN MoMo" className="h-9 w-auto" />
            <img src={A('/payment-airtel.svg')} alt="Airtel Money" className="h-9 w-auto" />
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

        <div className="mt-8 pt-6 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/40">
          <p>🇺🇬 Made in Kampala · © 2026 Kikuubo Uganda Ltd</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link to="/terms" className="hover:text-sunset transition-colors">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-sunset transition-colors">Privacy</Link>
            <Link to="/returns" className="hover:text-sunset transition-colors">Returns</Link>
            <Link to="/cookies" className="hover:text-sunset transition-colors">Cookies</Link>
            <Link to="/returns" className="hover:text-sunset transition-colors">Warranty Policy</Link>
            <a
              href="https://wa.me/256700000000?text=Hi%20Kikuubo%20Customer%20Happiness%20Center!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-sunset transition-colors"
            >
              <HeartHandshake size={12} /> Customer Happiness Center
            </a>
          </div>
          <div className="flex items-center gap-3">
            {[
              { icon: Facebook, label: 'Facebook' },
              { icon: Twitter, label: 'X' },
              { icon: Instagram, label: 'Instagram' },
              { icon: Linkedin, label: 'LinkedIn' },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="https://wa.me/256700000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/15 text-cream/60 hover:text-sunset hover:border-sunset transition-colors"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* spacer for mobile bottom nav */}
      <div className="h-16 md:hidden" />
    </footer>
  )
}
