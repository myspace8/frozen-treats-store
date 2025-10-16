"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { Link, Star } from "lucide-react"
import Image from "next/image"

export default function HomePage() {

  return (
    <>
      <main className="px-3 pb-8 min-h-screen">
        <div className="container m-auto pb-20 pt-4 md:pt-0 relative top-12 md:top-48 text-center py-12">
          <section className="py-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Hot Right Now—Don't Miss Out!</h2>
            <div className="space-y-4">
              {[
                { name: "Fresh Strawberry Fields (3 left!)", img: "/strawberry.png", price: 16, timer: "Ends in 2h" },
                { name: "Caramel Crunch Popcorn (Limited Batch)", img: "/caramel.png", price: 10, timer: "Selling Fast" },
              ].map((item, i) => (
                <Card key={i} className="flex items-center gap-4 p-4">
                  <Image src={item.img} alt={item.name} width={80} height={80} className="rounded-md object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{item.timer}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">GH₵{item.price}</span>
                      <Button size="sm" className="bg-primary">Secure Now</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
          <section className="py-8">
            <h2 className="text-2xl font-bold text-center mb-6">Mix Magic: Perfect Pairs</h2>
            <div className="max-w-md mx-auto">
              <Select onValueChange={(base) => {/* Update pairs state */ }} defaultValue="pancakes">
                <SelectTrigger className="mb-4">
                  <SelectValue placeholder="Pick your base craving..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pancakes">Fluffy Pancakes</SelectItem>
                  <SelectItem value="icecream">Creamy Scoop</SelectItem>
                </SelectContent>
              </Select>
              <div className="space-y-3">
                {[
                  { pair: "Blueberry Pancakes + Orange Sunrise", save: "Save GH₵3", price: 37 },
                  { pair: "Classic Buttermilk + Pineapple Paradise", save: "Save GH₵2", price: 38 },
                ].map((combo, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm">{combo.pair}</span>
                    <div className="text-right">
                      <p className="text-xs text-green-600">{combo.save}</p>
                      <p className="font-semibold">GH₵{combo.price}</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-2">Add Pair</Button>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="py-8 bg-gradient-to-r from-muted/50 to-primary/10 rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">What's your vibe today?</h2>
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory">
              {[
                { emoji: '😊', mood: 'Happy', desc: 'Celebrate with sweetness!', suggestions: ['Madagascar Vanilla Dream'] },
                { emoji: '😩', mood: 'Stressed', desc: 'Unwind with creamy comfort.', suggestions: ['Velvet Taro Boba'] },
                { emoji: '⚡', mood: 'Energized', desc: 'Fuel the buzz!', suggestions: ['Blueberry Morning Stack'] },
              ].map((vibe, i) => (
                <div key={i} className="flex-shrink-0 w-64 bg-white rounded-xl p-4 shadow-sm snap-center">
                  <span className="text-3xl">{vibe.emoji}</span>
                  <h3 className="font-semibold mt-2">{vibe.mood}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{vibe.desc}</p>
                  <div className="space-y-2">
                    {vibe.suggestions.map(s => (
                      <Button key={s} variant="outline" size="sm" className="w-full justify-start">
                        {s} – GH₵15.00
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="py-8">
            <h2 className="text-2xl font-bold text-center mb-6">Stories That Sweeten the Moment</h2>
            <div className="relative overflow-hidden rounded-lg">
              {/* Simple slider logic with state/useEffect for rotation */}
              <div className="flex transition-transform duration-500" style={{ transform: 'translateX(0%)' }}> {/* Adjust for active index */}
                {[
                  { title: "Vanilla's Journey from Madagascar", img: "/vanilla.png", story: "Sourced from sun-kissed beans, this scoop transports you to creamy horizons—perfect for quiet evenings.", price: 15 },
                  { title: "Taro's Cozy Embrace", img: "/taro.png", story: "Whispered secrets of purple roots, blended for a hug in every sip.", price: 22 },
                ].map((story, i) => (
                  <div key={i} className="flex-shrink-0 w-full bg-muted p-6 text-center">
                    <Image src={story.img} alt={story.title} width={300} height={200} className="mx-auto rounded mb-4" />
                    <h3 className="font-semibold mb-2">{story.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{story.story}</p>
                    <Button className="mr-2">Dive In – GH₵{story.price}</Button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-8 bg-primary/5">
            <h2 className="text-2xl font-bold text-center mb-6">Just for You, [User]</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {[
                { name: "Your Chocolate Crush Returns", img: "/chocolate.png", why: "Loved last time? Try the fudge swirl upgrade.", price: 18 },
                { name: "Berry Boost for Your Routine", img: "/strawberry.png", why: "Based on your fruity faves—pairs with morning coffee.", price: 16 },
              ].map((rec, i) => (
                <Card key={i} className="overflow-hidden">
                  <Image src={rec.img} alt={rec.name} width={400} height={200} className="w-full object-cover" />
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{rec.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{rec.why}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">GH₵{rec.price}</span>
                      <Button size="sm">Add to Craving</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="py-8 text-center">
            <h2 className="text-2xl font-bold mb-6">Feeling Adventurous? Surprise Yourself!</h2>
            <div className="relative">
              <div className="w-64 h-64 mx-auto bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg animate-spin-slow"> {/* Custom @keyframes for slow spin */}
                <div className="absolute inset-0 rounded-full bg-background flex flex-col items-center justify-center">
                  <span className="text-4xl mb-2">🎲</span>
                  <p className="text-sm font-medium">Tap to Spin!</p>
                </div>
              </div>
              {/* On click, reveal overlay with random product */}
              <div className="mt-6 space-y-2 hidden group-hover:block"> {/* Use state to show after spin */}
                <h3 className="font-semibold">Today's Wild Pick: Mint Choco Chill</h3>
                <p className="text-sm text-muted-foreground">Cool mint meets crunchy chips—GH₵17. A hidden gem!</p>
                <Button>Grab It Now</Button>
              </div>
            </div>
          </section>
          <section className="py-8 bg-muted/20">
            <h2 className="text-2xl font-bold text-center mb-6">Kumasi's Current Crave</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { user: "Ama K.", product: "Cinnamon Swirl Roll", review: "Rainy day magic—warm & gooey! ❤️", rating: 5 },
                { user: "Kojo B.", product: "Pineapple Paradise", review: "Sunny sips for hot afternoons.", rating: 4 },
                { user: "Esi A.", product: "Belgian Waffle Classic", review: "Fluffy perfection—crowd fave!", rating: 5 },
              ].map((buzz, i) => (
                <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{buzz.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{buzz.user}</p>
                      <div className="flex gap-0.5 text-yellow-500">
                        {Array(buzz.rating).fill(0).map((_, j) => <Star key={j} className="h-3 w-3 fill-current" />)}
                      </div>
                    </div>
                  </div>
                  <p className="font-semibold mb-2">{buzz.product}</p>
                  <p className="text-sm text-muted-foreground">"{buzz.review}"</p>
                  <Button variant="ghost" size="sm" className="mt-2 w-full">Try It – GH₵13</Button>
                </div>
              ))}
            </div>
          </section>
          <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
          <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
          <Link href="/menu">
            <Button size="lg">Browse Menu</Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
          <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
          <Link href="/menu">
            <Button size="lg">Browse Menu</Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
          <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
          <Link href="/menu">
            <Button size="lg">Browse Menu</Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
          <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
          <Link href="/menu">
            <Button size="lg">Browse Menu</Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
          <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
          <Link href="/menu">
            <Button size="lg">Browse Menu</Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
          <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
          <Link href="/menu">
            <Button size="lg">Browse Menu</Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
          <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
          <Link href="/menu">
            <Button size="lg">Browse Menu</Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
          <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
          <Link href="/menu">
            <Button size="lg">Browse Menu</Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
          <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
          <Link href="/menu">
            <Button size="lg">Browse Menu</Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
          <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
          <Link href="/menu">
            <Button size="lg">Browse Menu</Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
          <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
          <Link href="/menu">
            <Button size="lg">Browse Menu</Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
          <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
          <Link href="/menu">
            <Button size="lg">Browse Menu</Button>
          </Link>          <h1 className="text-3xl font-bold mb-2">Welcome to Sweet Treats Shop!</h1>
          <p className="text-muted-foreground mb-6">Delicious ice cream, boba tea, pastries, and pancakes delivered to your door.</p>
          <Link href="/menu">
            <Button size="lg">Browse Menu</Button>
          </Link>
        </div>
      </main>
    </>
  )
}