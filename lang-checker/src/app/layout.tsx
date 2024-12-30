import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from "@/contexts/AuthContext"
import Navbar from "@/components/Navbar"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '文字校對 - 即時語法檢查工具',
  description: '一個專業的文字校對工具，提供即時的語法錯誤檢查與修正建議',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <footer className="bg-white border-t border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">
                      關於我們
                    </h3>
                    <p className="text-gray-500 text-sm">
                      文字校對是一個專業的線上文字檢查工具，致力於提供高品質的語法檢查服務。
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">
                      快速連結
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">
                          使用說明
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">
                          常見問題
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">
                          聯絡我們
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">
                      法律資訊
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">
                          隱私權政策
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">
                          使用條款
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-center text-gray-400 text-sm">
                    © 2024 文字校對. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
} 