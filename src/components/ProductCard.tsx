import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { Heart, Star, BadgeCheck, ShoppingCart } from 'lucide-react'
import type { Product } from '@/data/products'
import { formatUGX } from '@/data/products'

export default function ProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false)
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(26,18,11,0.14)' }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group relative bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col"
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
            <span className="absolute top-2 left-2 rounded-full bg-sunset text-white text-xs font-bold px-2.5 py-1">
              -{discount}%
            </span>
          )}
          {product.badge === 'FREE DELIVERY' && (
            <span className="absolute bottom-2 left-2 rounded-full bg-sky-info text-white text-[10px] font-bold px-2 py-0.5">
              FREE DELIVERY
            </span>
          )}
          {product.badge === 'VERIFIED' && (
            <span className="absolute bottom-2 left-2 rounded-full bg-leaf text-white text-[10px] font-bold px-2 py-0.5">
              VERIFIED
            </span>
          )}
        </div>
      </Link>

      <motion.button
        onClick={() => setWished((v) => !v)}
        whileTap={{ scale: 1.4 }}
        className="absolute top-2 right-2 rounded-full bg-white/90 p-2 shadow-sm"
        aria-label="Add to wishlist"
      >
        <Heart size={16} className={wished ? 'fill-airtel text-airtel' : 'text-night/50'} />
      </motion.button>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <Link to={`/product?id=${product.id}`}>
          <h3 className="text-sm font-medium leading-snug line-clamp-2 min-h-[2.6em] hover:text-sunset transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="price text-sunset text-base">{formatUGX(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs text-night/40 line-through">{formatUGX(product.oldPrice)}</span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs">
          <Star size={13} className="fill-momo text-momo" />
          <span className="font-semibold">{product.rating}</span>
          <span className="text-night/40">({product.reviews})</span>
        </div>
        <p className="text-[11px] text-night/50 flex items-center gap-1">
          Sold by {product.vendor}
          {product.verified && <BadgeCheck size={13} className="text-leaf" />}
        </p>
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          className="mt-auto flex items-center justify-center gap-2 rounded-full bg-night text-cream text-xs font-semibold py-2.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-sunset"
        >
          <ShoppingCart size={14} /> Add to Cart
        </motion.button>
      </div>
    </motion.div>
  )
}
