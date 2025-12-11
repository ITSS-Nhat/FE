"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ChevronRight, Star, MessageCircle, ChevronLeft } from "lucide-react"
import { TopHeader } from "@/components/TopHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CustomInput } from "@/components/ui/custom-input"
import { AISupportModal } from "@/components/AISupportModal"

interface RestaurantReview {
  id: string
  name: string
  image: string
  rating: {
    all: number
    five: number
    four: number
    three: number
    oneTwo: number
  }
  averageRating: number
}

const mockRestaurants: RestaurantReview[] = [
  {
    id: "1",
    name: "名前のレストラン",
    image: "/pho-noodle-soup-authentic-vietnamese.jpg",
    rating: {
      all: 120,
      five: 45,
      four: 35,
      three: 25,
      oneTwo: 15,
    },
    averageRating: 4.2,
  },
  {
    id: "2",
    name: "名前のレストラン2",
    image: "/banh-mi-vietnamese-sandwich.jpg",
    rating: {
      all: 98,
      five: 40,
      four: 30,
      three: 20,
      oneTwo: 8,
    },
    averageRating: 4.5,
  },
  {
    id: "3",
    name: "名前のレストラン3",
    image: "/spring-rolls-fresh-vietnamese.jpg",
    rating: {
      all: 85,
      five: 35,
      four: 28,
      three: 15,
      oneTwo: 7,
    },
    averageRating: 4.3,
  },
  {
    id: "4",
    name: "名前のレストラン4",
    image: "/vietnamese-food-table-spread.jpg",
    rating: {
      all: 110,
      five: 50,
      four: 35,
      three: 20,
      oneTwo: 5,
    },
    averageRating: 4.6,
  },
  {
    id: "5",
    name: "名前のレストラン5",
    image: "/authentic-vietnamese-pho-restaurant-with-vibrant-c.jpg",
    rating: {
      all: 75,
      five: 30,
      four: 25,
      three: 15,
      oneTwo: 5,
    },
    averageRating: 4.1,
  },
  {
    id: "6",
    name: "名前のレストラン6",
    image: "/pho-noodle-soup-authentic-vietnamese.jpg",
    rating: {
      all: 95,
      five: 38,
      four: 32,
      three: 18,
      oneTwo: 7,
    },
    averageRating: 4.4,
  },
]

type SortOption = "rating" | "name" | "reviews"
type FilterOption = "all" | "5" | "4" | "3" | "1-2"

export function RestaurantReviewsPage() {
  const router = useRouter()
  const filterMenuRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState<SortOption>("rating")
  const [filterOption, setFilterOption] = useState<FilterOption>("all")
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [showSupportModal, setShowSupportModal] = useState(false)

  // Close filter menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target as Node)) {
        setShowFilterMenu(false)
      }
    }
    if (showFilterMenu) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showFilterMenu])

  // Filter và sort restaurants
  const filteredAndSortedRestaurants = useMemo(() => {
    let filtered = [...mockRestaurants]

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
      )
    }

    // Filter by rating
    if (filterOption !== "all") {
      filtered = filtered.filter((restaurant) => {
        switch (filterOption) {
          case "5":
            return restaurant.rating.five > 0
          case "4":
            return restaurant.rating.four > 0
          case "3":
            return restaurant.rating.three > 0
          case "1-2":
            return restaurant.rating.oneTwo > 0
          default:
            return true
        }
      })
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortOption) {
        case "rating":
          return b.averageRating - a.averageRating
        case "name":
          return a.name.localeCompare(b.name)
        case "reviews":
          return b.rating.all - a.rating.all
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, sortOption, filterOption])

  const handleViewDetails = (restaurantId: string) => {
    router.push(`/restaurant/${restaurantId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <TopHeader />

      <main className="max-w-7xl mx-auto px-6 py-8">
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

        {/* Page Title */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-foreground text-center mb-8">
            レストランレビュー一覧
          </h1>
        </section>

        {/* Search Bar */}
        <section className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <CustomInput
              type="text"
              placeholder="料理名を入力してレビューを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Search className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </section>

        {/* Sort and Filter Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="relative" ref={filterMenuRef}>
              <Button
                variant="outline"
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="flex items-center gap-2"
              >
                <span>詳細</span>
                <ChevronRight className="w-4 h-4" />
              </Button>

              {showFilterMenu && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-background border rounded-lg shadow-lg z-10 p-4">
                  <div className="space-y-4">
                    {/* Sort Options */}
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">並び替え</p>
                      <div className="space-y-2">
                        {[
                          { value: "rating", label: "評価順" },
                          { value: "name", label: "名前順" },
                          { value: "reviews", label: "レビュー数順" },
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortOption(option.value as SortOption)
                              setShowFilterMenu(false)
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              sortOption === option.value
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted hover:bg-muted/80 text-foreground"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Filter Options */}
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">フィルター</p>
                      <div className="space-y-2">
                        {[
                          { value: "all", label: "All" },
                          { value: "5", label: "5" },
                          { value: "4", label: "4+" },
                          { value: "3", label: "3+" },
                          { value: "1-2", label: "1-2" },
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setFilterOption(option.value as FilterOption)
                              setShowFilterMenu(false)
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              filterOption === option.value
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted hover:bg-muted/80 text-foreground"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              {filteredAndSortedRestaurants.length}件のレストランが見つかりました
            </p>
          </div>
        </section>

        {/* Restaurant Reviews Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAndSortedRestaurants.map((restaurant) => (
              <Card
                key={restaurant.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="flex gap-4 p-6">
                    {/* Restaurant Image */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-secondary">
                        <Image
                          src={restaurant.image || "/placeholder.svg"}
                          alt={restaurant.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Restaurant Info */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2 truncate">
                          {restaurant.name}
                        </h3>

                        {/* Rating Display */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-medium text-foreground">
                              {restaurant.averageRating.toFixed(1)}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            (All / {restaurant.rating.five} / {restaurant.rating.four}+ /{" "}
                            {restaurant.rating.three}+ / {restaurant.rating.oneTwo})
                          </span>
                        </div>
                      </div>

                      {/* View Details Button */}
                      <Button
                        onClick={() => handleViewDetails(restaurant.id)}
                        className="rounded-full px-8 py-6 text-base font-medium bg-blue-600 hover:bg-amber-500 text-white cursor-pointer transition-colors duration-200 w-full sm:w-auto"
                      >
                        詳細を見る
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredAndSortedRestaurants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">検索結果が見つかりませんでした</p>
            </div>
          )}
        </section>
      </main>

      {/* AI Support Chat Bubble */}
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

