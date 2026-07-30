import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/** Milliseconds until the next daily noon drop */
function msToNextDrop(): number {
  const now = new Date()
  const next = new Date(now)
  next.setHours(12, 0, 0, 0)
  if (next.getTime() <= now.getTime()) next.setDate(next.getDate() + 1)
  return next.getTime() - now.getTime()
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function FlipDigit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        animate={{
          boxShadow: [
            '0 0 16px 2px rgba(249,115,22,0.35)',
            '0 0 34px 6px rgba(249,115,22,0.55)',
            '0 0 16px 2px rgba(249,115,22,0.35)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="relative flex h-16 w-14 md:h-24 md:w-20 items-center justify-center overflow-hidden rounded-2xl border border-sunset/50 bg-night/80 backdrop-blur"
        style={{ perspective: 300 }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="price text-3xl md:text-5xl text-sunset"
          >
            {value}
          </motion.span>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-white/10" />
      </motion.div>
      <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-cream/60">{label}</span>
    </div>
  )
}

export default function FlipCountdown() {
  const [ms, setMs] = useState(msToNextDrop)

  useEffect(() => {
    const id = setInterval(() => setMs(msToNextDrop()), 1000)
    return () => clearInterval(id)
  }, [])

  const totalSec = Math.floor(ms / 1000)
  const hours = Math.floor(totalSec / 3600)
  const mins = Math.floor((totalSec % 3600) / 60)
  const secs = totalSec % 60

  return (
    <div className="flex items-start justify-center gap-3 md:gap-5">
      <FlipDigit value={pad(hours)} label="Hours" />
      <span className="price mt-4 md:mt-6 text-2xl md:text-4xl text-sunset/70">:</span>
      <FlipDigit value={pad(mins)} label="Minutes" />
      <span className="price mt-4 md:mt-6 text-2xl md:text-4xl text-sunset/70">:</span>
      <FlipDigit value={pad(secs)} label="Seconds" />
    </div>
  )
}
