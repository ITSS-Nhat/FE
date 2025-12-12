"use client"

import { X } from "lucide-react"

interface AISupportModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AISupportModal({ isOpen, onClose }: AISupportModalProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Dark overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl shadow-yellow-500/20 w-full max-w-md max-h-[90vh] flex flex-col border border-yellow-200 animate-in fade-in-0 zoom-in-95 duration-200">
          {/* Modal header */}
          <div className="flex justify-between items-center p-6 border-b border-yellow-200 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-t-xl">
            <h3 className="text-xl font-semibold text-yellow-800">紹介サポート</h3>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-yellow-200 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-yellow-600" />
            </button>
          </div>

          {/* Modal body */}
          <div className="flex-1 overflow-y-auto p-6 bg-white rounded-b-xl">
            <p className="text-gray-700 mb-6 text-base leading-relaxed">
              ベトナム料理のおすすめをAIがサポートします。どんなお料理がお好みですか？
            </p>
            <div className="space-y-3">
              <button 
                className="w-full p-4 text-left bg-yellow-50 hover:bg-yellow-100 rounded-lg text-gray-800 transition-all duration-200 hover:shadow-md hover:shadow-yellow-500/30 hover:scale-[1.02] border border-yellow-200 hover:border-yellow-400"
                onClick={() => {
                  // Handle spicy food selection
                  console.log("スパイシーな料理 selected")
                }}
              >
                <span className="text-xl mr-2">🌶️</span>
                <span className="font-medium">スパイシーな料理</span>
              </button>
              <button 
                className="w-full p-4 text-left bg-yellow-50 hover:bg-yellow-100 rounded-lg text-gray-800 transition-all duration-200 hover:shadow-md hover:shadow-yellow-500/30 hover:scale-[1.02] border border-yellow-200 hover:border-yellow-400"
                onClick={() => {
                  // Handle soup/noodles selection
                  console.log("スープ・めん類 selected")
                }}
              >
                <span className="text-xl mr-2">🍜</span>
                <span className="font-medium">スープ・めん類</span>
              </button>
              <button 
                className="w-full p-4 text-left bg-yellow-50 hover:bg-yellow-100 rounded-lg text-gray-800 transition-all duration-200 hover:shadow-md hover:shadow-yellow-500/30 hover:scale-[1.02] border border-yellow-200 hover:border-yellow-400"
                onClick={() => {
                  // Handle healthy/vegetables selection
                  console.log("ヘルシー・野菜 selected")
                }}
              >
                <span className="text-xl mr-2">🌿</span>
                <span className="font-medium">ヘルシー・野菜</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

