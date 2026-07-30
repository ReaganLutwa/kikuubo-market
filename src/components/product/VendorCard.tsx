import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BadgeCheck, MessageCircle, Star, Users, X, Zap } from 'lucide-react'

const quickReplies = [
  'Is this in stock?',
  'Do you deliver to Jinja?',
  'Can I pay on delivery?',
  'Best price for 2 pieces?',
]

export default function VendorCard({ vendor, verified }: { vendor: string; verified?: boolean }) {
  const [chatOpen, setChatOpen] = useState(false)
  const initials = vendor.split(' ').map((w) => w[0]).slice(0, 2).join('')

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      className="rounded-2xl bg-sand p-5"
    >
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-cocoa text-cream font-sora font-bold flex items-center justify-center text-sm shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="font-sora font-bold truncate">{vendor}</p>
          {verified && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-leaf">
              <BadgeCheck size={14} /> Verified Seller
            </span>
          )}
        </div>
        <div className="ml-auto flex gap-2">
          <button className="rounded-full border-2 border-night text-night text-xs font-semibold px-4 py-2 hover:bg-night hover:text-cream transition-colors">
            Visit Shop
          </button>
          <button
            onClick={() => setChatOpen(true)}
            className="rounded-full bg-sunset text-white text-xs font-semibold px-4 py-2 hover:bg-sunset-hover flex items-center gap-1.5"
          >
            <MessageCircle size={14} /> Chat
          </button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[
          { icon: Star, label: '4.8 seller rating' },
          { icon: Users, label: '3.2K followers' },
          { icon: Zap, label: '98% response rate' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-white/70 py-2.5 flex flex-col items-center gap-1">
            <s.icon size={15} className="text-sunset" />
            <span className="text-[11px] font-medium text-night/70">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Chat drawer */}
      <AnimatePresence>
        {chatOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-night/50"
              onClick={() => setChatOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-[70] w-full max-w-sm bg-cream shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-sand">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-full bg-cocoa text-cream text-xs font-bold flex items-center justify-center">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{vendor}</p>
                    <p className="text-[11px] text-leaf font-medium">Online · replies in ~5 min</p>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)} aria-label="Close chat" className="p-1.5">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm shadow-sm">
                  Oli otya! 👋 Welcome to {vendor}. How can we help you today?
                </div>
                <p className="text-[11px] text-night/40 text-center">Quick questions</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((qr) => (
                    <button
                      key={qr}
                      className="rounded-full bg-white border border-sunset/40 text-sunset text-xs font-medium px-3.5 py-2 hover:bg-sunset hover:text-white transition-colors"
                    >
                      {qr}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-sand flex gap-2">
                <input
                  placeholder="Type a message…"
                  className="flex-1 rounded-full bg-white border border-night/10 px-4 py-2.5 text-sm outline-none focus:border-sunset"
                />
                <button className="rounded-full bg-sunset text-white text-sm font-semibold px-5 hover:bg-sunset-hover">
                  Send
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
