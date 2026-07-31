import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { Crosshair, Loader2, MapPin } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile'

export interface PickedLocation {
  lat: number
  lng: number
  label: string
}

interface LocationPickerProps {
  value?: PickedLocation | null
  onConfirm: (loc: PickedLocation) => void
  triggerLabel: string
  title?: string
  /** Render an icon-only round trigger button (for embedding next to inputs). */
  compact?: boolean
}

const KAMPALA: [number, number] = [0.3476, 32.5825]

/** Draggable pin rendered as a styled divIcon — no image assets needed in Vite. */
const pinIcon = L.divIcon({
  className: 'kikuubo-map-pin',
  html: `<div style="width:28px;height:28px;border-radius:50% 50% 50% 0;background:#F97316;border:3px solid #fff;transform:rotate(-45deg);box-shadow:0 2px 6px rgba(0,0,0,.4)"></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
})

function coordsLabel(lat: number, lng: number) {
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`
}

/** Shorten a Nominatim display_name to its first 2-3 meaningful parts. */
async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
    { headers: { Accept: 'application/json' } },
  )
  if (!res.ok) throw new Error('geocode failed')
  const json = (await res.json()) as { display_name?: string }
  const name = json.display_name
  if (!name) throw new Error('no name')
  const parts = name
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean)
  return parts.slice(0, 3).join(', ')
}

/** Inner map — click to place / drag marker, recenter when position set externally. */
function PickMap({
  pos,
  onPick,
}: {
  pos: { lat: number; lng: number } | null
  onPick: (lat: number, lng: number) => void
}) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng)
    },
  })
  const map = useMap()
  const centered = useRef(false)
  useEffect(() => {
    if (pos && !centered.current) {
      map.setView([pos.lat, pos.lng], Math.max(map.getZoom(), 14))
      centered.current = true
    }
  }, [pos, map])
  useEffect(() => {
    // Ensure tiles render correctly inside dialog/drawer containers.
    const t = setTimeout(() => map.invalidateSize(), 120)
    return () => clearTimeout(t)
  }, [map])
  return pos ? (
    <Marker
      position={[pos.lat, pos.lng]}
      icon={pinIcon}
      draggable
      eventHandlers={{
        dragend(e) {
          const m = e.target as L.Marker
          const ll = m.getLatLng()
          onPick(ll.lat, ll.lng)
        },
      }}
    />
  ) : null
}

export default function LocationPicker({ value, onConfirm, triggerLabel, title, compact }: LocationPickerProps) {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ lat: number; lng: number } | null>(
    value ? { lat: value.lat, lng: value.lng } : null,
  )
  const [label, setLabel] = useState<string>(value?.label ?? '')
  const [geoStatus, setGeoStatus] = useState<'idle' | 'locating' | 'error'>('idle')

  const pick = useCallback((lat: number, lng: number) => {
    setPos({ lat, lng })
    setLabel(coordsLabel(lat, lng))
    reverseGeocode(lat, lng)
      .then((name) => setLabel(name))
      .catch(() => {
        /* silent — coords label stays */
      })
  }, [])

  const locateMe = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setGeoStatus('error')
      return
    }
    setGeoStatus('locating')
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setGeoStatus('idle')
        pick(p.coords.latitude, p.coords.longitude)
      },
      () => setGeoStatus('error'),
      { timeout: 10000 },
    )
  }, [pick])

  const confirm = () => {
    if (!pos) return
    onConfirm({ lat: pos.lat, lng: pos.lng, label: label || coordsLabel(pos.lat, pos.lng) })
    setOpen(false)
  }

  const mapCenter = useMemo<[number, number]>(
    () => (pos ? [pos.lat, pos.lng] : KAMPALA),
    [pos],
  )

  const body = (
    <div className="flex flex-col gap-3">
      {open && (
        <div className="h-[45vh] min-h-[300px] w-full overflow-hidden rounded-xl border border-night/10">
          <MapContainer
            key={`${mapCenter[0]}-${mapCenter[1]}-${open}`}
            center={mapCenter}
            zoom={12}
            className="h-full w-full"
            scrollWheelZoom
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <PickMap pos={pos} onPick={pick} />
          </MapContainer>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={locateMe}
          className="flex items-center gap-1.5 rounded-full border border-night/15 px-3.5 py-2 text-xs font-semibold text-night/70 transition-colors hover:border-sunset hover:text-sunset"
        >
          {geoStatus === 'locating' ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Crosshair size={14} />
          )}
          Use my current location
        </button>
        {geoStatus === 'error' && (
          <span className="text-[11px] text-airtel">Couldn't get GPS — tap the map instead.</span>
        )}
      </div>

      <div className="flex items-center gap-2 rounded-xl bg-sand/60 px-3.5 py-2.5 text-sm">
        <MapPin size={15} className={pos ? 'shrink-0 text-sunset' : 'shrink-0 text-night/40'} />
        <span className={pos ? 'text-night' : 'text-night/45'}>
          {pos ? label || coordsLabel(pos.lat, pos.lng) : 'Tap the map to drop a pin'}
        </span>
      </div>

      <button
        type="button"
        disabled={!pos}
        onClick={confirm}
        className="w-full rounded-full bg-sunset py-3 font-sora text-sm font-bold text-white transition-colors hover:bg-sunset-hover disabled:opacity-50"
      >
        Confirm location
      </button>
    </div>
  )

  const trigger = compact ? (
    <button
      type="button"
      title={triggerLabel}
      aria-label={triggerLabel}
      className="flex shrink-0 items-center justify-center rounded-full p-1.5 text-sunset transition-colors hover:bg-sunset/10"
    >
      <MapPin size={16} />
    </button>
  ) : (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-sunset/60 bg-sunset/5 px-4 py-3 text-sm font-semibold text-sunset transition-colors hover:bg-sunset/10"
    >
      <MapPin size={16} /> {triggerLabel}
    </button>
  )

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent className="bg-white text-night">
          <DrawerHeader className="text-left">
            <DrawerTitle>{title ?? 'Pick a location'}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6">{body}</div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-white text-night sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>{title ?? 'Pick a location'}</DialogTitle>
        </DialogHeader>
        {body}
      </DialogContent>
    </Dialog>
  )
}
