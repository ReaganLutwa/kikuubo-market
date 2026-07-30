export interface DeliveryOption {
  id: 'boda' | 'standard' | 'pickup'
  label: string
  eta: string
  price: number
  note: string
}

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: 'boda',
    label: 'Boda Express',
    eta: 'today, 4–6pm',
    price: 5000,
    note: 'Same-day delivery across Kampala',
  },
  {
    id: 'standard',
    label: 'Standard Delivery',
    eta: 'in 2–3 days',
    price: 3000,
    note: 'Reliable courier, tracked',
  },
  {
    id: 'pickup',
    label: 'Pickup Station',
    eta: 'from tomorrow',
    price: 0,
    note: '12 stations near you',
  },
]

export const REGIONS = [
  'Kampala — Central',
  'Kampala — Nakawa',
  'Kampala — Makindye',
  'Kampala — Rubaga',
  'Kampala — Kawempe',
  'Wakiso',
  'Jinja',
  'Mbarara',
  'Gulu',
  'Mbale',
  'Entebbe',
]
