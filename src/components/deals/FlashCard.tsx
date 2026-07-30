import { memo, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import type { Product } from '@/data/products'
import { formatUGX } from '@/data/products'

/** deterministic per-product flash window (2–6 hours from mount) */
function useFlashDeadline(id: string): number {
  const [deadline] = useState(() => {
    const seed = id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
    return Date.now() + (2 + (seed % 5)) * 3600 * 1000 + (seed % 59) * 60 * 1000
  })
  return deadline
}

const FlashCard = memo(function FlashCard({ product }: { product: Product }) {
  const deadline = useFlashDeadline(product.id)
  const [msLeft, setMsLeft] = useState(deadline - Date.now())

  useEffect(() => {
    const id = setInterval(() => setMsLeft(Math.max(0, deadline - Date.now())), 1000)
    return () => clearInterval(id)
  }, [deadline])

  const totalSec = Math.floor(msLeft / 1000)
  const h = String(Math.floor(totalSec / 3600)).padStart(2, '0')
  const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0')

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0
  const left = product.stockLeft ?? 10
  const total = product.stockTotal ?? 30
  const pct = Math.min(100, Math.round((left / total) * 100))
  const lowStock = left < 5

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      className="group w-[220px] md:w-[250px] shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow-sm"
    >
      <Link to={`/product?id=${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-sand/40">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {discount > 0 && (
            <span className="absolute left-2 top-2 rounded-full bg-sunset px-2.5 py-1 text-sm font-extrabold text-white shadow-lg">
              −{discount}%
            </span>
          )}
          <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-night/85 px-2.5 py-1 backdrop-blur">
            <Zap size={11} className="fill-momo text-momo" />
            <motion.span
              key={`${h}:${m}`}
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              className="price text-[11px] text-cream"
            >
              ends {h}:{m}
            </motion.span>
          </div>
        </div>
      </Link>
      <div className="p-3">
        <Link to={`/product?id=${product.id}`}>
          <h3 className="line-clamp-2 min-h-[2.6em] text-sm font-medium leading-snug hover:text-sunset transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="price text-base text-sunset">{formatUGX(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs text-night/40 line-through">{formatUGX(product.oldPrice)}</span>
          )}
        </div>
        {/* stock bar */}
        <div className="mt-2.5">
          <div className="h-1.5 overflow-hidden rounded-full bg-night/10">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`h-full rounded-full ${lowStock ? 'bg-airtel' : 'bg-sunset'}`}
            >
              {lowStock && (
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="h-full w-full bg-airtel"
                />
              )}
            </motion.div>
          </div>
          <motion.p
            animate={lowStock ? { opacity: [1, 0.5, 1] } : {}}
            transition={lowStock ? { duration: 1, repeat: Infinity } : {}}
            className={`mt-1 text-[11px] font-bold ${lowStock ? 'text-airtel' : 'text-night/50'}`}
          >
            {lowStock ? `Only ${left} left!` : `${left} of ${total} left`}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
})

export default FlashCard
