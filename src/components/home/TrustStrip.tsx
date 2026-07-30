import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Package, MapPin, Wallet, Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const stats = [
  { icon: Package, value: 10000, suffix: '+', label: 'products listed', decimals: 0 },
  { icon: MapPin, value: 48, suffix: '', label: 'districts served', decimals: 0 },
  { icon: Wallet, value: 24, suffix: 'h', label: 'MoMo payouts', decimals: 0 },
  { icon: Star, value: 4.8, suffix: '★', label: 'seller rating', decimals: 1 },
]

export default function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.stat-number').forEach((el) => {
        const target = parseFloat(el.dataset.value ?? '0')
        const decimals = parseInt(el.dataset.decimals ?? '0', 10)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate: () => {
            el.textContent = decimals
              ? obj.v.toFixed(decimals)
              : Math.round(obj.v).toLocaleString('en-US')
          },
        })
      })
      gsap.from('.stat-card', {
        y: 32,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className="px-4 md:px-8 max-w-7xl mx-auto py-12 md:py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, value, suffix, label, decimals }) => (
          <div key={label} className="stat-card rounded-2xl bg-white shadow-sm p-5 md:p-6 flex flex-col items-start gap-3">
            <span className="rounded-xl bg-sand p-2.5 text-sunset">
              <Icon size={22} />
            </span>
            <p className="font-sora font-extrabold text-2xl md:text-3xl text-night tabular-nums">
              <span className="stat-number" data-value={value} data-decimals={decimals}>0</span>
              {suffix}
            </p>
            <p className="text-sm text-night/50">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
