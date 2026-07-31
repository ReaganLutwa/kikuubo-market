import { A } from '@/lib/asset'
import {
  Cpu, Smartphone, Recycle, Refrigerator, ChefHat, Sofa, Shirt, Sparkles,
  HeartPulse, Wheat, House, Wrench, GraduationCap, Trophy, Baby, Gamepad2,
  PawPrint, ShoppingBasket, Bike, BookOpen,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type CategoryId =
  | 'electronics'
  | 'phones'
  | 'refurbished'
  | 'appliances'
  | 'home'
  | 'furniture'
  | 'mens-fashion'
  | 'womens-fashion'
  | 'beauty'
  | 'agriculture'
  | 'smart-home'
  | 'tools'
  | 'office'
  | 'sports'
  | 'baby'
  | 'toys'
  | 'pets'
  | 'grocery'
  | 'automotive'
  | 'books'

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
  category: CategoryId
  badge?: 'SALE' | 'FREE DELIVERY' | 'VERIFIED' | 'REFURBISHED'
  stockLeft?: number
  stockTotal?: number
}

export const formatUGX = (n: number): string => `UGX ${n.toLocaleString('en-US')}`

/* ---------------- Category tree (Temu-style, adapted to Uganda) ---------------- */

export interface CategoryNode {
  id: CategoryId
  name: string
  icon: LucideIcon
  image: string
  count: string
  subs: string[]
}

export const categoryTree: CategoryNode[] = [
  {
    id: 'electronics', name: 'Electronics', icon: Cpu, image: A('/cat-electronics.png'), count: '1,850+ items',
    subs: ['TVs & Decoders', 'Audio & Speakers', 'Laptops & Computers', 'Cameras', 'Gaming', 'Accessories'],
  },
  {
    id: 'phones', name: 'Phones & Accessories', icon: Smartphone, image: A('/cat-phones.png'), count: '2,300+ items',
    subs: ['Smartphones', 'Feature Phones', 'Tablets', 'Chargers & Cables', 'Cases & Covers', 'Smartwatches', 'Earbuds & Audio'],
  },
  {
    id: 'refurbished', name: 'Refurbished Laptops & Phones', icon: Recycle, image: A('/cat-refurb.png'), count: '420+ items',
    subs: ['Refurbished Laptops', 'Refurbished iPhones', 'Refurbished Android Phones', 'Grade A Certified', 'Warranty Deals'],
  },
  {
    id: 'appliances', name: 'Appliances', icon: Refrigerator, image: A('/cat-appliances.png'), count: '960+ items',
    subs: ['Fridges & Freezers', 'Cookers & Ovens', 'Microwaves', 'Blenders & Juicers', 'Washing Machines', 'Fans & Air Coolers'],
  },
  {
    id: 'home', name: 'Home & Kitchen', icon: ChefHat, image: A('/cat-home.png'), count: '1,420+ items',
    subs: ['Cookware', 'Kitchen Utensils', 'Bedding & Duvets', 'Décor', 'Storage & Organization', 'Dining'],
  },
  {
    id: 'furniture', name: 'Furniture', icon: Sofa, image: A('/product-sofa.png'), count: '780+ items',
    subs: ['Sofas & Couches', 'Beds & Mattresses', 'Tables & Desks', 'Chairs', 'Wardrobes', 'Outdoor Furniture'],
  },
  {
    id: 'mens-fashion', name: "Men's Fashion", icon: Shirt, image: A('/product-sneakers.png'), count: '1,650+ items',
    subs: ['Shirts & T-Shirts', 'Trousers & Jeans', 'Suits & Kitenge', 'Shoes & Sneakers', 'Watches', 'Bags & Wallets'],
  },
  {
    id: 'womens-fashion', name: "Women's Fashion", icon: Sparkles, image: A('/cat-fashion.png'), count: '2,140+ items',
    subs: ['Dresses & Gomesi', 'Ankara & Kitenge', 'Shoes & Heels', 'Handbags', 'Jewellery', 'Lingerie & Sleepwear'],
  },
  {
    id: 'beauty', name: 'Beauty & Health', icon: HeartPulse, image: A('/cat-fashion.png'), count: '1,120+ items',
    subs: ['Skincare', 'Hair Care & Weaves', 'Makeup', 'Fragrances', 'Vitamins & Supplements', 'Personal Care'],
  },
  {
    id: 'agriculture', name: 'Agriculture & Farm Produce', icon: Wheat, image: A('/cat-agriculture.png'), count: '940+ items',
    subs: ['Fresh Produce', 'Grains & Beans', 'Bananas & Matooke', 'Vegetables & Fruits', 'Poultry & Livestock', 'Animal Feeds', 'Farm Inputs & Seeds'],
  },
  {
    id: 'smart-home', name: 'Smart Home & Solar', icon: House, image: A('/product-solar.png'), count: '360+ items',
    subs: ['Solar Panels & Kits', 'Inverters & Batteries', 'Smart Lighting', 'Security Cameras', 'Smart Speakers', 'Smart Plugs'],
  },
  {
    id: 'tools', name: 'Tools & Home Improvement', icon: Wrench, image: A('/cat-home.png'), count: '870+ items',
    subs: ['Power Tools', 'Hand Tools', 'Plumbing', 'Electrical Supplies', 'Paint & Hardware', 'Safety Gear'],
  },
  {
    id: 'office', name: 'Office & School Supplies', icon: GraduationCap, image: A('/cat-electronics.png'), count: '690+ items',
    subs: ['Stationery', 'Textbooks & Revision', 'Printers & Ink', 'Office Furniture', 'Backpacks & School Bags', 'Calculators'],
  },
  {
    id: 'sports', name: 'Sports & Outdoors', icon: Trophy, image: A('/product-sneakers.png'), count: '540+ items',
    subs: ['Gym & Fitness', 'Football & Sports Gear', 'Camping & Hiking', 'Bicycles', 'Sportswear', 'Fishing'],
  },
  {
    id: 'baby', name: 'Baby & Maternity', icon: Baby, image: A('/cat-fashion.png'), count: '610+ items',
    subs: ['Diapers & Wipes', 'Baby Food & Formula', 'Baby Clothing', 'Strollers & Car Seats', 'Maternity Wear', 'Feeding & Nursing'],
  },
  {
    id: 'toys', name: 'Toys & Games', icon: Gamepad2, image: A('/cat-electronics.png'), count: '480+ items',
    subs: ['Educational Toys', 'Board Games', 'Remote Control & Drones', 'Dolls & Figures', 'Outdoor Play', 'Video Games'],
  },
  {
    id: 'pets', name: 'Pet Supplies', icon: PawPrint, image: A('/product-chicks.png'), count: '290+ items',
    subs: ['Dog Food & Care', 'Cat Supplies', 'Poultry Keeping', 'Pet Accessories', 'Aquariums', 'Vet Supplies'],
  },
  {
    id: 'grocery', name: 'Food & Grocery', icon: ShoppingBasket, image: A('/product-beans.png'), count: '1,300+ items',
    subs: ['Cooking Oil & Staples', 'Beverages', 'Snacks', 'Breakfast & Cereals', 'Spices & Sauces', 'Household Essentials'],
  },
  {
    id: 'automotive', name: 'Automotive & Boda', icon: Bike, image: A('/cat-electronics.png'), count: '450+ items',
    subs: ['Boda Parts & Accessories', 'Helmets & Riding Gear', 'Car Parts', 'Oils & Lubricants', 'Tyres & Tubes', 'Car Electronics'],
  },
  {
    id: 'books', name: 'Books & Media', icon: BookOpen, image: A('/cat-electronics.png'), count: '380+ items',
    subs: ['Novels & Fiction', 'Ugandan Authors', 'Children Books', 'Religious Books', 'Movies & Music', 'Self-Help & Business'],
  },
]

/** Flat search index: "Category → Subcategory" for the seller combobox. */
export const categorySearchIndex: { value: string; label: string }[] = categoryTree.flatMap((c) => [
  { value: c.name, label: c.name },
  ...c.subs.map((s) => ({ value: `${c.name} → ${s}`, label: `${c.name} → ${s}` })),
])

/* ---------------- Products ---------------- */

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
    category: 'womens-fashion',
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
    category: 'mens-fashion',
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
    category: 'appliances',
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
  // --- Refurbished (Kampala Renewed Tech) ---
  {
    id: 'refurb-hp-elitebook-840-g5',
    name: 'HP EliteBook 840 G5 (Refurbished, 16GB/512GB SSD) — Grade A',
    image: A('/product-refurb-laptop.png'),
    price: 1150000,
    oldPrice: 1650000,
    rating: 4.7,
    reviews: 189,
    vendor: 'Kampala Renewed Tech',
    verified: true,
    category: 'refurbished',
    badge: 'REFURBISHED',
    stockLeft: 6,
    stockTotal: 20,
  },
  {
    id: 'refurb-iphone-11-128',
    name: 'iPhone 11 (Refurbished, 128GB) — Grade A, 6-Month Warranty',
    image: A('/product-refurb-phone.png'),
    price: 850000,
    oldPrice: 1150000,
    rating: 4.6,
    reviews: 247,
    vendor: 'Kampala Renewed Tech',
    verified: true,
    category: 'refurbished',
    badge: 'REFURBISHED',
    stockLeft: 9,
    stockTotal: 30,
  },
  {
    id: 'refurb-dell-latitude-7490',
    name: 'Dell Latitude 7490 (Refurbished, Core i5, 8GB/256GB SSD)',
    image: A('/product-refurb-laptop.png'),
    price: 980000,
    oldPrice: 1400000,
    rating: 4.5,
    reviews: 132,
    vendor: 'Kampala Renewed Tech',
    verified: true,
    category: 'refurbished',
    badge: 'REFURBISHED',
  },
  {
    id: 'refurb-samsung-s20-fe',
    name: 'Samsung Galaxy S20 FE (Refurbished, 128GB) — 6-Month Warranty',
    image: A('/product-refurb-phone.png'),
    price: 620000,
    oldPrice: 890000,
    rating: 4.4,
    reviews: 176,
    vendor: 'Kampala Renewed Tech',
    verified: true,
    category: 'refurbished',
    badge: 'REFURBISHED',
  },
  // --- Appliances ---
  {
    id: 'hisense-double-door-fridge',
    name: 'Hisense 320L Double-Door Refrigerator, Silver Frost-Free',
    image: A('/product-fridge.png'),
    price: 1750000,
    oldPrice: 2100000,
    rating: 4.6,
    reviews: 158,
    vendor: 'Kampala Electronics Hub',
    verified: true,
    category: 'appliances',
    badge: 'SALE',
    stockLeft: 4,
    stockTotal: 15,
  },
  {
    id: 'global-star-cooker',
    name: 'GlobalStar 4-Burner Gas Cooker with Oven, Stainless Steel 60cm',
    image: A('/product-cooker.png'),
    price: 780000,
    oldPrice: 950000,
    rating: 4.5,
    reviews: 211,
    vendor: 'Nsambya Home Style',
    verified: true,
    category: 'appliances',
    badge: 'FREE DELIVERY',
  },
  {
    id: 'samsung-microwave-23l',
    name: 'Samsung 23L Solo Microwave Oven, Black Mirror Finish',
    image: A('/product-microwave.png'),
    price: 420000,
    oldPrice: 540000,
    rating: 4.4,
    reviews: 143,
    vendor: 'Kampala Electronics Hub',
    verified: true,
    category: 'appliances',
    badge: 'SALE',
  },
  // --- Furniture ---
  {
    id: 'terracotta-3-seater-sofa',
    name: '3-Seater Fabric Sofa, Terracotta — Handcrafted in Nsambya',
    image: A('/product-sofa.png'),
    price: 1250000,
    oldPrice: 1600000,
    rating: 4.7,
    reviews: 96,
    vendor: 'Mbarara Furniture Mart',
    verified: true,
    category: 'furniture',
    badge: 'SALE',
  },
  {
    id: 'rosefoam-ortho-mattress',
    name: 'Rosefoam Orthopedic Mattress 6x6, Extra Firm — 10yr Warranty',
    image: A('/product-mattress.png'),
    price: 680000,
    oldPrice: 820000,
    rating: 4.8,
    reviews: 274,
    vendor: 'Mbarara Furniture Mart',
    category: 'furniture',
    badge: 'FREE DELIVERY',
  },
  // --- Smart Home / Solar ---
  {
    id: 'sunpro-solar-kit-200w',
    name: 'SunPro 200W Solar Home Kit — Panel, Battery, 4 LED Bulbs & Radio',
    image: A('/product-solar.png'),
    price: 450000,
    oldPrice: 580000,
    rating: 4.6,
    reviews: 328,
    vendor: 'Gulu Gadgets',
    verified: true,
    category: 'smart-home',
    badge: 'SALE',
  },
  // --- Agriculture / Poultry ---
  {
    id: 'day-old-chicks-kuroiler',
    name: 'Kuroiler Day-Old Chicks (Box of 100) — Vaccinated, Brooder Ready',
    image: A('/product-chicks.png'),
    price: 290000,
    oldPrice: 350000,
    rating: 4.8,
    reviews: 412,
    vendor: 'Masaka Harvest Co-op',
    verified: true,
    category: 'agriculture',
    badge: 'VERIFIED',
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

export const refurbDeals: Product[] = products.filter((p) => p.category === 'refurbished')

export interface Category {
  id: CategoryId
  label: string
  image: string
  count: string
}

export const categories: Category[] = categoryTree.map((c) => ({
  id: c.id,
  label: c.name,
  image: c.image,
  count: c.count,
}))
