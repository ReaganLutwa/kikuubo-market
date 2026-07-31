import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Bike, MapPin, Navigation, Fuel, Clock, Package, Camera, CheckCircle2, X } from 'lucide-react'
import ServiceSwitcher from '@/components/ServiceSwitcher'
import LocationPicker from '@/components/LocationPicker'
import { formatUGX } from '@/data/products'
import { A } from '@/lib/asset'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

const steps = [
  { icon: Package, title: 'Book & pack', text: 'Tell us what you\'re sending and where it\'s going.' },
  { icon: Bike, title: 'Boda picks up', text: 'A verified rider collects from your door within 20 minutes.' },
  { icon: Camera, title: 'Photo proof', text: 'Delivery confirmed with a photo + PIN at the drop.' },
]

export default function Send() {
  const [pickup, setPickup] = useState('Home, Kampala…')
  const [drop, setDrop] = useState('')
  const [km, setKm] = useState(6)
  const [confirmed, setConfirmed] = useState(false)

  const price = Math.round((5000 + km * 2500) / 500) * 500

  return (
    <div className="bg-cream min-h-screen">
      <ServiceSwitcher />

      {/* Hero */}
      <section className="bg-[linear-gradient(135deg,#7E22CE_0%,#6B21A8_55%,#3B0764_100%)] text-white">
        <div className="px-4 md:px-8 max-w-7xl mx-auto py-12 md:py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.span
              variants={fadeUp} initial="hidden" animate="show"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-1.5 text-sm font-semibold"
            >
              <Bike size={15} /> BODA SEND
            </motion.span>
            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.1 }}
              className="mt-4 font-sora font-extrabold tracking-tight leading-[1.05] text-[clamp(1.9rem,5vw,3.25rem)]"
            >
              Kikuubo Send — boda pickup & delivery across Kampala
            </motion.h1>
            <motion.p
              variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}
              className="mt-3 max-w-md text-white/85"
            >
              Documents, gifts, shop stock — send anything under 15kg across town today.
            </motion.p>
          </div>

          {/* Booking card */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}
            className="rounded-3xl bg-white text-night p-5 md:p-6 shadow-2xl"
          >
            <div className="space-y-3">
              <label className="flex items-center gap-3 rounded-2xl border border-night/10 px-4 py-3">
                <MapPin size={17} className="text-purple-700 shrink-0" />
                <input
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="Pickup from: Home, Kampala…"
                />
                <LocationPicker
                  compact
                  onConfirm={(loc) => setPickup(loc.label)}
                  triggerLabel="Pick pickup point on map"
                  title="Where should the boda pick up?"
                />
              </label>
              <label className="flex items-center gap-3 rounded-2xl border border-night/10 px-4 py-3">
                <Navigation size={17} className="text-purple-700 shrink-0" />
                <input
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="Where is your drop?"
                />
                <LocationPicker
                  compact
                  onConfirm={(loc) => setDrop(loc.label)}
                  triggerLabel="Pick drop point on map"
                  title="Where is your drop?"
                />
              </label>
            </div>

            {/* Estimator */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>Distance</span>
                <span className="text-purple-700">{km} km</span>
              </div>
              <input
                type="range" min={1} max={20} value={km}
                onChange={(e) => setKm(Number(e.target.value))}
                className="mt-2 w-full accent-purple-700"
                aria-label="Distance in kilometres"
              />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-night/50">Estimated price</span>
                <span className="price text-lg text-purple-700">{formatUGX(price)}</span>
              </div>
            </div>

            <button
              onClick={() => setConfirmed(true)}
              className="mt-5 w-full rounded-full bg-purple-700 hover:bg-purple-800 transition-colors py-3.5 font-bold text-white shadow-lg"
            >
              Request a Boda
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Fuel, stat: 'UGX 8,000', label: 'avg. fuel saved per errand' },
            { icon: Clock, stat: '22 min', label: 'avg. pickup time' },
            { icon: Bike, stat: '1,200+', label: 'verified riders' },
            { icon: CheckCircle2, stat: '98.4%', label: 'deliveries on time' },
          ].map(({ icon: Icon, stat, label }, i) => (
            <motion.div
              key={label}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl bg-white p-5 text-center shadow-sm"
            >
              <Icon size={20} className="mx-auto text-purple-700" />
              <p className="mt-2 font-sora font-extrabold text-xl">{stat}</p>
              <p className="text-xs text-night/50">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto pb-14">
        <h2 className="font-sora font-extrabold text-2xl md:text-3xl mb-6">How it works</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-700 text-white">
                <Icon size={22} />
              </span>
              <p className="mt-4 text-xs font-bold text-purple-700">STEP {i + 1}</p>
              <h3 className="mt-1 font-sora font-bold">{title}</h3>
              <p className="mt-1 text-sm text-night/60">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Confirm modal */}
      <AnimatePresence>
        {confirmed && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-night/60 backdrop-blur-sm p-4"
            onClick={() => setConfirmed(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.3 }}
              className="relative w-full max-w-sm rounded-3xl bg-white p-7 text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setConfirmed(false)}
                aria-label="Close"
                className="absolute right-4 top-4 text-night/40 hover:text-night"
              >
                <X size={18} />
              </button>
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-leaf/10 text-leaf">
                <CheckCircle2 size={28} />
              </span>
              <h3 className="mt-4 font-sora font-extrabold text-xl">Boda requested! 🏍️</h3>
              <p className="mt-2 text-sm text-night/60">
                A rider is being assigned for pickup at “{pickup || 'your location'}”. You'll confirm with a PIN — pay {formatUGX(price)} via MTN MoMo or Airtel Money on pickup.
              </p>
              <div className="mt-5 flex items-center justify-center gap-3">
                <img src={A('/payment-momo.svg')} alt="MTN MoMo" className="h-8 w-auto" />
                <img src={A('/payment-airtel.svg')} alt="Airtel Money" className="h-8 w-auto" />
              </div>
              <button
                onClick={() => setConfirmed(false)}
                className="mt-6 w-full rounded-full bg-purple-700 hover:bg-purple-800 transition-colors py-3 font-bold text-white"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
