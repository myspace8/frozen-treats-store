export type Product = {
  id: string
  name: string
  category:
    | "Ice Cream"
    | "Boba Tea"
    | "Pastries"
    | "Pancakes"
    | "Slushy"
    | "Waffles"
    | "Popcorn"
    | "Fruit Juice"
    | "Spring Roll"
    | "Jam Roll"
    | "Cocktails"
    | "Shawarma"
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
    description:
      "Smooth, creamy, and timeless — made with real Madagascar vanilla beans for that pure, luxurious flavor everyone loves.",
    flavors: ["Vanilla"],
    popularity: 95,
    image: "/images/vanilla.png",
  },
  {
    id: "2",
    name: "Double Chocolate Fudge Bliss",
    category: "Ice Cream",
    price: 18.0,
    description:
      "Dive into a rich swirl of velvety chocolate and gooey fudge — an indulgent treat for true chocolate lovers.",
    flavors: ["Chocolate"],
    popularity: 92,
    image: "/chocolate-ice-cream-scoop.png",
  },
  {
    id: "3",
    name: "Strawberry Fields Delight",
    category: "Ice Cream",
    price: 16.0,
    description:
      "Fresh, fruity, and irresistibly creamy — made with real strawberry chunks for a naturally sweet experience.",
    flavors: ["Strawberry"],
    popularity: 88,
    image: "/strawberry-ice-cream-scoop.png",
  },
  {
    id: "4",
    name: "Mint Choco Chill",
    category: "Ice Cream",
    price: 17.0,
    description:
      "Cool peppermint ice cream blended with crunchy chocolate chips — the perfect balance of fresh and sweet.",
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
    description:
      "Smooth black tea meets creamy milk and chewy boba pearls — the all-time favorite that never disappoints.",
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
    description:
      "Juicy strawberry flavor blended with real fruit and bouncy tapioca pearls — a refreshing burst of sweetness.",
    flavors: ["Strawberry"],
    popularity: 84,
    image: "/strawberry-boba-tea-pink.jpg",
  },
  {
    id: "8",
    name: "Matcha Zen Boba",
    category: "Boba Tea",
    price: 23.0,
    description:
      "Premium Japanese matcha whisked to perfection with milk and chewy boba pearls — earthy, smooth, and energizing.",
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
    description:
      "Flaky, buttery pastry wrapped around molten dark chocolate — a classic French indulgence made fresh daily.",
    flavors: ["Chocolate"],
    popularity: 91,
    image: "/chocolate-croissant-pastry.jpg",
  },
  {
    id: "10",
    name: "Blueberry Bliss Danish",
    category: "Pastries",
    price: 14.0,
    description:
      "Golden layers of pastry cradling a sweet-tart blueberry filling — perfect with a morning coffee or afternoon tea.",
    flavors: ["Blueberry"],
    popularity: 86,
    image: "/blueberry-danish-pastry.jpg",
  },
  {
    id: "11",
    name: "Cinnamon Swirl Roll",
    category: "Pastries",
    price: 13.0,
    description:
      "Soft, gooey, and spiced to perfection — topped with creamy frosting for that melt-in-your-mouth finish.",
    flavors: ["Cinnamon"],
    popularity: 89,
    image: "/cinnamon-roll-frosting.jpg",
  },
  {
    id: "12",
    name: "Almond Cream Croissant",
    category: "Pastries",
    price: 15.0,
    description:
      "Light and flaky croissant filled with rich almond cream, topped with toasted almond slices for an elegant crunch.",
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
    description:
      "Fluffy, golden pancakes served with warm maple syrup — a breakfast classic that never goes out of style.",
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
    description:
      "Layers of fluffy pancakes topped with sliced banana and drizzled in creamy Nutella — a dream for sweet lovers.",
    flavors: ["Banana", "Chocolate"],
    popularity: 85,
    image: "/banana-nutella-pancakes.jpg",
  },

  // Slushy
  {
    id: "17",
    name: "Blue Raspberry Freeze",
    category: "Slushy",
    price: 10.0,
    description:
      "Icy blue raspberry slushy that's sweet, tangy, and incredibly refreshing — perfect for hot Kumasi days.",
    flavors: ["Raspberry"],
    popularity: 87,
    image: "/blue-raspberry-slushy-drink.jpg",
  },
  {
    id: "18",
    name: "Tropical Mango Chill",
    category: "Slushy",
    price: 11.0,
    description: "Smooth mango slushy bursting with tropical sweetness — like sunshine in a cup.",
    flavors: ["Mango"],
    popularity: 89,
    image: "/mango-slushy-tropical-drink.jpg",
  },
  {
    id: "19",
    name: "Cherry Bomb Slushy",
    category: "Slushy",
    price: 10.0,
    description: "Bold cherry flavor frozen to perfection — sweet, tart, and totally addictive.",
    flavors: ["Cherry"],
    popularity: 85,
    image: "/cherry-red-slushy-drink.jpg",
  },

  // Waffles
  {
    id: "20",
    name: "Belgian Waffle Classic",
    category: "Waffles",
    price: 22.0,
    description:
      "Crispy on the outside, fluffy on the inside — served with butter and maple syrup for that authentic Belgian experience.",
    flavors: ["Original"],
    popularity: 91,
    image: "/belgian-waffle-with-syrup.jpg",
  },
  {
    id: "21",
    name: "Strawberry Cream Waffle",
    category: "Waffles",
    price: 26.0,
    description: "Golden waffle topped with fresh strawberries and whipped cream — a fruity, dreamy delight.",
    flavors: ["Strawberry"],
    popularity: 88,
    image: "/waffle-with-strawberries-and-cream.jpg",
  },
  {
    id: "22",
    name: "Chocolate Drizzle Waffle",
    category: "Waffles",
    price: 25.0,
    description: "Warm waffle drizzled with rich chocolate sauce and dusted with powdered sugar — pure indulgence.",
    flavors: ["Chocolate"],
    popularity: 90,
    image: "/chocolate-waffle-dessert.png",
  },

  // Popcorn
  {
    id: "23",
    name: "Classic Butter Popcorn",
    category: "Popcorn",
    price: 8.0,
    description: "Freshly popped kernels tossed in rich butter — the timeless movie snack everyone loves.",
    flavors: ["Butter"],
    popularity: 92,
    image: "/buttered-popcorn-bucket.jpg",
  },
  {
    id: "24",
    name: "Caramel Crunch Popcorn",
    category: "Popcorn",
    price: 10.0,
    description: "Sweet, crunchy caramel coating on every kernel — a perfect balance of salty and sweet.",
    flavors: ["Caramel"],
    popularity: 89,
    image: "/caramel-popcorn-snack.jpg",
  },
  {
    id: "25",
    name: "Cheese Explosion Popcorn",
    category: "Popcorn",
    price: 9.0,
    description: "Savory cheese-flavored popcorn with a bold, cheesy kick — irresistibly addictive.",
    flavors: ["Cheese"],
    popularity: 86,
    image: "/cheese-popcorn-snack.jpg",
  },

  // Fruit Juice
  {
    id: "26",
    name: "Fresh Orange Sunrise",
    category: "Fruit Juice",
    price: 12.0,
    description: "Freshly squeezed orange juice packed with vitamin C — bright, tangy, and energizing.",
    flavors: ["Orange"],
    popularity: 90,
    image: "/fresh-orange-juice-glass.jpg",
  },
  {
    id: "27",
    name: "Pineapple Paradise",
    category: "Fruit Juice",
    price: 13.0,
    description: "Sweet and tropical pineapple juice that transports you to the islands with every sip.",
    flavors: ["Pineapple"],
    popularity: 88,
    image: "/pineapple-juice-tropical.jpg",
  },
  {
    id: "28",
    name: "Watermelon Wave",
    category: "Fruit Juice",
    price: 11.0,
    description: "Refreshing watermelon juice that's naturally sweet and incredibly hydrating — perfect for hot days.",
    flavors: ["Watermelon"],
    popularity: 87,
    image: "/watermelon-juice-drink.jpg",
  },

  // Spring Roll
  {
    id: "29",
    name: "Crispy Vegetable Spring Roll",
    category: "Spring Roll",
    price: 15.0,
    description:
      "Golden-fried spring rolls filled with fresh vegetables and served with sweet chili sauce — crunchy and satisfying.",
    flavors: ["Vegetable"],
    popularity: 85,
    image: "/crispy-vegetable-spring-rolls.jpg",
  },
  {
    id: "30",
    name: "Chicken Spring Roll",
    category: "Spring Roll",
    price: 18.0,
    description: "Savory spring rolls packed with seasoned chicken and vegetables — a perfect snack or appetizer.",
    flavors: ["Chicken"],
    popularity: 88,
    image: "/chicken-spring-rolls-fried.jpg",
  },
  {
    id: "31",
    name: "Shrimp Spring Roll",
    category: "Spring Roll",
    price: 20.0,
    description: "Delicate spring rolls filled with succulent shrimp and crisp vegetables — light yet flavorful.",
    flavors: ["Shrimp"],
    popularity: 83,
    image: "/shrimp-spring-rolls-asian.jpg",
  },

  // Jam Roll
  {
    id: "32",
    name: "Strawberry Jam Roll",
    category: "Jam Roll",
    price: 14.0,
    description: "Soft, fluffy sponge cake rolled with sweet strawberry jam — a classic teatime treat.",
    flavors: ["Strawberry"],
    popularity: 86,
    image: "/strawberry-jam-roll-cake.jpg",
  },
  {
    id: "33",
    name: "Apricot Jam Roll",
    category: "Jam Roll",
    price: 14.0,
    description: "Light sponge cake filled with tangy apricot jam — perfectly balanced sweetness in every slice.",
    flavors: ["Apricot"],
    popularity: 82,
    image: "/apricot-jam-roll-cake.jpg",
  },
  {
    id: "34",
    name: "Mixed Berry Jam Roll",
    category: "Jam Roll",
    price: 15.0,
    description: "Delicate cake rolled with a medley of berry jams — bursting with fruity flavors.",
    flavors: ["Mixed Berry"],
    popularity: 84,
    image: "/placeholder.svg?height=400&width=400",
  },

  // Cocktails
  {
    id: "35",
    name: "Tropical Sunset Mocktail",
    category: "Cocktails",
    price: 18.0,
    description: "A vibrant blend of pineapple, orange, and grenadine — refreshing and beautifully layered.",
    flavors: ["Tropical"],
    popularity: 89,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "36",
    name: "Virgin Mojito",
    category: "Cocktails",
    price: 16.0,
    description: "Fresh mint, lime, and soda water come together for a crisp, refreshing non-alcoholic classic.",
    flavors: ["Mint", "Lime"],
    popularity: 91,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "37",
    name: "Berry Blast Mocktail",
    category: "Cocktails",
    price: 17.0,
    description:
      "A fruity fusion of strawberries, blueberries, and raspberries with a splash of lemon — sweet and tangy.",
    flavors: ["Mixed Berry"],
    popularity: 87,
    image: "/placeholder.svg?height=400&width=400",
  },

  // Shawarma
  {
    id: "38",
    name: "Classic Chicken Shawarma",
    category: "Shawarma",
    price: 25.0,
    description:
      "Tender marinated chicken wrapped in warm pita with fresh veggies and creamy garlic sauce — a street food favorite.",
    flavors: ["Chicken"],
    popularity: 93,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "39",
    name: "Beef Shawarma Deluxe",
    category: "Shawarma",
    price: 28.0,
    description:
      "Juicy spiced beef with crisp lettuce, tomatoes, and tahini sauce in a soft wrap — bold and satisfying.",
    flavors: ["Beef"],
    popularity: 90,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "40",
    name: "Veggie Shawarma",
    category: "Shawarma",
    price: 22.0,
    description: "Grilled vegetables, hummus, and fresh greens wrapped in pita — a delicious plant-based option.",
    flavors: ["Vegetable"],
    popularity: 84,
    image: "/placeholder.svg?height=400&width=400",
  },
]
