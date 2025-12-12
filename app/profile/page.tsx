"use client"

import { useState, useRef, useEffect } from "react"
import { TopHeader } from "@/components/TopHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, ChevronRight } from "lucide-react"
import Link from "next/link"
import { API_BASE_URL, getAuthToken } from "@/api/config"
import { toast } from "sonner"

export default function ProfilePage() {
  const [avatar, setAvatar] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    nationality: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [loading, setLoading] = useState(true)
  const [favoriteDishes, setFavoriteDishes] = useState<any[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch user profile data and favorites on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = getAuthToken()
        if (!token) {
          toast.error("認証トークンが見つかりません")
          return
        }

        const response = await fetch(`${API_BASE_URL}/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user profile')
        }

        const result = await response.json()
        
        if (result.data) {
          setFormData({
            name: result.data.name || "",
            nationality: result.data.national || "",
            email: result.data.email || "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
          })
          setAvatar(result.data.avatar || null)
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
        toast.error("ユーザー情報の取得に失敗しました")
      } finally {
        setLoading(false)
      }
    }

    const fetchFavoriteDishes = async () => {
      try {
        const token = getAuthToken()
        if (!token) return

        const response = await fetch(`${API_BASE_URL}/favourite-top3`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch favorite dishes')
        }

        const result = await response.json()
        
        if (result.status === "success" && result.data) {
          setFavoriteDishes(result.data)
        }
      } catch (error) {
        console.error('Error fetching favorite dishes:', error)
      }
    }

    fetchUserProfile()
    fetchFavoriteDishes()
  }, [])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSaveInfo = async () => {
    try {
      const token = getAuthToken()
      if (!token) {
        toast.error("認証トークンが見つかりません")
        return
      }

      const requestBody = {
        fullname: formData.name || null,
        national: formData.nationality || null,
        avatar: avatar || null,
        email: formData.email || null
      }

      const response = await fetch(`${API_BASE_URL}/updateUser`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        throw new Error('Failed to update user information')
      }

      const result = await response.json()
      
      if (result.message === "User information updated successfully") {
        toast.success("ユーザー情報が正常に更新されました")
      } else {
        toast.error("ユーザー情報の更新に失敗しました")
      }
    } catch (error) {
      console.error('Error updating user info:', error)
      toast.error("ユーザー情報の更新中にエラーが発生しました")
    }
  }

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("新しいパスワードと確認用パスワードが一致しません")
      return
    }

    if (!formData.currentPassword || !formData.newPassword) {
      toast.error("現在のパスワードと新しいパスワードを入力してください")
      return
    }

    try {
      const token = getAuthToken()
      if (!token) {
        toast.error("認証トークンが見つかりません")
        return
      }

      const requestBody = {
        oldPassword: formData.currentPassword,
        newPassword: formData.newPassword
      }

      const response = await fetch(`${API_BASE_URL}/updatePassword`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        throw new Error('Failed to update password')
      }

      const result = await response.json()
      
      if (result.message === "Password updated successfully") {
        toast.success("パスワードが正常に更新されました")
        // Clear password fields after successful update
        setFormData({
          ...formData,
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        })
      } else {
        toast.error("パスワードの更新に失敗しました")
      }
    } catch (error) {
      console.error('Error updating password:', error)
      toast.error("パスワードの更新中にエラーが発生しました")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <TopHeader userAvatar={avatar} />
        <div className="max-w-4xl mx-auto px-6 py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">読み込み中...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <TopHeader userAvatar={avatar} />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-slate-100">
          個人設定ページ
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Avatar */}
          <div className="lg:col-span-1 flex flex-col items-center">
            <div className="relative">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-lg">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="User avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-20 h-20 text-blue-500 dark:text-blue-400" />
                )}
              </div>
            </div>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="mt-6 bg-slate-700 hover:bg-slate-800 text-white dark:bg-slate-600 dark:hover:bg-slate-700 rounded-full px-6"
            >
              写真を変更
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          {/* Right Column - Basic Information */}
          <div className="lg:col-span-2">
            {/* Basic Information Section */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-8 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                  基本情報
                </h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    名前
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 border-slate-300 dark:border-slate-600 rounded-full px-4"
                    placeholder=""
                  />
                </div>

                <div>
                  <Label htmlFor="nationality" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    国籍
                  </Label>
                  <Input
                    id="nationality"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="mt-1 border-slate-300 dark:border-slate-600 rounded-full px-4"
                    placeholder=""
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    メール
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 border-slate-300 dark:border-slate-600 rounded-full px-4"
                    placeholder=""
                  />
                </div>

                <div className="flex justify-center pt-4">
                  <Button
                    onClick={handleSaveInfo}
                    className="bg-slate-700 hover:bg-slate-800 text-white dark:bg-slate-600 dark:hover:bg-slate-700 rounded-full px-8"
                  >
                    情報を保存
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Password Change Section */}
        <div className="mt-12 bg-white dark:bg-slate-800 rounded-2xl shadow-md p-8 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              パスワードの変更
            </h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentPassword" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                現在のパスワード
              </Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="mt-1 border-slate-300 dark:border-slate-600 rounded-full px-4"
                placeholder=""
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="newPassword" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  新しいパスワード
                </Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="mt-1 border-slate-300 dark:border-slate-600 rounded-full px-4"
                  placeholder=""
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  確認用パスワード
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="mt-1 border-slate-300 dark:border-slate-600 rounded-full px-4"
                  placeholder=""
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                onClick={handleChangePassword}
                className="bg-slate-700 hover:bg-slate-800 text-white dark:bg-slate-600 dark:hover:bg-slate-700 rounded-full px-8"
              >
                パスワードを変更
              </Button>
            </div>
          </div>
        </div>

        {/* Favorites Section */}
        <div className="mt-12 bg-white dark:bg-slate-800 rounded-2xl shadow-md p-8 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              お気に入り一覧
            </h2>
            <Link
              href="/favorites"
              className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              詳細
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {favoriteDishes.length > 0 ? (
              favoriteDishes.map((dish) => (
                <Link
                  key={dish.id}
                  href={`/dish/${dish.id}`}
                  className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4 border border-slate-200 dark:border-slate-600 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="w-full h-32 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    {dish.imageUrl ? (
                      <img
                        src={dish.imageUrl}
                        alt={dish.dishesname}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.nextElementSibling?.classList.remove('hidden')
                        }}
                      />
                    ) : null}
                    <svg
                      className={`w-16 h-16 text-slate-400 dark:text-slate-500 ${dish.imageUrl ? 'hidden' : ''}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="font-medium text-slate-800 dark:text-slate-100 text-center mb-1">
                    {dish.dishesname}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
                    {dish.restaurantname} - {dish.distance}m
                  </p>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-slate-500 dark:text-slate-400">
                お気に入りの料理がまだありません
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
