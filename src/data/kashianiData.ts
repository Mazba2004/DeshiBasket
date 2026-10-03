import { Customer, Product, Rider, Vendor } from '../types';

export const KASHIANI_ZONES = [
  'কাশিয়ানী বাজার',
  'রামদিয়া বাজার',
  'ভাটিয়াপাড়া মোড়',
  'ওড়াকান্দি ঠাকুরবাড়ি রোড',
  'সাজাইল ইউনিয়ন মোড়',
  'ফুকরা বাজার',
  'মহেশপুর রোড',
  'তিলছড়া বাজার',
  'রাজপাট মোড়',
  'সিংগা বাজার'
];

// High quality curated SVG image placeholders / data URIs for resilient local rendering
export const FOOD_ICONS = {
  biryani: '🍛',
  beef: '🥩',
  chicken: '🍗',
  fish: '🐟',
  rice: '🍚',
  fastfood: '🍔',
  dessert: '🍮',
  drink: '🥤',
  medicine: '💊',
  grocery: '🛒',
};

// Curated top restaurants with special menus
const PRIMARY_RESTAURANTS: Partial<Vendor>[] = [
  {
    id: 'vendor-rest-1',
    name: 'Kashiani Biryani House',
    bengaliName: 'কাশিয়ানী বিরিয়ানি হাউস',
    category: 'RESTAURANT',
    rating: 4.9,
    totalReviews: 342,
    deliveryTimeMin: 25,
    deliveryTimeMax: 35,
    deliveryFee: 25,
    minOrder: 100,
    isOpen: true,
    address: 'মেন রোড, কাশিয়ানী বাজার, গোপালগঞ্জ',
    zone: 'কাশিয়ানী বাজার',
    phone: '01712-458921',
    cuisineOrType: 'বিরিয়ানি, কাচ্চি ও মোঘলাই',
    isFeatured: true,
    coordinates: { x: 48, y: 52 },
  },
  {
    id: 'vendor-rest-2',
    name: "Mayer Doa Restaurant",
    bengaliName: 'মায়ের দোয়া রেস্টুরেন্ট অ্যান্ড ক্যাফে',
    category: 'RESTAURANT',
    rating: 4.8,
    totalReviews: 280,
    deliveryTimeMin: 20,
    deliveryTimeMax: 30,
    deliveryFee: 20,
    minOrder: 80,
    isOpen: true,
    address: 'ভাটিয়াপাড়া বাসস্ট্যান্ড সংলগ্ন, কাশিয়ানী',
    zone: 'ভাটিয়াপাড়া মোড়',
    phone: '01819-334455',
    cuisineOrType: 'দেশি খাবার, ইলিশ-ভাত ও ভর্তা',
    isFeatured: true,
    coordinates: { x: 55, y: 40 },
  },
  {
    id: 'vendor-rest-3',
    name: 'Nodir Paar Khabar Ghor',
    bengaliName: 'নদীর পাড় খাবার ঘর',
    category: 'RESTAURANT',
    rating: 4.7,
    totalReviews: 198,
    deliveryTimeMin: 30,
    deliveryTimeMax: 45,
    deliveryFee: 30,
    minOrder: 150,
    isOpen: true,
    address: 'মধুমতি ব্রিজ রোড, কাশিয়ানী',
    zone: 'কাশিয়ানী বাজার',
    phone: '01911-889900',
    cuisineOrType: 'তাজা মাছ, হাঁসের মাংস ও ভুনা খিচুড়ি',
    isFeatured: true,
    coordinates: { x: 42, y: 65 },
  },
  {
    id: 'vendor-rest-4',
    name: 'Dhan Shiri Hotel',
    bengaliName: 'ধানসিঁড়ি স্পেশাল খাবার হোটেল',
    category: 'RESTAURANT',
    rating: 4.6,
    totalReviews: 165,
    deliveryTimeMin: 20,
    deliveryTimeMax: 35,
    deliveryFee: 20,
    minOrder: 100,
    isOpen: true,
    address: 'রামদিয়া কলেজ রোড, কাশিয়ানী',
    zone: 'রামদিয়া বাজার',
    phone: '01733-556677',
    cuisineOrType: 'দেশি খাসির মাংস ও চালের রুটি',
    isFeatured: true,
    coordinates: { x: 62, y: 60 },
  },
  {
    id: 'vendor-rest-5',
    name: 'Prince Fast Food & Coffee',
    bengaliName: 'প্রিন্স ফাস্টফুড অ্যান্ড ক্যাফে',
    category: 'RESTAURANT',
    rating: 4.8,
    totalReviews: 215,
    deliveryTimeMin: 15,
    deliveryTimeMax: 25,
    deliveryFee: 25,
    minOrder: 100,
    isOpen: true,
    address: 'হাসপাতাল রোড, কাশিয়ানী সদর',
    zone: 'কাশিয়ানী বাজার',
    phone: '01622-445566',
    cuisineOrType: 'বার্গার, পিজ্জা, শর্মা ও কফি',
    isFeatured: true,
    coordinates: { x: 50, y: 48 },
  },
];

// Curated top pharmacies
const PRIMARY_PHARMACIES: Partial<Vendor>[] = [
  {
    id: 'vendor-pharm-1',
    name: 'Kashiani Pharmacy',
    bengaliName: 'কাশিয়ানী সেন্ট্রাল ফার্মেসি',
    category: 'PHARMACY',
    rating: 4.9,
    totalReviews: 512,
    deliveryTimeMin: 15,
    deliveryTimeMax: 25,
    deliveryFee: 15,
    minOrder: 50,
    isOpen: true,
    address: 'উপজেলা স্বাস্থ্য কমপ্লেক্স গেটের বিপরীতে, কাশিয়ানী',
    zone: 'কাশিয়ানী বাজার',
    phone: '01715-998877',
    cuisineOrType: 'প্রেসক্রিপশন ওষুধ, বেবি ফুড ও সার্জিক্যাল',
    isFeatured: true,
    coordinates: { x: 49, y: 50 },
  },
  {
    id: 'vendor-pharm-2',
    name: 'Janata Medical Hall',
    bengaliName: 'জনতা মেডিকেল হল',
    category: 'PHARMACY',
    rating: 4.8,
    totalReviews: 310,
    deliveryTimeMin: 20,
    deliveryTimeMax: 30,
    deliveryFee: 20,
    minOrder: 50,
    isOpen: true,
    address: 'রামদিয়া বাজার মোড়, কাশিয়ানী',
    zone: 'রামদিয়া বাজার',
    phone: '01811-223344',
    cuisineOrType: 'সকল জরুরি ওষুধ ও ডায়াবেটিস কেয়ার',
    isFeatured: true,
    coordinates: { x: 64, y: 58 },
  },
  {
    id: 'vendor-pharm-3',
    name: 'Al-Shifa Pharmacy',
    bengaliName: 'আল-শিফা ফার্মেসি ও হেলথ কেয়ার',
    category: 'PHARMACY',
    rating: 4.7,
    totalReviews: 240,
    deliveryTimeMin: 20,
    deliveryTimeMax: 30,
    deliveryFee: 20,
    minOrder: 60,
    isOpen: true,
    address: 'ভাটিয়াপাড়া মোড়, কাশিয়ানী',
    zone: 'ভাটিয়াপাড়া মোড়',
    phone: '01912-345678',
    cuisineOrType: 'জরুরি ওষুধ ও ফার্স্ট এইড আইটেম',
    isFeatured: true,
    coordinates: { x: 53, y: 42 },
  },
];

// Curated top super shops
const PRIMARY_SUPER_SHOPS: Partial<Vendor>[] = [
  {
    id: 'vendor-shop-1',
    name: 'Deshi Mart Kashiani',
    bengaliName: 'দেশি মার্ট কাশিয়ানী',
    category: 'SUPER_SHOP',
    rating: 4.9,
    totalReviews: 420,
    deliveryTimeMin: 20,
    deliveryTimeMax: 35,
    deliveryFee: 30,
    minOrder: 200,
    isOpen: true,
    address: 'কাশিয়ানী সেন্ট্রাল প্লাজা গ্রাউন্ড ফ্লোর, কাশিয়ানী',
    zone: 'কাশিয়ানী বাজার',
    phone: '01799-112233',
    cuisineOrType: 'চাল, ডাল, তেল, মসলা ও গৃহস্থালি পণ্য',
    isFeatured: true,
    coordinates: { x: 47, y: 53 },
  },
  {
    id: 'vendor-shop-2',
    name: 'Kashiani Super Shop',
    bengaliName: 'কাশিয়ানী সুপার শপ অ্যান্ড ডিপার্টমেন্টাল',
    category: 'SUPER_SHOP',
    rating: 4.7,
    totalReviews: 290,
    deliveryTimeMin: 25,
    deliveryTimeMax: 40,
    deliveryFee: 25,
    minOrder: 150,
    isOpen: true,
    address: 'থানা রোড, কাশিয়ানী',
    zone: 'কাশিয়ানী বাজার',
    phone: '01888-223344',
    cuisineOrType: 'তাজা ফলমূল, শাকসবজি ও প্যাকেটজাত খাদ্য',
    isFeatured: true,
    coordinates: { x: 51, y: 51 },
  },
  {
    id: 'vendor-shop-3',
    name: 'Bhai Bhai General Store',
    bengaliName: 'ভাই ভাই জেনারেল স্টোর',
    category: 'SUPER_SHOP',
    rating: 4.6,
    totalReviews: 185,
    deliveryTimeMin: 20,
    deliveryTimeMax: 35,
    deliveryFee: 20,
    minOrder: 100,
    isOpen: true,
    address: 'ওড়াকান্দি বাজার রোড, কাশিয়ানী',
    zone: 'ওড়াকান্দি ঠাকুরবাড়ি রোড',
    phone: '01711-445566',
    cuisineOrType: 'মুদি বাজার, প্রসাধন সামগ্রী ও শিশুদের খাবার',
    isFeatured: true,
    coordinates: { x: 38, y: 35 },
  },
];

// Names helper for procedurally generating exactly 100 restaurants, 30 pharmacies, 20 super shops
const RESTAURANT_PREFIXES = [
  'মায়ের দোয়া', 'কাশিয়ানী', 'ধানসিঁড়ি', 'নদীর পাড়', 'রাজমহল', 'আল-মদিনা',
  'চাঁদনী', 'সুগন্ধা', 'বৈশাখী', 'মধুমতি', 'বাংলার স্বাদ', 'প্রিন্স',
  'রয়েল', 'জনপ্রিয়', 'খাবারের ঘর', 'মৌচাক', 'কস্তুরি', 'ঝিলমিল',
  'কুটুম বাড়ি', 'দস্তরখান', 'অলিভ', 'স্মার্ট ক্যাফে', 'নিউ রাজধানী', 'বনফুল'
];

const RESTAURANT_TYPES = [
  'বিরিয়ানি হাউস', 'হোটেল অ্যান্ড রেস্তোরাঁ', 'খাবার ঘর', 'ফাস্টফুড ও কাবাব',
  'ক্যাফে অ্যান্ড রেস্টুরেন্ট', 'মিষ্টান্ন ভাণ্ডার ও ক্যাফে', 'বিরিয়ানি প্যালেস'
];

const PHARMACY_NAMES = [
  'কাশিয়ানী সেন্ট্রাল ফার্মেসি', 'জনতা মেডিকেল হল', 'আল-শিফা ফার্মেসি', 'সেবা ড্রাগ হাউস',
  'নিরাময় ওষুধালায়', 'মদিনা ফার্মেসি', 'লাইফ কেয়ার ড্রাগস', 'কাশিয়ানী মেডিসিন কর্নার',
  'মুক্তি ড্রাগ হাউস', 'আলিফ মেডিকেল স্টোর', 'সাজাইল ফার্মেসি', 'রামদিয়া মেডিকেল হল',
  'ভাটিয়াপাড়া ড্রাগ পয়েন্ট', 'সুস্থতা ফার্মেসি', 'অপসো ফার্মেসি', 'প্রাইম ফার্মেসি',
  'মায়ের দোয়া মেডিকেল হল', 'আল্লাহর দান ফার্মেসি', 'স্কয়ার মেডিসিন সেন্টার', 'হেলথ পয়েন্ট',
  'জনসেবা ড্রাগ স্টোর', 'রোকেয়া ড্রাগ হাউস', 'শাপলা ফার্মেসি', 'গ্রিন লাইফ মেডিকেল',
  'উপজেলা ড্রাগ স্টোর', 'আশা মেডিকেল হল', 'পপুলার ফার্মেসি', 'কেয়ার ফার্মেসি',
  'মধুমতি মেডিকেল হল', 'ওড়াকান্দি ড্রাগ হাউস'
];

const SUPER_SHOP_NAMES = [
  'দেশি মার্ট কাশিয়ানী', 'কাশিয়ানী সুপার শপ', 'ভাই ভাই জেনারেল স্টোর', 'সোনার বাংলা কনফেকশনারি',
  'স্বপ্নপূরণ সুপার শপ', 'সাজাইল ডিপার্টমেন্টাল স্টোর', 'রামদিয়া সুপার মার্ট', 'ভাটিয়াপাড়া ডেইলি মার্ট',
  'মায়ের দোয়া গ্রোসারি', 'কাশিয়ানী বাজার মার্ট', 'জনতা সুপার শপ', 'গ্রিন ভ্যালি গ্রোসারি',
  'পরিবার সুপার শপ', 'তাজা বাজার মার্ট', 'মধুমতি জেনারেল স্টোর', 'স্মার্ট বাজার কাশিয়ানী',
  'আদর্শ সুপার স্টোর', 'ফুকরা গ্রোসারি মার্ট', 'ওড়াকান্দি ডিপার্টমেন্টাল', 'সততা জেনারেল স্টোর'
];

// Generate 100 restaurants
export function generateRestaurants(): Vendor[] {
  const result: Vendor[] = [...(PRIMARY_RESTAURANTS as Vendor[])];
  let idCounter = 6;

  for (let i = 0; i < 95; i++) {
    const prefix = RESTAURANT_PREFIXES[i % RESTAURANT_PREFIXES.length];
    const type = RESTAURANT_TYPES[(i * 3) % RESTAURANT_TYPES.length];
    const zone = KASHIANI_ZONES[(i * 2 + 1) % KASHIANI_ZONES.length];
    const rating = Number((4.2 + (i % 8) * 0.1).toFixed(1));
    const bengaliName = `${prefix} ${type} ${i > 24 ? `(${zone.split(' ')[0]})` : ''}`;

    result.push({
      id: `vendor-rest-${idCounter++}`,
      name: `${prefix} ${type}`,
      bengaliName,
      category: 'RESTAURANT',
      rating: rating > 5.0 ? 4.9 : rating,
      totalReviews: 40 + (i * 7) % 250,
      deliveryTimeMin: 20 + (i % 4) * 5,
      deliveryTimeMax: 35 + (i % 5) * 5,
      deliveryFee: 20 + (i % 3) * 5,
      minOrder: 80 + (i % 4) * 20,
      isOpen: i % 15 !== 0, // Most are open
      address: `${zone}, কাশিয়ানী উপজেলা, গোপালগঞ্জ`,
      zone,
      phone: `017${(10000000 + i * 83294).toString().slice(0, 8)}`,
      cuisineOrType: i % 2 === 0 ? 'বিরিয়ানি, খিচুড়ি ও মাংসের পদ' : 'বাংলা খাবার, মাছ, ডাল ও ভর্তা',
      isFeatured: i < 8,
      coordinates: {
        x: 30 + (i * 13) % 45,
        y: 25 + (i * 17) % 50,
      },
      image: '',
      logo: '',
    });
  }
  return result;
}

// Generate 30 pharmacies
export function generatePharmacies(): Vendor[] {
  const result: Vendor[] = [...(PRIMARY_PHARMACIES as Vendor[])];
  let idCounter = 4;

  for (let i = 0; i < 27; i++) {
    const name = PHARMACY_NAMES[(i + 3) % PHARMACY_NAMES.length];
    const zone = KASHIANI_ZONES[(i * 3) % KASHIANI_ZONES.length];
    const rating = Number((4.5 + (i % 5) * 0.1).toFixed(1));

    result.push({
      id: `vendor-pharm-${idCounter++}`,
      name,
      bengaliName: name,
      category: 'PHARMACY',
      rating: rating > 5.0 ? 4.8 : rating,
      totalReviews: 60 + (i * 11) % 200,
      deliveryTimeMin: 15 + (i % 3) * 5,
      deliveryTimeMax: 25 + (i % 3) * 5,
      deliveryFee: 15 + (i % 2) * 5,
      minOrder: 50,
      isOpen: true,
      address: `${zone}, কাশিয়ানী, গোপালগঞ্জ`,
      zone,
      phone: `018${(10000000 + i * 62719).toString().slice(0, 8)}`,
      cuisineOrType: 'জরুরি ওষুধ, অ্যান্টিবায়োটিক ও ফার্স্ট এইড',
      isFeatured: i < 4,
      coordinates: {
        x: 35 + (i * 11) % 40,
        y: 30 + (i * 19) % 45,
      },
      image: '',
      logo: '',
    });
  }
  return result;
}

// Generate 20 super shops
export function generateSuperShops(): Vendor[] {
  const result: Vendor[] = [...(PRIMARY_SUPER_SHOPS as Vendor[])];
  let idCounter = 4;

  for (let i = 0; i < 17; i++) {
    const name = SUPER_SHOP_NAMES[(i + 3) % SUPER_SHOP_NAMES.length];
    const zone = KASHIANI_ZONES[(i * 4) % KASHIANI_ZONES.length];
    const rating = Number((4.4 + (i % 6) * 0.1).toFixed(1));

    result.push({
      id: `vendor-shop-${idCounter++}`,
      name,
      bengaliName: name,
      category: 'SUPER_SHOP',
      rating: rating > 5.0 ? 4.9 : rating,
      totalReviews: 80 + (i * 9) % 220,
      deliveryTimeMin: 25 + (i % 3) * 5,
      deliveryTimeMax: 40 + (i % 3) * 5,
      deliveryFee: 25 + (i % 2) * 5,
      minOrder: 150,
      isOpen: true,
      address: `${zone}, কাশিয়ানী, গোপালগঞ্জ`,
      zone,
      phone: `019${(10000000 + i * 49182).toString().slice(0, 8)}`,
      cuisineOrType: 'দৈনিক মুদি বাজার, তেল, চাল, মসলা ও ডিম',
      isFeatured: i < 3,
      coordinates: {
        x: 40 + (i * 9) % 35,
        y: 35 + (i * 13) % 40,
      },
      image: '',
      logo: '',
    });
  }
  return result;
}

// 100+ Registered Riders
const RIDER_FIRST_NAMES = [
  'রাকিব', 'তানভীর', 'শাকিব', 'সাকিব', 'আরিফ', 'মেহেদী', 'সুমন', 'হাসান',
  'কামরুল', 'জাহিদুল', 'নাহিদ', 'ফাহিম', 'মিজানুর', 'সাইফুল', 'শাহিন', 'রবিউল',
  'আশরাফুল', 'ইমরান', 'শামীম', 'আলমগীর', 'সবুজ', 'রিপন', 'মোস্তফা', 'রুবেল'
];

const RIDER_LAST_NAMES = [
  'হাসান', 'আহমেদ', 'হোসেন', 'ইসলাম', 'খান', 'রহমান', 'শেখ', 'সরকার',
  'মোল্লা', 'চৌধুরী', 'বিশ্বাস', 'মন্ডল', 'হাওলাদার', 'ভূঁইয়া', 'কাজী'
];

export function generateRiders(): Rider[] {
  const riders: Rider[] = [
    {
      id: 'rider-1',
      name: 'Rakib Hasan',
      bengaliName: 'রাকিব হাসান',
      phone: '01712-984512',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      rating: 4.9,
      totalDeliveries: 384,
      vehicleType: 'মোটরসাইকেল',
      vehicleNumber: 'গোপালগঞ্জ হ-১২-৩৪৫৬',
      isOnline: true,
      isAvailable: true,
      currentZone: 'কাশিয়ানী বাজার',
      todayEarnings: 850,
      coordinates: { x: 47, y: 50 },
    },
    {
      id: 'rider-2',
      name: 'Tanvir Ahmed',
      bengaliName: 'তানভীর আহমেদ',
      phone: '01823-456789',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 4.8,
      totalDeliveries: 290,
      vehicleType: 'মোটরসাইকেল',
      vehicleNumber: 'গোপালগঞ্জ হ-১১-৭৮৯০',
      isOnline: true,
      isAvailable: true,
      currentZone: 'ভাটিয়াপাড়া মোড়',
      todayEarnings: 720,
      coordinates: { x: 53, y: 44 },
    },
    {
      id: 'rider-3',
      name: 'Shakib Khan',
      bengaliName: 'শাকিব খান',
      phone: '01912-334455',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      rating: 4.9,
      totalDeliveries: 412,
      vehicleType: 'ইলেকট্রিক বাইক',
      vehicleNumber: 'ই-বাইক ৮৯৭',
      isOnline: true,
      isAvailable: true,
      currentZone: 'রামদিয়া বাজার',
      todayEarnings: 940,
      coordinates: { x: 60, y: 58 },
    },
    {
      id: 'rider-4',
      name: 'Mehedi Hasan',
      bengaliName: 'মেহেদী হাসান',
      phone: '01611-223344',
      photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150',
      rating: 4.7,
      totalDeliveries: 180,
      vehicleType: 'সাইকেল',
      vehicleNumber: 'বাই-০২৪',
      isOnline: true,
      isAvailable: true,
      currentZone: 'কাশিয়ানী বাজার',
      todayEarnings: 450,
      coordinates: { x: 46, y: 53 },
    }
  ];

  for (let i = 4; i < 105; i++) {
    const fn = RIDER_FIRST_NAMES[i % RIDER_FIRST_NAMES.length];
    const ln = RIDER_LAST_NAMES[(i * 3) % RIDER_LAST_NAMES.length];
    const bengaliName = `${fn} ${ln}`;
    const zone = KASHIANI_ZONES[(i * 2) % KASHIANI_ZONES.length];
    const vehicleType = i % 3 === 0 ? 'মোটরসাইকেল' : i % 3 === 1 ? 'ইলেকট্রিক বাইক' : 'সাইকেল';
    const isOnline = i % 7 !== 0; // ~85% riders online
    const isAvailable = isOnline && i % 4 !== 0;

    riders.push({
      id: `rider-${i + 1}`,
      name: `${fn} ${ln}`,
      bengaliName,
      phone: `017${(15000000 + i * 73912).toString().slice(0, 8)}`,
      photo: '',
      rating: Number((4.5 + (i % 6) * 0.08).toFixed(1)),
      totalDeliveries: 50 + (i * 9) % 350,
      vehicleType,
      vehicleNumber: vehicleType === 'মোটরসাইকেল' ? `গোপালগঞ্জ হ-${10 + (i % 30)}-${1000 + (i * 37) % 8999}` : `ই-বাইক ${(i * 17) % 999}`,
      isOnline,
      isAvailable,
      currentZone: zone,
      todayEarnings: isOnline ? 250 + (i * 45) % 800 : 0,
      coordinates: {
        x: 25 + (i * 7) % 55,
        y: 25 + (i * 11) % 55,
      },
    });
  }

  return riders;
}

// 100+ Registered Customers
export function generateCustomers(): Customer[] {
  const names = [
    'মোঃ আরিফ হাসান', 'সুলতানা রাজিয়া', 'মোস্তাফিজুর রহমান', 'তানজিলা আক্তার',
    'কামরুল ইসলাম', 'ফারহানা ইসলাম', 'জাকির হোসেন', 'নাসরিন সুলতানা',
    'রাশেদুল করিম', 'সাবরিনা আক্তার', 'মাহমুদুল হক', 'শাহানাজ পারভীন'
  ];

  const customers: Customer[] = [
    {
      id: 'cust-1',
      name: 'মোঃ আরিফ হাসান',
      phone: '01719-876543',
      defaultAddress: 'বাসা নং ১২, হাসপাতাল রোড, কাশিয়ানী সদর',
      zone: 'কাশিয়ানী বাজার',
      landmark: 'উপজেলা স্বাস্থ্য কমপ্লেক্সের পূর্ব পাশে',
      totalOrders: 28,
    },
    {
      id: 'cust-2',
      name: 'তানজিলা আক্তার',
      phone: '01815-112233',
      defaultAddress: 'হাউজ ২৪, কলেজ রোড, রামদিয়া',
      zone: 'রামদিয়া বাজার',
      landmark: 'রামদিয়া কলেজের সামনে',
      totalOrders: 15,
    },
  ];

  for (let i = 2; i < 110; i++) {
    const baseName = names[i % names.length];
    const zone = KASHIANI_ZONES[(i * 3) % KASHIANI_ZONES.length];
    customers.push({
      id: `cust-${i + 1}`,
      name: `${baseName} (${i + 1})`,
      phone: `017${(20000000 + i * 49281).toString().slice(0, 8)}`,
      defaultAddress: `বাড়ি নং ${10 + (i % 40)}, রোড নং ${1 + (i % 8)}, ${zone}`,
      zone,
      landmark: i % 2 === 0 ? 'মসজিদের পাশে' : 'মোড়ের দক্ষিণ পাশে',
      totalOrders: 3 + (i * 2) % 45,
    });
  }

  return customers;
}

// Curated Products list across categories
export const SAMPLE_PRODUCTS: Product[] = [
  // Fast Food & Biryani
  {
    id: 'prod-biryani-1',
    vendorId: 'vendor-rest-1',
    name: 'Special Chicken Biryani',
    bengaliName: 'স্পেশাল চিকেন বিরিয়ানি (হাফ)',
    description: 'সুগন্ধি বাসমতী চাল, এক টুকরো নরম ব্রয়লার চিকেন, ডিম ও আলু সহ সুস্বাদু বিরিয়ানি। সাথে সালাদ ও পুদিনা চাটনি।',
    price: 180,
    discountPrice: 160,
    category: 'বিরিয়ানি',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500',
    isAvailable: true,
    isPopular: true,
    tags: ['জনপ্রিয়', 'চিকেন', 'দুপুরের খাবার'],
  },
  {
    id: 'prod-biryani-2',
    vendorId: 'vendor-rest-1',
    name: 'Special Beef Kacchi Biryani',
    bengaliName: 'খাসি/বিফ স্পেশাল কাচ্চি বিরিয়ানি',
    description: 'ঘিয়ে ভাজা সুবাসিত চিনিগুঁড়া চাল ও রসালো গরুর মাংসের ঐতিহ্যবাহী কাচ্চি বিরিয়ানি। সাথে বোরহানি ফ্রি!',
    price: 260,
    discountPrice: 240,
    category: 'বিরিয়ানি',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500',
    isAvailable: true,
    isPopular: true,
    tags: ['জনপ্রিয়', 'কাচ্চি', 'স্পেশাল'],
  },
  {
    id: 'prod-biryani-3',
    vendorId: 'vendor-rest-1',
    name: 'Cold Drink 250ml',
    bengaliName: 'স্প্রাইট / কোকাকোলা (২৫০ মিলি)',
    description: 'ঠান্ডা রিফ্রেশিং কার্বনেটেড পানীয়। কাচ্চি বা বিরিয়ানির সাথে দারুণ কম্বিনেশন।',
    price: 35,
    category: 'পানীয়',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500',
    isAvailable: true,
    isPopular: true,
  },
  {
    id: 'prod-biryani-4',
    vendorId: 'vendor-rest-1',
    name: 'Borhani Special (Cup)',
    bengaliName: 'স্পেশাল টকমিষ্টি বোরহানি (১ গ্লাস)',
    description: 'টক দই, পুদিনা পাতা, বিট লবণ ও বিশেষ মসলায় প্রস্তুত ঘরোয়া স্বাদের বোরহানি।',
    price: 45,
    category: 'পানীয়',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500',
    isAvailable: true,
    isPopular: true,
  },
  {
    id: 'prod-fish-1',
    vendorId: 'vendor-rest-2',
    name: 'Ilish Mach Bhaja & Bhat',
    bengaliName: 'পদ্মার টাটকা ইলিশ ভাজা ও গরম ভাত',
    description: 'এক টুকরো বড় সাইজের ইলিশ মাছ ভাজা, গরম ধোঁয়া ওঠা ভাত, শুকনা মরিচ ভাজা ও বেগুন ভাজি।',
    price: 220,
    discountPrice: 200,
    category: 'মাছ',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500',
    isAvailable: true,
    isPopular: true,
    tags: ['ইলিশ', 'বাঙালি খাবার'],
  },
  {
    id: 'prod-vorta-1',
    vendorId: 'vendor-rest-2',
    name: 'Bhorta Platter (4 Types)',
    bengaliName: 'স্পেশাল ভর্তা প্ল্যাটার (৪ রকমের ভর্তা)',
    description: 'আলু ভর্তা, বেগুন ভর্তা, চেপা শুঁটকি ভর্তা ও সরিষা বাটা। খাঁটি সরিষার তেলে মাখানো।',
    price: 90,
    category: 'ভাত',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500',
    isAvailable: true,
    isPopular: true,
  },
  {
    id: 'prod-duck-1',
    vendorId: 'vendor-rest-3',
    name: 'Haash Bhuna with Chaler Ruti',
    bengaliName: 'হাসের মাংস ভুনা ও চালের রুটি (২টি)',
    description: 'ঝাল ঝাল দেশি হাঁসের মাংস ভুনা ও পাতলা চালের আটার রুটি। শীতের দিনে কাশিয়ানীর সেরা পছন্দ!',
    price: 250,
    category: 'মাংস',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500',
    isAvailable: true,
    isPopular: true,
  },
  {
    id: 'prod-fast-1',
    vendorId: 'vendor-rest-5',
    name: 'Crispy Chicken Burger',
    bengaliName: 'ক্রিস্পি চিকেন চিজ বার্গার',
    description: 'মুচমুচে ফ্রায়েড চিকেন প্যাটি, গলানো চিডার চিজ, মেয়োনিজ, সস ও লেটুস পাতা সহ ফ্রেশ বান।',
    price: 130,
    discountPrice: 110,
    category: 'ফাস্টফুড',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
    isAvailable: true,
    isPopular: true,
  },
  {
    id: 'prod-fast-2',
    vendorId: 'vendor-rest-5',
    name: 'Chicken Shawarma Wrap',
    bengaliName: 'স্পেশাল এরাবিয়ান চিকেন শর্মা',
    description: 'মসলাদার রোস্টেড চিকেন কুচি, স্পেশাল রসুন মেয়োনিজ ও সালাদে মোড়ানো নরম রুটি।',
    price: 90,
    category: 'ফাস্টফুড',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500',
    isAvailable: true,
    isPopular: true,
  },
  // Medicine
  {
    id: 'prod-med-1',
    vendorId: 'vendor-pharm-1',
    name: 'Napa Extra 500mg/65mg (Strip)',
    bengaliName: 'নাপা এক্সট্রা ট্যাবলেট (১ পাতা / ১০টি)',
    description: 'জ্বর ও দ্রুত তীব্র মাথা ব্যথার চিকিৎসায় অত্যন্ত কার্যকরী প্যারাসিটামল ও ক্যাফেইন ট্যাবলেট।',
    price: 30,
    category: 'ওষুধ',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500',
    isAvailable: true,
    isPopular: true,
  },
  {
    id: 'prod-med-2',
    vendorId: 'vendor-pharm-1',
    name: 'Seclo 20mg Capsule (Strip)',
    bengaliName: 'সেকলো ২০ মি.গ্রা. ক্যাপসুল (১ পাতা / ১০টি)',
    description: 'গ্যাস্ট্রিক ও এসিডিটির দ্রুত উপশমে ওমিপ্রাজল ক্যাপসুল (স্কয়ার ফার্মাসিউটিক্যালস)।',
    price: 60,
    category: 'ওষুধ',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500',
    isAvailable: true,
    isPopular: true,
  },
  {
    id: 'prod-med-3',
    vendorId: 'vendor-pharm-1',
    name: 'Oral Saline ORS (Pack of 5)',
    bengaliName: 'এসএমসি ওআরএস স্যালাইন (৫ প্যাকেট)',
    description: 'পানিশূন্যতা ও ডায়রিয়ার তাৎক্ষণিক সমাধানে প্রয়োজনীয় ইলেকট্রোলাইট স্যালাইন।',
    price: 35,
    category: 'ওষুধ',
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=500',
    isAvailable: true,
    isPopular: true,
  },
  {
    id: 'prod-med-4',
    vendorId: 'vendor-pharm-1',
    name: 'Antiseptic Savlon 100ml',
    bengaliName: 'স্যাভলন লিকুইড অ্যান্টিসেপটিক (১০০ মিলি)',
    description: 'কাটা-ছেঁড়া ও প্রাথমিক ক্ষতে জীবাণু মুক্তকরণে নির্ভরযোগ্য অ্যান্টিসেপটিক তরল।',
    price: 55,
    category: 'ওষুধ',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500',
    isAvailable: true,
  },
  // Super Shop / Grocery
  {
    id: 'prod-groc-1',
    vendorId: 'vendor-shop-1',
    name: 'Miniket Rice Premium (5kg)',
    bengaliName: 'প্রিমিয়াম মিনিকেট চাল (৫ কেজি ব্যাগ)',
    description: 'চিকন, ঝরঝরে ও পরিষ্কার পুষ্টিকর মিনিকেট চাল। প্রতিদিনের পারিবারিক খাবারের জন্য আদর্শ।',
    price: 360,
    discountPrice: 345,
    category: 'মুদি বাজার',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500',
    isAvailable: true,
    isPopular: true,
  },
  {
    id: 'prod-groc-2',
    vendorId: 'vendor-shop-1',
    name: 'Teer Pure Soybean Oil (2L)',
    bengaliName: 'তীর বিশুদ্ধ সয়াবিন তেল (২ লিটার বোতল)',
    description: 'ভিটামিন এ সমৃদ্ধ পরিশোধিত ভোজ্য তেল। রান্নার স্বাস্থ্যকর পছন্দ।',
    price: 380,
    category: 'মুদি বাজার',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500',
    isAvailable: true,
    isPopular: true,
  },
  {
    id: 'prod-groc-3',
    vendorId: 'vendor-shop-1',
    name: 'Farm Fresh Egg (1 Hali / 4 pcs)',
    bengaliName: 'ফার্মের লাল ডিম (১ হালি / ৪টি)',
    description: 'তাজা ও পুষ্টিকর ফার্মের মুরগির ডিম।',
    price: 52,
    category: 'মুদি বাজার',
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=500',
    isAvailable: true,
    isPopular: true,
  },
  {
    id: 'prod-groc-4',
    vendorId: 'vendor-shop-1',
    name: 'Radhuni Beef Masala 100g',
    bengaliName: 'রাঁধুনী গরুর মাংসের মসলা (১০০ গ্রাম)',
    description: 'খাঁটি মসলার নিখুঁত মিশ্রণ। মাংস রান্নায় আনে ঐতিহ্যবাহী রাজকীয় স্বাদ।',
    price: 75,
    category: 'মুদি বাজার',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500',
    isAvailable: true,
  },
];

// Helper to provide products for any vendor
export function getProductsForVendor(vendorId: string, vendorCategory: string): Product[] {
  const matching = SAMPLE_PRODUCTS.filter(p => p.vendorId === vendorId);
  if (matching.length > 0) return matching;

  // Generate category-appropriate dynamic products
  if (vendorCategory === 'RESTAURANT') {
    return [
      {
        id: `dyn-${vendorId}-1`,
        vendorId,
        name: 'Chicken Khichuri with Egg',
        bengaliName: 'চিকেন ভুনা খিচুড়ি ও ডিম ভাজি',
        description: 'ঘরোয়া মসলায় ভুনা চিকেন খিচুড়ি ও খাঁটি ঘিয়ে ভাজা ডিম।',
        price: 170,
        discountPrice: 150,
        category: 'ভাত',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500',
        isAvailable: true,
        isPopular: true,
      },
      {
        id: `dyn-${vendorId}-2`,
        vendorId,
        name: 'Beef Kala Bhuna (Quarter)',
        bengaliName: 'ঐতিহ্যবাহী বিফ কালা ভুনা',
        description: 'কড়া তেলে কষা গরুর মাংসের বিখ্যাত পদ। সাথে সালাদ।',
        price: 220,
        category: 'মাংস',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500',
        isAvailable: true,
        isPopular: true,
      },
      {
        id: `dyn-${vendorId}-3`,
        vendorId,
        name: 'Special Faluda',
        bengaliName: 'রয়েল স্পেশাল ফালুদা',
        description: 'ঘন দুধ, নুডলস, আইসক্রিম স্কুপ, জেলি ও ড্রাই ফ্রুটস সহযোগে ঠাণ্ডা ফালুদা।',
        price: 110,
        category: 'মিষ্টি ও ডেজার্ট',
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500',
        isAvailable: true,
      },
    ];
  } else if (vendorCategory === 'PHARMACY') {
    return [
      {
        id: `dyn-${vendorId}-1`,
        vendorId,
        name: 'Napa 500mg Tablet (Box)',
        bengaliName: 'নাপা ৫০০ মি.গ্রা. ট্যাবলেট (১ বাক্স)',
        description: 'সাধারণ জ্বর ও শরীর ব্যথায় নিরাপদ ড্রাগ।',
        price: 120,
        category: 'ওষুধ',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500',
        isAvailable: true,
        isPopular: true,
      },
      {
        id: `dyn-${vendorId}-2`,
        vendorId,
        name: 'Maxpro 20mg Capsule (Strip)',
        bengaliName: 'ম্যাক্সপ্রো ২০ মি.গ্রা. (১ পাতা)',
        description: 'এসিডিটি ও বুক জ্বালাপোড়ায় এসোমিপ্রাজল ক্যাপসুল।',
        price: 70,
        category: 'ওষুধ',
        image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500',
        isAvailable: true,
        isPopular: true,
      },
      {
        id: `dyn-${vendorId}-3`,
        vendorId,
        name: 'First Aid Bandage (Box of 20)',
        bengaliName: 'ফার্স্ট এইড হ্যান্ডিপ্লাস্ট ব্যান্ডেজ (২০টি)',
        description: 'ক্ষুদ্র আঘাত ও ক্ষত সুরক্ষায় ওয়াটারপ্রুফ ব্যান্ডেজ।',
        price: 50,
        category: 'ওষুধ',
        image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500',
        isAvailable: true,
      }
    ];
  } else {
    return [
      {
        id: `dyn-${vendorId}-1`,
        vendorId,
        name: 'Chashi Aromatic Chinigura Rice 1kg',
        bengaliName: 'চাষী সুগন্ধি চিনিগুঁড়া চাল (১ কেজি)',
        description: 'পোলাও, বিরিয়ানি ও পায়েসের জন্য সেরা সুবাসিত চাল।',
        price: 150,
        category: 'মুদি বাজার',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500',
        isAvailable: true,
        isPopular: true,
      },
      {
        id: `dyn-${vendorId}-2`,
        vendorId,
        name: 'Fresh Lentils (Mosur Dal) 1kg',
        bengaliName: 'ফ্রেশ দেশি মসুর ডাল (১ কেজি)',
        description: 'দানাদার ও দ্রুত সিদ্ধ হওয়া প্রিমিয়াম কোয়ালিটি ডাল।',
        price: 135,
        category: 'মুদি বাজার',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500',
        isAvailable: true,
        isPopular: true,
      }
    ];
  }
}
