import type { Product } from '@/data/products'
import { products } from '@/data/products'
import { A } from '@/lib/asset'

export interface ShopItem extends Product {
  brand: string
  location: string
  sub: string
  freeDelivery: boolean
  createdAt: number
}

export interface CategoryConfig {
  id: Product['category']
  label: string
  bannerClass: string
  chipClass: string
  image: string
  count: string
  from: string
  freeNote: string
  subs: string[]
  brands: string[]
  namePool: { name: string; brand: string; price: number; old?: number }[]
}

const vendors: Record<string, { name: string; location: string; verified: boolean }[]> = {
  phones: [
    { name: 'Kampala Electronics Hub', location: 'Kampala', verified: true },
    { name: 'Owino Traders', location: 'Kampala', verified: true },
    { name: 'Jinja Mobile Point', location: 'Jinja', verified: false },
    { name: 'Gulu Gadgets', location: 'Gulu', verified: false },
  ],
  electronics: [
    { name: 'Kampala Electronics Hub', location: 'Kampala', verified: true },
    { name: 'Owino Traders', location: 'Kampala', verified: true },
    { name: 'Mbarara Sound & Vision', location: 'Mbarara', verified: false },
  ],
  fashion: [
    { name: 'Nsambya Home Style', location: 'Kampala', verified: true },
    { name: 'Owino Traders', location: 'Kampala', verified: true },
    { name: 'Kitenge Queens Jinja', location: 'Jinja', verified: false },
    { name: 'Gulu Garment House', location: 'Gulu', verified: false },
  ],
  agriculture: [
    { name: 'Mityana Fresh Farms', location: 'Mbarara', verified: true },
    { name: 'Masaka Harvest Co-op', location: 'Kampala', verified: true },
    { name: 'Gulu Grains', location: 'Gulu', verified: false },
  ],
  home: [
    { name: 'Nsambya Home Style', location: 'Kampala', verified: true },
    { name: 'Mbarara Furniture Mart', location: 'Mbarara', verified: false },
    { name: 'Owino Traders', location: 'Kampala', verified: true },
  ],
}

export const categoryConfigs: Record<Product['category'], CategoryConfig> = {
  phones: {
    id: 'phones',
    label: 'Phones & Tablets',
    bannerClass: 'from-sunset via-sunset-hover to-sunset-deep',
    chipClass: 'bg-white/15 text-white',
    image: A('/cat-phones.png'),
    count: '2,347',
    from: 'UGX 120,000',
    freeNote: 'Free delivery on 500+',
    subs: ['Smartphones', 'Feature Phones', 'Tablets', 'Accessories', 'Smartwatches', 'Refurbished'],
    brands: ['Samsung', 'Tecno', 'Infinix', 'iPhone', 'Xiaomi'],
    namePool: [
      { name: 'Tecno Spark 20 Pro, 8GB + 256GB, 108MP', brand: 'Tecno', price: 429000, old: 649000 },
      { name: 'Samsung Galaxy A15, 6GB + 128GB Dual SIM', brand: 'Samsung', price: 565000, old: 720000 },
      { name: 'iPhone 13, 128GB — Certified Refurbished', brand: 'iPhone', price: 2450000, old: 2800000 },
      { name: 'Infinix Hot 40i, 8GB + 128GB, 90Hz', brand: 'Infinix', price: 515000 },
      { name: 'Xiaomi Redmi Note 13, 8GB + 256GB AMOLED', brand: 'Xiaomi', price: 780000, old: 899000 },
      { name: 'Samsung Galaxy S23 FE, 256GB', brand: 'Samsung', price: 2350000 },
      { name: 'Tecno Camon 30, 12GB + 256GB', brand: 'Tecno', price: 899000, old: 1050000 },
      { name: 'Infinix Note 40 Pro, 108MP OIS', brand: 'Infinix', price: 1050000, old: 1250000 },
      { name: 'iPhone 11, 64GB — Grade A Refurbished', brand: 'iPhone', price: 1450000 },
      { name: 'Xiaomi Redmi 13C, 128GB Budget King', brand: 'Xiaomi', price: 385000, old: 450000 },
      { name: 'Tecno Pop 8 Feature-Smart Hybrid', brand: 'Tecno', price: 235000 },
      { name: 'Samsung Galaxy Tab A9, 64GB WiFi', brand: 'Samsung', price: 690000, old: 820000 },
    ],
  },
  electronics: {
    id: 'electronics',
    label: 'Electronics',
    bannerClass: 'from-night via-cocoa to-night',
    chipClass: 'bg-white/15 text-white',
    image: A('/cat-electronics.png'),
    count: '1,852',
    from: 'UGX 45,000',
    freeNote: 'Free delivery on 300+',
    subs: ['TVs', 'Audio', 'Laptops', 'Accessories', 'Gaming', 'Cameras'],
    brands: ['Hisense', 'Samsung', 'LG', 'Sony', 'BassPro'],
    namePool: [
      { name: 'Hisense 43" Smart Full HD TV + Decoder', brand: 'Hisense', price: 850000, old: 1150000 },
      { name: 'BassPro Wireless Over-Ear Headphones, 40h', brand: 'BassPro', price: 145000, old: 220000 },
      { name: 'Samsung 32" HD LED TV', brand: 'Samsung', price: 620000 },
      { name: 'LG 55" 4K UHD Smart TV', brand: 'LG', price: 1950000, old: 2400000 },
      { name: 'Sony Party Bluetooth Speaker, 120W', brand: 'Sony', price: 480000, old: 610000 },
      { name: 'Hisense 32" Digital TV', brand: 'Hisense', price: 495000 },
      { name: 'BassPro True Wireless Earbuds, ANC', brand: 'BassPro', price: 95000, old: 140000 },
      { name: 'Samsung Soundbar 2.1ch with Subwoofer', brand: 'Samsung', price: 720000 },
    ],
  },
  fashion: {
    id: 'fashion',
    label: 'Fashion',
    bannerClass: 'from-[#9D174D] via-[#BE185D] to-[#831843]',
    chipClass: 'bg-white/15 text-white',
    image: A('/cat-fashion.png'),
    count: '3,105',
    from: 'UGX 25,000',
    freeNote: 'Free delivery on 800+',
    subs: ['Dresses', "Men's Wear", 'Shoes', 'Kitenge & Ankara', 'Bags', 'Kids'],
    brands: ['Kitenge House', 'StrideFlex', 'Ankara Studio', 'Kampala Threads'],
    namePool: [
      { name: 'Elegant Ankara Print Dress, Orange & Teal (S–XL)', brand: 'Ankara Studio', price: 95000, old: 140000 },
      { name: 'StrideFlex Running Sneakers, White/Orange', brand: 'StrideFlex', price: 120000, old: 185000 },
      { name: "Men's Kitenge Slim-Fit Shirt", brand: 'Kitenge House', price: 65000 },
      { name: 'Ankara Two-Piece Suit, Bold Print', brand: 'Ankara Studio', price: 185000, old: 250000 },
      { name: 'Ladies Canvas Tote Bag, Handmade', brand: 'Kampala Threads', price: 45000 },
      { name: 'StrideFlex Court Sneakers, All-White', brand: 'StrideFlex', price: 135000 },
      { name: 'Gomesi Traditional Dress, Premium Silk', brand: 'Kitenge House', price: 210000, old: 280000 },
      { name: "Men's Leather Sandals, Handmade in Jinja", brand: 'Kampala Threads', price: 55000 },
    ],
  },
  agriculture: {
    id: 'agriculture',
    label: 'Agriculture & Farm Produce',
    bannerClass: 'from-leaf via-[#15803D] to-[#14532D]',
    chipClass: 'bg-white/15 text-white',
    image: A('/cat-agriculture.png'),
    count: '943',
    from: 'UGX 5,000',
    freeNote: 'Farm-fresh daily delivery',
    subs: ['Fresh Produce', 'Grains & Beans', 'Bananas', 'Vegetables', 'Fruits', 'Animal Feeds'],
    brands: ['Mityana Fresh', 'Masaka Co-op', 'Gulu Grains'],
    namePool: [
      { name: 'Fresh Green Matooke Bunch — Mityana Farms', brand: 'Mityana Fresh', price: 18000 },
      { name: 'Mixed Dry Beans, 5kg Burlap Sack', brand: 'Masaka Co-op', price: 32000, old: 40000 },
      { name: 'Sweet Yellow Bananas (Sukali Ndizi), Bunch', brand: 'Mityana Fresh', price: 12000 },
      { name: 'Fresh Avocados, Pack of 6 — Large', brand: 'Masaka Co-op', price: 9000 },
      { name: 'Maize Flour (Posho), 10kg Bag', brand: 'Gulu Grains', price: 38000, old: 45000 },
      { name: 'Red Kidney Beans, 3kg Sack', brand: 'Gulu Grains', price: 21000 },
      { name: 'Fresh Tomatoes Crate, 10kg', brand: 'Mityana Fresh', price: 25000 },
      { name: 'Irish Potatoes, 20kg Sack — Kabale', brand: 'Masaka Co-op', price: 65000, old: 80000 },
    ],
  },
  home: {
    id: 'home',
    label: 'Home & Living',
    bannerClass: 'from-cocoa via-[#5A3D2B] to-night',
    chipClass: 'bg-white/15 text-white',
    image: A('/cat-home.png'),
    count: '1,418',
    from: 'UGX 30,000',
    freeNote: 'Free delivery on 200+',
    subs: ['Kitchen', 'Furniture', 'Décor', 'Bedding', 'Appliances', 'Storage'],
    brands: ['Nsambya Living', 'VitaHome', 'Kampala Crafts'],
    namePool: [
      { name: '2L Kitchen Blender, Stainless Steel, 500W', brand: 'VitaHome', price: 165000, old: 240000 },
      { name: 'Handwoven Ugandan Basket Set (3 pcs)', brand: 'Kampala Crafts', price: 85000 },
      { name: '3-Seater Fabric Sofa, Terracotta', brand: 'Nsambya Living', price: 1250000, old: 1600000 },
      { name: 'Electric Kettle 1.8L, Auto Shut-Off', brand: 'VitaHome', price: 75000, old: 98000 },
      { name: 'Cotton Duvet Set, Queen — Kitenge Trim', brand: 'Nsambya Living', price: 145000 },
      { name: 'Wooden Coffee Table, Mvule Hardwood', brand: 'Kampala Crafts', price: 380000 },
      { name: 'Non-Stick Cookware Set, 10 pcs', brand: 'VitaHome', price: 265000, old: 340000 },
      { name: 'Woven Floor Lamp, Natural Rattan', brand: 'Kampala Crafts', price: 120000 },
    ],
  },
}

const images: Record<Product['category'], string[]> = {
  phones: [A('/product-phone-1.png')],
  electronics: [A('/product-tv.png'), A('/product-headphones.png')],
  fashion: [A('/product-dress.png'), A('/product-sneakers.png')],
  agriculture: [A('/product-matooke.png'), A('/product-beans.png')],
  home: [A('/product-blender.png'), A('/product-sneakers.png')],
}

/** Build 24 items for a category: base data products + pool variants. */
export function buildCatalog(catId: Product['category']): ShopItem[] {
  const cfg = categoryConfigs[catId]
  const vends = vendors[catId]
  const base = products.filter((p) => p.category === catId)
  const items: ShopItem[] = []
  const push = (
    key: string,
    name: string,
    brand: string,
    price: number,
    old: number | undefined,
    i: number,
  ) => {
    const v = vends[i % vends.length]
    items.push({
      id: `${key}-${items.length}`,
      name,
      image: images[catId][i % images[catId].length],
      price,
      oldPrice: old,
      rating: Math.round((4.1 + ((i * 7) % 9) / 10) * 10) / 10,
      reviews: 40 + ((i * 137) % 900),
      vendor: v.name,
      verified: v.verified,
      category: catId,
      badge: old ? 'SALE' : i % 3 === 0 ? 'FREE DELIVERY' : undefined,
      brand,
      location: v.location,
      sub: cfg.subs[i % cfg.subs.length],
      freeDelivery: i % 3 === 0,
      createdAt: i,
    })
  }
  base.forEach((p, i) => {
    const pool = cfg.namePool.find((n) => p.price === n.price)
    push(p.id, p.name, pool?.brand ?? cfg.brands[i % cfg.brands.length], p.price, p.oldPrice, i)
  })
  const pool = cfg.namePool
  for (let i = items.length; i < 24; i++) {
    const n = pool[i % pool.length]
    const jitter = ((i * 13) % 5) * 5000
    push(n.brand.toLowerCase() + '-' + i, n.name, n.brand, n.price + jitter, n.old ? n.old + jitter : undefined, i)
  }
  return items
}

export const locations = ['Kampala', 'Jinja', 'Mbarara', 'Gulu']

export function getProductById(id: string | null): Product {
  return products.find((p) => p.id === id) ?? products[0]
}
