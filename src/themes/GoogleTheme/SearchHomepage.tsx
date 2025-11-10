import React from 'react';
import { motion } from 'framer-motion';

interface SearchHomepageProps {
  name: string;
  searchText: string;
  fullSearchText: string;
  darkMode: boolean;
  onSearch: () => void;
  onLucky: () => void;
}

export const SearchHomepage: React.FC<SearchHomepageProps> = ({
  name,
  searchText,
  fullSearchText,
  darkMode,
  onSearch,
  onLucky,
}) => {
  return (
    <motion.div
      key="search-home"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen px-6"
    >
      {/* Google-style Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight flex flex-wrap justify-center">
          {name.split('').map((letter, i) => {
            const colors = darkMode
              ? ['text-blue-400', 'text-red-400', 'text-yellow-400', 'text-blue-400', 'text-green-400', 'text-red-400']
              : ['text-blue-600', 'text-red-600', 'text-yellow-500', 'text-blue-600', 'text-green-600', 'text-red-600'];
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className={colors[i % colors.length]}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            );
          })}
        </h1>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <div className={`flex items-center gap-4 px-6 py-4 rounded-full border transition-shadow ${
          darkMode
            ? 'border-gray-700 bg-gray-800 hover:shadow-2xl'
            : 'border-gray-300 bg-white hover:shadow-lg'
        }`}>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <div className={`flex-1 text-lg ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            {searchText}
            {searchText.length < fullSearchText.length && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className={`inline-block w-0.5 h-5 ml-0.5 align-middle ${darkMode ? 'bg-blue-400' : 'bg-blue-600'}`}
              />
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8 w-full sm:w-auto">
          <motion.button
            onClick={onSearch}
            className={`px-6 py-3 rounded hover:shadow-md transition-all text-sm relative ${
              darkMode
                ? 'bg-gray-800 text-gray-200 hover:border hover:border-gray-600'
                : 'bg-gray-100 text-gray-800 hover:border hover:border-gray-300'
            }`}
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: darkMode
                ? [
                    '0 0 0 0 rgba(96, 165, 250, 0)',
                    '0 0 0 4px rgba(96, 165, 250, 0.3)',
                    '0 0 0 0 rgba(96, 165, 250, 0)'
                  ]
                : [
                    '0 0 0 0 rgba(59, 130, 246, 0)',
                    '0 0 0 4px rgba(59, 130, 246, 0.3)',
                    '0 0 0 0 rgba(59, 130, 246, 0)'
                  ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            Google Search
          </motion.button>
          <button
            onClick={onLucky}
            className={`px-6 py-3 rounded hover:shadow-md transition-all text-sm ${
              darkMode
                ? 'bg-gray-800 text-gray-200 hover:border hover:border-gray-600'
                : 'bg-gray-100 text-gray-800 hover:border hover:border-gray-300'
            }`}
          >
            I'm Feeling Lucky
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
