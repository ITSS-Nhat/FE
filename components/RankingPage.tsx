"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart, MessageCircle, ChevronLeft } from "lucide-react"
import { TopHeader } from "@/components/TopHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AISupportModal } from "@/components/AISupportModal"

interface RankingItem {
  id: string
  name: string
  description: string
  image: string
  likeCount: number
  address?: string
  type: "dish" | "restaurant"
}

const mockDishRankings: RankingItem[] = [
  {
    id: "1",
    name: "料理1",
    description: "新鮮な材料を使った伝統的なベトナム料理。香り豊かで、ボリュームたっぷりです。",
    image: "/pho-noodle-soup-authentic-vietnamese.jpg",
    likeCount: 363636,
    type: "dish",
  },
  {
    id: "2",
    name: "料理2",
    description: "サクサクのパンと新鮮な具材が絶妙なハーモニーを奏でる一品。",
    image: "/banh-mi-vietnamese-sandwich.jpg",
    likeCount: 183618,
    type: "dish",
  },
  {
    id: "3",
    name: "料理3",
    description: "春巻きのサクサクとした食感と、中身のジューシーさが魅力です。",
    image: "/spring-rolls-fresh-vietnamese.jpg",
    likeCount: 181818,
    type: "dish",
  },
  {
    id: "4",
    name: "料理4",
    description: "本格的なベトナムの味を楽しめる、こだわりの一品です。",
    image: "/vietnamese-food-table-spread.jpg",
    likeCount: 120000,
    type: "dish",
  },
  {
    id: "5",
    name: "料理5",
    description: "スパイシーな味わいが特徴的な、ベトナムの人気料理です。",
    image: "/authentic-vietnamese-pho-restaurant-with-vibrant-c.jpg",
    likeCount: 95000,
    type: "dish",
  },
  {
    id: "6",
    name: "料理6",
    description: "ヘルシーで栄養満点、毎日食べても飽きない味です。",
    image: "/pho-noodle-soup-authentic-vietnamese.jpg",
    likeCount: 85000,
    type: "dish",
  },
  {
    id: "7",
    name: "料理7",
    description: "伝統的なレシピを守りながら、現代的なアレンジも加えた一品。",
    image: "/banh-mi-vietnamese-sandwich.jpg",
    likeCount: 75000,
    type: "dish",
  },
  {
    id: "8",
    name: "料理8",
    description: "見た目も美しく、味も絶品のベトナム料理です。",
    image: "/spring-rolls-fresh-vietnamese.jpg",
    likeCount: 65000,
    type: "dish",
  },
  {
    id: "9",
    name: "料理9",
    description: "本場の味を再現した、こだわりのベトナム料理。",
    image: "/vietnamese-food-table-spread.jpg",
    likeCount: 55000,
    type: "dish",
  },
  {
    id: "10",
    name: "料理10",
    description: "新鮮な食材と丁寧な調理で作られた、心温まる一品です。",
    image: "/authentic-vietnamese-pho-restaurant-with-vibrant-c.jpg",
    likeCount: 45000,
    type: "dish",
  },
]

const mockRestaurantRankings: RankingItem[] = [
  {
    id: "1",
    name: "レストランA",
    description: "本格的なベトナム料理を提供する人気レストラン。",
    image: "/pho-noodle-soup-authentic-vietnamese.jpg",
    likeCount: 250000,
    address: "123 ベトナム通り, ホーチミン市",
    type: "restaurant",
  },
  {
    id: "2",
    name: "レストランB",
    description: "新鮮な食材と伝統的な味を大切にするレストラン。",
    image: "/banh-mi-vietnamese-sandwich.jpg",
    likeCount: 200000,
    address: "456 ベトナム通り, ホーチミン市",
    type: "restaurant",
  },
  {
    id: "3",
    name: "レストランC",
    description: "モダンな雰囲気でベトナム料理を楽しめるお店。",
    image: "/spring-rolls-fresh-vietnamese.jpg",
    likeCount: 180000,
    address: "789 ベトナム通り, ホーチミン市",
    type: "restaurant",
  },
  {
    id: "4",
    name: "レストランD",
    description: "家族連れにもおすすめの、温かみのあるレストラン。",
    image: "/vietnamese-food-table-spread.jpg",
    likeCount: 150000,
    address: "321 ベトナム通り, ホーチミン市",
    type: "restaurant",
  },
  {
    id: "5",
    name: "レストランE",
    description: "本場の味を再現した、こだわりのレストランです。",
    image: "/authentic-vietnamese-pho-restaurant-with-vibrant-c.jpg",
    likeCount: 120000,
    address: "654 ベトナム通り, ホーチミン市",
    type: "restaurant",
  },
]

type RankingType = "dish" | "restaurant"

export function RankingPage() {
  const router = useRouter()
  const [rankingType, setRankingType] = useState<RankingType>("dish")
  const [showSupportModal, setShowSupportModal] = useState(false)
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set())

  const currentRankings = rankingType === "dish" ? mockDishRankings : mockRestaurantRankings

  const handleLike = (id: string, currentCount: number) => {
    setLikedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleViewDetails = (item: RankingItem) => {
    if (item.type === "dish") {
      router.push(`/dish/${item.id}`)
    } else {
      router.push(`/restaurant/${item.id}`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <TopHeader />

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Back Button */}
        <section className="mb-6">
          <Link href="/homepage">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft size={18} />
              <span>戻る</span>
            </Button>
          </Link>
        </section>

        {/* Section 1: ページタイトル - Page Title */}
        <section className="mb-8">
          <h1 className="text-4xl font-bold text-foreground text-center">
            {rankingType === "dish" ? "人気料理ランキング" : "人気レストランランキング"}
          </h1>
        </section>

        {/* Tabs for switching between Dish and Restaurant rankings */}
        <section className="mb-8">
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setRankingType("dish")}
              className={`rounded-full px-8 py-6 text-base font-medium transition-colors duration-200 ${
                rankingType === "dish"
                  ? "bg-blue-600 hover:bg-amber-500 text-white"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              料理ランキング
            </Button>
            <Button
              onClick={() => setRankingType("restaurant")}
              className={`rounded-full px-8 py-6 text-base font-medium transition-colors duration-200 ${
                rankingType === "restaurant"
                  ? "bg-blue-600 hover:bg-amber-500 text-white"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              レストランランキング
            </Button>
          </div>
        </section>

        {/* Section 2: ランキング一覧 - Ranking List */}
        <section className="mb-8">
          <div className="space-y-4">
            {currentRankings.map((item, index) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-l-primary"
              >
                <CardContent className="p-6">
                  <div className="flex gap-6 items-center">
                    {/* Rank Number */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center text-white font-bold text-2xl shadow-md">
                        {index + 1}
                      </div>
                    </div>

                    {/* Section 3: 料理画像 - Dish Image */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-secondary">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Section 4: 料理名と説明 - Dish Name and Description */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{item.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                        {item.description}
                      </p>
                      {item.address && (
                        <p className="text-xs text-muted-foreground">{item.address}</p>
                      )}
                    </div>

                    {/* Section 5: いいね数 - Like Count */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-3">
                      <button
                        onClick={() => handleLike(item.id, item.likeCount)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        aria-label="Like"
                      >
                        <Heart
                          size={24}
                          className={
                            likedItems.has(item.id)
                              ? "fill-red-500 text-red-500"
                              : "text-red-500"
                          }
                        />
                      </button>
                      <span className="text-lg font-semibold text-foreground">
                        {item.likeCount.toLocaleString()}
                      </span>
                    </div>

                    {/* View Details Button */}
                    <div className="flex-shrink-0">
                      <Button
                        onClick={() => handleViewDetails(item)}
                        className="rounded-full px-8 py-6 text-base font-medium bg-blue-600 hover:bg-amber-500 text-white cursor-pointer transition-colors duration-200"
                      >
                        詳細を見る
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Section 6: 料理紹介サポート - AI Support Chat Bubble */}
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

