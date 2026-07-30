import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { formatUGX } from '@/data/products'

interface Props {
  watchRef: React.RefObject<HTMLElement | null>
  price: number
  name: string
  image: string
  onAdd: () => void
}

export default function StickyBuyBar({ watchRef, price, name, image, onAdd }: Props) {
  const [hidden, setHidden] = useState(true)
  const [pastFold, setPastFold] = useState(false)
  const scrolled = useRef(false)

  useEffect(() => {
    const el = watchRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0.2 })
    io.observe(el)
    const onScroll = () => {
      if (!scrolled.current && window.scrollY > 120) {
        scrolled.current = true
        setPastFold(true)
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [watchRef])

  const show = pastFold && !hidden

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-x-0 bottom-16 z-40 md:hidden bg-white border-t border-sand shadow-[0_-8px_24px_rgba(26,18,11,0.12)] px-4 py-3 flex items-center gap-3"
        >
          <img src={image} alt="" className="h-10 w-10 rounded-lg object-cover bg-sand/40" />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-night/60 truncate">{name}</p>
            <p className="price text-sunset text-base leading-tight">{formatUGX(price)}</p>
          </div>
          <button
            onClick={onAdd}
            className="shrink-0 rounded-full bg-sunset text-white text-sm font-semibold px-5 py-2.5 flex items-center gap-1.5 hover:bg-sunset-hover"
          >
            <ShoppingCart size={15} /> Add to Cart
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
