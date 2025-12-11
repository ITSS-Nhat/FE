"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Star, MessageCircle, MapPin, Clock, Phone, Mail } from "lucide-react"
import { TopHeader } from "@/components/TopHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AISupportModal } from "@/components/AISupportModal"

interface PopularDish {
  id: string
  name: string
  image: string
}

interface RestaurantDetailPageProps {
  restaurantId?: string
  restaurantName?: string
  restaurantImage?: string
  description?: string
  address?: string
  phone?: string
  email?: string
  openTime?: string
  closeTime?: string
  rating?: number
  reviewCount?: number
  popularDishes?: PopularDish[]
  latitude?: number
  longitude?: number
}

const mockPopularDishes: PopularDish[] = [
  { id: "1", name: "料理1", image: "/pho-noodle-soup-authentic-vietnamese.jpg" },
  { id: "2", name: "料理2", image: "/banh-mi-vietnamese-sandwich.jpg" },
  { id: "3", name: "料理3", image: "/spring-rolls-fresh-vietnamese.jpg" },
  { id: "4", name: "料理4", image: "/vietnamese-food-table-spread.jpg" },
  { id: "5", name: "料理5", image: "/authentic-vietnamese-pho-restaurant-with-vibrant-c.jpg" },
]

export function RestaurantDetailPage({
  restaurantId = "1",
  restaurantName = "名前のレストラン",
  restaurantImage = "/pho-noodle-soup-authentic-vietnamese.jpg",
  description = "ベトナム料理を提供する人気レストランです。新鮮な食材を使い、伝統的な味を大切にしています。",
  address = "123 ベトナム通り, ホーチミン市",
  phone = "+84 123 456 789",
  email = "info@restaurant.com",
  openTime = "10:00",
  closeTime = "22:00",
  rating = 4.5,
  reviewCount = 120,
  popularDishes = mockPopularDishes,
  latitude = 10.8231,
  longitude = 106.6297,
}: RestaurantDetailPageProps) {
  const router = useRouter()
  const [showSupportModal, setShowSupportModal] = useState(false)

  const handleDishClick = (dishId: string) => {
    router.push(`/dish/${dishId}`)
  }

  const handleMapClick = () => {
    // Mở Google Maps với địa chỉ nhà hàng
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
    window.open(googleMapsUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      <TopHeader />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Section 1: 戻るボタン - Back Button */}
        <section className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft size={18} />
            <span>戻る</span>
          </Button>
        </section>

        {/* Section 2: レストラン詳細タイトル - Page Title */}
        <section className="mb-8">
          <h1 className="text-4xl font-bold text-foreground text-center">レストラン詳細</h1>
        </section>

        {/* Section 3 & 4: Restaurant Image and Basic Info */}
        <section className="mb-8">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                {/* Section 3: レストラン画像 - Restaurant Image */}
                <div className="flex items-center justify-center">
                  <div className="w-full aspect-square bg-secondary rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={restaurantImage}
                      alt={restaurantName}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Section 4: レストランの基本情報 - Restaurant Basic Info */}
                <div className="flex flex-col justify-center space-y-6">
                  {/* Restaurant Name */}
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-4">{restaurantName}</h2>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                      <span className="text-xl font-semibold text-foreground">{rating.toFixed(1)}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({reviewCount}件のレビュー)</span>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      紹介
                    </h3>
                    <p className="text-base text-foreground leading-relaxed">{description}</p>
                  </div>

                  {/* Reviews Link */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      レビュー
                    </h3>
                    <Link href={`/restaurant/${restaurantId}/reviews`}>
                      <Button variant="outline" className="w-full sm:w-auto">
                        レビューを見る ({reviewCount}件)
                      </Button>
                    </Link>
                  </div>

                  {/* Location */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      場所
                    </h3>
                    <p className="text-base text-foreground">{address}</p>
                  </div>

                  {/* Business Hours */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      営業時間
                    </h3>
                    <p className="text-base text-foreground">
                      {openTime} - {closeTime}
                    </p>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      連絡先情報
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <a href={`tel:${phone}`} className="text-base text-foreground hover:text-primary">
                          {phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <a href={`mailto:${email}`} className="text-base text-foreground hover:text-primary">
                          {email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 5 & 6: 人気料理一覧 - Popular Dishes */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">レストランの人気料理</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {popularDishes.map((dish) => (
              <div key={dish.id} className="flex flex-col items-center">
                {/* Section 5: Dish Image */}
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-secondary mb-3 group cursor-pointer">
                  <Image
                    src={dish.image || "/placeholder.svg"}
                    alt={dish.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onClick={() => handleDishClick(dish.id)}
                  />
                </div>
                {/* Section 6: 料理ボタン - Dish Button */}
                <Button
                  onClick={() => handleDishClick(dish.id)}
                  className="rounded-full px-8 py-6 text-base font-medium bg-blue-600 hover:bg-amber-500 text-white cursor-pointer transition-colors duration-200 w-full"
                >
                  {dish.name}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: レストランの住所 - Restaurant Address with Map */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">レストランの住所</h2>
          <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={handleMapClick}>
            <CardContent className="p-0">
              <div className="relative w-full h-96 bg-muted">
                {/* Map Placeholder - Có thể thay bằng Google Maps embed sau */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="text-lg font-semibold text-foreground mb-2">{address}</p>
                    <p className="text-sm text-muted-foreground">クリックしてGoogleマップで開く</p>
                  </div>
                </div>
                {/* Map Image Placeholder */}
                <div className="absolute inset-0 opacity-20">
                  <Image
                    src="/vietnamese-food-table-spread.jpg"
                    alt="Map"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Section 8: 料理紹介サポート - AI Support Chat Bubble */}
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

