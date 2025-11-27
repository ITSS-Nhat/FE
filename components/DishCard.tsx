"use client"

import { Star } from "lucide-react"

interface DishCardProps {
  id: number
  imageUrl: string
  name: string
  rate: number
  rank?: number
  availableImages?: string[]
  isFirstPlace?: boolean
  restaurant?: string
  distance?: number
  price?: string
  variant?: "ranking" | "favorite" | "restaurant" | "recommended" | "default"
}

export function DishCard({ id, imageUrl, name, rate, rank, availableImages = [], isFirstPlace = false, restaurant, distance, price, variant = "default" }: DishCardProps) {
  const defaultImage = availableImages[0] || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23ddd' width='200' height='200'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='14' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E"

  const isFavoriteVariant = variant === "favorite"
  const isRestaurantVariant = variant === "restaurant"
  const isRecommendedVariant = variant === "recommended"
  const cardSize = isFavoriteVariant 
    ? "max-w-[350px] w-full" 
    : (isRestaurantVariant || isRecommendedVariant)
    ? "max-w-[280px] w-full"
    : "max-w-[200px]"
  
  return (
    <div className={`flex flex-col items-center transition-all ${isFirstPlace ? "-mt-25 md:-mt-15 lg:-mt-15" : ""}`}>
      <div className={`relative w-full ${cardSize} bg-white rounded-lg shadow-md hover:shadow-xl hover:shadow-yellow-500/50 transition-all border border-slate-200`}>
        {/* Image Container */}
        <div className="relative mb-4 w-full p-4">
          <div className="relative">
            <img
              src={imageUrl || defaultImage}
              alt={name}
              className="w-full aspect-square rounded-lg object-cover bg-muted shadow-md"
              onError={(e) => {
                if (!e.currentTarget.src.startsWith("data:")) {
                  e.currentTarget.src = defaultImage
                }
              }}
            />
            {/* Rank Badge - Top Center - Above image */}
            {rank && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className={`flex items-center justify-center font-bold shadow-lg ${
                  isFirstPlace
                    ? "w-12 h-12 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-white text-xl rounded-full border-2 border-white"
                    : "w-10 h-10 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-white text-lg rounded-full border-2 border-white"
                }`}>
                  {rank}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className={`${isFavoriteVariant ? "px-6 pb-6" : "px-6 pb-6"} text-center`}>
          <p className="font-medium text-foreground mb-2">{name}</p>
          {isFavoriteVariant && restaurant && (
            <p className="text-sm text-muted-foreground mb-2">{restaurant}</p>
          )}
          {isFavoriteVariant && distance !== undefined && (
            <p className="text-xs text-muted-foreground mb-2">
              {distance >= 1000 ? `${(distance / 1000).toFixed(1)}km` : `${distance}m`}
            </p>
          )}
          {isRestaurantVariant && price && (
            <p className="text-sm text-muted-foreground">{price}</p>
          )}
          {isRecommendedVariant && restaurant && (
            <p className="text-sm text-muted-foreground">{restaurant}</p>
          )}
          {!isFavoriteVariant && !isRestaurantVariant && !isRecommendedVariant && (
            <div className="flex items-center justify-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-semibold text-sm">{rate.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

