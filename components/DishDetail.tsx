"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart, Star, MessageCircle, ChevronLeft, Home } from "lucide-react"
import { TopHeader } from "@/components/TopHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AISupportModal } from "@/components/AISupportModal"

interface Review {
  id: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  date?: string
}

interface RelatedDish {
  id: string
  name: string
  image: string
}

interface Restaurant {
  id: string
  name: string
  image: string
}

interface DishDetailPageProps {
  dishId?: string
  dishName?: string
  dishImage?: string
  dishPrice?: number
  dishIngredients?: string[]
  likeCount?: number
  restaurantId?: string
  restaurantName?: string
  restaurantImage?: string
}

const mockReviews: Review[] = [
  {
    id: "1",
    userName: "ユーザーの名前",
    rating: 5,
    comment: "美味しい料理でした。おすすめです。新鮮な材料を使っていて、とても満足しました。",
    date: "2024年1月15日",
  },
  {
    id: "2",
    userName: "ユーザーの名前2",
    rating: 4,
    comment: "新鮮な材料を使っていて、とても満足しました。また来たいと思います。",
    date: "2024年1月10日",
  },
  {
    id: "3",
    userName: "ユーザーの名前3",
    rating: 5,
    comment: "素晴らしい味でした。価格も手頃で、サービスも良かったです。",
    date: "2024年1月5日",
  },
]

const mockRelatedDishes: RelatedDish[] = [
  { id: "1", name: "料理1", image: "/pho-noodle-soup-authentic-vietnamese.jpg" },
  { id: "2", name: "料理2", image: "/banh-mi-vietnamese-sandwich.jpg" },
  { id: "3", name: "料理3", image: "/spring-rolls-fresh-vietnamese.jpg" },
  { id: "4", name: "料理4", image: "/vietnamese-food-table-spread.jpg" },
]

const mockRestaurants: Restaurant[] = [
  { id: "1", name: "レストランA", image: "/pho-noodle-soup-authentic-vietnamese.jpg" },
  { id: "2", name: "レストランB", image: "/banh-mi-vietnamese-sandwich.jpg" },
  { id: "3", name: "レストランC", image: "/spring-rolls-fresh-vietnamese.jpg" },
  { id: "4", name: "レストランD", image: "/vietnamese-food-table-spread.jpg" },
]

export function DishDetailPage({
  dishId = "1",
  dishName = "料理の名前",
  dishImage = "/pho-noodle-soup-authentic-vietnamese.jpg",
  dishPrice = 50000,
  dishIngredients = ["材料1", "材料2", "材料3"],
  likeCount = 363636,
  restaurantId = "1",
  restaurantName = "店の名前",
  restaurantImage = "/pho-noodle-soup-authentic-vietnamese.jpg",
}: DishDetailPageProps) {
  const router = useRouter()
  const [liked, setLiked] = useState(false)
  const [showSupportModal, setShowSupportModal] = useState(false)

  const handleRestaurantClick = (restaurantId: string) => {
    router.push(`/restaurant/${restaurantId}`)
  }

  const handleDishClick = (dishId: string) => {
    router.push(`/dish/${dishId}`)
  }

  const handleSeeMoreReviews = () => {
    router.push(`/dish/${dishId}/reviews`)
  }

  // Tính toán rating trung bình
  const averageRating = mockReviews.length > 0
    ? (mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length).toFixed(1)
    : "0.0"

  return (
    <div className="min-h-screen bg-background">
      <TopHeader />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Back to Home Button */}
        <section className="mb-6">
          <Link href="/homepage">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft size={18} />
              <Home size={18} />
              <span>ホームに戻る</span>
            </Button>
          </Link>
        </section>

        {/* Section 1: 料理の基本情報 - Dish Basic Info */}
        <section className="mb-8">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                {/* Dish Image */}
                <div className="flex items-center justify-center">
                  <div className="w-full aspect-square bg-secondary rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={dishImage}
                      alt={dishName}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Dish Info */}
                <div className="flex flex-col justify-center space-y-6">
                  {/* Like Count */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setLiked(!liked)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      aria-label="Like dish"
                    >
                      <Heart
                        size={24}
                        className={liked ? "fill-red-500 text-red-500" : "text-red-500"}
                      />
                    </button>
                    <span className="text-lg font-medium text-foreground">{likeCount.toLocaleString()}</span>
                  </div>

                  {/* Dish Name */}
                  <h1 className="text-4xl font-bold text-foreground">{dishName}</h1>

                  {/* Ingredients */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                      原料
                    </h3>
                    <div className="space-y-2">
                      {dishIngredients.map((ingredient, index) => (
                        <p key={index} className="text-base text-foreground">
                          {ingredient}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="pt-4 border-t border-border">
                    <div className="text-right">
                      <span className="text-3xl font-bold text-foreground">
                        {dishPrice.toLocaleString("vi-VN")} VND
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 2: 店の情報 - Restaurant Info */}
        <section className="mb-8">
          <Link href={`/restaurant/${restaurantId}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={restaurantImage}
                      alt={restaurantName}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                      {restaurantName}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">店舗詳細を見る &gt;</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </section>

        {/* Section 3: 関連料理 - Related Dishes */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">関連料理</h2>
            <Link href="/dishes" className="text-sm text-primary hover:text-primary/80 font-medium">
              詳細を見る &gt;
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockRelatedDishes.map((dish) => (
              <Card
                key={dish.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => handleDishClick(dish.id)}
              >
                <div className="relative w-full aspect-square overflow-hidden">
                  <Image
                    src={dish.image || "/placeholder.svg"}
                    alt={dish.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4 text-center">
                  <p className="text-sm font-medium text-foreground">{dish.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 4: 同じ料理を提供するレストラン - Same Dish from Other Restaurants */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">同じ料理を提供するレストラン</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockRestaurants.map((restaurant) => (
              <Card
                key={restaurant.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => handleRestaurantClick(restaurant.id)}
              >
                <div className="relative w-full aspect-square overflow-hidden">
                  <Image
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4 text-center">
                  <p className="text-sm font-medium text-foreground">{restaurant.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 5: 料理レビュー - Reviews */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">料理レビュー</h2>
              <p className="text-sm text-muted-foreground mt-1">
                平均評価: <span className="font-semibold text-foreground">{averageRating}</span> / 5.0
                <span className="ml-2">({mockReviews.length}件のレビュー)</span>
              </p>
            </div>
          </div>
          <div className="space-y-6">
            {mockReviews.map((review) => (
              <Card key={review.id} className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                        {review.userName.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium text-foreground">{review.userName}</p>
                          {review.date && (
                            <p className="text-xs text-muted-foreground mt-0.5">{review.date}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={18}
                              className={
                                i < review.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-muted-foreground"
                              }
                            />
                          ))}
                          <span className="text-sm font-medium text-foreground ml-2">
                            {review.rating}.0
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed mt-2">{review.comment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 6: もっと見る Button */}
        <section className="mb-8 flex justify-center">
          <Button
            onClick={handleSeeMoreReviews}
            size="lg"
            className="rounded-full px-8 py-6 text-base font-medium bg-blue-600 hover:bg-amber-500 text-white cursor-pointer transition-colors duration-200"
          >
            もっと見る
          </Button>
        </section>
      </main>

      {/* Section 7: 料理紹介サポート - AI Support Chat Bubble */}
      <button
        onClick={() => setShowSupportModal(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all hover:scale-110 z-30"
        aria-label="AI food recommendation support"
      >
        <MessageCircle className="w-8 h-8" />
      </button>

      {/* AI Support Modal */}
      <AISupportModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />
    </div>
  )
}
