import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Timer, Plus, Bike, Moon } from 'lucide-react'
import ServiceSwitcher from '@/components/ServiceSwitcher'
import { formatUGX } from '@/data/products'
import { A } from '@/lib/asset'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

const cats = ['All', 'Fruits & Veg', 'Dairy & Eggs', 'Meat & Fish', 'Pantry', 'Drinks', 'Baby'] as const
type FreshCat = (typeof cats)[number]

interface FreshItem {
  name: string
  cat: Exclude<FreshCat, 'All'>
  price: number
  oldPrice?: number
  off?: number
  img?: string
  gradient?: string
}

const items: FreshItem[] = [
  { name: 'Green Matooke Bunch', cat: 'Fruits & Veg', price: 18000, oldPrice: 22000, off: 18, img: A('/product-matooke.png') },
  { name: 'Irish Potatoes 5kg', cat: 'Fruits & Veg', price: 14500, oldPrice: 18000, off: 19, img: A('/cat-agriculture.png') },
  { name: 'Farm Eggs (Tray of 30)', cat: 'Dairy & Eggs', price: 13500, oldPrice: 15000, off: 10, img: A('/product-chicks.png') },
  { name: 'Fresh Tilapia (whole, ~1kg)', cat: 'Meat & Fish', price: 28000, oldPrice: 33000, off: 15, img: A('/cat-agriculture.png') },
  { name: 'Fresh Dairy Milk 1L', cat: 'Dairy & Eggs', price: 4200, oldPrice: 5000, off: 16, img: A('/product-beans.png') },
  { name: 'Tomatoes 1kg', cat: 'Fruits & Veg', price: 6500, oldPrice: 8000, off: 19, img: A('/cat-agriculture.png') },
  { name: 'Red Onions 1kg', cat: 'Fruits & Veg', price: 5000, oldPrice: 6000, off: 17, img: A('/product-beans.png') },
  { name: 'Hass Avocado (each)', cat: 'Fruits & Veg', price: 2000, oldPrice: 2500, off: 20, img: A('/cat-agriculture.png') },
  { name: 'Sweet Pineapple (whole)', cat: 'Fruits & Veg', price: 3500, oldPrice: 4500, off: 22, img: A('/cat-agriculture.png') },
  { name: 'Super Rice 5kg', cat: 'Pantry', price: 24000, oldPrice: 28000, off: 14, img: A('/product-beans.png') },
  { name: 'Sunflower Cooking Oil 3L', cat: 'Pantry', price: 26500, oldPrice: 31000, off: 15, img: A('/product-beans.png') },
  { name: 'Whole Broiler Chicken (~1.5kg)', cat: 'Meat & Fish', price: 22000, oldPrice: 26000, off: 15, img: A('/product-chicks.png') },
]

export default function Fresh() {
  const [cat, setCat] = useState<FreshCat>('All')
  const shown = useMemo(() => (cat === 'All' ? items : items.filter((i) => i.cat === cat)), [cat])

  return (
    <div className="bg-cream min-h-screen">
      <ServiceSwitcher />

      {/* Hero */}
      <section className="bg-[linear-gradient(135deg,#E40000_0%,#B91C1C_55%,#7F1D1D_100%)] text-white">
        <div className="px-4 md:px-8 max-w-7xl mx-auto py-12 md:py-16">
          <motion.span
            variants={fadeUp} initial="hidden" animate="show"
            className="inline-flex items-center gap-2 rounded-full bg-white text-airtel px-4 py-1.5 text-sm font-extrabold tracking-wide"
          >
            <Timer size={15} /> 45 MINUTES
          </motion.span>
          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.1 }}
            className="mt-4 font-sora font-extrabold tracking-tight leading-[1.05] text-[clamp(1.9rem,5vw,3.25rem)] max-w-2xl"
          >
            Fresh groceries in 45 minutes within Kampala
          </motion.h1>
          <motion.p
            variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}
            className="mt-3 max-w-md text-white/85"
          >
            Matooke, tilapia, milk and more — picked fresh at dawn, rushed to your door by boda.
          </motion.p>

          <motion.div
            variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.3 }}
            className="mt-6 flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0"
          >
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  cat === c ? 'bg-white text-airtel shadow' : 'bg-white/15 hover:bg-white/25'
                }`}
              >
                {c}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Delivery promise strip */}
      <div className="bg-night text-cream">
        <div className="px-4 md:px-8 max-w-7xl mx-auto py-3.5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-semibold">
          <span className="flex items-center gap-2"><Moon size={15} className="text-momo" /> Order by 6pm — delivered tonight by boda</span>
          <span className="flex items-center gap-2"><Bike size={15} className="text-momo" /> Free delivery over UGX 50,000</span>
        </div>
      </div>

      {/* Product grid */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto py-10 md:py-14">
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
          initial="hidden" animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5"
        >
          {shown.map((item) => (
            <motion.div
              key={item.name}
              variants={fadeUp}
              layout
              className="group rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className={`relative aspect-square ${item.gradient ?? ''}`}>
                {item.img ? (
                  <img src={item.img} alt={item.name} loading="lazy" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-airtel/60 to-night/60" />
                )}
                {item.off != null && (
                  <span className="absolute top-2 left-2 rounded-full bg-leaf px-2 py-0.5 text-[11px] font-extrabold text-white shadow">
                    {item.off}% OFF
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs text-night/50">{item.cat}</p>
                <h3 className="mt-0.5 text-sm font-semibold leading-snug line-clamp-2 min-h-[2.5em]">{item.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <span className="price text-sm">{formatUGX(item.price)}</span>
                    {item.oldPrice != null && (
                      <span className="block text-[11px] text-night/40 line-through">{formatUGX(item.oldPrice)}</span>
                    )}
                  </div>
                  <button
                    aria-label={`Add ${item.name} to cart`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-airtel text-white shadow hover:bg-sunset-deep transition-colors"
                  >
                    <Plus size={17} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  )
}
