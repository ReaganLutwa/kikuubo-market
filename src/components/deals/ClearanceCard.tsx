import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import type { Product } from '@/data/products'
import { formatUGX } from '@/data/products'

export default function ClearanceCard({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 70

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ rx: -py * 12, ry: px * 12 })
  }

  return (
    <div style={{ perspective: 800 }}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
        className="group relative overflow-hidden rounded-2xl bg-white shadow-md"
      >
        <Link to={`/product?id=${product.id}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-sand/40">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* diagonal ribbon */}
            <motion.div
              animate={{ rotate: [-45, -42, -48, -45] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-9 top-4 w-36 bg-gradient-to-r from-airtel to-sunset-deep py-1 text-center shadow-lg"
            >
              <span className="text-xs font-extrabold text-white">{discount}% OFF</span>
            </motion.div>
          </div>
        </Link>
        <div className="p-3">
          <Link to={`/product?id=${product.id}`}>
            <h3 className="line-clamp-2 min-h-[2.6em] text-sm font-medium leading-snug hover:text-sunset transition-colors">
              {product.name}
            </h3>
          </Link>
          <div className="mt-1 flex flex-wrap items-baseline gap-2">
            <span className="price text-base text-airtel">{formatUGX(product.price)}</span>
            {product.oldPrice && (
              <span className="text-sm font-semibold text-night/40 line-through decoration-airtel/60 decoration-2">
                {formatUGX(product.oldPrice)}
              </span>
            )}
          </div>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-night/40">Final call — no restock</p>
        </div>
      </motion.div>
    </div>
  )
}
