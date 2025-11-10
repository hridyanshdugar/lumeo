import React from 'react';
import { motion } from 'framer-motion';

interface SearchHeaderProps {
  name: string;
  searchText: string;
  email: string;
  darkMode: boolean;
  sections: string[];
  currentSection: number;
  onSectionChange: (index: number) => void;
  onLogoClick: () => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  name,
  searchText,
  email,
  darkMode,
  sections,
  currentSection,
  onSectionChange,
  onLogoClick,
}) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 border-b transition-colors ${
        darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
          {/* Logo */}
          <h1
            className="text-xl sm:text-2xl font-light tracking-tight flex cursor-pointer flex-shrink-0"
            onClick={onLogoClick}
          >
            {name.split('').slice(0, 6).map((letter, i) => {
              const colors = darkMode
                ? ['text-blue-400', 'text-red-400', 'text-yellow-400', 'text-blue-400', 'text-green-400', 'text-red-400']
                : ['text-blue-600', 'text-red-600', 'text-yellow-500', 'text-blue-600', 'text-green-600', 'text-red-600'];
              return <span key={i} className={colors[i % colors.length]}>{letter === ' ' ? '\u00A0' : letter}</span>;
            })}
          </h1>

          {/* Mini Search Bar */}
          <div className="flex-1 max-w-2xl min-w-0">
            <div className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-shadow text-xs sm:text-sm ${
              darkMode
                ? 'border-gray-700 bg-gray-800 hover:shadow-md'
                : 'border-gray-300 bg-white hover:shadow-md'
            }`}>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className={`truncate ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{searchText}</span>
            </div>
          </div>

          {/* Contact Button */}
          <a
            href={`mailto:${email}`}
            className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
              darkMode
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Contact
          </a>
        </div>

        {/* Tabs */}
        <div className={`flex gap-3 sm:gap-6 mt-3 sm:mt-4 border-b -mb-px overflow-x-auto ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          {sections.map((section, idx) => (
            <button
              key={section}
              onClick={() => onSectionChange(idx)}
              className={`pb-2 sm:pb-3 px-1 text-xs sm:text-sm transition-colors relative whitespace-nowrap ${
                currentSection === idx
                  ? darkMode ? 'text-blue-400 font-medium' : 'text-blue-600 font-medium'
                  : darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {section}
              {currentSection === idx && (
                <motion.div
                  layoutId="activeSection"
                  className={`absolute bottom-0 left-0 right-0 h-0.5 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'}`}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.header>
  );
};
