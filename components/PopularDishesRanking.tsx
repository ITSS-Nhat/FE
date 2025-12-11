"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { DishCard } from "./DishCard"

interface Dish {
  id: number
  imageUrl: string
  name: string
  rate: number
}

interface PopularDishesRankingProps {
  dishes: Dish[]
  availableImages: string[]
}

export function PopularDishesRanking({ dishes, availableImages }: PopularDishesRankingProps) {
  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-20">
        <h3 className="text-xl font-semibold text-foreground">人気料理ランキング</h3>
        <Link href="/ranking" className="text-primary text-sm font-medium flex items-center gap-1 hover:text-primary/80 transition-colors">
          詳細 <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="relative">
        <div className="flex flex-row items-start justify-center gap-8 mb-8 px-4">
          {dishes.length >= 3 ? (
            // Reorder: #2 on left, #1 in middle, #3 on right
            <>
              <DishCard
                key={dishes[1].id}
                id={dishes[1].id}
                imageUrl={dishes[1].imageUrl}
                name={dishes[1].name}
                rate={dishes[1].rate}
                rank={2}
                availableImages={availableImages}
                isFirstPlace={false}
              />
              <DishCard
                key={dishes[0].id}
                id={dishes[0].id}
                imageUrl={dishes[0].imageUrl}
                name={dishes[0].name}
                rate={dishes[0].rate}
                rank={1}
                availableImages={availableImages}
                isFirstPlace={true}
              />
              <DishCard
                key={dishes[2].id}
                id={dishes[2].id}
                imageUrl={dishes[2].imageUrl}
                name={dishes[2].name}
                rate={dishes[2].rate}
                rank={3}
                availableImages={availableImages}
                isFirstPlace={false}
              />
            </>
          ) : (
            // If less than 3 dishes, show in order
            dishes.map((dish, idx) => (
              <DishCard
                key={dish.id}
                id={dish.id}
                imageUrl={dish.imageUrl}
                name={dish.name}
                rate={dish.rate}
                rank={idx + 1}
                availableImages={availableImages}
                isFirstPlace={idx === 0}
              />
            ))
          )}
        </div>
      </div>
    </section>
  )
}

