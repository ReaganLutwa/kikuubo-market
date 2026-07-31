import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Wallet, Plus, Send, HandCoins, CheckCircle2 } from 'lucide-react'
import ServiceSwitcher from '@/components/ServiceSwitcher'
import { A } from '@/lib/asset'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

export default function Pay() {
  const [toast, setToast] = useState<string | null>(null)

  const simulate = (label: string) => {
    setToast(`${label} — coming soon! Link your MTN MoMo or Airtel Money to get started.`)
    window.setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="bg-cream min-h-screen">
      <ServiceSwitcher />

      <section className="bg-[linear-gradient(135deg,#FFCC00_0%,#EAB308_55%,#A16207_100%)] text-night">
        <div className="px-4 md:px-8 max-w-7xl mx-auto py-12 md:py-16">
          <motion.span
            variants={fadeUp} initial="hidden" animate="show"
            className="inline-flex items-center gap-2 rounded-full bg-night/10 px-4 py-1.5 text-sm font-semibold"
          >
            <Wallet size={15} /> KIKUUBO PAY
          </motion.span>
          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.1 }}
            className="mt-4 font-sora font-extrabold tracking-tight leading-[1.05] text-[clamp(1.9rem,5vw,3.25rem)]"
          >
            Kikuubo Pay — your Ugandan wallet
          </motion.h1>
          <motion.p
            variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}
            className="mt-3 max-w-md text-night/70"
          >
            Top up, send and spend — powered by MTN MoMo & Airtel Money.
          </motion.p>
        </div>
      </section>

      <div className="px-4 md:px-8 max-w-7xl mx-auto py-10 md:py-14 space-y-8">
        {/* Balance card */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.15 }}
          className="rounded-3xl bg-night text-cream p-6 md:p-8 shadow-xl max-w-lg"
        >
          <p className="text-xs uppercase tracking-widest text-cream/50">Available balance</p>
          <p className="mt-2 font-sora font-extrabold text-4xl">UGX 0.00</p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { icon: Plus, label: 'Add Money' },
              { icon: Send, label: 'Send' },
              { icon: HandCoins, label: 'Request' },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={() => simulate(label)}
                className="flex flex-col items-center gap-2 rounded-2xl bg-cocoa hover:bg-cocoa/70 transition-colors py-4"
              >
                <Icon size={20} className="text-momo" />
                <span className="text-xs font-semibold">{label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* MoMo / Airtel strip */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="rounded-3xl bg-white p-6 shadow-sm flex flex-wrap items-center gap-4"
        >
          <p className="font-sora font-bold">Pay with MTN MoMo & Airtel Money</p>
          <img src={A('/payment-momo.svg')} alt="MTN MoMo" className="h-9 w-auto" />
          <img src={A('/payment-airtel.svg')} alt="Airtel Money" className="h-9 w-auto" />
          <p className="text-sm text-night/50">Instant, secure, no card needed.</p>
        </motion.div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-night text-cream px-5 py-3 text-sm shadow-2xl">
          <CheckCircle2 size={16} className="text-momo" /> {toast}
        </div>
      )}
    </div>
  )
}
