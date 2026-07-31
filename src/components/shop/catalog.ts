import type { Product, CategoryId } from '@/data/products'
import { products, categoryTree } from '@/data/products'
import { A } from '@/lib/asset'

export interface ShopItem extends Product {
  brand: string
  location: string
  sub: string
  freeDelivery: boolean
  createdAt: number
}

export interface CategoryConfig {
  id: CategoryId
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

type Vendor = { name: string; location: string; verified: boolean }

const defaultVendors: Vendor[] = [
  { name: 'Owino Traders', location: 'Kampala', verified: true },
  { name: 'Jinja Mobile Point', location: 'Jinja', verified: false },
  { name: 'Mbarara Traders', location: 'Mbarara', verified: false },
  { name: 'Gulu Gadgets', location: 'Gulu', verified: false },
]

const vendors: Record<string, Vendor[]> = {
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
  refurbished: [
    { name: 'Kampala Renewed Tech', location: 'Kampala', verified: true },
    { name: 'Owino Traders', location: 'Kampala', verified: true },
    { name: 'Jinja Mobile Point', location: 'Jinja', verified: false },
  ],
  appliances: [
    { name: 'Kampala Electronics Hub', location: 'Kampala', verified: true },
    { name: 'Nsambya Home Style', location: 'Kampala', verified: true },
    { name: 'Mbarara Sound & Vision', location: 'Mbarara', verified: false },
  ],
  'mens-fashion': [
    { name: 'Owino Traders', location: 'Kampala', verified: true },
    { name: 'Kitenge Queens Jinja', location: 'Jinja', verified: false },
    { name: 'Gulu Garment House', location: 'Gulu', verified: false },
  ],
  'womens-fashion': [
    { name: 'Nsambya Home Style', location: 'Kampala', verified: true },
    { name: 'Owino Traders', location: 'Kampala', verified: true },
    { name: 'Kitenge Queens Jinja', location: 'Jinja', verified: false },
    { name: 'Gulu Garment House', location: 'Gulu', verified: false },
  ],
  beauty: [
    { name: 'Nsambya Home Style', location: 'Kampala', verified: true },
    { name: 'Kitenge Queens Jinja', location: 'Jinja', verified: false },
  ],
  agriculture: [
    { name: 'Mityana Fresh Farms', location: 'Mbarara', verified: true },
    { name: 'Masaka Harvest Co-op', location: 'Kampala', verified: true },
    { name: 'Gulu Grains', location: 'Gulu', verified: false },
  ],
  'smart-home': [
    { name: 'Gulu Gadgets', location: 'Gulu', verified: true },
    { name: 'Kampala Electronics Hub', location: 'Kampala', verified: true },
  ],
  furniture: [
    { name: 'Nsambya Home Style', location: 'Kampala', verified: true },
    { name: 'Mbarara Furniture Mart', location: 'Mbarara', verified: false },
    { name: 'Kampala Crafts', location: 'Kampala', verified: true },
  ],
  home: [
    { name: 'Nsambya Home Style', location: 'Kampala', verified: true },
    { name: 'Mbarara Furniture Mart', location: 'Mbarara', verified: false },
    { name: 'Owino Traders', location: 'Kampala', verified: true },
  ],
  grocery: [
    { name: 'Masaka Harvest Co-op', location: 'Kampala', verified: true },
    { name: 'Mityana Fresh Farms', location: 'Mbarara', verified: true },
    { name: 'Owino Traders', location: 'Kampala', verified: true },
  ],
  automotive: [
    { name: 'Owino Traders', location: 'Kampala', verified: true },
    { name: 'Jinja Mobile Point', location: 'Jinja', verified: false },
  ],
}

interface PoolEntry { name: string; brand: string; price: number; old?: number }

const pools: Record<CategoryId, PoolEntry[]> = {
  phones: [
    { name: 'Tecno Spark 20 Pro, 8GB + 256GB, 108MP', brand: 'Tecno', price: 429000, old: 649000 },
    { name: 'Samsung Galaxy A15, 6GB + 128GB Dual SIM', brand: 'Samsung', price: 565000, old: 720000 },
    { name: 'Infinix Hot 40i, 8GB + 128GB, 90Hz', brand: 'Infinix', price: 515000 },
    { name: 'Xiaomi Redmi Note 13, 8GB + 256GB AMOLED', brand: 'Xiaomi', price: 780000, old: 899000 },
    { name: 'Samsung Galaxy S23 FE, 256GB', brand: 'Samsung', price: 2350000 },
    { name: 'Tecno Camon 30, 12GB + 256GB', brand: 'Tecno', price: 899000, old: 1050000 },
    { name: 'Oraimo FreePods 4, ANC, 35h Playtime', brand: 'Oraimo', price: 95000, old: 135000 },
    { name: 'Samsung Galaxy Tab A9, 64GB WiFi', brand: 'Samsung', price: 690000, old: 820000 },
  ],
  electronics: [
    { name: 'Hisense 43" Smart Full HD TV + Decoder', brand: 'Hisense', price: 850000, old: 1150000 },
    { name: 'BassPro Wireless Over-Ear Headphones, 40h', brand: 'BassPro', price: 145000, old: 220000 },
    { name: 'Samsung 32" HD LED TV', brand: 'Samsung', price: 620000 },
    { name: 'LG 55" 4K UHD Smart TV', brand: 'LG', price: 1950000, old: 2400000 },
    { name: 'Sony Party Bluetooth Speaker, 120W', brand: 'Sony', price: 480000, old: 610000 },
    { name: 'BassPro True Wireless Earbuds, ANC', brand: 'BassPro', price: 95000, old: 140000 },
    { name: 'Samsung Soundbar 2.1ch with Subwoofer', brand: 'Samsung', price: 720000 },
    { name: 'Canon EOS 2000D DSLR Camera Kit', brand: 'Canon', price: 1850000, old: 2100000 },
  ],
  refurbished: [
    { name: 'HP EliteBook 840 G5, 16GB/512GB SSD — Grade A', brand: 'HP', price: 1150000, old: 1650000 },
    { name: 'iPhone 11, 128GB — Grade A, 6-Month Warranty', brand: 'iPhone', price: 850000, old: 1150000 },
    { name: 'Dell Latitude 7490, Core i5, 8GB/256GB', brand: 'Dell', price: 980000, old: 1400000 },
    { name: 'Samsung Galaxy S20 FE, 128GB — Renewed', brand: 'Samsung', price: 620000, old: 890000 },
    { name: 'Lenovo ThinkPad T480, 16GB/512GB — Grade A', brand: 'Lenovo', price: 1250000, old: 1750000 },
    { name: 'iPhone 12, 128GB — Grade A, 6-Month Warranty', brand: 'iPhone', price: 1250000, old: 1650000 },
    { name: 'HP ProBook 450 G7, Core i7, 16GB/512GB', brand: 'HP', price: 1650000 },
    { name: 'MacBook Air 2019, 8GB/256GB — Renewed', brand: 'Apple', price: 2150000, old: 2600000 },
  ],
  appliances: [
    { name: 'Hisense 320L Double-Door Fridge, Silver Frost-Free', brand: 'Hisense', price: 1750000, old: 2100000 },
    { name: 'GlobalStar 4-Burner Gas Cooker with Oven, 60cm', brand: 'GlobalStar', price: 780000, old: 950000 },
    { name: 'Samsung 23L Solo Microwave Oven, Black Mirror', brand: 'Samsung', price: 420000, old: 540000 },
    { name: '2L Kitchen Blender, Stainless Steel, 500W', brand: 'VitaHome', price: 165000, old: 240000 },
    { name: 'LG 8kg Front-Load Washing Machine', brand: 'LG', price: 1950000, old: 2350000 },
    { name: 'Boss 50L Table-Top Fridge, Silver', brand: 'Boss', price: 620000 },
    { name: 'Saachi 3L Air Fryer, Digital Touch', brand: 'Saachi', price: 310000, old: 420000 },
    { name: 'Mika Standing Fan 18", Remote Control', brand: 'Mika', price: 145000, old: 185000 },
  ],
  home: [
    { name: 'Non-Stick Cookware Set, 10 pcs', brand: 'VitaHome', price: 265000, old: 340000 },
    { name: 'Handwoven Ugandan Basket Set (3 pcs)', brand: 'Kampala Crafts', price: 85000 },
    { name: 'Cotton Duvet Set, Queen — Kitenge Trim', brand: 'Nsambya Living', price: 145000 },
    { name: 'Electric Kettle 1.8L, Auto Shut-Off', brand: 'VitaHome', price: 75000, old: 98000 },
    { name: 'Wooden Coffee Table, Mvule Hardwood', brand: 'Kampala Crafts', price: 380000 },
    { name: 'Woven Floor Lamp, Natural Rattan', brand: 'Kampala Crafts', price: 120000 },
    { name: 'Dinner Set 24-Piece, White Porcelain', brand: 'VitaHome', price: 185000, old: 230000 },
    { name: 'Plastic Drawer Cabinet, 4-Tier', brand: 'Nsambya Living', price: 95000 },
  ],
  furniture: [
    { name: '3-Seater Fabric Sofa, Terracotta', brand: 'Nsambya Living', price: 1250000, old: 1600000 },
    { name: 'Rosefoam Orthopedic Mattress 6x6, Extra Firm', brand: 'Rosefoam', price: 680000, old: 820000 },
    { name: 'Mvule Hardwood Dining Table + 6 Chairs', brand: 'Kampala Crafts', price: 2450000 },
    { name: 'Metal Frame Bunk Bed, Twin', brand: 'Mbarara Furniture Mart', price: 890000, old: 1050000 },
    { name: '2-Door Wardrobe with Mirror, Walnut', brand: 'Nsambya Living', price: 740000 },
    { name: 'Office Desk with Drawers, Oak Finish', brand: 'Mbarara Furniture Mart', price: 420000, old: 520000 },
    { name: 'L-Shaped Corner Sofa, Grey Fabric', brand: 'Nsambya Living', price: 1950000, old: 2400000 },
    { name: 'TV Stand, 1.6m, Walnut & White', brand: 'Kampala Crafts', price: 380000 },
  ],
  'mens-fashion': [
    { name: "Men's Kitenge Slim-Fit Shirt", brand: 'Kitenge House', price: 65000 },
    { name: 'StrideFlex Running Sneakers, White/Orange', brand: 'StrideFlex', price: 120000, old: 185000 },
    { name: 'Ankara Two-Piece Suit, Bold Print', brand: 'Ankara Studio', price: 185000, old: 250000 },
    { name: "Men's Leather Sandals, Handmade in Jinja", brand: 'Kampala Threads', price: 55000 },
    { name: 'Slim-Fit Chino Trousers, Khaki', brand: 'Kampala Threads', price: 78000, old: 95000 },
    { name: "Men's Analog Watch, Leather Strap", brand: 'StrideFlex', price: 145000 },
    { name: 'Cotton Polo Shirt, 3-Pack Basics', brand: 'Kitenge House', price: 89000 },
    { name: 'Leather Wallet, RFID Blocking', brand: 'Kampala Threads', price: 45000 },
  ],
  'womens-fashion': [
    { name: 'Elegant Ankara Print Dress, Orange & Teal (S–XL)', brand: 'Ankara Studio', price: 95000, old: 140000 },
    { name: 'Gomesi Traditional Dress, Premium Silk', brand: 'Kitenge House', price: 210000, old: 280000 },
    { name: 'Ladies Canvas Tote Bag, Handmade', brand: 'Kampala Threads', price: 45000 },
    { name: 'Block-Heel Sandals, Nude', brand: 'StrideFlex', price: 88000 },
    { name: 'Kitenge Headwrap & Earrings Set', brand: 'Ankara Studio', price: 35000, old: 48000 },
    { name: 'Maxi Summer Dress, Floral Print', brand: 'Kitenge House', price: 72000 },
    { name: 'Beaded Statement Necklace, Handmade', brand: 'Kampala Threads', price: 42000, old: 55000 },
    { name: 'Ladies Denim Jacket, Light Wash', brand: 'StrideFlex', price: 98000 },
  ],
  beauty: [
    { name: 'Shea Butter Body Lotion, 400ml — Ugandan Made', brand: 'NaturalGlow', price: 28000, old: 38000 },
    { name: 'Brazilian Body Wave Weave, 18"', brand: 'GlamLocks', price: 185000 },
    { name: 'Matte Lipstick Set, 6 Shades', brand: 'GlamLocks', price: 45000, old: 65000 },
    { name: 'Vitamin C Face Serum, 30ml', brand: 'NaturalGlow', price: 52000 },
    { name: 'Eau de Parfum, Oud & Vanilla, 100ml', brand: 'ScentLanka', price: 135000, old: 180000 },
    { name: 'Moringa Powder, 500g — Organic', brand: 'NaturalGlow', price: 24000 },
    { name: 'Braiding Hair Extensions, Pack of 3', brand: 'GlamLocks', price: 38000 },
    { name: 'Multivitamin Tablets, 90 Count', brand: 'HealthPlus', price: 46000, old: 58000 },
  ],
  agriculture: [
    { name: 'Fresh Green Matooke Bunch — Mityana Farms', brand: 'Mityana Fresh', price: 18000 },
    { name: 'Mixed Dry Beans, 5kg Burlap Sack', brand: 'Masaka Co-op', price: 32000, old: 40000 },
    { name: 'Kuroiler Day-Old Chicks (Box of 100)', brand: 'Masaka Co-op', price: 290000, old: 350000 },
    { name: 'Sweet Yellow Bananas (Sukali Ndizi), Bunch', brand: 'Mityana Fresh', price: 12000 },
    { name: 'Maize Flour (Posho), 10kg Bag', brand: 'Gulu Grains', price: 38000, old: 45000 },
    { name: 'Fresh Avocados, Pack of 6 — Large', brand: 'Masaka Co-op', price: 9000 },
    { name: 'Irish Potatoes, 20kg Sack — Kabale', brand: 'Masaka Co-op', price: 65000, old: 80000 },
    { name: 'Broiler Chicken Feed, Starter 50kg', brand: 'Gulu Grains', price: 145000 },
  ],
  'smart-home': [
    { name: 'SunPro 200W Solar Home Kit + 4 LED Bulbs', brand: 'SunPro', price: 450000, old: 580000 },
    { name: '100W Solar Panel, Monocrystalline', brand: 'SunPro', price: 265000 },
    { name: '1KVA Hybrid Inverter with Battery Charger', brand: 'PowerMax', price: 680000, old: 820000 },
    { name: 'WiFi Security Camera, Pan/Tilt 1080p', brand: 'SecureEyes', price: 145000, old: 195000 },
    { name: 'Smart LED Bulb, RGB + App Control (2-pack)', brand: 'SecureEyes', price: 52000 },
    { name: 'Solar Floodlight 200W with Motion Sensor', brand: 'SunPro', price: 98000, old: 135000 },
    { name: 'Smart Speaker with Voice Assistant', brand: 'PowerMax', price: 185000 },
    { name: '12V 100Ah Deep Cycle Solar Battery', brand: 'PowerMax', price: 520000, old: 610000 },
  ],
  tools: [
    { name: 'Cordless Drill Driver 20V + 40 Accessories', brand: 'ToolMaster', price: 285000, old: 360000 },
    { name: 'Mechanic Tool Set, 108 Pieces', brand: 'ToolMaster', price: 195000 },
    { name: 'Angle Grinder 850W + Cutting Discs', brand: 'PowerMax', price: 145000, old: 185000 },
    { name: 'Welding Machine, Inverter 250A', brand: 'PowerMax', price: 480000 },
    { name: 'Emulsion Paint, 20L Bucket — White', brand: 'Sadolin', price: 165000, old: 195000 },
    { name: 'Safety Helmet + Gloves + Goggles Kit', brand: 'ToolMaster', price: 65000 },
    { name: 'Pressure Washer 1800W', brand: 'PowerMax', price: 420000, old: 520000 },
    { name: 'PVC Pipe Bundle, 32mm x 6m (5 pcs)', brand: 'Kampala Hardware', price: 85000 },
  ],
  office: [
    { name: 'A4 Printing Paper, 5 Reams Box', brand: 'PaperLine', price: 95000, old: 115000 },
    { name: 'Scientific Calculator FX-991', brand: 'EduTech', price: 48000 },
    { name: 'School Backpack, Padded Laptop Slot', brand: 'Kampala Threads', price: 65000, old: 85000 },
    { name: 'Counter Books, A4 Ruled — Dozen', brand: 'PaperLine', price: 42000 },
    { name: 'Whiteboard 90x120cm with Markers', brand: 'OfficePro', price: 88000, old: 110000 },
    { name: 'Desk Organizer Set, Mesh Black', brand: 'OfficePro', price: 35000 },
    { name: 'PEN set & Geometry Box — Exam Ready', brand: 'EduTech', price: 15000 },
    { name: 'Ergonomic Office Chair, Mesh Back', brand: 'OfficePro', price: 380000, old: 460000 },
  ],
  sports: [
    { name: 'Size 5 Football, FIFA Quality Pro', brand: 'SportsLine', price: 55000, old: 75000 },
    { name: 'Adjustable Dumbbell Set, 20kg Pair', brand: 'FitGear', price: 185000 },
    { name: 'Yoga Mat, Non-Slip 6mm + Strap', brand: 'FitGear', price: 38000, old: 52000 },
    { name: 'Mountain Bike, 21-Speed, 26"', brand: 'CycleWorks', price: 780000, old: 920000 },
    { name: 'Football Jersey, Uganda Cranes Home', brand: 'SportsLine', price: 45000 },
    { name: 'Camping Tent, 4-Person Waterproof', brand: 'CampKamp', price: 245000, old: 310000 },
    { name: 'Skipping Rope, Speed Adjustable', brand: 'FitGear', price: 15000 },
    { name: 'Boxing Gloves + Pads Set', brand: 'SportsLine', price: 98000 },
  ],
  baby: [
    { name: 'Diapers Mega Pack, Size 3 (84 pcs)', brand: 'SoftCare', price: 58000, old: 72000 },
    { name: 'Baby Formula Stage 1, 900g Tin', brand: 'NutriBaby', price: 64000 },
    { name: '3-in-1 Baby Stroller with Car Seat', brand: 'BabySafe', price: 420000, old: 520000 },
    { name: 'Baby Cotton Onesies, 5-Pack', brand: 'SoftCare', price: 48000, old: 60000 },
    { name: 'Maternity Dress, Nursing Friendly', brand: 'Kitenge House', price: 65000 },
    { name: 'Baby Wipes, 6 Packs x 80', brand: 'SoftCare', price: 32000 },
    { name: 'Baby Cot with Mosquito Net', brand: 'BabySafe', price: 380000 },
    { name: 'Breast Pump, Manual BPA-Free', brand: 'NutriBaby', price: 75000, old: 95000 },
  ],
  toys: [
    { name: 'Building Blocks Set, 500 Pieces', brand: 'PlayWorld', price: 65000, old: 85000 },
    { name: 'RC 4WD Off-Road Car, Rechargeable', brand: 'PlayWorld', price: 98000 },
    { name: 'Ludo + Snake & Ladders Board Combo', brand: 'GameHouse', price: 25000 },
    { name: 'Doll House Playset, 45 Pieces', brand: 'PlayWorld', price: 88000, old: 110000 },
    { name: 'Kids Tricycle with Push Handle', brand: 'BabySafe', price: 145000 },
    { name: 'Educational Tablet for Kids, 7"', brand: 'EduTech', price: 185000, old: 230000 },
    { name: 'Chess Set, Magnetic Folding Board', brand: 'GameHouse', price: 42000 },
    { name: 'Inflatable Swimming Pool, 2.4m', brand: 'PlayWorld', price: 78000 },
  ],
  pets: [
    { name: 'Dog Food, Chicken & Rice 10kg', brand: 'PetChoice', price: 88000, old: 105000 },
    { name: 'Kuroiler Day-Old Chicks (Box of 50)', brand: 'Masaka Co-op', price: 150000 },
    { name: 'Cat Litter, Clumping 10L', brand: 'PetChoice', price: 32000 },
    { name: 'Poultry Feeder + Drinker Set, 5L', brand: 'FarmCare', price: 28000, old: 38000 },
    { name: 'Dog Leash + Harness Set, Medium', brand: 'PetChoice', price: 24000 },
    { name: 'Aquarium Starter Kit, 40L with Filter', brand: 'AquaLife', price: 185000 },
    { name: 'Bird Cage, Large with Stand', brand: 'FarmCare', price: 95000, old: 120000 },
    { name: 'Pet Shampoo, Anti-Tick 500ml', brand: 'PetChoice', price: 18000 },
  ],
  grocery: [
    { name: 'Sunflower Cooking Oil, 5L Jerry Can', brand: 'FreshFri', price: 42000, old: 52000 },
    { name: 'Mixed Dry Beans, 5kg Burlap Sack', brand: 'Masaka Co-op', price: 32000, old: 40000 },
    { name: 'Long Grain Rice, 10kg Bag', brand: 'Kampala Grocers', price: 68000 },
    { name: 'Instant Coffee, 250g Jar', brand: 'GoodAfrican', price: 18500, old: 23000 },
    { name: 'Curry Powder & Spice Set, 8 Tins', brand: 'Kampala Grocers', price: 28000 },
    { name: 'Sugar, 5kg — Kakira', brand: 'Kakira', price: 24000 },
    { name: 'Cornflakes Breakfast Cereal, 1kg', brand: 'Kampala Grocers', price: 22000, old: 28000 },
    { name: 'Laundry Detergent Powder, 3kg', brand: 'CleanHome', price: 26000 },
  ],
  automotive: [
    { name: 'Boda Helmet, DOT Certified — Glossy Black', brand: 'RideSafe', price: 65000, old: 85000 },
    { name: 'Motorcycle Tyre 3.00-18, Heavy Duty', brand: 'MotoParts', price: 78000 },
    { name: 'Riding Rain Suit, Reflective (XL)', brand: 'RideSafe', price: 48000 },
    { name: 'Car Battery, 12V 70Ah Maintenance-Free', brand: 'AutoPower', price: 385000, old: 450000 },
    { name: 'Engine Oil 20W-50, 5L', brand: 'AutoPower', price: 62000 },
    { name: 'Boda Seat Cushion Cover, Leather', brand: 'MotoParts', price: 18000, old: 25000 },
    { name: 'Car Android Stereo 9" Touchscreen', brand: 'AutoPower', price: 420000, old: 520000 },
    { name: 'Brake Pads Set — Toyota Corolla', brand: 'MotoParts', price: 45000 },
  ],
  books: [
    { name: 'The River and the Source — Margaret Ogola', brand: 'Fountain Publishers', price: 28000 },
    { name: 'Things Fall Apart — Chinua Achebe', brand: 'Fountain Publishers', price: 24000, old: 30000 },
    { name: 'Primary Leaving Exam Revision, Full Set', brand: 'EduTech', price: 45000 },
    { name: 'Atomic Habits — James Clear', brand: 'BookPoint', price: 38000 },
    { name: 'Ugandan Folk Tales Collection, Illustrated', brand: 'Fountain Publishers', price: 22000 },
    { name: 'Rich Dad Poor Dad — Robert Kiyosaki', brand: 'BookPoint', price: 35000, old: 42000 },
    { name: 'Holy Bible, Luganda-English Parallel', brand: 'BookPoint', price: 55000 },
    { name: 'Coloring & Activity Books, Pack of 4', brand: 'EduTech', price: 18000 },
  ],
}

const brandFallback: Record<string, string[]> = {
  phones: ['Samsung', 'Tecno', 'Infinix', 'iPhone', 'Xiaomi', 'Oraimo'],
  electronics: ['Hisense', 'Samsung', 'LG', 'Sony', 'BassPro', 'Canon'],
  refurbished: ['HP', 'Dell', 'Lenovo', 'iPhone', 'Samsung', 'Apple'],
  appliances: ['Hisense', 'LG', 'Samsung', 'GlobalStar', 'Saachi', 'Mika'],
  home: ['Nsambya Living', 'VitaHome', 'Kampala Crafts'],
  furniture: ['Nsambya Living', 'Kampala Crafts', 'Rosefoam', 'Mbarara Furniture Mart'],
  'mens-fashion': ['Kitenge House', 'StrideFlex', 'Ankara Studio', 'Kampala Threads'],
  'womens-fashion': ['Kitenge House', 'Ankara Studio', 'Kampala Threads', 'StrideFlex'],
  beauty: ['NaturalGlow', 'GlamLocks', 'ScentLanka', 'HealthPlus'],
  agriculture: ['Mityana Fresh', 'Masaka Co-op', 'Gulu Grains'],
  'smart-home': ['SunPro', 'PowerMax', 'SecureEyes'],
  tools: ['ToolMaster', 'PowerMax', 'Sadolin', 'Kampala Hardware'],
  office: ['PaperLine', 'OfficePro', 'EduTech', 'Kampala Threads'],
  sports: ['SportsLine', 'FitGear', 'CycleWorks', 'CampKamp'],
  baby: ['SoftCare', 'NutriBaby', 'BabySafe', 'Kitenge House'],
  toys: ['PlayWorld', 'GameHouse', 'BabySafe', 'EduTech'],
  pets: ['PetChoice', 'FarmCare', 'AquaLife', 'Masaka Co-op'],
  grocery: ['FreshFri', 'Kakira', 'GoodAfrican', 'Kampala Grocers', 'CleanHome'],
  automotive: ['RideSafe', 'MotoParts', 'AutoPower'],
  books: ['Fountain Publishers', 'BookPoint', 'EduTech'],
}

const images: Record<CategoryId, string[]> = {
  phones: [A('/product-phone-1.png')],
  electronics: [A('/product-tv.png'), A('/product-headphones.png')],
  refurbished: [A('/product-refurb-laptop.png'), A('/product-refurb-phone.png'), A('/cat-refurb.png')],
  appliances: [A('/product-fridge.png'), A('/product-cooker.png'), A('/product-microwave.png'), A('/product-blender.png'), A('/cat-appliances.png')],
  home: [A('/product-blender.png'), A('/product-sofa.png')],
  furniture: [A('/product-sofa.png'), A('/product-mattress.png')],
  'mens-fashion': [A('/product-sneakers.png'), A('/product-dress.png')],
  'womens-fashion': [A('/product-dress.png'), A('/cat-fashion.png')],
  beauty: [A('/product-dress.png'), A('/cat-fashion.png')],
  agriculture: [A('/product-matooke.png'), A('/product-beans.png'), A('/product-chicks.png')],
  'smart-home': [A('/product-solar.png')],
  tools: [A('/product-blender.png')],
  office: [A('/cat-electronics.png')],
  sports: [A('/product-sneakers.png')],
  baby: [A('/cat-fashion.png')],
  toys: [A('/cat-electronics.png')],
  pets: [A('/product-chicks.png')],
  grocery: [A('/product-beans.png'), A('/product-matooke.png')],
  automotive: [A('/cat-electronics.png')],
  books: [A('/cat-electronics.png')],
}

const bannerClasses: Record<string, string> = {
  phones: 'from-sunset via-sunset-hover to-sunset-deep',
  electronics: 'from-night via-cocoa to-night',
  refurbished: 'from-[#0F766E] via-[#115E59] to-night',
  appliances: 'from-[#334155] via-[#475569] to-night',
  home: 'from-cocoa via-[#5A3D2B] to-night',
  furniture: 'from-[#7C2D12] via-cocoa to-night',
  'mens-fashion': 'from-[#1E3A8A] via-[#1D4ED8] to-[#172554]',
  'womens-fashion': 'from-[#9D174D] via-[#BE185D] to-[#831843]',
  beauty: 'from-[#A21CAF] via-[#C026D3] to-[#701A75]',
  agriculture: 'from-leaf via-[#15803D] to-[#14532D]',
  'smart-home': 'from-[#B45309] via-[#D97706] to-[#92400E]',
  tools: 'from-[#713F12] via-[#A16207] to-[#422006]',
  office: 'from-[#155E75] via-[#0E7490] to-[#164E63]',
  sports: 'from-[#3F6212] via-[#65A30D] to-[#365314]',
  baby: 'from-[#0369A1] via-[#0EA5E9] to-[#075985]',
  toys: 'from-[#7E22CE] via-[#A855F7] to-[#6B21A8]',
  pets: 'from-[#92400E] via-[#B45309] to-[#78350F]',
  grocery: 'from-[#166534] via-[#16A34A] to-[#14532D]',
  automotive: 'from-[#111827] via-[#374151] to-night',
  books: 'from-[#5B21B6] via-[#7C3AED] to-[#4C1D95]',
}

const fromPrices: Record<string, string> = {
  phones: 'UGX 120,000', electronics: 'UGX 45,000', refurbished: 'UGX 620,000',
  appliances: 'UGX 145,000', home: 'UGX 15,000', furniture: 'UGX 180,000',
  'mens-fashion': 'UGX 25,000', 'womens-fashion': 'UGX 25,000', beauty: 'UGX 18,000',
  agriculture: 'UGX 5,000', 'smart-home': 'UGX 52,000', tools: 'UGX 18,000',
  office: 'UGX 5,000', sports: 'UGX 15,000', baby: 'UGX 12,000', toys: 'UGX 15,000',
  pets: 'UGX 18,000', grocery: 'UGX 8,000', automotive: 'UGX 18,000', books: 'UGX 15,000',
}

export const categoryConfigs: Record<CategoryId, CategoryConfig> = Object.fromEntries(
  categoryTree.map((c) => [
    c.id,
    {
      id: c.id,
      label: c.name,
      bannerClass: bannerClasses[c.id] ?? 'from-night via-cocoa to-night',
      chipClass: 'bg-white/15 text-white',
      image: c.image,
      count: c.count.replace('+ items', ''),
      from: fromPrices[c.id] ?? 'UGX 10,000',
      freeNote:
        c.id === 'agriculture'
          ? 'Farm-fresh daily delivery'
          : c.id === 'refurbished'
            ? '6-month warranty included'
            : 'Free delivery on 200+',
      subs: c.subs,
      brands: brandFallback[c.id] ?? ['Owino Traders'],
      namePool: pools[c.id],
    } satisfies CategoryConfig,
  ]),
) as Record<CategoryId, CategoryConfig>

export const categoryList: CategoryConfig[] = Object.values(categoryConfigs)

/** Build 24 items for a category: base data products + pool variants. */
export function buildCatalog(catId: CategoryId): ShopItem[] {
  const cfg = categoryConfigs[catId]
  const vends = vendors[catId] ?? defaultVendors
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
      badge: catId === 'refurbished' ? 'REFURBISHED' : old ? 'SALE' : i % 3 === 0 ? 'FREE DELIVERY' : undefined,
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
