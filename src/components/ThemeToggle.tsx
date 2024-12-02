import React from 'react';
import { Moon, Sun, Book } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  onShowKeywords: () => void;
}

export function ThemeToggle({ isDark, onToggle, onShowKeywords }: ThemeToggleProps) {
  return (
    <div className="fixed top-4 right-4 flex items-center gap-2">
      <button
        onClick={onShowKeywords}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-700"
        aria-label="Show additional keywords"
      >
        <Book className="w-5 h-5 text-gray-900 dark:text-gray-100" />
      </button>
      <button
        onClick={onToggle}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-700"
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-gray-100" />
        ) : (
          <Moon className="w-5 h-5 text-gray-900" />
        )}
      </button>
    </div>
  );
}