import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Share2 } from 'lucide-react'

interface Props {
  images: string[]
  name: string
  discount: number
}

export default function Gallery({ images, name, discount }: Props) {
  const [idx, setIdx] = useState(0)
  const [wished, setWished] = useState(false)
  const [dir, setDir] = useState(1)

  const go = (n: number) => {
    setDir(n > idx ? 1 : -1)
    setIdx(((n % images.length) + images.length) % images.length)
  }

  return (
    <div className="md:flex md:gap-3">
      {/* Desktop thumbnails */}
      <div className="hidden md:flex flex-col gap-3 w-20 shrink-0">
        {images.map((src, i) => (
          <button
            key={i}
            onMouseEnter={() => go(i)}
            onClick={() => go(i)}
            className={`relative rounded-xl overflow-hidden aspect-square bg-white transition-shadow ${
              i === idx ? 'ring-2 ring-sunset' : 'ring-1 ring-night/10 hover:ring-sunset/50'
            }`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main image / mobile carousel */}
      <div className="relative flex-1">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-sm group">
          <AnimatePresence initial={false} custom={dir}>
            <motion.img
              key={idx}
              src={images[idx]}
              alt={name}
              custom={dir}
              initial={{ x: dir * 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: dir * -80, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(idx + 1)
                else if (info.offset.x > 60) go(idx - 1)
              }}
              className="h-full w-full object-cover cursor-grab active:cursor-grabbing md:group-hover:scale-[1.15] transition-transform duration-500"
            />
          </AnimatePresence>

          {discount > 0 && (
            <span className="absolute top-3 left-3 rounded-full bg-sunset text-white text-sm font-bold px-3 py-1.5 shadow-lg">
              −{discount}%
            </span>
          )}
          <div className="absolute top-3 right-3 flex gap-2">
            <motion.button
              whileTap={{ scale: 1.3 }}
              onClick={() => setWished((v) => !v)}
              aria-label="Add to wishlist"
              className="rounded-full bg-white/95 p-2.5 shadow-md"
            >
              <Heart size={18} className={wished ? 'fill-airtel text-airtel' : 'text-night/60'} />
            </motion.button>
            <button
              aria-label="Share product"
              onClick={() => navigator.clipboard?.writeText(window.location.href).catch(() => {})}
              className="rounded-full bg-white/95 p-2.5 shadow-md"
            >
              <Share2 size={18} className="text-night/60" />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-3 flex justify-center gap-1.5 md:hidden">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Image ${i + 1}`}
              className="p-1"
            >
              <motion.span
                animate={{ width: i === idx ? 24 : 8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className={`block h-2 rounded-full ${i === idx ? 'bg-sunset' : 'bg-night/20'}`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
