import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { Package, Bike, Check, MapPin, ArrowRight } from 'lucide-react'
import { formatUGX } from '@/data/products'
import type { CartLine } from '@/components/checkout/cartState'
import type { DeliveryOption } from '@/components/checkout/delivery'

interface Props {
  items: CartLine[]
  delivery: DeliveryOption
  total: number
  address: { name: string; region: string; address: string }
  orderNo: string
}

const TIMELINE = [
  { label: 'Ordered', icon: Check },
  { label: 'Packed', icon: Package },
  { label: 'On boda', icon: Bike },
  { label: 'Delivered', icon: MapPin },
]

export default function ConfirmationStep({ items, delivery, total, address, orderNo }: Props) {
  return (
    <div className="px-4 md:px-8 max-w-3xl mx-auto py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="rounded-3xl bg-white shadow-xl border border-sand p-6 md:p-10 text-center"
      >
        {/* Animated check circle */}
        <motion.div
          initial={{ scale: 0.6 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 11, stiffness: 200 }}
          className="mx-auto h-24 w-24"
        >
          <svg viewBox="0 0 96 96" className="h-full w-full">
            <motion.circle
              cx="48" cy="48" r="42" fill="none" stroke="#16A34A" strokeWidth="6"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            <motion.path
              d="M32 49 L44 61 L65 38"
              fill="none" stroke="#16A34A" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.55, ease: 'easeOut' }}
            />
          </svg>
        </motion.div>

        <h1 className="font-sora font-extrabold text-2xl md:text-3xl mt-6">
          Webale nyo! Order placed 🎉
        </h1>
        <p className="text-night/60 mt-2">
          Order <span className="font-semibold text-night">#{orderNo}</span> · {formatUGX(total)}
        </p>

        {/* ETA card */}
        <div className="mt-6 rounded-2xl bg-sand/70 border border-sand px-5 py-4 flex items-center justify-center gap-3">
          <Bike size={22} className="text-sunset shrink-0" />
          <p className="text-sm font-semibold text-night">
            Arriving {delivery.eta} · {delivery.label}
          </p>
        </div>

        {/* Items recap */}
        <div className="mt-6 flex items-center justify-center -space-x-3">
          {items.slice(0, 4).map((l) => (
            <img
              key={l.id}
              src={l.product.image}
              alt={l.product.name}
              className="h-14 w-14 rounded-xl object-cover border-4 border-white shadow"
            />
          ))}
          {items.length > 4 && (
            <span className="h-14 w-14 rounded-xl bg-night text-cream text-sm font-bold flex items-center justify-center border-4 border-white">
              +{items.length - 4}
            </span>
          )}
        </div>

        {/* Address summary */}
        <p className="mt-5 text-sm text-night/60 flex items-center justify-center gap-2">
          <MapPin size={15} className="text-sunset" />
          {address.name} · {address.address || 'Kampala'} · {address.region}
        </p>

        {/* Tracking timeline */}
        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-night/40 mb-4">
            Order tracking
          </p>
          <div className="relative flex items-start justify-between max-w-md mx-auto">
            <div className="absolute top-5 left-[12%] right-[12%] h-1 bg-sand rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-leaf rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '14%' }}
                transition={{ duration: 0.6, delay: 1.1, ease: 'easeOut' }}
              />
            </div>
            {TIMELINE.map((node, i) => (
              <div key={node.label} className="relative z-10 flex flex-col items-center w-1/4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    backgroundColor: i === 0 ? '#16A34A' : '#FFE8D1',
                  }}
                  transition={{ delay: 0.8 + i * 0.3, type: 'spring', damping: 14, stiffness: 240 }}
                  className="h-10 w-10 rounded-full flex items-center justify-center"
                >
                  <node.icon size={18} className={i === 0 ? 'text-white' : 'text-night/40'} />
                </motion.div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 + i * 0.3 }}
                  className={`text-xs mt-2 font-medium ${i === 0 ? 'text-leaf' : 'text-night/50'}`}
                >
                  {node.label}
                </motion.span>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.button
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-full sm:w-auto rounded-full bg-sunset hover:bg-sunset-hover text-white font-semibold px-8 py-3 flex items-center justify-center gap-2 transition-colors"
          >
            Track Order <ArrowRight size={16} />
          </motion.button>
          <Link
            to="/"
            className="w-full sm:w-auto rounded-full border-2 border-night text-night font-semibold px-8 py-3 hover:bg-night hover:text-cream transition-colors text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
