export type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
};

function unsplash(photoId: string) {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=600&q=70`;
}

export const products: Product[] = [
  {
    id: "front-side-table",
    name: "Front Side Table",
    price: "₹150.50",
    image: unsplash("1499933374294-4584851497cc"),
  },
  {
    id: "pulse-field-watch",
    name: "Pulse Field Watch",
    price: "₹160.40",
    image: unsplash("1524592094714-0f0654e20314"),
  },
  {
    id: "chester-lounge-chair",
    name: "Chester Lounge Chair",
    price: "₹120.30",
    image: unsplash("1567538096630-e0c55bd6374c"),
  },
  {
    id: "air-wireless-headphone",
    name: "Air Wireless Headphone",
    price: "₹120.99",
    image: unsplash("1505740420928-5e560c06d30e"),
  },
  {
    id: "canvas-low-sneaker",
    name: "Canvas Low Sneaker",
    price: "₹150.50",
    image: unsplash("1560769629-975ec94e6a86"),
  },
  {
    id: "nova-wireless-earbuds",
    name: "Nova Wireless Earbuds",
    price: "₹150.50",
    image: unsplash("1590658268037-6bf12165a8df"),
  },
  {
    id: "linen-cushion-cover",
    name: "Linen Cushion Cover",
    price: "₹110.20",
    image: unsplash("1584100936595-c0654b55a2e2"),
  },
  {
    id: "sage-insulated-bottle",
    name: "Sage Insulated Bottle",
    price: "₹150.50",
    image: unsplash("1602143407151-7111542de6e8"),
  },
  {
    id: "nordic-bar-stool",
    name: "Nordic Bar Stool",
    price: "₹160.50",
    image: unsplash("1503602642458-232111445657"),
  },
  {
    id: "amber-eau-de-parfum",
    name: "Amber Eau de Parfum",
    price: "₹190.40",
    image: unsplash("1615634260167-c8cdede054de"),
  },
  {
    id: "linen-overshirt",
    name: "Linen Overshirt",
    price: "₹88.00",
    image: unsplash("1602810318383-e386cc2a3ccf"),
  },
  {
    id: "trail-grip-backpack",
    name: "Trail Grip Backpack",
    price: "₹134.90",
    image: unsplash("1553062407-98eeb64c6a62"),
  },
  {
    id: "stoneware-mug",
    name: "Stoneware Mug",
    price: "₹46.75",
    image: unsplash("1514228742587-6b1558fcca3d"),
  },
  {
    id: "terracotta-two-seater",
    name: "Terracotta Two-Seater",
    price: "₹275.00",
    image: unsplash("1567016432779-094069958ea5"),
  },
  {
    id: "court-tennis-racket",
    name: "Court Tennis Racket",
    price: "₹210.00",
    image: unsplash("1622279457486-62dcc4a431d6"),
  },
];
