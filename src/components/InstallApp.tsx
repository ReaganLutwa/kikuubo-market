import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

// Module-level store: capture the event as soon as Chrome fires it,
// even before this component mounts.
let deferredPrompt: BeforeInstallPromptEvent | null = null
const listeners = new Set<() => void>()

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e as BeforeInstallPromptEvent
    listeners.forEach((fn) => fn())
  })
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null
    listeners.forEach((fn) => fn())
  })
}

const DISMISS_KEY = 'kikuubo-install-dismissed-at'
const DISMISS_TTL = 7 * 24 * 60 * 60 * 1000 // 7 days

function isDismissed(): boolean {
  try {
    const at = Number(localStorage.getItem(DISMISS_KEY) || 0)
    return at > 0 && Date.now() - at < DISMISS_TTL
  } catch {
    return false
  }
}

function isIOS(): boolean {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent)
}

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as { standalone?: boolean }).standalone === true
  )
}

export default function InstallApp() {
  const [, force] = useState(0)
  const [hidden, setHidden] = useState(isDismissed)

  useEffect(() => {
    const rerender = () => force((n) => n + 1)
    listeners.add(rerender)
    return () => {
      listeners.delete(rerender)
    }
  }, [])

  if (hidden || isStandalone()) return null

  const showIOSHint = !deferredPrompt && isIOS()
  if (!deferredPrompt && !showIOSHint) return null

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()))
    } catch {
      /* ignore */
    }
    setHidden(true)
  }

  const install = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') setHidden(true)
    deferredPrompt = null
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto flex max-w-md items-center gap-3 rounded-2xl bg-[#F97316] p-4 text-[#FFF8F0] shadow-xl">
        <div className="flex-1">
          <p className="text-sm font-bold">Install Kikuubo</p>
          <p className="text-xs opacity-90">
            {showIOSHint
              ? 'Tap Share → Add to Home Screen to install the app.'
              : 'Shop faster, get Friday deal alerts.'}
          </p>
        </div>
        {!showIOSHint && (
          <button
            onClick={install}
            className="rounded-full bg-[#FFF8F0] px-4 py-2 text-sm font-bold text-[#EA580C] transition hover:bg-white"
          >
            Install
          </button>
        )}
        <button
          onClick={dismiss}
          aria-label="Dismiss install banner"
          className="rounded-full p-1 text-lg leading-none opacity-80 transition hover:opacity-100"
        >
          ×
        </button>
      </div>
    </div>
  )
}
