import { memo, useRef } from 'react'
import { Link } from 'react-router'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { Variants, MotionValue } from 'framer-motion'
import {
  Search, Zap, Truck, BadgePercent, ArrowRight, Wheat, Smartphone,
  Percent, Timer, Apple, Play,
} from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import FlashSale from '@/components/home/FlashSale'
import TrustStrip from '@/components/home/TrustStrip'
import { categories, topDeals } from '@/data/products'
import { A } from '@/lib/asset'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

/* ---------------- Hero ---------------- */

const headlineWords = ["Uganda's", 'Market,', 'In', 'Your', 'Pocket.']

const chipData = [
  { text: 'UGX 899,000 −34%', speed: 0.2, className: 'top-6 -left-3 md:-left-8' },
  { text: 'Free Delivery 🚚', speed: 0.4, className: 'bottom-16 -right-2 md:-right-6' },
  { text: 'Matooke UGX 18,000', speed: 0.6, className: 'bottom-2 left-8' },
]

const BobChip = memo(function BobChip({ text, y, className }: { text: string; y: MotionValue<number>; className: string }) {
  return (
    <motion.span
      style={{ y }}
      className={`absolute z-10 rounded-full bg-white shadow-xl px-3.5 py-2 text-xs font-bold text-night font-sora ${className}`}
    >
      <motion.span
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="block"
      >
        {text}
      </motion.span>
    </motion.span>
  )
})

function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -180])
  const chipYs = [y1, y2, y3]

  return (
    <section
      ref={ref}
      className="relative overflow-hidden rounded-b-3xl bg-[linear-gradient(135deg,#F97316_0%,#EA580C_55%,#B91C1C_100%)] text-white"
    >
      {/* parallax blobs */}
      <motion.div style={{ y: y1 }} className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-momo/20 blur-3xl" />
      <motion.div style={{ y: y2 }} className="pointer-events-none absolute bottom-0 -left-32 h-80 w-80 rounded-full bg-night/20 blur-3xl" />

      <div className="px-4 md:px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center min-h-[70vh] md:min-h-[80vh] py-14 md:py-20">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-sm font-semibold"
          >
            🇺🇬 Proudly Ugandan
          </motion.span>

          <h1 className="mt-5 font-sora font-extrabold tracking-[-0.03em] leading-[1.05] text-[clamp(2.25rem,6vw,4rem)]">
            {headlineWords.map((w, i) => (
              <motion.span
                key={w}
                className="inline-block mr-[0.28em]"
                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: EASE }}
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
            className="mt-4 max-w-md text-white/85 text-base md:text-lg"
          >
            Phones, fashion, fresh farm produce & more — pay with MTN MoMo or Airtel Money, delivered anywhere in Uganda.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: EASE }}
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 flex max-w-md items-center rounded-full bg-white p-1.5 shadow-2xl"
          >
            <Search size={18} className="ml-3 text-night/40 shrink-0" />
            <input
              placeholder="Search Kikuubo…"
              className="flex-1 min-w-0 bg-transparent px-3 py-2 text-sm text-night outline-none placeholder:text-night/40"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-sunset hover:bg-sunset-hover transition-colors text-white font-semibold text-sm px-6 py-2.5"
            >
              Search
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-5 flex flex-wrap gap-2"
          >
            {[
              { label: 'Phones under 500K', icon: Smartphone, to: '/category?c=phones' },
              { label: 'Free Delivery', icon: Truck, to: '/deals' },
              { label: 'Flash Sale ⚡', icon: Zap, to: '/deals' },
            ].map(({ label, icon: Icon, to }) => (
              <Link
                key={label}
                to={to}
                className="flex items-center gap-1.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur px-4 py-2 text-xs font-semibold transition-colors"
              >
                <Icon size={14} /> {label}
              </Link>
            ))}
          </motion.div>
        </div>

        {/* hero image card */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, rotate: 4, scale: 0.95 }}
            animate={{ opacity: 1, rotate: 2, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, type: 'spring', bounce: 0.35 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20"
          >
            <img src={A('/hero-market.png')} alt="Vibrant Ugandan street market" className="w-full object-cover aspect-[4/3]" />
          </motion.div>
          {chipData.map((chip, i) => (
            <BobChip key={chip.text} text={chip.text} y={chipYs[i]} className={chip.className} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Category Strip ---------------- */

function CategoryStrip() {
  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto py-12 md:py-16">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="flex md:grid md:grid-cols-5 gap-6 md:gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0"
      >
        {categories.map((c) => (
          <motion.div key={c.id} variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1, transition: { type: 'spring', bounce: 0.4 } } }}>
            <Link to={`/category?c=${c.id}`} className="group flex flex-col items-center gap-3 w-28 md:w-auto shrink-0">
              <span className="rounded-full ring-4 ring-sand group-hover:ring-sunset transition-all p-1 bg-white shadow-sm">
                <img
                  src={c.image}
                  alt={c.label}
                  loading="lazy"
                  className="h-24 w-24 rounded-full object-cover transition-transform duration-500 group-hover:scale-108 group-hover:scale-110"
                />
              </span>
              <span className="text-center">
                <span className="block text-sm font-semibold leading-tight">{c.label}</span>
                <span className="block text-xs text-night/50 mt-0.5">{c.count}</span>
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

/* ---------------- Category Feature Blocks ---------------- */

function CategoryBlocks() {
  const big = [
    {
      title: 'Agriculture & Farm Produce',
      sub: 'Direct from Ugandan farms',
      img: A('/cat-agriculture.png'),
      overlay: 'bg-gradient-to-t from-leaf/90 via-leaf/30 to-transparent',
      to: '/category?c=agriculture',
    },
    {
      title: 'Latest Phones',
      sub: 'Tecno, Samsung, Xiaomi & more',
      img: A('/cat-phones.png'),
      overlay: 'bg-gradient-to-t from-sunset/90 via-sunset/30 to-transparent',
      to: '/category?c=phones',
    },
  ]
  const small = [
    { title: 'Electronics', img: A('/cat-electronics.png'), to: '/category?c=electronics' },
    { title: 'Fashion', img: A('/cat-fashion.png'), to: '/category?c=fashion' },
    { title: 'Home & Living', img: A('/cat-home.png'), to: '/category?c=home' },
  ]

  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto py-12 md:py-16">
      <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} className="font-sora font-extrabold text-2xl md:text-3xl mb-6">
        Shop by Category
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {big.map((b) => (
          <motion.div
            key={b.title}
            initial={{ clipPath: 'inset(8% round 24px)', opacity: 0 }}
            whileInView={{ clipPath: 'inset(0% round 24px)', opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Link to={b.to} className="group relative block h-56 md:h-72 overflow-hidden rounded-3xl">
              <img src={b.img} alt={b.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className={`absolute inset-0 ${b.overlay}`} />
              <div className="absolute bottom-0 p-5 md:p-7 text-white transition-transform duration-500 group-hover:-translate-y-3">
                <h3 className="font-sora font-extrabold text-xl md:text-2xl">{b.title}</h3>
                <p className="text-sm text-white/85 mt-1 flex items-center gap-2">{b.sub} <ArrowRight size={15} /></p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 md:mt-6 grid grid-cols-3 gap-3 md:gap-6">
        {small.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ clipPath: 'inset(8% round 24px)', opacity: 0 }}
            whileInView={{ clipPath: 'inset(0% round 24px)', opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
          >
            <Link to={s.to} className="group relative block h-32 md:h-48 overflow-hidden rounded-2xl">
              <img src={s.img} alt={s.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-night/80 to-transparent" />
              <h3 className="absolute bottom-3 left-3 md:bottom-4 md:left-4 font-sora font-bold text-white text-sm md:text-lg transition-transform duration-500 group-hover:-translate-y-2">
                {s.title}
              </h3>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Top Deals ---------------- */

function TopDeals() {
  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto py-12 md:py-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-sora font-extrabold text-2xl md:text-3xl">Top Deals in Kampala</h2>
        <Link to="/deals" className="flex items-center gap-1.5 text-sunset font-semibold text-sm hover:gap-3 transition-all">
          View all <ArrowRight size={16} />
        </Link>
      </div>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5"
      >
        {topDeals.map((p) => (
          <motion.div key={p.id} variants={fadeUp}>
            <ProductCard product={p} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

/* ---------------- Farm Fresh Band ---------------- */

const farmItems = [
  { name: 'Matooke Bunch', price: 'UGX 18,000', img: A('/product-matooke.png'), tag: 'Mityana' },
  { name: 'Dry Beans 5kg', price: 'UGX 32,000', img: A('/product-beans.png'), tag: 'Masaka' },
  { name: 'Fresh Tomatoes 1kg', price: 'UGX 6,500', img: A('/cat-agriculture.png'), tag: 'Mbale' },
  { name: 'Hass Avocado (each)', price: 'UGX 2,000', img: A('/cat-agriculture.png'), tag: 'Mityana' },
]

function FarmFresh() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const hue = useTransform(scrollYProgress, [0, 1], ['0deg', '-18deg'])

  return (
    <motion.section
      ref={ref}
      style={{ filter: hue ? undefined : undefined }}
      className="relative overflow-hidden bg-[linear-gradient(135deg,#16A34A_0%,#15803D_60%,#14532D_100%)] text-white"
    >
      <motion.div style={{ filter: useTransform(hue, (hv) => `hue-rotate(${hv})`) }} className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.12),transparent_50%)]" />
      <div className="relative px-4 md:px-8 max-w-7xl mx-auto py-14 md:py-20">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <motion.h2 variants={fadeUp} className="font-sora font-extrabold text-2xl md:text-4xl flex items-center gap-3">
            <Wheat size={32} className="text-momo" /> From Garden to Doorstep 🌾
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 max-w-lg text-white/85">
            Buy direct from farmers in Mityana, Masaka & Mbale. Fresher produce, fair prices, farmers earn more.
          </motion.p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {farmItems.map((f, i) => (
              <motion.div
                key={f.name}
                variants={{
                  hidden: { opacity: 0, rotate: i % 2 === 0 ? -4 : 4, y: 24 },
                  show: { opacity: 1, rotate: i % 2 === 0 ? -2 : 2, y: 0, transition: { type: 'spring', bounce: 0.45 } },
                }}
              >
                <Link to="/category?c=agriculture" className="block rounded-2xl bg-white text-night overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  <img src={f.img} alt={f.name} loading="lazy" className="aspect-square w-full object-cover" />
                  <div className="p-3">
                    <p className="text-sm font-semibold line-clamp-1">{f.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="price text-leaf text-sm">{f.price}</span>
                      <span className="text-[10px] font-bold rounded-full bg-leaf/10 text-leaf px-2 py-0.5">{f.tag}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div variants={fadeUp} className="mt-8">
            <Link
              to="/category?c=agriculture"
              className="inline-flex items-center gap-2 rounded-full bg-white text-leaf font-bold px-7 py-3.5 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              <Apple size={18} /> Shop Farm Produce
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

/* ---------------- Sell Banner ---------------- */

function SellBanner() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={ref} className="px-4 md:px-8 max-w-7xl mx-auto py-12 md:py-20">
      <div className="grid md:grid-cols-2 overflow-hidden rounded-3xl bg-sand shadow-sm">
        <div className="relative h-64 md:h-auto overflow-hidden">
          <motion.img
            src={A('/banner-seller.png')}
            alt="Ugandan entrepreneur packing delivery boxes"
            loading="lazy"
            style={{ y: imgY }}
            className="absolute inset-0 h-[120%] w-full object-cover"
          />
        </div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="p-7 md:p-12"
        >
          <motion.h2 variants={{ hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } } }} className="font-sora font-extrabold text-2xl md:text-3xl leading-tight">
            Got stock? Reach 2M+ Ugandan shoppers.
          </motion.h2>
          <motion.ul variants={stagger} className="mt-6 space-y-4">
            {[
              { icon: Percent, text: '0% commission your first month' },
              { icon: Truck, text: 'Free delivery pickup from your shop' },
              { icon: Timer, text: 'Paid via MoMo within 24 hours' },
            ].map(({ icon: Icon, text }) => (
              <motion.li key={text} variants={{ hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } } }} className="flex items-center gap-3">
                <span className="rounded-full bg-sunset text-white p-2 shrink-0"><Icon size={16} /></span>
                <span className="font-medium text-sm md:text-base">{text}</span>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div variants={{ hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } } }} className="mt-8">
            <Link
              to="/sell"
              className="inline-flex items-center gap-2 rounded-full bg-sunset hover:bg-sunset-hover text-white font-bold px-7 py-3.5 shadow-lg transition-colors"
            >
              Start Selling <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------- App Download + Newsletter ---------------- */

const FloatPhone = memo(function FloatPhone() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      className="relative"
    >
      <img
        src={A('/banner-app.png')}
        alt="Kikuubo app on a smartphone"
        loading="lazy"
        className="rounded-3xl shadow-2xl rotate-2 w-full max-w-sm mx-auto border-4 border-cream/10"
      />
    </motion.div>
  )
})

function AppDownload() {
  return (
    <section className="bg-night text-cream">
      <div className="px-4 md:px-8 max-w-7xl mx-auto py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        <FloatPhone />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <motion.h2 variants={fadeUp} className="font-sora font-extrabold text-2xl md:text-4xl">
            Shop on the go
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-cream/70 max-w-md">
            Download the Kikuubo app for flash-sale alerts, one-tap MoMo checkout and order tracking — built for Uganda's networks.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
            <button className="flex items-center gap-2.5 rounded-xl bg-cream text-night px-5 py-3 font-semibold text-sm hover:bg-sand transition-colors">
              <Apple size={20} /> App Store
            </button>
            <button className="flex items-center gap-2.5 rounded-xl bg-cream text-night px-5 py-3 font-semibold text-sm hover:bg-sand transition-colors">
              <Play size={20} /> Google Play
            </button>
          </motion.div>
          <motion.div variants={stagger} className="mt-6 flex items-center gap-3">
            <motion.img variants={fadeUp} src={A('/payment-momo.svg')} alt="MTN MoMo" className="h-9 w-auto" />
            <motion.img variants={fadeUp} src={A('/payment-airtel.svg')} alt="Airtel Money" className="h-9 w-auto" />
          </motion.div>
          <motion.form
            variants={fadeUp}
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex max-w-md items-center rounded-full bg-cocoa border border-cream/15 p-1.5 focus-within:border-sunset focus-within:ring-2 focus-within:ring-sunset/40 transition-all"
          >
            <BadgePercent size={18} className="ml-3 text-sunset shrink-0" />
            <input
              placeholder="Get deals every Friday"
              className="flex-1 min-w-0 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-cream/40"
            />
            <button className="rounded-full bg-sunset hover:bg-sunset-hover text-white font-semibold text-sm px-6 py-2.5 transition-colors">
              Join
            </button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------- Page ---------------- */

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryStrip />
      <FlashSale />
      <CategoryBlocks />
      <TopDeals />
      <FarmFresh />
      <SellBanner />
      <AppDownload />
      <TrustStrip />
    </>
  )
}
