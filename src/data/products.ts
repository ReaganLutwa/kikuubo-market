import { A } from '@/lib/asset'
export interface Product {
  id: string
  name: string
  image: string
  price: number // UGX
  oldPrice?: number // UGX
  rating: number
  reviews: number
  vendor: string
  verified?: boolean
  category: 'phones' | 'electronics' | 'fashion' | 'agriculture' | 'home'
  badge?: 'SALE' | 'FREE DELIVERY' | 'VERIFIED'
  stockLeft?: number
  stockTotal?: number
}

export const formatUGX = (n: number): string => `UGX ${n.toLocaleString('en-US')}`

export const products: Product[] = [
  {
    id: 'tecno-spark-20',
    name: 'Tecno Spark 20 Pro, 8GB RAM + 256GB, 108MP Camera',
    image: A('/product-phone-1.png'),
    price: 429000,
    oldPrice: 649000,
    rating: 4.6,
    reviews: 812,
    vendor: 'Kampala Electronics Hub',
    verified: true,
    category: 'phones',
    badge: 'SALE',
    stockLeft: 7,
    stockTotal: 40,
  },
  {
    id: 'samsung-a15',
    name: 'Samsung Galaxy A15, 6GB + 128GB Dual SIM',
    image: A('/product-phone-1.png'),
    price: 565000,
    oldPrice: 720000,
    rating: 4.7,
    reviews: 534,
    vendor: 'Owino Traders',
    verified: true,
    category: 'phones',
    stockLeft: 12,
    stockTotal: 30,
  },
  {
    id: 'hisense-43-tv',
    name: 'Hisense 43" Smart Full HD TV with Free-to-Air Decoder',
    image: A('/product-tv.png'),
    price: 850000,
    oldPrice: 1150000,
    rating: 4.5,
    reviews: 296,
    vendor: 'Kampala Electronics Hub',
    verified: true,
    category: 'electronics',
    badge: 'SALE',
    stockLeft: 5,
    stockTotal: 25,
  },
  {
    id: 'wireless-headphones',
    name: 'BassPro Wireless Over-Ear Headphones, 40h Battery',
    image: A('/product-headphones.png'),
    price: 145000,
    oldPrice: 220000,
    rating: 4.4,
    reviews: 421,
    vendor: 'Owino Traders',
    category: 'electronics',
    badge: 'FREE DELIVERY',
    stockLeft: 18,
    stockTotal: 50,
  },
  {
    id: 'ankara-dress',
    name: 'Elegant Ankara Print Dress, Bold Orange & Teal (S–XL)',
    image: A('/product-dress.png'),
    price: 95000,
    oldPrice: 140000,
    rating: 4.8,
    reviews: 203,
    vendor: 'Nsambya Home Style',
    verified: true,
    category: 'fashion',
    stockLeft: 9,
    stockTotal: 35,
  },
  {
    id: 'running-sneakers',
    name: 'StrideFlex Running Sneakers, White/Orange (Unisex)',
    image: A('/product-sneakers.png'),
    price: 120000,
    oldPrice: 185000,
    rating: 4.5,
    reviews: 167,
    vendor: 'Owino Traders',
    category: 'fashion',
    badge: 'SALE',
    stockLeft: 14,
    stockTotal: 45,
  },
  {
    id: 'kitchen-blender',
    name: 'VitaMix-style 2L Kitchen Blender, Stainless Steel, 500W',
    image: A('/product-blender.png'),
    price: 165000,
    oldPrice: 240000,
    rating: 4.3,
    reviews: 348,
    vendor: 'Nsambya Home Style',
    verified: true,
    category: 'home',
    stockLeft: 11,
    stockTotal: 28,
  },
  {
    id: 'matooke-bunch',
    name: 'Fresh Green Matooke Bunch — Direct from Mityana Farms',
    image: A('/product-matooke.png'),
    price: 18000,
    rating: 4.9,
    reviews: 954,
    vendor: 'Mityana Fresh Farms',
    verified: true,
    category: 'agriculture',
    badge: 'VERIFIED',
    stockLeft: 30,
    stockTotal: 60,
  },
  {
    id: 'dry-beans-5kg',
    name: 'Mixed Dry Beans, 5kg Burlap Sack — Masaka Harvest',
    image: A('/product-beans.png'),
    price: 32000,
    oldPrice: 40000,
    rating: 4.7,
    reviews: 611,
    vendor: 'Mityana Fresh Farms',
    verified: true,
    category: 'agriculture',
    stockLeft: 22,
    stockTotal: 50,
  },
  {
    id: 'flash-phone-x',
    name: 'Xiaomi Redmi Note 13, 8GB + 256GB, 120Hz AMOLED',
    image: A('/product-phone-1.png'),
    price: 899000,
    oldPrice: 1360000,
    rating: 4.6,
    reviews: 445,
    vendor: 'Kampala Electronics Hub',
    verified: true,
    category: 'phones',
    badge: 'SALE',
    stockLeft: 4,
    stockTotal: 32,
  },
]

export const flashSaleProducts: Product[] = products.filter((p) => p.stockLeft != null).slice(0, 8)

export const topDeals: Product[] = [
  products[0],
  products[2],
  products[4],
  products[7],
  products[3],
  products[5],
  products[6],
  products[8],
]

export interface Category {
  id: Product['category']
  label: string
  image: string
  count: string
}

export const categories: Category[] = [
  { id: 'phones', label: 'Phones', image: A('/cat-phones.png'), count: '2,300+ items' },
  { id: 'electronics', label: 'Electronics', image: A('/cat-electronics.png'), count: '1,850+ items' },
  { id: 'fashion', label: 'Fashion', image: A('/cat-fashion.png'), count: '3,100+ items' },
  { id: 'agriculture', label: 'Agriculture & Farm Produce', image: A('/cat-agriculture.png'), count: '940+ items' },
  { id: 'home', label: 'Home & Living', image: A('/cat-home.png'), count: '1,420+ items' },
]
