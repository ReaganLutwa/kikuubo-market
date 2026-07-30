import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, animate, AnimatePresence } from 'framer-motion'
import {
  Truck, MapPin, GraduationCap, BarChart3, ShieldCheck, Megaphone,
  ChevronDown, Star, Check, Sparkles,
} from 'lucide-react'
import SellerForm from '@/components/sell/SellerForm'
import { A } from '@/lib/asset'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

/* ---------- Stat counter ---------- */
function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-25% 0px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <div ref={ref} className="text-center">
      <p className="price text-3xl md:text-4xl text-sunset">
        {display.toLocaleString('en-US')}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-cream/60">{label}</p>
    </div>
  )
}

/* ---------- Pricing tier price with tween ---------- */
function TierPrice({ monthly, annual, isAnnual }: { monthly: number | null; annual: number | null; isAnnual: boolean }) {
  const target = isAnnual ? annual : monthly
  const [display, setDisplay] = useState(target)
  const prev = useRef(target)

  useEffect(() => {
    if (target == null || prev.current == null) {
      setDisplay(target)
      prev.current = target
      return
    }
    const controls = animate(prev.current, target, {
      duration: 0.4,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    prev.current = target
    return () => controls.stop()
  }, [target])

  if (target == null) return <span className="price text-3xl text-night">Custom</span>
  if (target === 0) return <span className="price text-3xl text-night">Free</span>
  return (
    <span className="price text-3xl text-night">
      UGX {display?.toLocaleString('en-US')}
      <span className="text-sm font-normal text-night/50">/mo</span>
    </span>
  )
}

/* ---------- Revenue chart (SVG) ---------- */
function RevenueChart() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  // monthly revenue in UGX 100Ks for 8 months
  const points = [4, 7, 6, 11, 14, 19, 26, 34]
  const w = 320
  const h = 140
  const max = Math.max(...points)
  const stepX = w / (points.length - 1)
  const coords = points.map((p, i) => [i * stepX, h - (p / max) * (h - 20)] as const)
  const line = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ')
  const area = `${line} L${w},${h} L0,${h} Z`

  return (
    <div ref={ref}>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <motion.path
          d={area}
          fill="url(#revGrad)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="#F97316"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
        {coords.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={4}
            fill="#FFF8F0"
            stroke="#F97316"
            strokeWidth={2.5}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.15 * i, type: 'spring', stiffness: 300, damping: 15 }}
          />
        ))}
      </svg>
      <div className="mt-2 flex justify-between text-[10px] font-medium text-night/40">
        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
      </div>
      <p className="mt-2 text-xs font-semibold text-leaf">▲ UGX 3.4M monthly revenue — 8× growth in 8 months</p>
    </div>
  )
}

/* ---------- FAQ item ---------- */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-sora text-sm font-semibold text-night">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={18} className="text-sunset" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-night/60">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ================= PAGE ================= */
export default function Sell() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const chipY1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const chipY2 = useTransform(scrollYProgress, [0, 1], [0, -90])

  const [annual, setAnnual] = useState(false)

  const h1Words = ['Your', 'shop.', '2', 'million', 'Ugandan', 'shoppers.']

  const benefits = [
    { icon: Truck, title: 'Free pickup from your shop', text: 'Our riders collect orders from your doorstep — no trips to a warehouse.' },
    { icon: MapPin, title: 'Buyers across Uganda', text: 'Reach shoppers in 48 districts, from Kampala to Gulu to Arua.' },
    { icon: GraduationCap, title: 'Seller training academy', text: 'Free weekly classes on photos, pricing and growing your duka online.' },
    { icon: BarChart3, title: 'Seller app & dashboard', text: 'Track sales, stock and payouts in real time from your phone.' },
    { icon: ShieldCheck, title: 'Buyer protection = trust', text: 'Escrow payments mean buyers trust new sellers faster.' },
    { icon: Megaphone, title: 'Marketing boosts', text: 'Flash-sale slots and homepage features to explode your sales.' },
  ]

  const tiers = [
    {
      name: 'Starter',
      monthly: 0,
      annual: 0,
      tagline: 'Test the waters',
      features: ['0% commission your first month', 'Then 5% per sale', '20 product listings', 'Standard seller support'],
      popular: false,
    },
    {
      name: 'Pro',
      monthly: 50000,
      annual: 40000,
      tagline: 'For serious sellers',
      features: ['Only 3.5% commission', 'Unlimited listings', 'Flash-sale access', 'Featured seller badge', 'Priority support'],
      popular: true,
    },
    {
      name: 'Enterprise',
      monthly: null,
      annual: null,
      tagline: 'Brands & wholesalers',
      features: ['API integration', 'Dedicated account manager', 'Kikuubo warehouse service', 'Custom commission rates'],
      popular: false,
    },
  ]

  const faqs = [
    {
      q: 'What fees does Kikuubo charge?',
      a: 'Starter is free with 0% commission in your first month, then 5%. Pro costs UGX 50,000/month with a 3.5% commission. Category rates: Electronics 5% · Fashion 6% · Farm produce 3%. No hidden charges — ever.',
    },
    {
      q: 'How does delivery work?',
      a: 'You pack the order, we handle the rest. Kikuubo riders pick up from your shop for free and deliver to the buyer. Buyers in upcountry districts receive orders via our partner bus couriers within 2–3 days.',
    },
    {
      q: 'When do I get paid?',
      a: 'Payouts land in your MTN MoMo or Airtel Money wallet within 24 hours of delivery confirmation. You can track every payout in the seller app.',
    },
    {
      q: 'What can I sell?',
      a: 'Phones, electronics, fashion, home goods, farm produce and more — anything legal and genuine. Counterfeit or prohibited items get listings removed and accounts suspended.',
    },
    {
      q: 'Do I need a registered business?',
      a: 'No. Individual sellers can sign up with just a phone number and NIN. Registered businesses can add their URSB details for a verified business badge and higher payout limits.',
    },
  ]

  return (
    <div>
      {/* ============ 1. HERO ============ */}
      <section ref={heroRef} className="relative overflow-hidden bg-night">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 70% 30%, rgba(249,115,22,0.35), transparent 65%)' }}
        />
        <div className="relative px-4 md:px-8 max-w-7xl mx-auto py-16 md:py-24 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-sunset/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sunset"
            >
              <Sparkles size={14} /> Kikuubo Sellers
            </motion.p>
            <h1 className="font-sora font-extrabold text-cream leading-[1.05] tracking-tight text-[clamp(2.25rem,6vw,4rem)]">
              {h1Words.map((w, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.28em]"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: 'easeOut' }}
                >
                  {w}
                </motion.span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-5 max-w-md text-base leading-relaxed text-cream/70"
            >
              From Owino stalls to Mityana farms — open your online duka in 10 minutes,
              get paid straight to your MoMo.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <motion.a
                href="#seller-signup"
                whileTap={{ scale: 0.97 }}
                className="rounded-full bg-sunset px-7 py-3.5 font-sora text-sm font-bold text-white transition-colors hover:bg-sunset-hover"
              >
                Start Selling Free
              </motion.a>
              <motion.a
                href="#pricing"
                whileTap={{ scale: 0.97 }}
                className="rounded-full border border-cream/25 px-7 py-3.5 font-sora text-sm font-bold text-cream transition-colors hover:border-cream/60"
              >
                See pricing
              </motion.a>
            </motion.div>
          </div>

          {/* Hero image + floating chips */}
          <motion.div
            initial={{ opacity: 0, rotateY: -12, y: 30 }}
            animate={{ opacity: 1, rotateY: 0, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <img
              src={A('/banner-seller.png')}
              alt="Ugandan entrepreneur packing orders in her shop"
              className="w-full rounded-3xl shadow-2xl object-cover"
            />
            <motion.div
              style={{ y: chipY1 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-3 top-6 md:-left-8 rounded-2xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur"
            >
              <p className="text-xs font-bold text-night">Sarah sold 340 dresses</p>
              <p className="text-[10px] text-night/50">last month · Kampala</p>
            </motion.div>
            <motion.div
              style={{ y: chipY2 }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              className="absolute -right-3 bottom-8 md:-right-6 rounded-2xl bg-momo px-4 py-3 shadow-xl"
            >
              <p className="price text-sm text-night">UGX 4.2M</p>
              <p className="text-[10px] font-semibold text-night/70">paid out today via MoMo</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ 2. STATS BAND ============ */}
      <section className="bg-cocoa">
        <div className="px-4 md:px-8 max-w-7xl mx-auto py-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          <StatCounter value={8500} suffix="+" label="Active sellers" />
          <StatCounter value={48} suffix="" label="Districts covered" />
          <StatCounter value={24} suffix="h" label="MoMo payouts" />
          <StatCounter value={0} suffix="%" label="Fee your first month" />
        </div>
      </section>

      {/* ============ 3. HOW IT WORKS ============ */}
      <section className="py-12 md:py-20">
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="text-center font-sora text-2xl md:text-3xl font-extrabold"
          >
            Open your duka in 3 steps
          </motion.h2>
          <div className="relative mt-12 grid gap-8 md:grid-cols-3">
            {/* dashed connector (desktop) */}
            <svg className="pointer-events-none absolute left-0 top-10 hidden w-full md:block" height="4">
              <motion.line
                x1="16%" y1="2" x2="84%" y2="2"
                stroke="#F97316" strokeWidth="3" strokeDasharray="8 8" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: 'easeOut' }}
              />
            </svg>
            {[
              { n: 1, title: 'Register', text: 'Sign up with your phone & NIN or business details — it takes 10 minutes.' },
              { n: 2, title: 'List products', text: 'Snap photos, set UGX prices. We help with delivery and customer chats.' },
              { n: 3, title: 'Get paid', text: 'Money hits your MTN or Airtel MoMo within 24 hours of delivery.' },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 32, rotate: i % 2 === 0 ? -3 : 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
                className="relative rounded-2xl bg-white p-6 pt-10 shadow-sm text-center"
              >
                <div className="absolute -top-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-sunset font-sora text-lg font-extrabold text-white shadow-lg">
                  {s.n}
                </div>
                <h3 className="font-sora text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-night/60">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 4. BENEFITS ============ */}
      <section className="bg-sand/60 py-12 md:py-20">
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="text-center font-sora text-2xl md:text-3xl font-extrabold"
          >
            Why sell on Kikuubo?
          </motion.h2>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: 'easeOut' }}
                whileHover={{ y: -6, boxShadow: '0 18px 36px rgba(26,18,11,0.12)' }}
                className="group rounded-2xl bg-white p-5 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sunset/10 text-sunset transition-colors duration-300 group-hover:bg-sunset group-hover:text-white">
                  <b.icon size={22} />
                </div>
                <h3 className="mt-4 font-sora text-sm md:text-base font-bold">{b.title}</h3>
                <p className="mt-1.5 text-xs md:text-sm leading-relaxed text-night/60">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. PRICING ============ */}
      <section id="pricing" className="py-12 md:py-20">
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="text-center font-sora text-2xl md:text-3xl font-extrabold"
          >
            Simple, honest pricing
          </motion.h2>

          {/* Monthly/Annual toggle */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className={`text-sm font-semibold ${annual ? 'text-night/40' : 'text-night'}`}>Monthly</span>
            <button
              onClick={() => setAnnual((v) => !v)}
              className={`relative h-7 w-12 rounded-full transition-colors ${annual ? 'bg-sunset' : 'bg-night/20'}`}
              aria-label="Toggle annual billing"
            >
              <motion.span
                layout
                className="absolute top-1 h-5 w-5 rounded-full bg-white shadow"
                animate={{ left: annual ? 26 : 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              />
            </button>
            <span className={`text-sm font-semibold ${annual ? 'text-night' : 'text-night/40'}`}>
              Annual <span className="ml-1 rounded-full bg-leaf/15 px-2 py-0.5 text-xs font-bold text-leaf">−20%</span>
            </span>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3 md:items-center">
            {tiers.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: 'easeOut' }}
                className={`relative ${t.popular ? 'md:scale-105' : ''}`}
              >
                <motion.div
                  animate={
                    t.popular
                      ? { boxShadow: ['0 0 0 0 rgba(249,115,22,0.25)', '0 0 32px 4px rgba(249,115,22,0.35)', '0 0 0 0 rgba(249,115,22,0.25)'] }
                      : {}
                  }
                  transition={t.popular ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
                  className={`relative rounded-2xl bg-white p-6 shadow-sm ${
                  t.popular ? 'border-2 border-sunset shadow-xl' : 'border border-night/5'
                }`}
              >
                {t.popular && (
                  <motion.span
                    animate={{ opacity: [1, 0.75, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sunset px-4 py-1 text-xs font-bold text-white shadow-lg"
                  >
                    Most popular
                  </motion.span>
                )}
                <h3 className="font-sora text-lg font-extrabold">{t.name}</h3>
                <p className="text-xs text-night/50">{t.tagline}</p>
                <div className="mt-4">
                  <TierPrice monthly={t.monthly} annual={t.annual} isAnnual={annual} />
                </div>
                <ul className="mt-5 space-y-2.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-night/70">
                      <Check size={16} className="mt-0.5 shrink-0 text-leaf" /> {f}
                    </li>
                  ))}
                </ul>
                <motion.a
                  href="#seller-signup"
                  whileTap={{ scale: 0.97 }}
                  className={`mt-6 block rounded-full py-3 text-center font-sora text-sm font-bold transition-colors ${
                    t.popular
                      ? 'bg-sunset text-white hover:bg-sunset-hover'
                      : 'border-2 border-night text-night hover:bg-night hover:text-cream'
                  }`}
                >
                  {t.monthly === null ? 'Talk to sales' : 'Choose ' + t.name}
                </motion.a>
                </motion.div>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-night/50">
            Commission by category — Electronics 5% · Fashion 6% · Farm produce 3%. No listing fees, no hidden charges.
          </p>
        </div>
      </section>

      {/* ============ 6. SELLER STORY ============ */}
      <section className="bg-sand py-12 md:py-20">
        <div className="px-4 md:px-8 max-w-7xl mx-auto grid items-center gap-10 lg:grid-cols-2">
          <motion.blockquote
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="rounded-2xl bg-white p-8 shadow-sm"
          >
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className={i < 4.9 ? 'fill-momo text-momo' : 'text-night/20'} />
              ))}
            </div>
            <p className="mt-4 font-sora text-xl md:text-2xl font-semibold leading-snug text-night">
              {`"I moved my Owino stall online. Now I sell to Gulu and Arua without leaving Kampala."`
                .split(' ')
                .map((w, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-[0.26em]"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.04 * i }}
                  >
                    {w}
                  </motion.span>
                ))}
            </p>
            <footer className="mt-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sunset font-sora font-bold text-white">
                AN
              </div>
              <div>
                <p className="text-sm font-bold">Amina N.</p>
                <p className="text-xs text-night/50">Nsambya Home Style · 4.9★ seller rating</p>
              </div>
            </footer>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >
            <h3 className="font-sora text-sm font-bold text-night">Monthly revenue growth</h3>
            <div className="mt-3">
              <RevenueChart />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ 7. SIGNUP ============ */}
      <section id="seller-signup" className="py-12 md:py-20">
        <div className="px-4 md:px-8 max-w-3xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="text-center font-sora text-2xl md:text-3xl font-extrabold"
          >
            Start selling today
          </motion.h2>
          <p className="mt-3 text-center text-sm text-night/60">
            Two quick steps and your shop is live. Our team calls you within 24 hours.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mt-8 rounded-3xl bg-night p-6 md:p-10 shadow-2xl"
          >
            <SellerForm />
          </motion.div>
        </div>
      </section>

      {/* ============ 8. FAQ ============ */}
      <section className="pb-16 md:pb-24">
        <div className="px-4 md:px-8 max-w-3xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="text-center font-sora text-2xl md:text-3xl font-extrabold"
          >
            Seller questions, answered
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mt-8 space-y-3"
          >
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
