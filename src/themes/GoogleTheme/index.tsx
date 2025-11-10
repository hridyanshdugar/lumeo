import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioManifest } from '../../types/manifest';
import { SnakeGame } from './SnakeGame';
import { DarkModeToggle } from './DarkModeToggle';
import { SearchHomepage } from './SearchHomepage';
import { SearchHeader } from './SearchHeader';
import { KnowledgePanel } from './KnowledgePanel';
import { Pagination } from './Pagination';
import { calculateItemsPerPage, getCurrentItems } from './utils';

interface GoogleThemeProps {
  manifest: PortfolioManifest;
}

export const GoogleTheme: React.FC<GoogleThemeProps> = ({ manifest }) => {
  const [showResults, setShowResults] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [currentSection, setCurrentSection] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage
    const saved = localStorage.getItem('googleThemeDarkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const fullSearchText = `${manifest.personalInfo.name} portfolio`;

  // Persist dark mode to localStorage
  useEffect(() => {
    localStorage.setItem('googleThemeDarkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const itemsPerPage = calculateItemsPerPage(
    currentSection,
    manifest.projects,
    manifest.experience,
    manifest.skills,
    manifest.education
  );

  // Typewriter effect (but don't auto-trigger search)
  useEffect(() => {
    if (searchText.length < fullSearchText.length) {
      const timeout = setTimeout(() => {
        setSearchText(fullSearchText.slice(0, searchText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [searchText, fullSearchText]);

  const sections = ['Projects', 'Experience', 'Skills', 'Education'];

  const { items, totalPages, totalItems } = getCurrentItems(
    currentSection,
    currentPage,
    itemsPerPage,
    manifest.projects,
    manifest.experience,
    manifest.skills,
    manifest.education
  );

  // Reset to page 1 when section changes
  useEffect(() => {
    setCurrentPage(1);
  }, [currentSection]);

  return (
    <div className={`min-h-screen lg:overflow-hidden lg:max-h-screen transition-colors ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      <AnimatePresence mode="wait">
        {showGame ? (
          // Game View
          <motion.div
            key="game-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-screen px-6"
          >
            <button
              onClick={() => setShowGame(false)}
              className={`absolute top-6 left-6 text-sm flex items-center gap-2 ${
                darkMode ? 'text-blue-400 hover:underline' : 'text-blue-600 hover:underline'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Search
            </button>

            <SnakeGame darkMode={darkMode} />
          </motion.div>
        ) : !showResults ? (
          // Google Search Homepage
          <SearchHomepage
            name={manifest.personalInfo.name}
            searchText={searchText}
            fullSearchText={fullSearchText}
            darkMode={darkMode}
            onSearch={() => setShowResults(true)}
            onLucky={() => setShowGame(true)}
          />
        ) : (
          // Google Search Results Page
          <motion.div
            key="search-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen"
          >
            <SearchHeader
              name={manifest.personalInfo.name}
              searchText={searchText}
              email={manifest.personalInfo.email}
              darkMode={darkMode}
              sections={sections}
              currentSection={currentSection}
              onSectionChange={setCurrentSection}
              onLogoClick={() => setShowResults(false)}
            />

            <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4 pb-8 flex flex-col">
              <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full lg:h-[calc(100vh-140px)]">
                {/* Knowledge Panel - Shows first on mobile */}
                <div className="lg:order-2 lg:col-span-1 lg:overflow-hidden">
                  <KnowledgePanel
                    personalInfo={manifest.personalInfo}
                    skills={manifest.skills}
                    education={manifest.education}
                    darkMode={darkMode}
                  />
                </div>

                {/* Main Results Column */}
                <div className="lg:order-1 lg:col-span-2 flex flex-col min-h-0 lg:overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`text-sm mb-4 flex-shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    About {totalItems} results (0.42 seconds)
                  </motion.div>

                  {/* Results Container */}
                  <div className="flex-1 flex flex-col min-h-0">
                    <div className="space-y-4 flex-1 lg:overflow-hidden">
                      {/* Render results based on current section */}
                      {currentSection === 0 && (
                        <>
                          {items.map((project: any, index: number) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 + index * 0.1 }}
                              whileHover={{ x: 4 }}
                              className="group"
                            >
                              <div className={`text-sm mb-1 flex items-center gap-2 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                                {project.links?.live || project.links?.github || 'Project'}
                              </div>
                              <h3 className={`text-xl mb-2 group-hover:underline cursor-pointer ${
                                darkMode ? 'text-blue-400' : 'text-blue-600'
                              }`}>
                                {project.name}
                              </h3>
                              <p className={`text-sm leading-relaxed max-w-2xl mb-3 line-clamp-3 ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                {project.description}
                              </p>
                              {project.technologies && project.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-2">
                                  {project.technologies.slice(0, 5).map((tech: string, i: number) => (
                                    <span
                                      key={i}
                                      className={`text-xs px-3 py-1 rounded-full ${
                                        darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                                      }`}
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              )}
                              {project.links && (
                                <div className="flex gap-4 text-sm">
                                  {project.links.github && (
                                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className={
                                      darkMode ? 'text-blue-400 hover:underline' : 'text-blue-600 hover:underline'
                                    }>
                                      View Code
                                    </a>
                                  )}
                                  {project.links.live && (
                                    <a href={project.links.live} target="_blank" rel="noopener noreferrer" className={
                                      darkMode ? 'text-blue-400 hover:underline' : 'text-blue-600 hover:underline'
                                    }>
                                      Live Demo
                                    </a>
                                  )}
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </>
                      )}

                      {/* Experience Results */}
                      {currentSection === 1 && (
                        <>
                          {items.map((exp: any, index: number) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 + index * 0.1 }}
                              whileHover={{ x: 4 }}
                              className="group"
                            >
                              <div className={`text-sm mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                                {exp.company}
                              </div>
                              <h3 className={`text-xl mb-2 group-hover:underline cursor-pointer ${
                                darkMode ? 'text-blue-400' : 'text-blue-600'
                              }`}>
                                {exp.position}
                              </h3>
                              <div className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {exp.startDate} - {exp.endDate || 'Present'}
                              </div>
                              <p className={`text-sm leading-relaxed max-w-2xl mb-2 line-clamp-3 ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                {exp.description}
                              </p>
                              {exp.technologies && exp.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {exp.technologies.slice(0, 5).map((tech: string, i: number) => (
                                    <span
                                      key={i}
                                      className={`text-xs px-3 py-1 rounded-full ${
                                        darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                                      }`}
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </>
                      )}

                      {/* Skills Results */}
                      {currentSection === 2 && (
                        <>
                          {items.map((skillGroup: any, index: number) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 + index * 0.1 }}
                              whileHover={{ x: 4 }}
                              className="group"
                            >
                              <div className={`text-sm mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                                Skill Category
                              </div>
                              <h3 className={`text-xl mb-3 group-hover:underline cursor-pointer ${
                                darkMode ? 'text-blue-400' : 'text-blue-600'
                              }`}>
                                {skillGroup.category}
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {skillGroup.items.map((skill: string, i: number) => (
                                  <span
                                    key={i}
                                    className={`text-sm px-4 py-2 rounded-full ${
                                      darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                                    }`}
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </>
                      )}

                      {/* Education Results */}
                      {currentSection === 3 && (
                        <>
                          {items.map((edu: any, index: number) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 + index * 0.1 }}
                              whileHover={{ x: 4 }}
                              className="group"
                            >
                              <div className={`text-sm mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                                {edu.institution}
                              </div>
                              <h3 className={`text-xl mb-2 group-hover:underline cursor-pointer ${
                                darkMode ? 'text-blue-400' : 'text-blue-600'
                              }`}>
                                {edu.degree} {edu.field && `in ${edu.field}`}
                              </h3>
                              <div className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {edu.startDate} - {edu.endDate || 'Present'}
                                {edu.gpa && ` • GPA: ${edu.gpa}`}
                              </div>
                              {edu.achievements && edu.achievements.length > 0 && (
                                <ul className="space-y-1">
                                  {edu.achievements.slice(0, 2).map((achievement: string, i: number) => (
                                    <li key={i} className={`text-sm line-clamp-2 ${
                                      darkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                      • {achievement}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </motion.div>
                          ))}
                        </>
                      )}
                    </div>

                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      darkMode={darkMode}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
