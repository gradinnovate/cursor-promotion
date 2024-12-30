'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import LoginDialog from './LoginDialog';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and primary nav */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center space-x-2 group">
                <svg className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" 
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                  文字校對
                </span>
              </Link>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/"
                className="border-b-2 border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                首頁
              </Link>
              <Link 
                href="/history"
                className="border-transparent border-b-2 hover:border-gray-300 text-gray-600 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors"
              >
                歷史紀錄
              </Link>
              <Link 
                href="/settings"
                className="border-transparent border-b-2 hover:border-gray-300 text-gray-600 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors"
              >
                設定
              </Link>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  {user.email}
                </div>
                <button 
                  onClick={handleSignOut}
                  className="btn-secondary"
                >
                  登出
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => setIsLoginDialogOpen(true)}
                  className="btn-primary"
                >
                  登入
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="開啟選單"
            >
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden border-t border-gray-100">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 text-base font-medium"
            >
              首頁
            </Link>
            <Link
              href="/history"
              className="border-transparent border-l-4 text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300 block pl-3 pr-4 py-2 text-base font-medium transition-colors"
            >
              歷史紀錄
            </Link>
            <Link
              href="/settings"
              className="border-transparent border-l-4 text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300 block pl-3 pr-4 py-2 text-base font-medium transition-colors"
            >
              設定
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-100">
            <div className="space-y-1">
              {user ? (
                <>
                  <div className="block px-4 py-2 text-base font-medium text-gray-600">
                    {user.email}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    登出
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsLoginDialogOpen(true)}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  登入
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <LoginDialog
        isOpen={isLoginDialogOpen}
        onClose={() => setIsLoginDialogOpen(false)}
      />
    </nav>
  );
} 