import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, CheckCircle2, ChevronLeft, ChevronsUpDown, Loader2, PartyPopper, Search } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from '@/components/ui/command'
import { categorySearchIndex, categoryTree } from '@/data/products'

const categories = categorySearchIndex

interface FormData {
  business: string
  owner: string
  phone: string
  category: string
  location: string
  momoNetwork: 'MTN' | 'Airtel'
  momoNumber: string
  pickup: string
  agreed: boolean
}

const initialData: FormData = {
  business: '',
  owner: '',
  phone: '',
  category: '',
  location: '',
  momoNetwork: 'MTN',
  momoNumber: '',
  pickup: '',
  agreed: false,
}

const inputBase =
  'w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-sm text-cream placeholder:text-cream/40 outline-none transition-all focus:border-sunset focus:ring-2 focus:ring-sunset/40'

export default function SellerForm() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>(initialData)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [shakeKey, setShakeKey] = useState(0)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle')
  const [catOpen, setCatOpen] = useState(false)

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((d) => ({ ...d, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const validateStep = (s: number): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (s === 0) {
      if (!data.business.trim()) e.business = 'Enter your business name'
      if (!data.owner.trim()) e.owner = 'Enter the owner name'
      if (!/^(?:\+256|0)\d{9}$/.test(data.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid Ugandan number'
      if (!data.category) e.category = 'Choose a category'
      if (!data.location.trim()) e.location = 'Enter your location'
    } else {
      if (!/^(?:\+256|0)\d{9}$/.test(data.momoNumber.replace(/\s/g, ''))) e.momoNumber = 'Enter a valid MoMo number'
      if (!data.pickup.trim()) e.pickup = 'Enter a pickup address'
      if (!data.agreed) e.agreed = 'You must agree to the seller terms'
    }
    setErrors(e)
    if (Object.keys(e).length > 0) {
      setShakeKey((k) => k + 1)
      return false
    }
    return true
  }

  const next = () => {
    if (validateStep(0)) setStep(1)
  }

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validateStep(1)) return
    setStatus('submitting')
    setTimeout(() => setStatus('done'), 1600)
  }

  const field = (
    key: keyof FormData,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> = {}
  ) => (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cream/60">
        {label}
      </label>
      <input
        className={`${inputBase} ${errors[key] ? 'border-airtel ring-2 ring-airtel/40' : ''}`}
        value={data[key] as string}
        onChange={(e) => set(key, e.target.value as never)}
        {...props}
      />
      {errors[key] && <p className="mt-1 text-xs font-medium text-airtel">{errors[key]}</p>}
    </div>
  )

  if (status === 'done') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="flex flex-col items-center gap-4 py-14 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 14 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-leaf/20"
        >
          <CheckCircle2 size={44} className="text-leaf" />
        </motion.div>
        <h3 className="font-sora text-2xl font-bold text-cream flex items-center gap-2">
          Welcome to Kikuubo, {data.owner.split(' ')[0]}! <PartyPopper size={22} className="text-momo" />
        </h3>
        <p className="max-w-sm text-sm text-cream/60">
          Your shop <span className="font-semibold text-sunset">{data.business}</span> is being set up.
          Our team will call you within 24 hours to verify your MoMo payout.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={submit} noValidate>
      {/* Progress dots */}
      <div className="mb-8 flex items-center justify-center gap-3">
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                step >= i ? 'bg-sunset text-white' : 'bg-white/10 text-cream/50'
              }`}
            >
              {i + 1}
            </div>
            <span className={`text-xs font-semibold ${step >= i ? 'text-cream' : 'text-cream/40'}`}>
              {i === 0 ? 'Business details' : 'MoMo payout'}
            </span>
            {i === 0 && <div className="mx-1 h-px w-8 bg-white/20" />}
          </div>
        ))}
      </div>

      <motion.div
        key={shakeKey}
        animate={shakeKey ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {field('business', 'Business name', { placeholder: 'e.g. Owino Traders' })}
              {field('owner', 'Owner full name', { placeholder: 'e.g. Amina Namono' })}
              {field('phone', 'Phone number', { placeholder: '+256 7XX XXX XXX', type: 'tel' })}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cream/60">
                  Product category
                </label>
                <Popover open={catOpen} onOpenChange={setCatOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      role="combobox"
                      aria-expanded={catOpen}
                      className={`${inputBase} flex items-center justify-between text-left ${errors.category ? 'border-airtel ring-2 ring-airtel/40' : ''} ${data.category ? '' : 'text-cream/40'}`}
                    >
                      <span className="truncate">{data.category || 'Search your category… e.g. "fri"'}</span>
                      <ChevronsUpDown size={16} className="ml-2 shrink-0 text-cream/40" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Type to search… e.g. fridge, laptop, matooke" />
                      <CommandList>
                        <CommandEmpty>
                          <div className="flex flex-col items-center gap-1 py-4">
                            <Search size={18} className="text-night/30" />
                            <span>No category found — try another word.</span>
                          </div>
                        </CommandEmpty>
                        <CommandGroup>
                          {categories.map((c) => (
                            <CommandItem
                              key={c.value}
                              value={c.value}
                              onSelect={(v) => {
                                set('category', v)
                                setCatOpen(false)
                              }}
                            >
                              <Check size={14} className={data.category === c.value ? 'opacity-100 text-sunset' : 'opacity-0'} />
                              {c.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {errors.category && <p className="mt-1 text-xs font-medium text-airtel">{errors.category}</p>}
                <p className="mt-1 text-[11px] text-cream/40">
                  {categoryTree.length} categories — search yours, e.g. "fri" → Appliances → Fridges &amp; Freezers
                </p>
              </div>
              <div className="sm:col-span-2">{field('location', 'Shop location', { placeholder: 'e.g. Owino Market, Kampala' })}</div>
              <div className="sm:col-span-2 mt-2">
                <motion.button
                  type="button"
                  onClick={next}
                  whileTap={{ scale: 0.97 }}
                  className="w-full rounded-full bg-sunset py-3.5 font-sora text-sm font-bold text-white transition-colors hover:bg-sunset-hover"
                >
                  Continue to payout setup →
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid gap-4"
            >
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cream/60">
                  Payout network
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => set('momoNetwork', 'MTN')}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition-all ${
                      data.momoNetwork === 'MTN'
                        ? 'border-momo bg-momo text-night'
                        : 'border-white/15 bg-white/5 text-cream/60 hover:border-momo/50'
                    }`}
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-night/80" /> MTN MoMo
                  </button>
                  <button
                    type="button"
                    onClick={() => set('momoNetwork', 'Airtel')}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition-all ${
                      data.momoNetwork === 'Airtel'
                        ? 'border-airtel bg-airtel text-white'
                        : 'border-white/15 bg-white/5 text-cream/60 hover:border-airtel/50'
                    }`}
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-white/90" /> Airtel Money
                  </button>
                </div>
              </div>
              {field('momoNumber', `${data.momoNetwork} payout number`, { placeholder: '+256 7XX XXX XXX', type: 'tel' })}
              {field('pickup', 'Pickup address (where we collect your stock)', { placeholder: 'e.g. Shop 14, Kikuubo Lane, Kampala' })}
              <div>
                <label className="flex cursor-pointer items-start gap-3 text-sm text-cream/70">
                  <input
                    type="checkbox"
                    checked={data.agreed}
                    onChange={(e) => set('agreed', e.target.checked)}
                    className="mt-0.5 h-5 w-5 rounded accent-[#F97316]"
                  />
                  I agree to the Kikuubo Seller Terms and the commission rates for my category.
                </label>
                {errors.agreed && <p className="mt-1 text-xs font-medium text-airtel">{errors.agreed}</p>}
              </div>
              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="flex items-center gap-1 rounded-full border border-white/20 px-5 py-3.5 text-sm font-semibold text-cream/70 transition-colors hover:border-white/40"
                >
                  <ChevronLeft size={16} /> Back
                </button>
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.97 }}
                  disabled={status === 'submitting'}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-sunset py-3.5 font-sora text-sm font-bold text-white transition-colors hover:bg-sunset-hover disabled:opacity-80"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Creating your shop…
                    </>
                  ) : (
                    'Create my shop'
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </form>
  )
}
