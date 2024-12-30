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

  const handleCheck = () => {
    // Mock data for testing UI
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
  };

  const handleApplySuggestion = (error: GrammarError) => {
    // TODO: Implement applying suggestions to the text
    console.log('Applying suggestion:', error);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end space-x-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          aria-label="選擇語言"
        >
          <option value="zh-TW">中文</option>
          <option value="en">English</option>
        </select>
        <button
          onClick={handleCheck}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          開始檢查
        </button>
      </div>

      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="請輸入要檢查的文字..."
          className="w-full h-64 p-4 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-none"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">檢查結果</h2>
        <GrammarResults errors={errors} onApplySuggestion={handleApplySuggestion} />
      </div>
    </div>
  );
} 