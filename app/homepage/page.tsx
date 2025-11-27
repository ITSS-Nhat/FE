"use client"

import { MessageCircle, Search } from "lucide-react"
import { useState, useEffect, useRef, useMemo } from "react"
import { CustomInput } from "@/components/ui/custom-input"
import { TopHeader } from "@/components/TopHeader"
import { PopularDishesRanking } from "@/components/PopularDishesRanking"
import { FavoriteList } from "@/components/FavoriteList"
import { NearbyRestaurants } from "@/components/NearbyRestaurants"
import { RecommendedDishes } from "@/components/RecommendedDishes"
import { AISupportModal } from "@/components/AISupportModal"
import { authApi } from "@/api/api"
import { getAuthToken } from "@/api/config"

// Helper function to decode JWT and get username (without @gmail.com)
const getUsernameFromToken = (): string | null => {
  if (typeof window === 'undefined') return null
  const token = getAuthToken()
  if (!token) return null
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const username = payload.sub || payload.username || null
    if (username) {
      // Remove @gmail.com or any email domain
      return username.split('@')[0]
    }
    return null
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}

export default function HomePage() {
  const [showAISupport, setShowAISupport] = useState(false)
  const [userName, setUserName] = useState("はる")
  const [userAvatar, setUserAvatar] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)

  const popularDishes = [
    { id: 1, imageUrl: "/pho-noodle-soup-authentic-vietnamese.jpg", name: "料理1", rate: 4.8 },
    { id: 2, imageUrl: "/banh-mi-vietnamese-sandwich.jpg", name: "料理2", rate: 4.7 },
    { id: 3, imageUrl: "/spring-rolls-fresh-vietnamese.jpg", name: "料理3", rate: 4.6 },
  ]

  const favoriteDishes = [
    { id: 1, name: "料理4", restaurant: "ABCレストラン - 1km", image: "/pho-noodle-soup-authentic-vietnamese.jpg" },
    { id: 2, name: "料理5", restaurant: "ABCレストラン - 1km", image: "/banh-mi-vietnamese-sandwich.jpg" },
    { id: 3, name: "料理6", restaurant: "ABCレストラン - 1km", image: "/spring-rolls-fresh-vietnamese.jpg" },
  ]

  const nearbyRestaurants = [
    { id: 1, name: "レストランA", price: "100m-(100k-200k)", image: "/vietnamese-food-table-spread.jpg" },
    { id: 2, name: "レストランB", price: "100m-(100k-200k)", image: "/vietnamese-food-table-spread.jpg" },
    { id: 3, name: "レストランC", price: "100m-(100k-200k)", image: "/vietnamese-food-table-spread.jpg" },
    { id: 4, name: "レストランD", price: "100m-(100k-200k)", image: "/vietnamese-food-table-spread.jpg" },
  ]

  const recommendedDishes = [
    { id: 1, name: "料理1", restaurant: "ABCレストラン - 1km", image: "/pho-noodle-soup-authentic-vietnamese.jpg" },
    { id: 2, name: "料理2", restaurant: "ABCレストラン - 1km", image: "/banh-mi-vietnamese-sandwich.jpg" },
    { id: 3, name: "料理3", restaurant: "ABCレストラン - 1km", image: "/spring-rolls-fresh-vietnamese.jpg" },
    { id: 4, name: "料理4", restaurant: "ABCレストラン - 1km", image: "/pho-noodle-soup-authentic-vietnamese.jpg" },
    { id: 5, name: "料理5", restaurant: "ABCレストラン - 1km", image: "/banh-mi-vietnamese-sandwich.jpg" },
    { id: 6, name: "料理6", restaurant: "ABCレストラン - 1km", image: "/spring-rolls-fresh-vietnamese.jpg" },
  ]

  // Fetch user info on mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Get username from JWT token
        const username = getUsernameFromToken()
        if (username) {
          setUserName(username)
        }
        
        // Try to get user info from API
        await authApi.getCurrentUser()
        // In the future, if API returns name and avatar, update here
      } catch (error) {
        console.error("Failed to fetch user info:", error)
      }
    }
    fetchUserInfo()
  }, [])


  // Get all available images from public folder
  const availableImages = [
    "/pho-noodle-soup-authentic-vietnamese.jpg",
    "/pho-noodle-soup-authentic-vietnamese.png",
    "/banh-mi-vietnamese-sandwich.jpg",
    "/spring-rolls-fresh-vietnamese.png",
    "/vietnamese-food-table-spread.jpg",
    "/vietnamese-food-table-spread.png",
    "/authentic-vietnamese-pho-restaurant-with-vibrant-c.jpg",
  ]

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "おはようございます"
    if (hour < 18) return "こんにちは"
    return "こんばんは"
  }

  // Search functionality - filter all items on homepage
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null

    const query = searchQuery.toLowerCase().trim()
    const results = {
      dishes: [] as typeof popularDishes,
      favorites: [] as typeof favoriteDishes,
      restaurants: [] as typeof nearbyRestaurants,
      recommended: [] as typeof recommendedDishes,
    }

    // Search in popular dishes
    results.dishes = popularDishes.filter(
      (dish) => dish.name.toLowerCase().includes(query)
    )

    // Search in favorite dishes
    results.favorites = favoriteDishes.filter(
      (dish) =>
        dish.name.toLowerCase().includes(query) ||
        dish.restaurant.toLowerCase().includes(query)
    )

    // Search in nearby restaurants
    results.restaurants = nearbyRestaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.price.toLowerCase().includes(query)
    )

    // Search in recommended dishes
    results.recommended = recommendedDishes.filter(
      (dish) =>
        dish.name.toLowerCase().includes(query) ||
        dish.restaurant.toLowerCase().includes(query)
    )

    const hasResults =
      results.dishes.length > 0 ||
      results.favorites.length > 0 ||
      results.restaurants.length > 0 ||
      results.recommended.length > 0

    return hasResults ? results : null
  }, [searchQuery])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setShowSearchResults(value.trim().length > 0)
  }

  // Close search results when clicking outside
  const searchRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        if (searchQuery.trim().length === 0) {
          setShowSearchResults(false)
        }
      }
    }
    if (showSearchResults) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showSearchResults, searchQuery])

  return (
    <div className="min-h-screen bg-background">
      <TopHeader userAvatar={userAvatar} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Greeting Section */}
        <section className="mb-12" ref={searchRef}>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            {getGreeting()}、{userName}さん！
          </h2>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <CustomInput
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSearchResults(searchQuery.trim().length > 0)}
                placeholder="食べたい料理や行きたい場所を入力..."
                className="pl-12 pr-4"
              />
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Results */}
          {showSearchResults && searchResults && (
            <div className="mt-4 bg-background border rounded-lg shadow-lg p-6 max-h-96 overflow-y-auto">
              <h3 className="text-lg font-semibold text-foreground mb-4">検索結果</h3>
              
              {searchResults.dishes.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">人気料理</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {searchResults.dishes.map((dish) => (
                      <div key={dish.id} className="flex flex-col items-center">
                        <img
                          src={dish.imageUrl || availableImages[0]}
                          alt={dish.name}
                          className="w-24 h-24 rounded-lg object-cover bg-muted mb-2"
                        />
                        <p className="text-sm font-medium text-foreground">{dish.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.favorites.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">お気に入り</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {searchResults.favorites.map((dish) => (
                      <div key={dish.id} className="flex flex-col items-center">
                        <img
                          src={dish.image || availableImages[0]}
                          alt={dish.name}
                          className="w-24 h-24 rounded-lg object-cover bg-muted mb-2"
                        />
                        <p className="text-sm font-medium text-foreground">{dish.name}</p>
                        <p className="text-xs text-muted-foreground">{dish.restaurant}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.restaurants.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">レストラン</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {searchResults.restaurants.map((restaurant) => (
                      <div key={restaurant.id} className="flex flex-col items-center">
                        <img
                          src={restaurant.image || availableImages[0]}
                          alt={restaurant.name}
                          className="w-24 h-24 rounded-lg object-cover bg-muted mb-2"
                        />
                        <p className="text-sm font-medium text-foreground">{restaurant.name}</p>
                        <p className="text-xs text-muted-foreground">{restaurant.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.recommended.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">おすすめ</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {searchResults.recommended.map((dish) => (
                      <div key={dish.id} className="flex flex-col items-center">
                        <img
                          src={dish.image || availableImages[0]}
                          alt={dish.name}
                          className="w-24 h-24 rounded-lg object-cover bg-muted mb-2"
                        />
                        <p className="text-sm font-medium text-foreground">{dish.name}</p>
                        <p className="text-xs text-muted-foreground">{dish.restaurant}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {showSearchResults && !searchResults && searchQuery.trim().length > 0 && (
            <div className="mt-4 bg-background border rounded-lg shadow-lg p-6">
              <p className="text-muted-foreground text-center">検索結果が見つかりませんでした</p>
            </div>
          )}
        </section>

        {/* Popular Dishes Ranking */}
        {!showSearchResults && (
          <PopularDishesRanking dishes={popularDishes} availableImages={availableImages} />
        )}

        {/* Favorites List */}
        {!showSearchResults && (
          <FavoriteList dishes={favoriteDishes} availableImages={availableImages} />
        )}

        {/* Nearby Restaurants */}
        {!showSearchResults && (
          <NearbyRestaurants restaurants={nearbyRestaurants} availableImages={availableImages} />
        )}

        {/* Recommended Dishes */}
        {!showSearchResults && (
          <RecommendedDishes dishes={recommendedDishes} availableImages={availableImages} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted py-8 px-6 text-center text-sm text-muted-foreground">
        <p>© 2025 ベトめしガイド. All rights reserved.</p>
      </footer>

      {/* Floating Chat Bubble */}
      <button
        onClick={() => setShowAISupport(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-110 z-30"
        aria-label="AI food recommendation support"
      >
        <MessageCircle className="w-8 h-8 text-primary-foreground" />
      </button>

      {/* AI Support Modal */}
      <AISupportModal 
        isOpen={showAISupport} 
        onClose={() => setShowAISupport(false)} 
      />
    </div>
  )
}
