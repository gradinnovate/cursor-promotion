'use client';

import React from 'react';

interface GrammarError {
  id: string;
  type: 'spelling' | 'grammar' | 'style';
  message: string;
  suggestion: string;
  position: {
    start: number;
    end: number;
  };
}

interface GrammarResultsProps {
  errors: GrammarError[];
  onApplySuggestion: (error: GrammarError) => void;
}

export default function GrammarResults({ errors, onApplySuggestion }: GrammarResultsProps) {
  if (errors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-center">
          尚未進行檢查，請輸入文字並點擊「開始檢查」按鈕。
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {errors.map((error) => (
        <div 
          key={error.id} 
          className="group bg-white rounded-lg p-4 border border-gray-100 hover:border-blue-200 
                   hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${error.type === 'spelling' ? 'bg-red-100 text-red-800' :
                    error.type === 'grammar' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'}`}
                >
                  {error.type === 'spelling' ? (
                    <>
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      拼字錯誤
                    </>
                  ) : error.type === 'grammar' ? (
                    <>
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      文法錯誤
                    </>
                  ) : (
                    <>
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      風格建議
                    </>
                  )}
                </span>
                <span className="text-xs text-gray-500">
                  位置：{error.position.start + 1}-{error.position.end + 1}
                </span>
              </div>
              <p className="mt-2 text-gray-700">{error.message}</p>
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-500">建議：</span>
                <span className="text-sm text-blue-600 font-medium">{error.suggestion}</span>
              </div>
            </div>
            <button
              onClick={() => onApplySuggestion(error)}
              className="ml-4 inline-flex items-center px-3 py-1.5 border border-blue-600 
                       text-sm font-medium rounded-md text-blue-600 bg-white 
                       hover:bg-blue-50 focus:outline-none focus:ring-2 
                       focus:ring-offset-2 focus:ring-blue-500 transition-colors
                       group-hover:bg-blue-600 group-hover:text-white"
            >
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M5 13l4 4L19 7" />
              </svg>
              套用建議
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 