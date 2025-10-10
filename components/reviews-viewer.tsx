"use client"

import { useState } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Star } from "lucide-react"

// --- Mock Reviews Data ---
const mockReviews = [
  {
    id: 1,
    name: "Ama K.",
    rating: 5,
    date: "2025-09-12",
    comment: "Absolutely loved the ice cream! The texture was perfect and the flavor felt so natural.",
  },
  {
    id: 2,
    name: "Kojo M.",
    rating: 4,
    date: "2025-09-08",
    comment: "Tried the boba tea — super refreshing! Would’ve loved a bit more sweetness though.",
  },
  {
    id: 3,
    name: "Akua N.",
    rating: 3,
    date: "2025-08-30",
    comment: "Pastry was okay, but I expected it to be warmer when served. Still good though!",
  },
  {
    id: 4,
    name: "Yaw O.",
    rating: 5,
    date: "2025-08-25",
    comment: "Best pancakes I’ve had in Accra. Soft, fluffy, and rich in flavor.",
  },
  {
    id: 5,
    name: "Afia B.",
    rating: 4,
    date: "2025-08-20",
    comment: "The fruit juice was refreshing — you can tell it’s freshly made!",
  },
  {
    id: 6,
    name: "Nana Q.",
    rating: 2,
    date: "2025-08-10",
    comment: "Shawarma was too spicy for me, but others might enjoy that kick.",
  },
  {
    id: 7,
    name: "Esi T.",
    rating: 5,
    date: "2025-09-29",
    comment: "Waffles were crispy outside and soft inside — exactly how I like them!",
  },
  {
    id: 8,
    name: "Kwame J.",
    rating: 4,
    date: "2025-09-05",
    comment: "Spring rolls were golden and crunchy! Great portion size too.",
  },
]

// --- Component ---
export function ReviewsViewer({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [sortBy, setSortBy] = useState("recent")
  const [filterRating, setFilterRating] = useState<number | "all">("all")

  // --- Sorting + Filtering Logic ---
  const filtered = mockReviews
    .filter((r) => (filterRating === "all" ? true : r.rating === filterRating))
    .sort((a, b) => {
      if (sortBy === "recent") return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sortBy === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime()
      if (sortBy === "rating-high") return b.rating - a.rating
      if (sortBy === "rating-low") return a.rating - b.rating
      return 0
    })

  const ReviewList = () => (
    <div className="space-y-6 mt-4">
      {filtered.map((review) => (
        <div key={review.id} className="border rounded-lg p-4 bg-background">
          <div className="flex items-center gap-3 mb-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{review.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{review.name}</p>
              <p className="text-xs text-muted-foreground">{new Date(review.date).toDateString()}</p>
            </div>
          </div>
          <div className="flex items-center mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">{review.comment}</p>
        </div>
      ))}
      {filtered.length === 0 && <p className="text-sm text-center text-muted-foreground mt-6">No reviews found.</p>}
    </div>
  )

  const FiltersUI = () => (
    <div className="flex flex-wrap gap-4 items-center justify-between">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Sort by:</label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-32 h-8 text-xs">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="rating-high">Highest Rating</SelectItem>
            <SelectItem value="rating-low">Lowest Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Filter:</label>
        <Select value={String(filterRating)} onValueChange={(v) => setFilterRating(v === "all" ? "all" : Number(v))}>
          <SelectTrigger className="w-28 h-8 text-xs">
            <SelectValue placeholder="All Ratings" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
            <SelectItem value="4">4 Stars</SelectItem>
            <SelectItem value="3">3 Stars</SelectItem>
            <SelectItem value="2">2 Stars</SelectItem>
            <SelectItem value="1">1 Star</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Customer Reviews</DialogTitle>
            <DialogDescription>See what others are saying about Frozen Treats</DialogDescription>
          </DialogHeader>
          <FiltersUI />
          <ReviewList />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh] overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle>Customer Reviews</DrawerTitle>
          <DrawerDescription>See what others are saying about Frozen Treats</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-6">
          <FiltersUI />
          <ReviewList />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
