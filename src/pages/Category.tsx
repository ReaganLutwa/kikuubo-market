import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight, SlidersHorizontal, ArrowUpDown, Check, X, Truck, History,
} from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import FilterPanel, { defaultFilters, countActive } from '@/components/shop/FilterPanel'
import type { FilterState } from '@/components/shop/FilterPanel'
import { buildCatalog, categoryConfigs } from '@/components/shop/catalog'
import type { Product } from '@/data/products'
import { products } from '@/data/products'

type SortKey = 'popular' | 'newest' | 'price-asc' | 'price-desc' | 'discount'

const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'popular', label: 'Popular' },
  { key: 'newest', label: 'Newest' },
  { key: 'price-asc', label: 'Price ↑' },
  { key: 'price-desc', label: 'Price ↓' },
  { key: 'discount', label: 'Discount' },
]

const PAGE_SIZE = 12

function discountPct(p: Product) {
  return p.oldPrice ? (1 - p.price / p.oldPrice) * 100 : 0
}

export default function Category() {
  const [params, setParams] = useSearchParams()
  const rawCat = params.get('c') ?? 'phones'
  const catId = (rawCat in categoryConfigs ? rawCat : 'phones') as Product['category']
  const cfg = categoryConfigs[catId]

  const [activeSub, setActiveSub] = useState(0)
  const [sort, setSort] = useState<SortKey>('popular')
  const [sortOpen, setSortOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [draft, setDraft] = useState<FilterState>(defaultFilters)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [shown, setShown] = useState(PAGE_SIZE)

  const catalog = useMemo(() => buildCatalog(catId), [catId])

  const filtered = useMemo(() => {
    let list = catalog.filter(
      (p) =>
        p.price >= filters.price[0] &&
        p.price <= filters.price[1] &&
        (filters.brands.length === 0 || filters.brands.includes(p.brand)) &&
        (filters.locs.length === 0 || filters.locs.includes(p.location)) &&
        (!filters.minRating || p.rating >= 4) &&
        (!filters.freeDelivery || p.freeDelivery) &&
        (!filters.verifiedOnly || p.verified),
    )
    switch (sort) {
      case 'newest':
        list = [...list].sort((a, b) => b.createdAt - a.createdAt)
        break
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case 'discount':
        list = [...list].sort((a, b) => discountPct(b) - discountPct(a))
        break
      default:
        list = [...list].sort((a, b) => b.reviews - a.reviews)
    }
    return list
  }, [catalog, filters, sort])

  const visible = filtered.slice(0, shown)
  const activeCount = countActive(filters)
  const draftCount = countActive(draft)
  const q = params.get('q')

  const setCategory = (c: string) => {
    setParams({ c })
    setActiveSub(0)
    setShown(PAGE_SIZE)
  }

  return (
    <div className="px-4 md:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-night/50 py-4">
        <Link to="/" className="hover:text-sunset">Home</Link>
        <ChevronRight size={12} />
        <span className="text-night font-medium">{q ? `Search: “${q}”` : cfg.label}</span>
      </nav>

      {/* Banner */}
      <motion.section
        key={catId}
        initial={{ clipPath: 'inset(0 0 100% 0 round 24px)' }}
        animate={{ clipPath: 'inset(0 0 0% 0 round 24px)' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${cfg.bannerClass} text-white`}
      >
        <div className="grid md:grid-cols-[1.4fr_1fr] items-center gap-4 p-6 md:p-10">
          <div>
            <h1 className="font-sora font-extrabold tracking-tight text-3xl md:text-5xl">{cfg.label}</h1>
            <p className="mt-2 text-white/80 text-sm md:text-base">
              {cfg.count} products from verified Ugandan sellers
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[`From ${cfg.from}`, cfg.freeNote, 'Buyer protection'].map((chip, i) => (
                <motion.span
                  key={chip}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className={`rounded-full ${cfg.chipClass} backdrop-blur px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5`}
                >
                  {i === 1 && <Truck size={13} />} {chip}
                </motion.span>
              ))}
            </div>
          </div>
          <motion.img
            src={cfg.image}
            alt={cfg.label}
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.15 }}
            className="hidden md:block h-48 w-full object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </motion.section>

      {/* Sub-category pills */}
      <div className="mt-5 flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        {cfg.subs.map((s, i) => (
          <motion.button
            key={s}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => setActiveSub(i)}
            className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeSub === i ? 'text-white' : 'bg-white text-night/70 hover:bg-sand'
            }`}
          >
            {activeSub === i && (
              <motion.span
                layoutId="sub-pill"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute inset-0 rounded-full bg-sunset"
              />
            )}
            <span className="relative z-10">{s}</span>
          </motion.button>
        ))}
      </div>

      {/* Mobile filter/sort bar */}
      <div className="md:hidden sticky top-[104px] z-30 -mx-4 px-4 py-3 bg-cream/95 backdrop-blur flex gap-2">
        <button
          onClick={() => {
            setDraft(filters)
            setSheetOpen(true)
          }}
          className="relative flex-1 flex items-center justify-center gap-2 rounded-full bg-night text-cream text-sm font-semibold py-2.5"
        >
          <SlidersHorizontal size={16} /> Filter
          {activeCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-sunset text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>
        <div className="relative flex-1">
          <button
            onClick={() => setSortOpen((v) => !v)}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-white border border-night/10 text-sm font-semibold py-2.5"
          >
            <ArrowUpDown size={15} /> Sort: {sortOptions.find((o) => o.key === sort)?.label}
          </button>
          <AnimatePresence>
            {sortOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute right-0 top-full mt-2 w-44 rounded-2xl bg-white shadow-xl border border-sand p-1.5 z-40"
              >
                {sortOptions.map((o) => (
                  <button
                    key={o.key}
                    onClick={() => {
                      setSort(o.key)
                      setSortOpen(false)
                    }}
                    className="w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-sm hover:bg-sand"
                  >
                    {o.label}
                    {sort === o.key && <Check size={15} className="text-sunset" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-4 md:mt-6 grid md:grid-cols-[240px_1fr] gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden md:block">
          <div className="sticky top-24 rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-sora font-bold">Filters</h3>
              {activeCount > 0 && (
                <button
                  onClick={() => setFilters(defaultFilters)}
                  className="text-xs text-sunset font-semibold hover:underline"
                >
                  Clear all ({activeCount})
                </button>
              )}
            </div>
            <FilterPanel brands={cfg.brands} value={filters} onChange={(f) => { setFilters(f); setShown(PAGE_SIZE) }} />
          </div>
        </aside>

        {/* Grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={filtered.length + sort}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-night/60"
              >
                Showing <span className="font-semibold text-night">{visible.length}</span> of{' '}
                <span className="font-semibold text-night">{filtered.length}</span> products
              </motion.p>
            </AnimatePresence>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="hidden md:block rounded-full bg-white border border-night/10 text-sm font-medium px-4 py-2 outline-none cursor-pointer"
            >
              {sortOptions.map((o) => (
                <option key={o.key} value={o.key}>Sort: {o.label}</option>
              ))}
            </select>
          </div>

          {visible.length === 0 ? (
            <div className="rounded-2xl bg-white p-12 text-center">
              <p className="font-sora font-bold text-lg">No products match your filters</p>
              <p className="text-sm text-night/50 mt-1">Try widening the price range or clearing a filter.</p>
              <button
                onClick={() => setFilters(defaultFilters)}
                className="mt-4 rounded-full bg-sunset text-white text-sm font-semibold px-6 py-2.5 hover:bg-sunset-hover"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              <AnimatePresence mode="popLayout">
                {visible.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ delay: Math.min(i % PAGE_SIZE, 8) * 0.05, type: 'spring', stiffness: 260, damping: 26 }}
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {shown < filtered.length && (
            <div className="mt-8 text-center">
              <motion.button
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                onClick={() => setShown((s) => s + PAGE_SIZE)}
                className="rounded-full bg-night text-cream font-semibold text-sm px-10 py-3.5 hover:bg-sunset transition-colors"
              >
                Load more products
              </motion.button>
            </div>
          )}
        </section>
      </div>

      {/* Recently viewed */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        className="mt-14 mb-10"
      >
        <h2 className="font-sora font-bold text-lg flex items-center gap-2 mb-4">
          <History size={18} className="text-sunset" /> Recently viewed
        </h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {products.slice(0, 8).map((p) => (
            <motion.div key={p.id} whileHover={{ y: -4 }} className="shrink-0 w-[140px]">
              <Link to={`/product?id=${p.id}`} className="block rounded-2xl bg-white p-2.5 shadow-sm">
                <img src={p.image} alt={p.name} className="h-20 w-full object-cover rounded-xl bg-sand/40" />
                <p className="mt-2 text-[11px] leading-tight line-clamp-2">{p.name}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Mobile filter bottom sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-night/50 md:hidden"
              onClick={() => setSheetOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 260 }}
              className="fixed inset-x-0 bottom-0 z-[70] md:hidden max-h-[85dvh] rounded-t-3xl bg-cream flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-sand">
                <h3 className="font-sora font-bold">Filters {draftCount > 0 && `(${draftCount})`}</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setDraft(defaultFilters)}
                    className="text-xs text-sunset font-semibold"
                  >
                    Clear all
                  </button>
                  <button onClick={() => setSheetOpen(false)} aria-label="Close filters" className="p-1">
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <FilterPanel brands={cfg.brands} value={draft} onChange={setDraft} />
              </div>
              <div className="p-4 border-t border-sand bg-cream">
                <button
                  onClick={() => {
                    setFilters(draft)
                    setShown(PAGE_SIZE)
                    setSheetOpen(false)
                  }}
                  className="w-full rounded-full bg-sunset text-white font-semibold py-3.5 hover:bg-sunset-hover"
                >
                  Show results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Category quick links (desktop footer of page) */}
      <div className="hidden md:flex gap-2 mb-12 flex-wrap">
        {Object.values(categoryConfigs).map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              c.id === catId ? 'bg-night text-cream' : 'bg-white hover:bg-sand'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  )
}
