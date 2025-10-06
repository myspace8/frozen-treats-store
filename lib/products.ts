export type Product = {
  id: string
  name: string
  category: "Ice Cream" | "Boba Tea" | "Pastries" | "Pancakes"
  price: number
  description: string
  flavors: string[]
  popularity: number
  image: string
}

export const products: Product[] = [
  // Ice Cream
  {
    id: "1",
    name: "Madagascar Vanilla Dream",
    category: "Ice Cream",
    price: 15.0,
    description: "Smooth, creamy, and timeless — made with real Madagascar vanilla beans for that pure, luxurious flavor everyone loves.",
    flavors: ["Vanilla"],
    popularity: 95,
    image: "/images/vanilla.png",
  },
  {
    id: "2",
    name: "Double Chocolate Fudge Bliss",
    category: "Ice Cream",
    price: 18.0,
    description: "Dive into a rich swirl of velvety chocolate and gooey fudge — an indulgent treat for true chocolate lovers.",
    flavors: ["Chocolate"],
    popularity: 92,
    image: "/chocolate-ice-cream-scoop.png",
  },
  {
    id: "3",
    name: "Strawberry Fields Delight",
    category: "Ice Cream",
    price: 16.0,
    description: "Fresh, fruity, and irresistibly creamy — made with real strawberry chunks for a naturally sweet experience.",
    flavors: ["Strawberry"],
    popularity: 88,
    image: "/strawberry-ice-cream-scoop.png",
  },
  {
    id: "4",
    name: "Mint Choco Chill",
    category: "Ice Cream",
    price: 17.0,
    description: "Cool peppermint ice cream blended with crunchy chocolate chips — the perfect balance of fresh and sweet.",
    flavors: ["Mint"],
    popularity: 85,
    image: "/mint-chocolate-chip-ice-cream.jpg",
  },

  // Boba Tea
  {
    id: "5",
    name: "Signature Classic Milk Tea",
    category: "Boba Tea",
    price: 20.0,
    description: "Smooth black tea meets creamy milk and chewy boba pearls — the all-time favorite that never disappoints.",
    flavors: ["Original"],
    popularity: 90,
    image: "/milk-tea-boba-drink.jpg",
  },
  {
    id: "6",
    name: "Velvet Taro Boba",
    category: "Boba Tea",
    price: 22.0,
    description: "A creamy taro infusion with chewy pearls and a hint of sweetness — comfort in every sip.",
    flavors: ["Taro"],
    popularity: 87,
    image: "/taro-boba-tea-purple.jpg",
  },
  {
    id: "7",
    name: "Sweet Strawberry Boba Crush",
    category: "Boba Tea",
    price: 21.0,
    description: "Juicy strawberry flavor blended with real fruit and bouncy tapioca pearls — a refreshing burst of sweetness.",
    flavors: ["Strawberry"],
    popularity: 84,
    image: "/strawberry-boba-tea-pink.jpg",
  },
  {
    id: "8",
    name: "Matcha Zen Boba",
    category: "Boba Tea",
    price: 23.0,
    description: "Premium Japanese matcha whisked to perfection with milk and chewy boba pearls — earthy, smooth, and energizing.",
    flavors: ["Matcha"],
    popularity: 82,
    image: "/matcha-green-tea-boba.jpg",
  },

  // Pastries
  {
    id: "9",
    name: "Parisian Chocolate Croissant",
    category: "Pastries",
    price: 12.0,
    description: "Flaky, buttery pastry wrapped around molten dark chocolate — a classic French indulgence made fresh daily.",
    flavors: ["Chocolate"],
    popularity: 91,
    image: "/chocolate-croissant-pastry.jpg",
  },
  {
    id: "10",
    name: "Blueberry Bliss Danish",
    category: "Pastries",
    price: 14.0,
    description: "Golden layers of pastry cradling a sweet-tart blueberry filling — perfect with a morning coffee or afternoon tea.",
    flavors: ["Blueberry"],
    popularity: 86,
    image: "/blueberry-danish-pastry.jpg",
  },
  {
    id: "11",
    name: "Cinnamon Swirl Roll",
    category: "Pastries",
    price: 13.0,
    description: "Soft, gooey, and spiced to perfection — topped with creamy frosting for that melt-in-your-mouth finish.",
    flavors: ["Cinnamon"],
    popularity: 89,
    image: "/cinnamon-roll-frosting.jpg",
  },
  {
    id: "12",
    name: "Almond Cream Croissant",
    category: "Pastries",
    price: 15.0,
    description: "Light and flaky croissant filled with rich almond cream, topped with toasted almond slices for an elegant crunch.",
    flavors: ["Almond"],
    popularity: 83,
    image: "/placeholder.svg?height=400&width=400",
  },

  // Pancakes
  {
    id: "13",
    name: "Classic Buttermilk Stack",
    category: "Pancakes",
    price: 25.0,
    description: "Fluffy, golden pancakes served with warm maple syrup — a breakfast classic that never goes out of style.",
    flavors: ["Original"],
    popularity: 93,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "14",
    name: "Chocolate Chip Heaven",
    category: "Pancakes",
    price: 28.0,
    description: "Soft, airy pancakes loaded with melty chocolate chips — pure happiness in every bite.",
    flavors: ["Chocolate"],
    popularity: 90,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "15",
    name: "Blueberry Morning Stack",
    category: "Pancakes",
    price: 27.0,
    description: "Fresh blueberries baked into every fluffy layer — served with syrup for the perfect fruity finish.",
    flavors: ["Blueberry"],
    popularity: 88,
    image: "/blueberry-pancakes-stack.jpg",
  },
  {
    id: "16",
    name: "Banana Nutella Fantasy",
    category: "Pancakes",
    price: 30.0,
    description: "Layers of fluffy pancakes topped with sliced banana and drizzled in creamy Nutella — a dream for sweet lovers.",
    flavors: ["Banana", "Chocolate"],
    popularity: 85,
    image: "/banana-nutella-pancakes.jpg",
  },
]
