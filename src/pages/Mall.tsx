import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Building2, BadgeCheck, ShieldCheck, RotateCcw } from 'lucide-react'
import ServiceSwitcher from '@/components/ServiceSwitcher'
import ProductCard from '@/components/ProductCard'
import { products } from '@/data/products'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

const brands = [
  { name: 'Samsung', tag: 'Phones · TVs · Appliances' },
  { name: 'LG', tag: 'Home Appliances' },
  { name: 'Hisense', tag: 'TVs · Fridges' },
  { name: 'Tecno', tag: 'Smartphones' },
  { name: 'HP', tag: 'Laptops & Printers' },
  { name: 'GlobalStar', tag: 'Cookers & Ovens' },
  { name: 'StrideFlex', tag: 'Footwear' },
  { name: 'SunPro', tag: 'Solar Power' },
]

const mallProducts = [
  'hisense-double-door-fridge',
  'sunpro-solar-kit-200w',
  'refurb-hp-elitebook-840-g5',
  'samsung-microwave-23l',
  'hisense-43-tv',
  'global-star-cooker',
  'flash-phone-x',
  'refurb-dell-latitude-7490',
].map((id) => products.find((p) => p.id === id)!).filter(Boolean)

export default function Mall() {
  return (
    <div className="bg-cream min-h-screen">
      <ServiceSwitcher />

      {/* Hero */}
      <section className="bg-[linear-gradient(135deg,#1E3A8A_0%,#1E40AF_55%,#0B1E4B_100%)] text-white">
        <div className="px-4 md:px-8 max-w-7xl mx-auto py-12 md:py-16">
          <motion.span
            variants={fadeUp} initial="hidden" animate="show"
            className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-sm font-semibold"
          >
            <Building2 size={15} /> SUPER MALL
          </motion.span>
          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.1 }}
            className="mt-4 font-sora font-extrabold tracking-tight leading-[1.05] text-[clamp(1.9rem,5vw,3.25rem)] max-w-2xl"
          >
            Kikuubo Super Mall — 100% genuine brands
          </motion.h1>
          <motion.p
            variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}
            className="mt-3 max-w-md text-white/85"
          >
            Official brand stores, factory warranties and authentic stock — no fakes, ever.
          </motion.p>
        </div>
      </section>

      {/* Brand tiles */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto py-10 md:py-14">
        <h2 className="font-sora font-extrabold text-2xl md:text-3xl mb-6">Official brand stores</h2>
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {brands.map((b) => (
            <motion.div
              key={b.name}
              variants={fadeUp}
              className="group rounded-2xl bg-white border border-night/5 p-6 text-center shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
            >
              <p className="font-sora font-extrabold text-xl md:text-2xl text-[#1E3A8A] group-hover:scale-105 transition-transform">
                {b.name}
              </p>
              <p className="mt-1 text-xs text-night/50">{b.tag}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Authenticity promise band */}
      <section className="bg-[#0B1E4B] text-white">
        <div className="px-4 md:px-8 max-w-7xl mx-auto py-10 grid md:grid-cols-3 gap-6">
          {[
            { icon: BadgeCheck, title: 'Genuine Products', text: 'Every Mall item is sourced from authorised distributors — verified before listing.' },
            { icon: ShieldCheck, title: 'Full Warranty', text: 'Manufacturer warranty honoured in Kampala, with local service centre support.' },
            { icon: RotateCcw, title: '7-Day Returns', text: 'Changed your mind? Return within 7 days for a full MoMo refund.' },
          ].map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-momo text-night">
                <Icon size={22} />
              </span>
              <div>
                <h3 className="font-sora font-bold">{title}</h3>
                <p className="mt-1 text-sm text-white/70">{text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured mall products */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto py-10 md:py-14">
        <h2 className="font-sora font-extrabold text-2xl md:text-3xl mb-6">Featured in the Mall</h2>
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5"
        >
          {mallProducts.map((p) => (
            <motion.div key={p.id} variants={fadeUp}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  )
}
