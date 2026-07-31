import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { motion, AnimatePresence, animate } from 'framer-motion'
import {
  Trash2, Heart, Minus, Plus, BadgeCheck, ShoppingBag, Bike, Package, MapPin,
  Store, ShieldCheck, ChevronLeft, CreditCard, Banknote, TicketPercent,
} from 'lucide-react'
import { formatUGX } from '@/data/products'
import MoMoModal from '@/components/checkout/MoMoModal'
import type { PayMethod } from '@/components/checkout/MoMoModal'
import ConfirmationStep from '@/components/checkout/ConfirmationStep'
import LocationPicker from '@/components/LocationPicker'
import type { PickedLocation } from '@/components/LocationPicker'
import { loadCart, saveCart, clearCart } from '@/components/checkout/cartState'
import type { CartLine } from '@/components/checkout/cartState'
import { DELIVERY_OPTIONS, REGIONS } from '@/components/checkout/delivery'
import type { DeliveryOption } from '@/components/checkout/delivery'
import { A } from '@/lib/asset'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const STEPS = ['Cart', 'Payment', 'Done']

/** Animated UGX number that tweens between values. */
function TweenedUGX({ value, className }: { value: number; className?: string }) {
  const [display, setDisplay] = useState(value)
  const prev = useRef(value)
  useEffect(() => {
    const controls = animate(prev.current, value, {
      duration: 0.45,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    prev.current = value
    return () => controls.stop()
  }, [value])
  return <span className={className}>{formatUGX(display)}</span>
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="max-w-md mx-auto mb-10">
      <div className="relative flex justify-between">
        <div className="absolute top-4 left-0 right-0 h-1 bg-sand rounded-full" />
        <div className="absolute top-4 left-0 right-0 h-1 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-sunset"
            initial={false}
            animate={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        </div>
        {STEPS.map((label, i) => (
          <div key={label} className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={false}
              animate={{
                backgroundColor: i <= step ? '#F97316' : '#FFE8D1',
                scale: i === step ? 1.15 : 1,
              }}
              transition={{ duration: 0.3 }}
              className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i <= step ? 'text-white' : 'text-night/40'
              }`}
            >
              {i + 1}
            </motion.div>
            <span
              className={`mt-2 text-xs font-semibold ${i <= step ? 'text-night' : 'text-night/40'}`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const PAY_METHODS: {
  id: PayMethod
  label: string
  desc: string
  badge?: string
  icon?: typeof CreditCard
  accent: string
}[] = [
  {
    id: 'momo',
    label: 'MTN Mobile Money',
    desc: "You'll approve with your MoMo PIN on your phone",
    badge: A('/payment-momo.svg'),
    accent: '#FFCC00',
  },
  {
    id: 'airtel',
    label: 'Airtel Money',
    desc: 'Approve with your Airtel Money PIN',
    badge: A('/payment-airtel.svg'),
    accent: '#E40000',
  },
  {
    id: 'cod',
    label: 'Cash on Delivery',
    desc: 'Pay the boda rider on arrival',
    icon: Banknote,
    accent: '#3E2C1E',
  },
  {
    id: 'visa',
    label: 'VISA / Mastercard',
    desc: 'Secure card payment',
    icon: CreditCard,
    accent: '#1A120B',
  },
]

export default function Cart() {
  const [step, setStep] = useState(0)
  const [lines, setLines] = useState<CartLine[]>(() => loadCart())
  const [placedLines, setPlacedLines] = useState<CartLine[]>([])

  // voucher
  const [voucherInput, setVoucherInput] = useState('')
  const [voucherApplied, setVoucherApplied] = useState(false)
  const [voucherError, setVoucherError] = useState(false)
  const [voucherPulse, setVoucherPulse] = useState(0)

  // delivery form
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('+256 ')
  const [region, setRegion] = useState(REGIONS[0])
  const [address, setAddress] = useState('')
  const [deliveryId, setDeliveryId] = useState<DeliveryOption['id']>('boda')
  const [deliveryLoc, setDeliveryLoc] = useState<PickedLocation | null>(null)
  const [deliveryLocError, setDeliveryLocError] = useState(false)

  // payment
  const [payMethod, setPayMethod] = useState<PayMethod>('momo')
  const [momoPhone, setMomoPhone] = useState('+256 ')
  const [modalOpen, setModalOpen] = useState(false)
  const [orderNo, setOrderNo] = useState('')

  useEffect(() => {
    if (step < 2) saveCart(lines)
  }, [lines, step])

  const delivery = DELIVERY_OPTIONS.find((d) => d.id === deliveryId)!
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0)
  const discount = voucherApplied ? Math.round(subtotal * 0.1) : 0
  const total = subtotal - discount + delivery.price

  const setQty = useCallback((id: string, delta: number) => {
    setLines((ls) =>
      ls.map((l) => (l.id === id ? { ...l, qty: Math.max(1, l.qty + delta) } : l)),
    )
  }, [])

  const removeLine = useCallback((id: string) => {
    setLines((ls) => ls.filter((l) => l.id !== id))
  }, [])

  const applyVoucher = () => {
    if (voucherInput.trim().toUpperCase() === 'KIKUUBO10') {
      setVoucherApplied(true)
      setVoucherError(false)
      setVoucherPulse((p) => p + 1)
    } else {
      setVoucherError(true)
    }
  }

  const handleModalDone = useCallback(() => {
    setModalOpen(false)
    setPlacedLines(lines)
    setOrderNo(`KK-2025-${String(Math.floor(10000 + Math.random() * 89999))}`)
    clearCart()
    setStep(2)
    window.scrollTo({ top: 0 })
  }, [lines])

  const payCtaLabel =
    payMethod === 'cod'
      ? `Place Order — ${formatUGX(total)}`
      : `Pay ${formatUGX(total)} with ${PAY_METHODS.find((m) => m.id === payMethod)?.label}`

  const payCtaColor = PAY_METHODS.find((m) => m.id === payMethod)!.accent

  const goToPayment = () => {
    setStep(1)
    window.scrollTo({ top: 0 })
  }

  /* ---------- Step 3 ---------- */
  if (step === 2) {
    return (
      <div className="py-8">
        <Stepper step={2} />
        <ConfirmationStep
          items={placedLines.length ? placedLines : lines}
          delivery={delivery}
          total={total}
          address={{ name: name || 'Kikuubo Customer', region, address }}
          orderNo={orderNo}
        />
      </div>
    )
  }

  return (
    <div className="px-4 md:px-8 max-w-7xl mx-auto py-8 md:py-12">
      <Stepper step={step} />

      {step === 0 && (
        <>
          {lines.length === 0 ? (
            /* Empty state */
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-center py-20"
            >
              <ShoppingBag size={72} className="mx-auto text-sunset" strokeWidth={1.2} />
              <h1 className="font-sora font-extrabold text-3xl mt-6">Your cart is empty</h1>
              <p className="text-night/60 mt-2">Deals on phones, fashion & farm produce await.</p>
              <Link
                to="/deals"
                className="inline-block mt-6 rounded-full bg-sunset hover:bg-sunset-hover text-white font-semibold px-8 py-3 transition-colors"
              >
                Discover deals
              </Link>
            </motion.div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_380px] items-start">
              {/* Items */}
              <div>
                <h1 className="font-sora font-extrabold text-2xl md:text-3xl mb-6">
                  Your Cart <span className="text-sunset">({lines.length})</span>
                </h1>
                <AnimatePresence initial={false}>
                  {lines.map((l, i) => (
                    <motion.div
                      key={l.id}
                      layout="position"
                      initial={{ opacity: 0, y: 32 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }}
                      transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                      className="mb-4"
                    >
                      <div className="rounded-2xl bg-white border border-sand shadow-sm p-4 flex gap-4">
                        <img
                          src={l.product.image}
                          alt={l.product.name}
                          className="h-24 w-24 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-semibold text-sm md:text-base leading-snug line-clamp-2">
                                {l.product.name}
                              </p>
                              {l.variant && (
                                <p className="text-xs text-night/50 mt-0.5">{l.variant}</p>
                              )}
                              <p className="text-xs text-night/50 mt-1 flex items-center gap-1">
                                Sold by {l.product.vendor}
                                {l.product.verified && (
                                  <BadgeCheck size={13} className="text-leaf" />
                                )}
                              </p>
                            </div>
                            <button
                              onClick={() => removeLine(l.id)}
                              aria-label="Remove item"
                              className="p-2 text-night/40 hover:text-airtel transition-colors shrink-0"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          <div className="mt-3 flex items-center justify-between flex-wrap gap-3">
                            {/* qty stepper */}
                            <div className="flex items-center rounded-full border border-night/15 overflow-hidden">
                              <button
                                onClick={() => setQty(l.id, -1)}
                                className="px-3 py-1.5 text-night/70 hover:bg-sand transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={15} />
                              </button>
                              <span className="w-8 text-center text-sm font-semibold tabular-nums">
                                {l.qty}
                              </span>
                              <button
                                onClick={() => setQty(l.id, 1)}
                                className="px-3 py-1.5 text-night/70 hover:bg-sand transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus size={15} />
                              </button>
                            </div>
                            <div className="flex items-center gap-4">
                              <button className="flex items-center gap-1 text-xs text-night/50 hover:text-sunset transition-colors">
                                <Heart size={14} /> Save for later
                              </button>
                              <div className="text-right">
                                <p className="price text-night">
                                  <TweenedUGX value={l.product.price * l.qty} />
                                </p>
                                {l.qty > 1 && (
                                  <p className="text-xs text-night/40">
                                    {formatUGX(l.product.price)} each
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="mt-2 ml-1 text-xs text-sky-info flex items-center gap-1.5">
                        <Bike size={13} /> Ships together from Kampala — boda express available
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Summary */}
              <div className="lg:sticky lg:top-28 rounded-2xl bg-white border border-sand shadow-sm p-6">
                <h2 className="font-sora font-bold text-lg mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-night/60">Subtotal</span>
                    <TweenedUGX value={subtotal} className="font-semibold" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-night/60">Delivery (est.)</span>
                    <span className="font-semibold">{formatUGX(delivery.price)}</span>
                  </div>
                  <AnimatePresence>
                    {voucherApplied && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex justify-between text-leaf overflow-hidden"
                      >
                        <span className="flex items-center gap-1">
                          <TicketPercent size={14} /> KIKUUBO10 (−10%)
                        </span>
                        <span className="font-semibold">−{formatUGX(discount)}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Voucher input */}
                <motion.div
                  key={voucherPulse}
                  animate={
                    voucherApplied
                      ? { boxShadow: ['0 0 0 0 rgba(22,163,74,0)', '0 0 0 4px rgba(22,163,74,0.35)', '0 0 0 0 rgba(22,163,74,0)'] }
                      : {}
                  }
                  transition={{ duration: 0.9 }}
                  className="mt-4 flex rounded-full border border-night/15 overflow-hidden"
                >
                  <input
                    value={voucherInput}
                    onChange={(e) => {
                      setVoucherInput(e.target.value)
                      setVoucherError(false)
                    }}
                    placeholder="Voucher code"
                    disabled={voucherApplied}
                    className="flex-1 px-4 py-2.5 text-sm outline-none bg-transparent placeholder:text-night/40 disabled:opacity-60"
                  />
                  <button
                    onClick={applyVoucher}
                    disabled={voucherApplied}
                    className="bg-night text-cream text-sm font-semibold px-5 hover:bg-cocoa transition-colors disabled:bg-leaf"
                  >
                    {voucherApplied ? 'Applied ✓' : 'Apply'}
                  </button>
                </motion.div>
                {voucherError && (
                  <p className="mt-2 text-xs text-airtel">
                    Invalid code — try <span className="font-semibold">KIKUUBO10</span>
                  </p>
                )}

                <div className="mt-5 pt-5 border-t border-sand flex justify-between items-baseline">
                  <span className="font-semibold">Total</span>
                  <TweenedUGX value={total} className="price text-2xl text-sunset" />
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={goToPayment}
                  className="mt-5 w-full rounded-full bg-sunset hover:bg-sunset-hover text-white font-semibold py-3.5 transition-colors"
                >
                  Proceed to Checkout
                </motion.button>

                <div className="mt-5 flex items-center justify-center gap-3">
                  <img src={A('/payment-momo.svg')} alt="MTN MoMo" className="h-6" />
                  <img src={A('/payment-airtel.svg')} alt="Airtel Money" className="h-6" />
                  <span className="text-[11px] font-semibold text-night/50 border border-night/15 rounded px-1.5 py-0.5">
                    VISA
                  </span>
                </div>
                <p className="mt-3 text-[11px] text-night/50 text-center flex items-center justify-center gap-1">
                  <ShieldCheck size={13} className="text-leaf" /> Buyer Protection: full refund if
                  not delivered
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {step === 1 && (
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] items-start">
          <div>
            <button
              onClick={() => setStep(0)}
              className="mb-5 flex items-center gap-1 text-sm font-semibold text-night/60 hover:text-sunset transition-colors"
            >
              <ChevronLeft size={16} /> Back to cart
            </button>

            {/* Delivery form */}
            <motion.section
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="rounded-2xl bg-white border border-sand shadow-sm p-5 md:p-6"
            >
              <h2 className="font-sora font-bold text-lg mb-4">Delivery Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-night/60 mb-1 block">
                    Full name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Amina Nakato"
                    className="w-full rounded-xl border border-night/15 px-4 py-2.5 text-sm outline-none focus:border-sunset transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-night/60 mb-1 block">
                    Phone number
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+256 772 000 000"
                    className="w-full rounded-xl border border-night/15 px-4 py-2.5 text-sm outline-none focus:border-sunset transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-night/60 mb-1 block">
                    Region / Zone
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full rounded-xl border border-night/15 px-4 py-2.5 text-sm outline-none focus:border-sunset bg-white transition-colors"
                  >
                    {REGIONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-night/60 mb-1 block">
                    Address / landmark
                  </label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Near Owino Market, shop 12…"
                    className="w-full rounded-xl border border-night/15 px-4 py-2.5 text-sm outline-none focus:border-sunset transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-night/60 mb-1 block">
                    Delivery Location
                  </label>
                  {deliveryLoc ? (
                    <div
                      className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                        deliveryLocError ? 'border-airtel' : 'border-night/15'
                      }`}
                    >
                      <MapPin size={17} className="shrink-0 text-sunset" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{deliveryLoc.label}</p>
                        <p className="text-[11px] text-night/45">
                          {deliveryLoc.lat.toFixed(5)}, {deliveryLoc.lng.toFixed(5)}
                        </p>
                      </div>
                      <LocationPicker
                        value={deliveryLoc}
                        onConfirm={(loc) => {
                          setDeliveryLoc(loc)
                          setDeliveryLocError(false)
                        }}
                        triggerLabel="Change"
                        title="Drop a pin where the boda should deliver"
                      />
                    </div>
                  ) : (
                    <LocationPicker
                      value={null}
                      onConfirm={(loc) => {
                        setDeliveryLoc(loc)
                        setDeliveryLocError(false)
                      }}
                      triggerLabel="Drop a pin where the boda should deliver"
                      title="Drop a pin where the boda should deliver"
                    />
                  )}
                  {deliveryLocError && (
                    <p className="mt-1 text-xs text-airtel">
                      Drop a pin so the boda rider knows exactly where to deliver.
                    </p>
                  )}
                </div>
              </div>

              {/* Delivery method radio cards */}
              <h3 className="font-sora font-bold text-base mt-6 mb-3">Delivery Method</h3>
              <div className="grid gap-3 sm:grid-cols-3">
                {DELIVERY_OPTIONS.map((opt) => {
                  const Icon =
                    opt.id === 'boda' ? Bike : opt.id === 'standard' ? Package : Store
                  const selected = deliveryId === opt.id
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setDeliveryId(opt.id)}
                      className={`relative rounded-2xl border-2 p-4 text-left transition-colors ${
                        selected
                          ? 'border-sunset bg-sunset/5'
                          : 'border-night/10 hover:border-night/25'
                      }`}
                    >
                      <span className="flex items-center gap-2 font-semibold text-sm">
                        <Icon size={18} className={selected ? 'text-sunset' : 'text-night/50'} />
                        {opt.label}
                      </span>
                      <span className="block text-xs text-night/50 mt-1">{opt.note}</span>
                      <span className="block mt-2 price text-sm text-night">
                        {opt.price === 0 ? 'FREE' : formatUGX(opt.price)}
                        <span className="font-inter font-normal text-xs text-night/40">
                          {' '}
                          · {opt.eta}
                        </span>
                      </span>
                      {selected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', damping: 12, stiffness: 300 }}
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-sunset text-white flex items-center justify-center"
                        >
                          <BadgeCheck size={14} />
                        </motion.span>
                      )}
                    </button>
                  )
                })}
              </div>
            </motion.section>

            {/* Payment methods */}
            <motion.section
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="mt-6 rounded-2xl bg-white border border-sand shadow-sm p-5 md:p-6"
            >
              <h2 className="font-sora font-bold text-lg mb-4">Payment Method</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {PAY_METHODS.map((m) => {
                  const selected = payMethod === m.id
                  return (
                    <button
                      key={m.id}
                      onClick={() => setPayMethod(m.id)}
                      className={`relative rounded-2xl border-2 p-4 text-left transition-colors ${
                        selected ? 'border-sunset bg-sunset/5' : 'border-night/10 hover:border-night/25'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {m.badge ? (
                          <img src={m.badge} alt={m.label} className="h-8" />
                        ) : m.icon ? (
                          <span
                            className="h-8 w-12 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${m.accent}15` }}
                          >
                            <m.icon size={18} style={{ color: m.accent }} />
                          </span>
                        ) : null}
                        <span className="font-semibold text-sm">{m.label}</span>
                      </span>
                      <span className="block text-xs text-night/50 mt-2">{m.desc}</span>
                      {selected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', damping: 12, stiffness: 300 }}
                          className="absolute top-3 right-3 h-6 w-6 rounded-full bg-sunset text-white flex items-center justify-center"
                        >
                          <BadgeCheck size={14} />
                        </motion.span>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Per-method detail (crossfade) */}
              <AnimatePresence mode="wait">
                {(payMethod === 'momo' || payMethod === 'airtel') && (
                  <motion.div
                    key={payMethod}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="mt-4 rounded-xl bg-sand/60 border border-sand p-4"
                  >
                    <label className="text-xs font-semibold text-night/60 mb-1 block">
                      {payMethod === 'momo' ? 'MTN MoMo' : 'Airtel Money'} phone number
                    </label>
                    <input
                      value={momoPhone}
                      onChange={(e) => setMomoPhone(e.target.value)}
                      placeholder={payMethod === 'momo' ? '+256 772 000 000' : '+256 702 000 000'}
                      className="w-full rounded-xl border border-night/15 px-4 py-2.5 text-sm outline-none focus:border-sunset bg-white transition-colors"
                    />
                  </motion.div>
                )}
                {payMethod === 'visa' && (
                  <motion.div
                    key="visa"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="mt-4 rounded-xl bg-sand/60 border border-sand p-4 grid gap-3 sm:grid-cols-2"
                  >
                    <input
                      placeholder="Card number"
                      className="sm:col-span-2 rounded-xl border border-night/15 px-4 py-2.5 text-sm outline-none focus:border-sunset bg-white transition-colors"
                    />
                    <input
                      placeholder="MM / YY"
                      className="rounded-xl border border-night/15 px-4 py-2.5 text-sm outline-none focus:border-sunset bg-white transition-colors"
                    />
                    <input
                      placeholder="CVV"
                      className="rounded-xl border border-night/15 px-4 py-2.5 text-sm outline-none focus:border-sunset bg-white transition-colors"
                    />
                  </motion.div>
                )}
                {payMethod === 'cod' && (
                  <motion.p
                    key="cod"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="mt-4 rounded-xl bg-sand/60 border border-sand p-4 text-sm text-night/70"
                  >
                    Keep {formatUGX(total)} ready — pay the boda rider when your order arrives.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.section>
          </div>

          {/* Summary side */}
          <div className="lg:sticky lg:top-28 rounded-2xl bg-white border border-sand shadow-sm p-6">
            <h2 className="font-sora font-bold text-lg mb-4">Your Order</h2>
            <div className="flex -space-x-3 mb-4">
              {lines.slice(0, 5).map((l) => (
                <img
                  key={l.id}
                  src={l.product.image}
                  alt={l.product.name}
                  className="h-11 w-11 rounded-lg object-cover border-2 border-white shadow"
                />
              ))}
            </div>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-night/60">Subtotal</span>
                <span className="font-semibold">{formatUGX(subtotal)}</span>
              </div>
              {voucherApplied && (
                <div className="flex justify-between text-leaf">
                  <span>KIKUUBO10 (−10%)</span>
                  <span className="font-semibold">−{formatUGX(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-night/60">Delivery · {delivery.label}</span>
                <span className="font-semibold">
                  {delivery.price === 0 ? 'FREE' : formatUGX(delivery.price)}
                </span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-sand flex justify-between items-baseline">
              <span className="font-semibold">Total</span>
              <TweenedUGX value={total} className="price text-2xl text-sunset" />
            </div>

            <motion.button
              key={payMethod}
              initial={{ scale: 0.97 }}
              animate={{ scale: 1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                if (!deliveryLoc) {
                  setDeliveryLocError(true)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                  return
                }
                setModalOpen(true)
              }}
              className="mt-5 w-full rounded-full font-semibold py-3.5 transition-colors text-sm md:text-base"
              style={{
                backgroundColor: payCtaColor,
                color: payMethod === 'momo' ? '#1A120B' : '#FFF8F0',
              }}
            >
              {payCtaLabel}
            </motion.button>
            <p className="mt-3 text-[11px] text-night/50 text-center flex items-center justify-center gap-1">
              <ShieldCheck size={13} className="text-leaf" /> Buyer Protection: full refund if not
              delivered
            </p>
          </div>
        </div>
      )}

      <MoMoModal
        open={modalOpen}
        method={payMethod}
        amount={total}
        phone={payMethod === 'cod' ? phone : momoPhone}
        onDone={handleModalDone}
      />
    </div>
  )
}
