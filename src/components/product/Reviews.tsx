import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ThumbsUp, BadgeCheck, PenLine } from 'lucide-react'

interface Review {
  name: string
  initials: string
  stars: number
  meta: string
  text: string
  helpful: number
}

const reviews: Review[] = [
  {
    name: 'Nakato Sarah', initials: 'NS', stars: 5,
    meta: 'Bought via MTN MoMo · Kampala',
    text: 'Ordered on Monday, boda guy delivered the same evening. Phone is genuine with warranty card. Kikuubo has really changed how I shop!',
    helpful: 42,
  },
  {
    name: 'Okello Brian', initials: 'OB', stars: 5,
    meta: 'Bought via Airtel Money · Gulu',
    text: 'Great camera and the battery lasts two days. Delivery took 3 days upcountry which is fair. Vendor even called to confirm my address.',
    helpful: 28,
  },
  {
    name: 'Achieng Grace', initials: 'AG', stars: 4,
    meta: 'Pay on Delivery · Jinja',
    text: 'Good value for the price. Screen is very smooth. Only issue — the box seal was slightly open but the phone inside was perfect and new.',
    helpful: 15,
  },
  {
    name: 'Mugisha Peter', initials: 'MP', stars: 5,
    meta: 'Bought via MTN MoMo · Mbarara',
    text: 'Second purchase from this seller. MoMo payment was instant and I got SMS confirmation immediately. Highly recommended.',
    helpful: 11,
  },
]

const histogram = [68, 19, 8, 3, 2]

function Stars({ n, size = 14 }: { n: number; size?: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} className={i <= n ? 'fill-momo text-momo' : 'text-night/20'} />
      ))}
    </span>
  )
}

function ReviewCard({ r, index }: { r: Review; index: number }) {
  const [helpful, setHelpful] = useState(r.helpful)
  const [voted, setVoted] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="rounded-2xl bg-white p-4 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-sand text-cocoa text-xs font-bold flex items-center justify-center">
          {r.initials}
        </div>
        <div>
          <p className="text-sm font-semibold flex items-center gap-1.5">
            {r.name} <BadgeCheck size={13} className="text-leaf" />
          </p>
          <p className="text-[11px] text-night/50">{r.meta}</p>
        </div>
        <div className="ml-auto"><Stars n={r.stars} /></div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-night/80">{r.text}</p>
      <button
        onClick={() => {
          if (!voted) { setHelpful((h) => h + 1); setVoted(true) }
        }}
        className={`relative mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
          voted ? 'border-sunset text-sunset bg-sunset/5' : 'border-night/15 text-night/60 hover:border-sunset hover:text-sunset'
        }`}
      >
        <ThumbsUp size={13} /> Helpful ({helpful})
        {voted && (
          <motion.span
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.8 }}
            className="absolute -top-1 right-2 text-sunset text-xs font-bold"
          >
            +1
          </motion.span>
        )}
      </button>
    </motion.article>
  )
}

export default function Reviews({ rating, count }: { rating: number; count: number }) {
  const [shown, setShown] = useState(2)

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-sora font-bold text-xl">Customer Reviews</h2>
        <button className="rounded-full border-2 border-night text-sm font-semibold px-4 py-2 hover:bg-night hover:text-cream transition-colors flex items-center gap-1.5">
          <PenLine size={14} /> Write a review
        </button>
      </div>

      <div className="grid md:grid-cols-[280px_1fr] gap-6">
        {/* Summary */}
        <div className="rounded-2xl bg-white p-5 shadow-sm h-fit">
          <div className="flex items-end gap-2">
            <span className="price text-5xl text-night">{rating}</span>
            <span className="text-night/50 text-sm mb-1.5">/ 5</span>
          </div>
          <Stars n={Math.round(rating)} size={16} />
          <p className="text-xs text-night/50 mt-1.5">{count} verified purchase reviews</p>
          <div className="mt-4 space-y-2">
            {histogram.map((pct, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="w-6 text-night/60">{5 - i}★</span>
                <div className="flex-1 h-2 rounded-full bg-sand overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
                    className="h-full rounded-full bg-momo"
                  />
                </div>
                <span className="w-8 text-right text-night/50">{pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          {reviews.slice(0, shown).map((r, i) => (
            <ReviewCard key={r.name} r={r} index={i} />
          ))}
          {shown < reviews.length && (
            <button
              onClick={() => setShown(reviews.length)}
              className="w-full rounded-full bg-white border border-night/10 text-sm font-semibold py-3 hover:bg-sand transition-colors"
            >
              Load more reviews
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
