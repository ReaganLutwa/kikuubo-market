import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Star, Bike, Lock, Unlock, UtensilsCrossed, BadgePercent } from 'lucide-react'
import ServiceSwitcher from '@/components/ServiceSwitcher'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

const cuisines = ['Rolex', 'Luwombo', 'Matoke', 'Chicken', 'Burgers', 'Pizza', 'Drinks']

interface Restaurant {
  name: string
  area: string
  cuisine: string
  rating: number
  time: string
  deal: string
  emoji: string
}

const restaurants: Restaurant[] = [
  { name: 'Kikoni Rolex Corner', area: 'Kikoni, Makerere', cuisine: 'Rolex', rating: 4.7, time: '20-30 mins', deal: '40% off up to UGX 30,000', emoji: '🌯' },
  { name: 'Nakasero Luwombo House', area: 'Nakasero', cuisine: 'Luwombo', rating: 4.8, time: '30-40 mins', deal: '40% off up to UGX 30,000', emoji: '🍲' },
  { name: 'Kabalagala Pork Joint', area: 'Kabalagala', cuisine: 'Pork & Grill', rating: 4.6, time: '25-35 mins', deal: 'Buy 1kg get ¼kg free', emoji: '🍖' },
  { name: 'Java Bean Kampala', area: 'Oasis Mall, Yusuf Lule Rd', cuisine: 'Café & Burgers', rating: 4.5, time: '25-35 mins', deal: '40% off up to UGX 30,000', emoji: '🍔' },
  { name: 'Ntinda Kati Kati Kitchen', area: 'Ntinda', cuisine: 'Matoke', rating: 4.9, time: '30-40 mins', deal: 'Free side of greens', emoji: '🍌' },
  { name: 'Bwaise Chicken Tonight', area: 'Bwaise', cuisine: 'Chicken', rating: 4.4, time: '25-35 mins', deal: '40% off up to UGX 30,000', emoji: '🍗' },
  { name: 'Muyenga Pizza Pod', area: 'Muyenga', cuisine: 'Pizza', rating: 4.5, time: '30-45 mins', deal: '2 medium pizzas UGX 45,000', emoji: '🍕' },
  { name: 'Owino Fresh Juice Bar', area: 'Owino Market', cuisine: 'Drinks', rating: 4.3, time: '15-25 mins', deal: '40% off up to UGX 30,000', emoji: '🥤' },
  { name: 'Kisenyi Pilawo Palace', area: 'Kisenyi', cuisine: 'Pilawo & Biryani', rating: 4.7, time: '25-35 mins', deal: 'Free soda with every plate', emoji: '🍛' },
  { name: 'Kololo Burger Base', area: 'Kololo', cuisine: 'Burgers', rating: 4.6, time: '25-35 mins', deal: '40% off up to UGX 30,000', emoji: '🍟' },
]

export default function Food() {
  const [active, setActive] = useState('Rolex')
  return (
    <div className="bg-cream min-h-screen">
      <ServiceSwitcher />

      {/* Hero */}
      <section className="bg-[linear-gradient(135deg,#E11D48_0%,#BE123C_55%,#881337_100%)] text-white">
        <div className="px-4 md:px-8 max-w-7xl mx-auto py-12 md:py-16">
          <motion.span
            variants={fadeUp} initial="hidden" animate="show"
            className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-sm font-semibold"
          >
            <UtensilsCrossed size={15} /> KIKUUBO FOOD
          </motion.span>
          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.1 }}
            className="mt-4 font-sora font-extrabold tracking-tight leading-[1.05] text-[clamp(1.9rem,5vw,3.25rem)] max-w-2xl"
          >
            Kikuubo Food — Kampala eats, delivered by boda 🏍️
          </motion.h1>
          <motion.p
            variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}
            className="mt-3 max-w-md text-white/85"
          >
            Rolex to luwombo, hot from Kampala's favourite kitchens. Pay with MTN MoMo or Airtel Money.
          </motion.p>

          {/* Cuisine chips */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.3 }}
            className="mt-6 flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0"
          >
            {cuisines.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active === c ? 'bg-white text-rose-700 shadow' : 'bg-white/15 hover:bg-white/25'
                }`}
              >
                {c}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="px-4 md:px-8 max-w-7xl mx-auto py-10 md:py-14 space-y-10">
        {/* Voucher progress card */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-rose-600 to-rose-800 text-white p-6 md:p-8 shadow-lg"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/70 flex items-center gap-1.5">
                <BadgePercent size={14} /> Food Loyalty
              </p>
              <h2 className="mt-1 font-sora font-extrabold text-xl md:text-2xl">
                Save UGX 150,000 on your next 10 orders
              </h2>
              <div className="mt-4 h-2.5 w-full max-w-sm rounded-full bg-white/20 overflow-hidden">
                <div className="h-full w-[30%] rounded-full bg-momo" />
              </div>
              <p className="mt-2 text-sm text-white/80">3 of 10 orders done — keep going!</p>
            </div>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className={`flex flex-col items-center gap-1 rounded-2xl px-3 py-3 ${n <= 2 ? 'bg-white text-rose-700' : 'bg-white/15'}`}>
                  {n <= 2 ? <Unlock size={18} /> : <Lock size={18} />}
                  <span className="text-xs font-bold">20%</span>
                  <span className="text-[10px] opacity-70">{n * 2} orders</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Restaurant list */}
        <section>
          <h2 className="font-sora font-extrabold text-2xl md:text-3xl mb-6">Popular near you</h2>
          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          >
            {restaurants.map((r) => (
              <motion.div
                key={r.name}
                variants={fadeUp}
                className="group rounded-3xl bg-white shadow-sm hover:shadow-xl transition-shadow overflow-hidden cursor-pointer"
              >
                <div className="relative flex h-36 items-center justify-center bg-[linear-gradient(135deg,#FDA4AF_0%,#FB7185_100%)] text-6xl">
                  {r.emoji}
                  <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-rose-700 shadow">
                    {r.deal}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-sora font-bold leading-tight">{r.name}</h3>
                      <p className="mt-0.5 text-xs text-night/50">{r.area} · {r.cuisine}</p>
                    </div>
                    <span className="flex shrink-0 items-center gap-1 rounded-full bg-leaf px-2 py-0.5 text-xs font-bold text-white">
                      {r.rating} <Star size={11} fill="currentColor" />
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-night/60">
                      <Bike size={14} className="text-rose-600" /> {r.time}
                    </span>
                    <span className="font-semibold">
                      <span className="text-night/40 line-through mr-1.5">UGX 5,000</span>
                      <span className="text-leaf">FREE delivery</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <p className="text-center text-sm text-night/50 pb-4">
          Craving something else? Use the bottom nav to hop back to Kikuubo shopping. 🛒
        </p>
      </div>
    </div>
  )
}
