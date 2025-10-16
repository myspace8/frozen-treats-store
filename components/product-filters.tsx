"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ProductFiltersProps = {
  onFilterChange: (filters: FilterState) => void
}

export type FilterState = {
  categories: string[]
  priceRange: [number, number]
  flavors: string[]
  sortBy: "popularity" | "price-low" | "price-high"
}

const categories = [
  "Ice Cream",
  "Boba Tea",
  "Pastries",
  "Pancakes",
  "Slushy",
  "Waffles",
  "Popcorn",
  "Fruit Juice",
  "Spring Roll",
  "Jam Roll",
  "Cocktails",
  "Shawarma",
]

const flavors = [
  "Vanilla",
  "Chocolate",
  "Strawberry",
  "Mint",
  "Original",
  "Taro",
  "Matcha",
  "Blueberry",
  "Cinnamon",
  "Almond",
  "Banana",
  "Raspberry",
  "Mango",
  "Cherry",
  "Butter",
  "Caramel",
  "Cheese",
  "Orange",
  "Pineapple",
  "Watermelon",
  "Vegetable",
  "Chicken",
  "Shrimp",
  "Apricot",
  "Mixed Berry",
  "Tropical",
  "Lime",
  "Beef",
]

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 50],
    flavors: [],
    sortBy: "popularity",
  })

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFilterChange(updated)
  }

  const toggleCategory = (category: string) => {
    const categories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]
    updateFilters({ categories })
  }

  const toggleFlavor = (flavor: string) => {
    const flavors = filters.flavors.includes(flavor)
      ? filters.flavors.filter((f) => f !== flavor)
      : [...filters.flavors, flavor]
    updateFilters({ flavors })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div className="space-y-3">
          <div>
            <h2>What is your budget?</h2>
          </div>
          <Label className="flex justify-between items-center text-base font-semibold">
            <span>GH₵ {filters.priceRange[0]}</span> <span>-</span> <span>GH₵ {filters.priceRange[1]}</span>
          </Label>
          <Slider
            min={0}
            max={50}
            step={1}
            value={filters.priceRange}
            onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
            className="w-full"
          />
        </div>

        {/* Flavors */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Flavors</Label>
          <div className="max-h-48 overflow-y-auto space-y-2">
            {flavors.map((flavor) => (
              <div key={flavor} className="flex items-center space-x-2">
                <Checkbox
                  id={flavor}
                  checked={filters.flavors.includes(flavor)}
                  onCheckedChange={() => toggleFlavor(flavor)}
                />
                <label
                  htmlFor={flavor}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {flavor}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
