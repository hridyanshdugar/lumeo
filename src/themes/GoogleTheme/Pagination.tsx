import React from 'react';
import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  darkMode: boolean;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  darkMode,
  onPageChange,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className={`mt-6 pt-4 border-t flex-shrink-0 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
    >
      <div className="flex items-center justify-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || totalPages <= 1}
          className={`px-3 py-1.5 rounded text-sm ${
            currentPage === 1 || totalPages <= 1
              ? darkMode ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 cursor-not-allowed'
              : darkMode ? 'text-blue-400 hover:bg-gray-800' : 'text-blue-600 hover:bg-gray-100'
          }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: Math.max(totalPages, 1) }, (_, i) => i + 1).slice(0, 10).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={totalPages <= 1}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${
              page === currentPage
                ? darkMode ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'
                : totalPages <= 1
                ? darkMode ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 cursor-not-allowed'
                : darkMode ? 'text-blue-400 hover:bg-gray-800' : 'text-blue-600 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages <= 1}
          className={`px-3 py-1.5 rounded text-sm ${
            currentPage === totalPages || totalPages <= 1
              ? darkMode ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 cursor-not-allowed'
              : darkMode ? 'text-blue-400 hover:bg-gray-800' : 'text-blue-600 hover:bg-gray-100'
          }`}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};
