import { products } from '@/data/products'
import type { Product } from '@/data/products'

export interface CartLine {
  id: string
  product: Product
  qty: number
  variant?: string
}

const STORAGE_KEY = 'kikuubo-cart-v1'

type StoredLine = { id: string; qty: number; variant?: string }

const SEED: StoredLine[] = [
  { id: 'tecno-spark-20', qty: 1 },
  { id: 'ankara-dress', qty: 2, variant: 'Size M · Orange/Teal' },
  { id: 'matooke-bunch', qty: 1 },
]

function hydrate(stored: StoredLine[]): CartLine[] {
  const out: CartLine[] = []
  for (const s of stored) {
    const product = products.find((p) => p.id === s.id)
    if (!product || s.qty <= 0) continue
    const line: CartLine = { id: s.id, product, qty: s.qty }
    if (s.variant) line.variant = s.variant
    out.push(line)
  }
  return out
}

export function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return hydrate(SEED)
    const parsed = JSON.parse(raw) as StoredLine[]
    if (!Array.isArray(parsed)) return hydrate(SEED)
    return hydrate(parsed)
  } catch {
    return hydrate(SEED)
  }
}

export function saveCart(lines: CartLine[]) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(lines.map((l) => ({ id: l.id, qty: l.qty, variant: l.variant }))),
    )
  } catch {
    /* storage unavailable — ignore */
  }
}

export function clearCart() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
  } catch {
    /* ignore */
  }
}
