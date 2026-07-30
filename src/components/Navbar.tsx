import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, ShoppingCart, Menu, X, MapPin, ChevronDown, LayoutGrid,
  Home, Store, User, HelpCircle, Zap, BadgePercent,
} from 'lucide-react'
import { categories } from '@/data/products'

const bottomNav = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/category', label: 'Categories', icon: LayoutGrid },
  { to: '/cart', label: 'Cart', icon: ShoppingCart },
  { to: '/sell', label: 'Account', icon: User },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/category?q=${encodeURIComponent(query)}`)
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-cream/95 backdrop-blur transition-all duration-300 ${
          scrolled ? 'shadow-lg py-2' : 'shadow-none py-4'
        }`}
      >
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          {/* Row 1 */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 -ml-2 text-night"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            <Link to="/" className="flex items-center shrink-0" aria-label="Kikuubo home">
              <img src="/logo.svg" alt="Kikuubo" className="h-9 w-auto" />
            </Link>

            {/* Desktop mega-menu trigger */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setMegaOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full bg-night text-cream px-4 py-2 text-sm font-semibold hover:bg-cocoa transition-colors"
              >
                <LayoutGrid size={16} /> Categories <ChevronDown size={14} className={`transition-transform ${megaOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="absolute left-0 top-full mt-3 w-[560px] rounded-2xl bg-white shadow-2xl border border-sand p-6 grid grid-cols-2 gap-2"
                  >
                    {categories.map((c, i) => (
                      <motion.div
                        key={c.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          to={`/category?c=${c.id}`}
                          onClick={() => setMegaOpen(false)}
                          className="flex items-center gap-3 rounded-xl p-3 hover:bg-sand transition-colors"
                        >
                          <img src={c.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                          <div>
                            <p className="text-sm font-semibold text-night">{c.label}</p>
                            <p className="text-xs text-night/50">{c.count}</p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                    <Link
                      to="/deals"
                      onClick={() => setMegaOpen(false)}
                      className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-sunset/10 text-sunset font-semibold text-sm py-3 hover:bg-sunset/20 transition-colors"
                    >
                      <Zap size={16} /> Flash Deals — up to 60% off
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile location */}
            <button className="md:hidden flex items-center gap-1 text-xs font-medium text-night/70 ml-auto">
              <MapPin size={14} className="text-sunset" /> Deliver to Kampala <ChevronDown size={12} />
            </button>

            {/* Desktop search */}
            <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-xl">
              <div className="flex w-full items-center rounded-full bg-white border-2 border-night/10 focus-within:border-sunset overflow-hidden transition-colors">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search phones, fashion, farm produce…"
                  className="flex-1 bg-transparent px-5 py-2.5 text-sm outline-none placeholder:text-night/40"
                />
                <button type="submit" className="bg-sunset hover:bg-sunset-hover text-white px-6 py-2.5 font-semibold text-sm transition-colors">
                  Search
                </button>
              </div>
            </form>

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-5 ml-auto text-sm font-medium">
              <Link to="/sell" className="flex items-center gap-1.5 text-night/80 hover:text-sunset transition-colors">
                <Store size={16} /> Sell on Kikuubo
              </Link>
              <Link to="/deals" className="flex items-center gap-1.5 text-night/80 hover:text-sunset transition-colors">
                <BadgePercent size={16} /> Deals
              </Link>
              <button className="flex items-center gap-1.5 text-night/80 hover:text-sunset transition-colors">
                <HelpCircle size={16} /> Help
              </button>
              <Link to="/cart" className="relative p-2 text-night hover:text-sunset transition-colors" aria-label="Cart">
                <ShoppingCart size={22} />
                <span className="absolute -top-0.5 -right-0.5 bg-sunset text-white text-[10px] font-bold rounded-full h-4.5 min-w-[18px] px-1 flex items-center justify-center">3</span>
              </Link>
            </nav>

            {/* Mobile cart */}
            <Link to="/cart" className="md:hidden relative p-2 text-night" aria-label="Cart">
              <ShoppingCart size={22} />
              <span className="absolute top-0 right-0 bg-sunset text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 px-0.5 flex items-center justify-center">3</span>
            </Link>
          </div>

          {/* Row 2 — mobile search pill (always visible) */}
          <form onSubmit={submitSearch} className="md:hidden mt-3">
            <div className="flex items-center gap-2 rounded-full bg-white border border-night/10 border-l-4 border-l-sunset px-4 py-2.5 shadow-sm">
              <Search size={18} className="text-night/40 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search phones, fashion, farm produce…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-night/40"
              />
            </div>
          </form>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-night/50"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed inset-y-0 left-0 z-[70] w-[84%] max-w-sm bg-cream shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-sand">
                <img src="/logo.svg" alt="Kikuubo" className="h-8 w-auto" />
                <button onClick={() => setDrawerOpen(false)} aria-label="Close menu" className="p-2 text-night">
                  <X size={22} />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    to={`/category?c=${c.id}`}
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-3 rounded-xl p-3 hover:bg-sand transition-colors"
                  >
                    <img src={c.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-semibold">{c.label}</p>
                      <p className="text-xs text-night/50">{c.count}</p>
                    </div>
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t border-sand space-y-1">
                  <Link to="/deals" onClick={() => setDrawerOpen(false)} className="flex items-center gap-3 rounded-xl p-3 text-sunset font-semibold hover:bg-sand">
                    <Zap size={18} /> Flash Deals
                  </Link>
                  <Link to="/sell" onClick={() => setDrawerOpen(false)} className="flex items-center gap-3 rounded-xl p-3 font-semibold hover:bg-sand">
                    <Store size={18} /> Sell on Kikuubo
                  </Link>
                  <Link to="/cart" onClick={() => setDrawerOpen(false)} className="flex items-center gap-3 rounded-xl p-3 font-semibold hover:bg-sand">
                    <ShoppingCart size={18} /> My Cart
                  </Link>
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-sand shadow-[0_-4px_20px_rgba(26,18,11,0.08)]">
        <div className="grid grid-cols-4">
          {bottomNav.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/'} className="relative flex flex-col items-center gap-1 py-2.5">
              {({ isActive }) => (
                <>
                  <Icon size={20} className={isActive ? 'text-sunset' : 'text-night/50'} />
                  <span className={`text-[10px] font-medium ${isActive ? 'text-sunset' : 'text-night/50'}`}>{label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="bottom-nav-dot"
                      className="absolute -bottom-0 h-1.5 w-1.5 rounded-full bg-sunset"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  )
}
