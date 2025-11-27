"use client"

import { DishCard } from "./DishCard"

interface Dish {
  id: number
  name: string
  restaurant: string
  image: string
}

interface RecommendedDishesProps {
  dishes: Dish[]
  availableImages: string[]
}

export function RecommendedDishes({ dishes, availableImages }: RecommendedDishesProps) {
  return (
    <section className="mb-16">
      <h3 className="text-xl font-semibold text-foreground mb-8">おすすめの料理</h3>

      <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
        {dishes.map((dish) => (
          <DishCard
            key={dish.id}
            id={dish.id}
            imageUrl={dish.image}
            name={dish.name}
            rate={0}
            availableImages={availableImages}
            restaurant={dish.restaurant}
            variant="recommended"
          />
        ))}
      </div>
    </section>
  )
}

