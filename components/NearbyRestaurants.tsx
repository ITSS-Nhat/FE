"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { DishCard } from "./DishCard"

interface Restaurant {
  id: number
  name: string
  price: string
  image: string
}

interface NearbyRestaurantsProps {
  restaurants: Restaurant[]
  availableImages: string[]
}

export function NearbyRestaurants({ restaurants, availableImages }: NearbyRestaurantsProps) {
  return (
    <section className="mb-16">
      <h3 className="text-xl font-semibold text-foreground mb-8">近くのレストラン</h3>

      <div className="relative">
        <div className="flex gap-6 overflow-hidden">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="flex-shrink-0">
              <DishCard
                id={restaurant.id}
                imageUrl={restaurant.image}
                name={restaurant.name}
                rate={0}
                availableImages={availableImages}
                price={restaurant.price}
                variant="restaurant"
              />
            </div>
          ))}
        </div>

        <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 hover:bg-muted rounded-lg">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 hover:bg-muted rounded-lg">
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>
      </div>
    </section>
  )
}

