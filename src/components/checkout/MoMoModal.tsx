import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Smartphone, Check } from 'lucide-react'
import { formatUGX } from '@/data/products'

export type PayMethod = 'momo' | 'airtel' | 'cod' | 'visa'

const METHOD_META: Record<PayMethod, { label: string; color: string; badge?: string }> = {
  momo: { label: 'MTN MoMo', color: '#FFCC00', badge: '/payment-momo.svg' },
  airtel: { label: 'Airtel Money', color: '#E40000', badge: '/payment-airtel.svg' },
  cod: { label: 'Cash on Delivery', color: '#3E2C1E' },
  visa: { label: 'VISA / Mastercard', color: '#1A120B' },
}

interface Props {
  open: boolean
  method: PayMethod
  amount: number
  phone: string
  onDone: () => void
}

export default function MoMoModal({ open, method, amount, phone, onDone }: Props) {
  const [phase, setPhase] = useState<'waiting' | 'approved'>('waiting')

  useEffect(() => {
    if (!open) return
    setPhase('waiting')
    const t = setTimeout(() => setPhase('approved'), 2500)
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (phase !== 'approved') return
    const t = setTimeout(onDone, 1400)
    return () => clearTimeout(t)
  }, [phase, onDone])

  const meta = METHOD_META[method]
  const dots = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        angle: (i / 10) * Math.PI * 2,
        delay: i * 0.02,
        size: 6 + ((i * 7) % 5),
      })),
    [],
  )

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-night/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 24, stiffness: 300 }}
            className="w-full max-w-sm rounded-3xl bg-white shadow-2xl overflow-hidden"
          >
            {/* phone mockup header */}
            <div className="bg-night text-cream px-6 pt-6 pb-8 text-center relative">
              <div className="mx-auto mb-3 h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <Smartphone size={24} className="text-momo" />
              </div>
              <p className="text-sm text-cream/70">Kikuubo Pay · Secure Checkout</p>
              <p className="price text-2xl mt-1">{formatUGX(amount)}</p>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-6 w-24 rounded-b-xl bg-night" />
            </div>

            <div className="px-6 pt-10 pb-8 text-center">
              {meta.badge && (
                <img src={meta.badge} alt={meta.label} className="h-8 mx-auto mb-4" />
              )}
              <h3 className="font-sora font-bold text-lg text-night">
                {phase === 'waiting' ? 'Check your phone' : 'Payment approved!'}
              </h3>
              <p className="text-sm text-night/60 mt-1 leading-relaxed">
                {phase === 'waiting' ? (
                  method === 'momo' || method === 'airtel' ? (
                    <>
                      Enter your {meta.label} PIN on{' '}
                      <span className="font-semibold text-night">
                        {phone || '+256 7•• ••• •••'}
                      </span>{' '}
                      to approve {formatUGX(amount)} to Kikuubo
                    </>
                  ) : method === 'visa' ? (
                    <>Securely processing your card for {formatUGX(amount)}…</>
                  ) : (
                    <>Confirming your order with {formatUGX(amount)} due on delivery…</>
                  )
                ) : (
                  <>Webale! {formatUGX(amount)} received by Kikuubo.</>
                )}
              </p>

              <div className="relative mx-auto mt-6 h-20 w-20 flex items-center justify-center">
                {phase === 'waiting' ? (
                  <>
                    {/* orange spinner ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-sand border-t-sunset"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
                    />
                    <span className="text-xs font-semibold text-night/50">Waiting…</span>
                  </>
                ) : (
                  <>
                    {/* confetti burst */}
                    {dots.map((d, i) => (
                      <motion.span
                        key={i}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                        animate={{
                          x: Math.cos(d.angle) * 52,
                          y: Math.sin(d.angle) * 52,
                          opacity: 0,
                          scale: 1,
                        }}
                        transition={{ duration: 0.7, delay: d.delay, ease: 'easeOut' }}
                        className="absolute rounded-full"
                        style={{
                          width: d.size,
                          height: d.size,
                          backgroundColor: i % 3 === 0 ? meta.color : '#F97316',
                        }}
                      />
                    ))}
                    {/* green check burst */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 10, stiffness: 260 }}
                      className="h-16 w-16 rounded-full bg-leaf flex items-center justify-center shadow-lg shadow-leaf/30"
                    >
                      <Check size={32} className="text-white" strokeWidth={3} />
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
