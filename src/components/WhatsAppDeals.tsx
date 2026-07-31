import { useState } from 'react'
import { MessageCircle, CheckCircle2 } from 'lucide-react'

interface Props {
  dark?: boolean // render on dark (night) backgrounds
}

export default function WhatsAppDeals({ dark = false }: Props) {
  const [phone, setPhone] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = encodeURIComponent(
      `Hi Kikuubo! Add me to the Friday deals broadcast. My number: ${phone || '—'}`
    )
    window.open(`https://wa.me/256708813419?text=${text}`, '_blank', 'noopener')
    setDone(true)
  }

  if (done) {
    return (
      <p className="flex items-center gap-2 text-sm font-semibold text-[#25D366]">
        <CheckCircle2 size={18} />
        You'll get Friday deals on WhatsApp — no spam, unsubscribe anytime.
      </p>
    )
  }

  return (
    <form
      onSubmit={submit}
      className={`flex items-center rounded-full border overflow-hidden max-w-sm ${
        dark ? 'bg-cocoa border-cream/10' : 'bg-white border-night/10'
      }`}
    >
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="07XX XXX XXX"
        inputMode="tel"
        aria-label="WhatsApp phone number"
        className={`flex-1 min-w-0 bg-transparent px-5 py-3 text-sm outline-none ${
          dark ? 'placeholder:text-cream/40 text-cream' : 'placeholder:text-night/40 text-night'
        }`}
      />
      <button
        type="submit"
        className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5A] transition-colors px-4 py-3 text-white text-sm font-semibold"
        aria-label="Get Deals on WhatsApp"
      >
        <MessageCircle size={16} />
        <span className="hidden sm:inline">Get Deals on WhatsApp</span>
      </button>
    </form>
  )
}
