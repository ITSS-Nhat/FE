"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronLeft, Star, MessageCircle } from "lucide-react"
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
  images?: string[]
  date?: string
}

interface DishReviewsPageProps {
  dishId?: string
}

const mockReviews: Review[] = [
  {
    id: "1",
    userName: "ユーザーの名前",
    rating: 5,
    comment: "本当に美味しい！材料が新鮮で、味わいが素晴らしい。また来たいです。",
    images: ["/pho-noodle-soup-authentic-vietnamese.jpg", "/banh-mi-vietnamese-sandwich.jpg"],
    date: "2024年1月15日",
  },
  {
    id: "2",
    userName: "ユーザーの名前2",
    rating: 4,
    comment: "香りが良くて、ボリュームもちょうど良い。おすすめできる一品です。",
    images: ["/spring-rolls-fresh-vietnamese.jpg"],
    date: "2024年1月10日",
  },
  {
    id: "3",
    userName: "ユーザーの名前3",
    rating: 5,
    comment: "ベトナムで食べたものと同じ味！懐かしい感じがして大好きです。",
    images: [],
    date: "2024年1月5日",
  },
  {
    id: "4",
    userName: "ユーザーの名前4",
    rating: 4,
    comment: "価格も手頃で、サービスも良かったです。また来たいと思います。",
    images: ["/vietnamese-food-table-spread.jpg"],
    date: "2024年1月3日",
  },
  {
    id: "5",
    userName: "ユーザーの名前5",
    rating: 5,
    comment: "素晴らしい味でした。特にスパイスの効き具合が絶妙です。",
    images: [],
    date: "2023年12月28日",
  },
]

export function DishReviewsPage({ dishId = "1" }: DishReviewsPageProps) {
  const router = useRouter()
  const [reviews] = useState<Review[]>(mockReviews)
  const [showSupportModal, setShowSupportModal] = useState(false)
  const [displayedCount, setDisplayedCount] = useState(3)

  const handleLoadMore = () => {
    setDisplayedCount((prev) => Math.min(prev + 3, reviews.length))
  }

  const displayedReviews = reviews.slice(0, displayedCount)

  // Tính toán rating trung bình
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : "0.0"

  return (
    <div className="min-h-screen bg-background">
      <TopHeader />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Title Section with Back Button */}
        <section className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="rounded-full"
              aria-label="戻る"
            >
              <ChevronLeft size={24} className="text-foreground" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">料理レビュー</h1>
              <p className="text-sm text-muted-foreground mt-1">
                平均評価: <span className="font-semibold text-foreground">{averageRating}</span> / 5.0
                <span className="ml-2">({reviews.length}件のレビュー)</span>
              </p>
            </div>
          </div>
        </section>

        {/* Reviews List */}
        <section className="space-y-6 mb-8">
          {displayedReviews.map((review) => (
            <Card key={review.id} className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Review Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                      {review.userName.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div>
                        <p className="font-semibold text-foreground">{review.userName}</p>
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
                  </div>
                </div>

                {/* Review Comment */}
                <p className="text-sm text-foreground mb-4 text-pretty leading-relaxed pl-18">
                  {review.comment}
                </p>

                {/* Review Images */}
                {review.images && review.images.length > 0 && (
                  <div className="flex gap-3 mt-4 pl-18">
                    {review.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative w-24 h-24 rounded-lg overflow-hidden bg-secondary flex-shrink-0 group cursor-pointer"
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Review image ${index + 1}`}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Load More Button */}
        {displayedCount < reviews.length && (
          <section className="flex justify-center mb-8">
            <Button
              onClick={handleLoadMore}
              size="lg"
             className="rounded-full px-8 py-6 text-base font-medium bg-blue-600 hover:bg-amber-500 text-white cursor-pointer transition-colors duration-200"
            >
        
              もっと見る
            </Button>
          </section>
        )}

        {/* No more reviews message */}
        {displayedCount >= reviews.length && reviews.length > 0 && (
          <section className="flex justify-center mb-8">
            <p className="text-sm text-muted-foreground">すべてのレビューを表示しました</p>
          </section>
        )}
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
