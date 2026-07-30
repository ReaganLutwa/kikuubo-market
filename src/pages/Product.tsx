import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { motion, AnimatePresence, animate } from 'framer-motion'
import {
  ChevronRight, Star, BadgeCheck, Minus, Plus, MapPin, ChevronDown,
  ShoppingCart, Check, Bike, Truck, Store, ShieldCheck, RotateCcw, CreditCard,
} from 'lucide-react'
import Gallery from '@/components/product/Gallery'
import VendorCard from '@/components/product/VendorCard'
import Reviews from '@/components/product/Reviews'
import StickyBuyBar from '@/components/product/StickyBuyBar'
import ProductCard from '@/components/ProductCard'
import { formatUGX, products } from '@/data/products'
import { getProductById, categoryConfigs } from '@/components/shop/catalog'

const variants = ['128GB / 8GB', '256GB / 8GB', '256GB / 12GB']
const colors = ['Gradient Blue', 'Midnight Black', 'Sunset Gold']

const deliveryOptions = [
  { id: 'boda', icon: Bike, label: 'Boda Express', eta: 'Today, 2–6 hrs', price: 5000 },
  { id: 'standard', icon: Truck, label: 'Standard', eta: '2–3 days', price: 3000 },
  { id: 'pickup', icon: Store, label: 'Pickup Station', eta: 'Tomorrow', price: 0 },
]

const tabs = ['Description', 'Specifications', 'Delivery & Returns'] as const

const specs: [string, string][] = [
  ['Display', '6.6" IPS LCD, 90Hz, 720 × 1612'],
  ['RAM / Storage', '8GB RAM + 128GB (expandable to 1TB)'],
  ['Battery', '5,000 mAh, 18W fast charge'],
  ['Rear Camera', '108MP main + AI lens'],
  ['Front Camera', '32MP selfie with dual flash'],
  ['Processor', 'MediaTek Helio G85 octa-core'],
  ['SIM', 'Dual Nano-SIM + microSD'],
  ['OS', 'Android 14, HiOS 14'],
  ['In the box', 'Phone, charger, USB-C cable, case, ejector pin'],
]

function useCountUp(target: number, from: number) {
  const [val, setVal] = useState(from)
  useEffect(() => {
    const controls = animate(from, target, {
      duration: 0.6,
      ease: 'easeOut',
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => controls.stop()
  }, [target, from])
  return val
}

export default function Product() {
  const [params] = useSearchParams()
  const product = getProductById(params.get('id'))
  const cfg = categoryConfigs[product.category]
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0

  const [variant, setVariant] = useState(0)
  const [color, setColor] = useState(0)
  const [qty, setQty] = useState(1)
  const [delivery, setDelivery] = useState('boda')
  const [added, setAdded] = useState(false)
  const [tab, setTab] = useState<(typeof tabs)[number]>('Description')

  const animatedPrice = useCountUp(product.price, product.oldPrice ?? Math.round(product.price * 1.2))
  const buyPanelRef = useRef<HTMLDivElement>(null)

  const galleryImages = useMemo(
    () => [product.image, ...products.filter((p) => p.id !== product.id).map((p) => p.image)].slice(0, 4),
    [product],
  )

  const related = useMemo(
    () => products.filter((p) => p.category === product.category && p.id !== product.id),
    [product],
  )
  const fromVendor = useMemo(
    () => products.filter((p) => p.vendor === product.vendor && p.id !== product.id),
    [product],
  )

  const handleAdd = () => {
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="px-4 md:px-8 max-w-7xl mx-auto pb-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-night/50 py-4 flex-wrap">
        <Link to="/" className="hover:text-sunset">Home</Link>
        <ChevronRight size={12} />
        <Link to={`/category?c=${product.category}`} className="hover:text-sunset">{cfg.label}</Link>
        <ChevronRight size={12} />
        <span className="text-night font-medium truncate max-w-[180px] md:max-w-none">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <Gallery images={galleryImages} name={product.name} discount={discount} />

        {/* Buy panel */}
        <div ref={buyPanelRef}>
          <h1 className="font-sora font-bold text-xl md:text-2xl leading-snug">{product.name}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm flex-wrap">
            <span className="flex items-center gap-1 font-semibold">
              <Star size={15} className="fill-momo text-momo" /> {product.rating}
            </span>
            <span className="text-sky-info hover:underline cursor-pointer">{product.reviews} reviews</span>
            <span className="text-night/40">·</span>
            <span className="text-night/60">890 sold</span>
          </div>

          {/* Price block */}
          <div className="mt-4 rounded-2xl bg-sand/60 p-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="price text-sunset text-3xl md:text-4xl font-extrabold">
                UGX {animatedPrice.toLocaleString('en-US')}
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-night/40 line-through">{formatUGX(product.oldPrice)}</span>
                  <span className="rounded-full bg-sunset text-white text-xs font-bold px-2.5 py-1">−{discount}%</span>
                </>
              )}
            </div>
            <p className="mt-1.5 text-xs text-night/60 flex items-center gap-1.5">
              <CreditCard size={13} className="text-momo" />
              MoMo installments from <span className="font-semibold text-night">{formatUGX(Math.round(product.price / 12))}/mo</span>
            </p>
          </div>

          {/* Variants */}
          <div className="mt-5">
            <p className="text-xs font-semibold text-night/60 mb-2">Storage / RAM</p>
            <div className="flex gap-2 flex-wrap">
              {variants.map((v, i) => (
                <button
                  key={v}
                  onClick={() => setVariant(i)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    variant === i ? 'text-sunset' : 'bg-white text-night/70 hover:bg-sand'
                  }`}
                >
                  {variant === i && (
                    <motion.span
                      layoutId="variant-ring"
                      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                      className="absolute inset-0 rounded-full ring-2 ring-sunset bg-sunset/5"
                    />
                  )}
                  <span className="relative z-10">{v}</span>
                </button>
              ))}
            </div>
            <p className="text-xs font-semibold text-night/60 mt-4 mb-2">Colour</p>
            <div className="flex gap-2 flex-wrap">
              {colors.map((c, i) => (
                <button
                  key={c}
                  onClick={() => setColor(i)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    color === i ? 'text-sunset' : 'bg-white text-night/70 hover:bg-sand'
                  }`}
                >
                  {color === i && (
                    <motion.span
                      layoutId="color-ring"
                      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                      className="absolute inset-0 rounded-full ring-2 ring-sunset bg-sunset/5"
                    />
                  )}
                  <span className="relative z-10">{c}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-5 flex items-center gap-4">
            <p className="text-xs font-semibold text-night/60">Quantity</p>
            <div className="flex items-center rounded-full bg-white border border-night/10">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="p-2.5 text-night/60 hover:text-sunset"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center font-sora font-bold text-sm">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(10, q + 1))}
                aria-label="Increase quantity"
                className="p-2.5 text-night/60 hover:text-sunset"
              >
                <Plus size={16} />
              </button>
            </div>
            {product.stockLeft != null && product.stockLeft <= 10 && (
              <span className="text-xs font-semibold text-airtel">Only {product.stockLeft} left!</span>
            )}
          </div>

          {/* Delivery */}
          <div className="mt-5">
            <button className="flex items-center gap-1.5 text-sm font-medium text-night/80 mb-2.5">
              <MapPin size={15} className="text-sunset" /> Deliver to: <span className="font-bold">Kampala</span>
              <ChevronDown size={14} />
            </button>
            <div className="space-y-2">
              {deliveryOptions.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDelivery(d.id)}
                  className={`w-full flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-colors ${
                    delivery === d.id ? 'border-sunset bg-sunset/5' : 'border-night/10 bg-white hover:border-sunset/40'
                  }`}
                >
                  <d.icon size={20} className={delivery === d.id ? 'text-sunset' : 'text-night/40'} />
                  <span className="flex-1">
                    <span className="block text-sm font-semibold">{d.label}</span>
                    <span className="block text-xs text-night/50">{d.eta}</span>
                  </span>
                  <span className={`price text-sm ${d.price === 0 ? 'text-leaf' : 'text-night'}`}>
                    {d.price === 0 ? 'FREE' : formatUGX(d.price)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-6 space-y-2.5">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAdd}
              className={`w-full rounded-full py-3.5 font-semibold text-sm flex items-center justify-center gap-2 transition-colors ${
                added ? 'bg-leaf text-white' : 'bg-sunset text-white hover:bg-sunset-hover'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {added ? (
                  <motion.span
                    key="added"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <Check size={17} /> Added to Cart ✓
                  </motion.span>
                ) : (
                  <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                    <ShoppingCart size={17} /> Add to Cart
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full rounded-full bg-momo text-night py-3.5 font-bold text-sm flex items-center justify-center gap-2 hover:brightness-95"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-night" />
              Buy Now with MTN MoMo
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full rounded-full border-2 border-airtel text-airtel py-3 font-bold text-sm hover:bg-airtel/5"
            >
              Pay with Airtel Money
            </motion.button>
          </div>

          <div className="mt-4 flex items-center gap-4 text-[11px] text-night/50 flex-wrap">
            <span className="flex items-center gap-1"><ShieldCheck size={13} className="text-leaf" /> Buyer protection</span>
            <span className="flex items-center gap-1"><RotateCcw size={13} className="text-sky-info" /> 7-day returns</span>
            <span className="flex items-center gap-1"><BadgeCheck size={13} className="text-sunset" /> Genuine product</span>
          </div>
        </div>
      </div>

      {/* Vendor card */}
      <div className="mt-10">
        <VendorCard vendor={product.vendor} verified={product.verified} />
      </div>

      {/* Tabs */}
      <section className="mt-10">
        <div className="flex gap-1 border-b border-sand overflow-x-auto no-scrollbar">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative shrink-0 px-4 py-3 text-sm font-semibold transition-colors ${
                tab === t ? 'text-sunset' : 'text-night/60 hover:text-night'
              }`}
            >
              {t}
              {tab === t && (
                <motion.span
                  layoutId="tab-indicator"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-sunset"
                />
              )}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="py-6"
          >
            {tab === 'Description' && (
              <div className="prose-sm max-w-none text-night/80 space-y-3">
                <p>
                  The {product.name} is built for Uganda's hustle — all-day battery, a camera that
                  captures Owino Market in stunning detail, and performance that keeps up with your
                  busiest days.
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Massive battery — from Kampala to Gulu on a single charge</li>
                  <li>Crisp 90Hz display, easy to read even in bright sunshine</li>
                  <li>Dual SIM — keep your MTN and Airtel lines in one device</li>
                  <li>1-year official Uganda warranty with service centres in Kampala</li>
                  <li>Free screen protector + case included in the box</li>
                </ul>
              </div>
            )}
            {tab === 'Specifications' && (
              <div className="rounded-2xl overflow-hidden border border-sand">
                {specs.map(([k, v], i) => (
                  <div key={k} className={`grid grid-cols-[140px_1fr] md:grid-cols-[220px_1fr] text-sm ${i % 2 ? 'bg-white' : 'bg-sand/40'}`}>
                    <span className="px-4 py-3 font-semibold text-night/70">{k}</span>
                    <span className="px-4 py-3 text-night/85">{v}</span>
                  </div>
                ))}
              </div>
            )}
            {tab === 'Delivery & Returns' && (
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                {[
                  { icon: Bike, title: 'Boda Express', body: 'Same-day delivery within Kampala, Wakiso & Entebbe. UGX 5,000. Track your rider live.' },
                  { icon: Truck, title: 'Standard & Upcountry', body: '2–3 days nationwide via trusted couriers. UGX 3,000 (Kampala), UGX 6,000–10,000 upcountry.' },
                  { icon: RotateCcw, title: 'Easy Returns', body: '7-day free returns. Refund to your MoMo wallet within 24 hours of pickup confirmation.' },
                ].map((c) => (
                  <div key={c.title} className="rounded-2xl bg-white p-4 shadow-sm">
                    <c.icon size={20} className="text-sunset mb-2" />
                    <p className="font-sora font-bold mb-1">{c.title}</p>
                    <p className="text-night/60 text-[13px] leading-relaxed">{c.body}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Reviews */}
      <div className="mt-6">
        <Reviews rating={product.rating} count={product.reviews} />
      </div>

      {/* Related rails */}
      {[
        { title: 'You may also like', items: related },
        { title: `More from ${product.vendor}`, items: fromVendor },
      ]
        .filter((r) => r.items.length > 0)
        .map((rail) => (
          <section key={rail.title} className="mt-12">
            <h2 className="font-sora font-bold text-xl mb-4">{rail.title}</h2>
            <div className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar snap-x -mx-4 px-4 md:mx-0 md:px-0 pb-2">
              {rail.items.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="shrink-0 w-[170px] md:w-[220px] snap-start"
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </section>
        ))}

      <div className="h-8" />

      <StickyBuyBar
        watchRef={buyPanelRef}
        price={product.price}
        name={product.name}
        image={product.image}
        onAdd={handleAdd}
      />
    </div>
  )
}
