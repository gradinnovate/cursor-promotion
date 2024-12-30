'use client';

import React, { useState } from 'react';
import GrammarResults from '@/components/GrammarResults';

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

export default function Home() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('zh-TW');
  const [errors, setErrors] = useState<GrammarError[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = () => {
    setIsChecking(true);
    // 模擬 API 延遲
    setTimeout(() => {
      const mockErrors: GrammarError[] = [
        {
          id: '1',
          type: 'spelling',
          message: '「程式」的正確寫法應為「程式」而非「程序」',
          suggestion: '程式',
          position: { start: 0, end: 2 }
        },
        {
          id: '2',
          type: 'grammar',
          message: '句子結構不完整',
          suggestion: '建議加上主詞',
          position: { start: 3, end: 10 }
        }
      ];
      setErrors(mockErrors);
      setIsChecking(false);
    }, 1000);
  };

  const handleApplySuggestion = (error: GrammarError) => {
    console.log('Applying suggestion:', error);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            即時文字校對
            <span className="ml-2 text-sm font-normal text-gray-500">
              讓您的文字更加完美
            </span>
          </h1>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white shadow-sm 
                     hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                     transition-all duration-200"
            aria-label="選擇語言"
          >
            <option value="zh-TW">中文</option>
            <option value="en">English</option>
          </select>
        </div>

        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="在此輸入您要檢查的文字..."
            className="w-full h-64 p-6 rounded-xl border border-gray-200 bg-white shadow-sm
                     placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                     transition-all duration-200 resize-none text-gray-700"
          />
          <div className="absolute bottom-4 right-4 text-sm text-gray-400">
            {text.length} 字
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleCheck}
            disabled={isChecking || text.length === 0}
            className={`px-6 py-3 rounded-lg bg-blue-600 text-white font-medium
                     transform hover:scale-105 hover:bg-blue-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center space-x-2 ${isChecking ? 'animate-pulse' : ''}`}
          >
            {isChecking ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>檢查中...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span>開始檢查</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            檢查結果
          </h2>
          <GrammarResults errors={errors} onApplySuggestion={handleApplySuggestion} />
        </div>
      </div>
    </div>
  );
} 