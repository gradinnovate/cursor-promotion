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
      <div className="text-gray-500 text-center py-8">
        尚未進行檢查，請輸入文字並點擊「開始檢查」按鈕。
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {errors.map((error) => (
        <div key={error.id} className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <span className={`inline-block px-2 py-1 text-sm rounded-full ${
                error.type === 'spelling' ? 'bg-red-100 text-red-800' :
                error.type === 'grammar' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {error.type === 'spelling' ? '拼字錯誤' :
                 error.type === 'grammar' ? '文法錯誤' : '風格建議'}
              </span>
              <p className="mt-2 text-gray-700">{error.message}</p>
              <p className="mt-1 text-sm text-gray-500">建議：{error.suggestion}</p>
            </div>
            <button
              onClick={() => onApplySuggestion(error)}
              className="ml-4 px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              套用建議
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 