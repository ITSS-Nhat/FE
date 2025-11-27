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
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col border border-slate-200 dark:border-slate-700 animate-in fade-in-0 zoom-in-95 duration-200">
          {/* Modal header */}
          <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 rounded-t-xl">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">紹介サポート</h3>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
          </div>

          {/* Modal body */}
          <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-slate-800 rounded-b-xl">
            <p className="text-slate-700 dark:text-slate-200 mb-6 text-base leading-relaxed">
              ベトナム料理のおすすめをAIがサポートします。どんなお料理がお好みですか？
            </p>
            <div className="space-y-3">
              <button 
                className="w-full p-4 text-left bg-slate-100 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-slate-600 rounded-lg text-slate-800 dark:text-slate-200 transition-all duration-200 hover:shadow-md hover:scale-[1.02] border border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500"
                onClick={() => {
                  // Handle spicy food selection
                  console.log("スパイシーな料理 selected")
                }}
              >
                <span className="text-xl mr-2">🌶️</span>
                <span className="font-medium">スパイシーな料理</span>
              </button>
              <button 
                className="w-full p-4 text-left bg-slate-100 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-slate-600 rounded-lg text-slate-800 dark:text-slate-200 transition-all duration-200 hover:shadow-md hover:scale-[1.02] border border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500"
                onClick={() => {
                  // Handle soup/noodles selection
                  console.log("スープ・めん類 selected")
                }}
              >
                <span className="text-xl mr-2">🍜</span>
                <span className="font-medium">スープ・めん類</span>
              </button>
              <button 
                className="w-full p-4 text-left bg-slate-100 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-slate-600 rounded-lg text-slate-800 dark:text-slate-200 transition-all duration-200 hover:shadow-md hover:scale-[1.02] border border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500"
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

