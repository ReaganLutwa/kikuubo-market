import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, ChevronDown, Zap, Flame, Tag, Leaf, AlarmClock } from 'lucide-react'
import type { Product } from '@/data/products'
import { products, flashSaleProducts, topDeals, formatUGX } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import FlipCountdown from '@/components/deals/FlipCountdown'
import FlashCard from '@/components/deals/FlashCard'
import ClearanceCard from '@/components/deals/ClearanceCard'
import { A } from '@/lib/asset'
import WhatsAppDeals from '@/components/WhatsAppDeals'

type TabId = 'flash' | 'drops' | 'under50' | 'clearance' | 'farm'

const tabs: { id: TabId; label: string; icon: typeof Zap }[] = [
  { id: 'flash', label: 'Flash Now', icon: Zap },
  { id: 'drops', label: "Today's Drops", icon: Flame },
  { id: 'under50', label: 'Under UGX 50K', icon: Tag },
  { id: 'clearance', label: 'Clearance', icon: AlarmClock },
  { id: 'farm', label: 'Farm Fresh Deals', icon: Leaf },
]

/* Budget items under UGX 50K — derived from catalog imagery */
const budgetItems: Product[] = [
  products[7], // matooke 18K
  products[8], // beans 32K
  {
    id: 'phone-case-kit',
    name: 'Shockproof Phone Case + Glass Protector Kit',
    image: A('/cat-phones.png'),
    price: 15000,
    oldPrice: 28000,
    rating: 4.3,
    reviews: 240,
    vendor: 'Owino Traders',
    category: 'phones',
  },
  {
    id: 'kitchen-set',
    name: 'Non-Stick Wooden-Handle Kitchen Utensil Set (6 pcs)',
    image: A('/cat-home.png'),
    price: 45000,
    oldPrice: 65000,
    rating: 4.5,
    reviews: 178,
    vendor: 'Nsambya Home Style',
    verified: true,
    category: 'home',
  },
  {
    id: 'kitenge-tshirt',
    name: 'Kitenge-Print Cotton T-Shirt, Unisex (S–XXL)',
    image: A('/cat-fashion.png'),
    price: 25000,
    oldPrice: 38000,
    rating: 4.6,
    reviews: 312,
    vendor: 'Owino Traders',
    category: 'mens-fashion',
  },
  {
    id: 'avocado-basket',
    name: 'Basket of 12 Fresh Avocados — Masaka Farm Gate',
    image: A('/cat-agriculture.png'),
    price: 12000,
    rating: 4.8,
    reviews: 506,
    vendor: 'Mityana Fresh Farms',
    verified: true,
    category: 'agriculture',
    badge: 'VERIFIED',
  },
]

const farmDeals: Product[] = [
  products[7],
  products[8],
  budgetItems[5],
  {
    id: 'irish-potatoes',
    name: 'Irish Potatoes, 10kg Sack — Kabale Highlands',
    image: A('/product-matooke.png'),
    price: 38000,
    oldPrice: 48000,
    rating: 4.7,
    reviews: 389,
    vendor: 'Mityana Fresh Farms',
    verified: true,
    category: 'agriculture',
  },
]

const todaysDrops: Product[] = [...products, products[1], products[5]]

export default function Deals() {
  const [tab, setTab] = useState<TabId>('flash')
  const tabsRef = useRef<HTMLDivElement>(null)

  const scrollToDeals = () => tabsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div>
      {/* ============ 1. HERO ============ */}
      <section className="relative overflow-hidden bg-night">
        <motion.img
          src={A('/deals-bg.png')}
          alt=""
          initial={{ scale: 1 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 24, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-night/70" />
        <div className="relative px-4 md:px-8 max-w-7xl mx-auto py-20 md:py-28 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-sunset/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sunset"
          >
            <Zap size={14} className="fill-sunset" /> Kikuubo Deals
          </motion.p>
          <h1 className="mt-5 font-sora font-extrabold tracking-tight text-cream text-[clamp(2.5rem,8vw,5rem)] leading-none">
            {'Obuwanguzi!'.split('').map((ch, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: (i % 2 === 0 ? 1 : -1) * (20 + (i * 13) % 40), rotate: ((i * 37) % 40) - 20 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 0.2 + i * 0.03, duration: 0.6, ease: 'easeOut' }}
              >
                {ch}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-4 text-base md:text-lg text-cream/70"
          >
            Fresh deals drop daily at noon — up to <span className="font-bold text-sunset">70% off</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mt-10"
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-cream/50">Next drop in</p>
            <FlipCountdown />
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToDeals}
            className="mx-auto mt-12 flex items-center gap-2 rounded-full bg-sunset px-7 py-3.5 font-sora text-sm font-bold text-white transition-colors hover:bg-sunset-hover"
          >
            Browse all deals <ChevronDown size={16} />
          </motion.button>
        </div>
      </section>

      {/* ============ 2. TAB BAR ============ */}
      <div ref={tabsRef} className="sticky top-[96px] md:top-[60px] z-40 border-b border-night/5 bg-cream/95 backdrop-blur scroll-mt-28">
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <div className="no-scrollbar flex gap-1 overflow-x-auto py-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                  tab === t.id ? 'text-sunset' : 'text-night/60 hover:text-night'
                }`}
              >
                <t.icon size={15} />
                {t.label}
                {tab === t.id && (
                  <motion.span
                    layoutId="deal-tab-underline"
                    className="absolute inset-x-3 -bottom-[1px] h-[3px] rounded-full bg-sunset"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ============ 3–6. TAB CONTENT ============ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {tab === 'flash' && (
            <section className="bg-night py-12 md:py-16">
              <div className="px-4 md:px-8 max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                  <Zap size={22} className="fill-momo text-momo" />
                  <h2 className="font-sora text-xl md:text-2xl font-extrabold text-cream">Flash Now</h2>
                  <span className="rounded-full bg-airtel px-3 py-1 text-[11px] font-bold text-white">LIVE</span>
                </div>
                <p className="mt-2 text-sm text-cream/50">Deals ending soon — when the timer hits zero, prices go back up.</p>
                <div className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
                  {flashSaleProducts.slice(0, 6).map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, x: 60 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
                    >
                      <FlashCard product={p} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {tab === 'drops' && (
            <section className="py-12 md:py-16">
              <div className="px-4 md:px-8 max-w-7xl mx-auto">
                <h2 className="font-sora text-xl md:text-2xl font-extrabold">Today's Drops</h2>
                <p className="mt-2 text-sm text-night/50">Fresh deals that landed at noon today — across every category.</p>
                <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {todaysDrops.map((p, i) => (
                    <motion.div
                      key={`${p.id}-${i}`}
                      initial={{ opacity: 0, y: 32 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ delay: (i % 4) * 0.05, duration: 0.5, ease: 'easeOut' }}
                      className="relative"
                    >
                      <span className="absolute -top-2 left-3 z-10 rounded-full bg-sky-info px-2.5 py-0.5 text-[10px] font-bold text-white shadow">
                        DROPPED TODAY
                      </span>
                      <ProductCard product={p} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {tab === 'under50' && (
            <motion.section
              initial={{ opacity: 0, skewY: 2 }}
              animate={{ opacity: 1, skewY: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-sand py-12 md:py-16"
            >
              <div className="px-4 md:px-8 max-w-7xl mx-auto">
                <h2 className="font-sora text-xl md:text-2xl font-extrabold">
                  Everything under <span className="text-sunset">UGX 50,000</span>
                </h2>
                <p className="mt-2 text-sm text-night/50">Small prices, big wins. Kitchen, accessories, produce and more.</p>
                <div className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
                  {budgetItems.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: i * 0.08, type: 'spring', stiffness: 260, damping: 18 }}
                      className="w-[220px] md:w-[250px] shrink-0 snap-start"
                    >
                      <div className="relative">
                        <ProductCard product={p} />
                        <span className="price pointer-events-none absolute right-3 top-3 rounded-xl bg-night/85 px-2.5 py-1 text-xs text-momo backdrop-blur">
                          {formatUGX(p.price)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {tab === 'clearance' && (
            <section className="relative overflow-hidden bg-night py-12 md:py-16">
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(ellipse 60% 50% at 20% 20%, rgba(228,0,0,0.2), transparent 60%), radial-gradient(ellipse 50% 40% at 85% 80%, rgba(249,115,22,0.18), transparent 60%)' }}
              />
              <div className="relative px-4 md:px-8 max-w-7xl mx-auto">
                <h2 className="font-sora text-xl md:text-2xl font-extrabold text-cream">
                  Clearance — <span className="text-airtel">Final Call</span>
                </h2>
                <p className="mt-2 text-sm text-cream/50">Last chance. When these are gone, they're gone for good.</p>
                <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {topDeals.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 32 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ delay: (i % 4) * 0.06, duration: 0.5, ease: 'easeOut' }}
                    >
                      <ClearanceCard product={p} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {tab === 'farm' && (
            <section className="py-12 md:py-16" style={{ background: 'linear-gradient(135deg, rgba(22,163,74,0.08), rgba(22,163,74,0.02))' }}>
              <div className="px-4 md:px-8 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                  <Leaf size={22} className="text-leaf" />
                  <h2 className="font-sora text-xl md:text-2xl font-extrabold">Farm Fresh Deals</h2>
                </div>
                <p className="mt-2 text-sm text-night/50">Straight from Ugandan farms to your door — verified fresh.</p>
                <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {farmDeals.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 32 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ delay: i * 0.06, duration: 0.5, ease: 'easeOut' }}
                    >
                      <ProductCard product={p} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ============ 7. DEAL ALERTS ============ */}
      <section className="py-12 md:py-20">
        <div className="px-4 md:px-8 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="rounded-3xl p-8 md:p-12 text-center shadow-xl"
            style={{ background: 'linear-gradient(135deg, #F97316 0%, #EA580C 55%, #B91C1C 100%)' }}
          >
            <motion.div
              whileHover={{ rotate: [0, -15, 15, -10, 10, 0] }}
              transition={{ duration: 0.6 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/15"
            >
              <Bell size={30} className="text-white" />
            </motion.div>
            <h2 className="mt-5 font-sora text-2xl md:text-3xl font-extrabold text-white">Never miss a drop</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-white/80">
              Join our WhatsApp broadcast and we'll ping you the moment flash sales start.
            </p>
            <div className="mx-auto mt-6 flex max-w-md justify-center">
              <WhatsAppDeals />
            </div>
            <p className="mt-3 text-[11px] text-white/60">Free alerts · Unsubscribe anytime</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
