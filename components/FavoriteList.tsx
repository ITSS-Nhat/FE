"use client"

import { ChevronRight } from "lucide-react"
import { DishCard } from "./DishCard"

interface Dish {
  id: number
  name: string
  restaurant: string
  image: string
  distance?: number
}

interface FavoriteListProps {
  dishes: Dish[]
  availableImages: string[]
}

export function FavoriteList({ dishes, availableImages }: FavoriteListProps) {
  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-semibold text-foreground">お気に入り一覧</h3>
        <a href="#" className="text-primary text-sm font-medium flex items-center gap-1">
          詳細 <ChevronRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {dishes.map((dish) => (
          <DishCard
            key={dish.id}
            id={dish.id}
            imageUrl={dish.image}
            name={dish.name}
            rate={0}
            availableImages={availableImages}
            restaurant={dish.restaurant}
            distance={dish.distance}
            variant="favorite"
          />
        ))}
      </div>
    </section>
  )
}

