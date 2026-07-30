import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Star } from 'lucide-react'
import { formatUGX } from '@/data/products'
import { locations } from '@/components/shop/catalog'

export interface FilterState {
  price: [number, number]
  brands: string[]
  locs: string[]
  minRating: boolean
  freeDelivery: boolean
  verifiedOnly: boolean
}

export const defaultFilters: FilterState = {
  price: [0, 5000000],
  brands: [],
  locs: [],
  minRating: false,
  freeDelivery: false,
  verifiedOnly: false,
}

export function countActive(f: FilterState): number {
  let n = f.brands.length + f.locs.length
  if (f.minRating) n++
  if (f.freeDelivery) n++
  if (f.verifiedOnly) n++
  if (f.price[0] > 0 || f.price[1] < 5000000) n++
  return n
}

interface Props {
  brands: string[]
  value: FilterState
  onChange: (f: FilterState) => void
}

export default function FilterPanel({ brands, value, onChange }: Props) {
  const toggle = (list: string[], v: string) =>
    list.includes(v) ? list.filter((x) => x !== v) : [...list, v]

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-sora font-bold text-sm mb-1">Price range</h4>
        <p className="price text-sunset text-sm mb-4">
          {formatUGX(value.price[0])} — {formatUGX(value.price[1])}
        </p>
        <Slider
          value={value.price}
          min={0}
          max={5000000}
          step={10000}
          onValueChange={(v) => onChange({ ...value, price: [v[0], v[1]] as [number, number] })}
        />
        <div className="flex justify-between text-[11px] text-night/50 mt-2">
          <span>UGX 0</span>
          <span>UGX 5M</span>
        </div>
      </div>

      <div>
        <h4 className="font-sora font-bold text-sm mb-3">Brand</h4>
        <div className="space-y-2.5">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-2.5 text-sm cursor-pointer">
              <Checkbox
                checked={value.brands.includes(b)}
                onCheckedChange={() => onChange({ ...value, brands: toggle(value.brands, b) })}
              />
              {b}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-sora font-bold text-sm mb-3">Seller location</h4>
        <div className="space-y-2.5">
          {locations.map((l) => (
            <label key={l} className="flex items-center gap-2.5 text-sm cursor-pointer">
              <Checkbox
                checked={value.locs.includes(l)}
                onCheckedChange={() => onChange({ ...value, locs: toggle(value.locs, l) })}
              />
              {l}
            </label>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2.5 text-sm cursor-pointer">
        <Checkbox
          checked={value.minRating}
          onCheckedChange={(c) => onChange({ ...value, minRating: c === true })}
        />
        <span className="flex items-center gap-1">
          <Star size={14} className="fill-momo text-momo" /> 4 stars & above
        </span>
      </label>

      <div className="space-y-4 pt-2 border-t border-sand">
        <label className="flex items-center justify-between text-sm font-medium cursor-pointer">
          Free delivery
          <Switch
            checked={value.freeDelivery}
            onCheckedChange={(c) => onChange({ ...value, freeDelivery: c })}
          />
        </label>
        <label className="flex items-center justify-between text-sm font-medium cursor-pointer">
          Verified sellers only
          <Switch
            checked={value.verifiedOnly}
            onCheckedChange={(c) => onChange({ ...value, verifiedOnly: c })}
          />
        </label>
      </div>
    </div>
  )
}
