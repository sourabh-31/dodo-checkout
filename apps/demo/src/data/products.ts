export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewCount: number;
  badge?: "Bestseller" | "New" | "Sale";
  image: string;
};

function unsplash(photoId: string) {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=600&q=70`;
}

export const categories = [
  "All",
  "Furniture",
  "Apparel",
  "Footwear",
  "Electronics",
  "Accessories",
  "Home",
  "Beauty",
  "Sports",
] as const;

export const products: Product[] = [
  {
    id: "front-side-table",
    name: "Front Side Table",
    category: "Furniture",
    price: "₹150.50",
    rating: 4.6,
    reviewCount: 128,
    badge: "Bestseller",
    image: unsplash("1499933374294-4584851497cc"),
  },
  {
    id: "pulse-field-watch",
    name: "Pulse Field Watch",
    category: "Accessories",
    price: "₹160.40",
    originalPrice: "₹210.00",
    rating: 4.4,
    reviewCount: 84,
    badge: "Sale",
    image: unsplash("1524592094714-0f0654e20314"),
  },
  {
    id: "chester-lounge-chair",
    name: "Chester Lounge Chair",
    category: "Furniture",
    price: "₹120.30",
    rating: 4.8,
    reviewCount: 212,
    badge: "Bestseller",
    image: unsplash("1567538096630-e0c55bd6374c"),
  },
  {
    id: "air-wireless-headphone",
    name: "Air Wireless Headphone",
    category: "Electronics",
    price: "₹120.99",
    rating: 4.3,
    reviewCount: 97,
    image: unsplash("1505740420928-5e560c06d30e"),
  },
  {
    id: "canvas-low-sneaker",
    name: "Canvas Low Sneaker",
    category: "Footwear",
    price: "₹150.50",
    rating: 4.5,
    reviewCount: 156,
    badge: "New",
    image: unsplash("1560769629-975ec94e6a86"),
  },
  {
    id: "nova-wireless-earbuds",
    name: "Nova Wireless Earbuds",
    category: "Electronics",
    price: "₹150.50",
    originalPrice: "₹189.00",
    rating: 4.2,
    reviewCount: 63,
    badge: "Sale",
    image: unsplash("1590658268037-6bf12165a8df"),
  },
  {
    id: "linen-cushion-cover",
    name: "Linen Cushion Cover",
    category: "Home",
    price: "₹110.20",
    rating: 4.7,
    reviewCount: 41,
    image: unsplash("1584100936595-c0654b55a2e2"),
  },
  {
    id: "sage-insulated-bottle",
    name: "Sage Insulated Bottle",
    category: "Accessories",
    price: "₹150.50",
    rating: 4.6,
    reviewCount: 175,
    image: unsplash("1602143407151-7111542de6e8"),
  },
  {
    id: "nordic-bar-stool",
    name: "Nordic Bar Stool",
    category: "Furniture",
    price: "₹160.50",
    rating: 4.1,
    reviewCount: 38,
    image: unsplash("1503602642458-232111445657"),
  },
  {
    id: "amber-eau-de-parfum",
    name: "Amber Eau de Parfum",
    category: "Beauty",
    price: "₹190.40",
    rating: 4.9,
    reviewCount: 302,
    badge: "Bestseller",
    image: unsplash("1615634260167-c8cdede054de"),
  },
  {
    id: "linen-overshirt",
    name: "Linen Overshirt",
    category: "Apparel",
    price: "₹88.00",
    rating: 4.3,
    reviewCount: 57,
    badge: "New",
    image: unsplash("1602810318383-e386cc2a3ccf"),
  },
  {
    id: "trail-grip-backpack",
    name: "Trail Grip Backpack",
    category: "Accessories",
    price: "₹134.90",
    rating: 4.5,
    reviewCount: 119,
    image: unsplash("1553062407-98eeb64c6a62"),
  },
  {
    id: "stoneware-mug",
    name: "Stoneware Mug",
    category: "Home",
    price: "₹46.75",
    rating: 4.4,
    reviewCount: 89,
    image: unsplash("1514228742587-6b1558fcca3d"),
  },
  {
    id: "terracotta-two-seater",
    name: "Terracotta Two-Seater",
    category: "Furniture",
    price: "₹275.00",
    originalPrice: "₹329.00",
    rating: 4.7,
    reviewCount: 66,
    badge: "Sale",
    image: unsplash("1567016432779-094069958ea5"),
  },
  {
    id: "court-tennis-racket",
    name: "Court Tennis Racket",
    category: "Sports",
    price: "₹210.00",
    rating: 4.2,
    reviewCount: 44,
    image: unsplash("1622279457486-62dcc4a431d6"),
  },
];
