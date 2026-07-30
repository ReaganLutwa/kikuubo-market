import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Zap, ArrowRight, Star } from 'lucide-react'
import type { Product } from '@/data/products'
import { flashSaleProducts, formatUGX } from '@/data/products'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function useCountdown() {
  const [secs, setSecs] = useState(() => {
    const now = new Date()
    const midnight = new Date(now)
    midnight.setHours(24, 0, 0, 0)
    return Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000))
  })
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 86399)), 1000)
    return () => clearInterval(t)
  }, [])
  const h = String(Math.floor(secs / 3600)).padStart(2, '0')
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0')
  const s = String(secs % 60).padStart(2, '0')
  return [h, m, s]
}

function FlashCard({ p }: { p: Product }) {
  const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0
  const pct = p.stockTotal ? Math.round(((p.stockLeft ?? 0) / p.stockTotal) * 100) : 0
  return (
    <Link
      to={`/product?id=${p.id}`}
      className="flash-card shrink-0 w-[220px] md:w-[260px] bg-cocoa rounded-2xl overflow-hidden border border-cream/10 hover:border-sunset/60 transition-colors group"
    >
      <div className="relative aspect-square overflow-hidden">
        <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <span className="absolute top-2 left-2 rounded-full bg-sunset text-white text-sm font-extrabold px-3 py-1 font-sora">
          -{discount}%
        </span>
      </div>
      <div className="p-3.5 space-y-2">
        <h3 className="text-cream text-sm font-medium leading-snug line-clamp-2 min-h-[2.6em]">{p.name}</h3>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="price text-sunset">{formatUGX(p.price)}</span>
          {p.oldPrice && <span className="text-xs text-cream/40 line-through">{formatUGX(p.oldPrice)}</span>}
        </div>
        <div className="flex items-center gap-1 text-xs text-cream/60">
          <Star size={12} className="fill-momo text-momo" /> {p.rating}
        </div>
        <div>
          <div className="h-1.5 rounded-full bg-cream/10 overflow-hidden">
            <div className="stock-bar h-full rounded-full bg-gradient-to-r from-sunset to-momo" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-1 text-[11px] text-cream/50">{p.stockLeft} left — selling fast</p>
        </div>
      </div>
    </Link>
  )
}

export default function FlashSale() {
  const sectionRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const [h, m, s] = useCountdown()

  useGSAP(
    () => {
      const rail = railRef.current
      if (!rail) return
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const distance = rail.scrollWidth - rail.clientWidth
        if (distance <= 0) return
        gsap.to(rail, {
          x: -Math.min(distance, rail.scrollWidth * 0.6),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: 1,
          },
        })
      })
      gsap.from('.stock-bar', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1,
        ease: 'power3.out',
        stagger: 0.05,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="bg-night py-12 md:py-20 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 left-1/4 h-64 w-[40rem] rounded-full bg-sunset/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 h-64 w-[40rem] rounded-full bg-sunset-deep/20 blur-3xl" />

      <div className="px-4 md:px-8 max-w-7xl mx-auto relative">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <h2 className="font-sora font-extrabold text-2xl md:text-4xl text-white flex items-center gap-2">
            <Zap className="fill-momo text-momo" /> Flash Sale
          </h2>
          <div className="flex items-center gap-1.5 font-sora" aria-label="Time left">
            {[h, m, s].map((unit, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="rounded-lg bg-cocoa border border-sunset/40 px-2.5 py-1.5 text-momo font-bold tabular-nums text-lg md:text-xl">
                  {unit}
                </span>
                {i < 2 && <span className="text-sunset font-bold">:</span>}
              </span>
            ))}
          </div>
          <Link to="/deals" className="ml-auto flex items-center gap-1.5 text-sunset font-semibold text-sm hover:gap-3 transition-all">
            See all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="overflow-x-auto md:overflow-visible no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          <div ref={railRef} className="flex gap-4 w-max">
            {flashSaleProducts.map((p) => (
              <FlashCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
