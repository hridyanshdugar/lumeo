import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioManifest } from '../types/manifest';

interface GoogleThemeProps {
  manifest: PortfolioManifest;
}

export const GoogleTheme: React.FC<GoogleThemeProps> = ({ manifest }) => {
  const [showResults, setShowResults] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [currentSection, setCurrentSection] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const fullSearchText = `${manifest.personalInfo.name} portfolio`;
  const itemsPerPage = 3;

  // Typewriter effect
  useEffect(() => {
    if (searchText.length < fullSearchText.length) {
      const timeout = setTimeout(() => {
        setSearchText(fullSearchText.slice(0, searchText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      // Auto-show results after typing completes
      const timeout = setTimeout(() => {
        setShowResults(true);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [searchText, fullSearchText]);

  const sections = ['Projects', 'Experience', 'Skills', 'Education'];

  // Get current items based on section and page
  const getCurrentItems = () => {
    let items: any[] = [];
    switch (currentSection) {
      case 0:
        items = manifest.projects || [];
        break;
      case 1:
        items = manifest.experience || [];
        break;
      case 2:
        items = manifest.skills || [];
        break;
      case 3:
        items = manifest.education || [];
        break;
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return {
      items: items.slice(startIndex, endIndex),
      totalPages: Math.ceil(items.length / itemsPerPage),
      totalItems: items.length
    };
  };

  const { items, totalPages, totalItems } = getCurrentItems();

  // Reset to page 1 when section changes
  useEffect(() => {
    setCurrentPage(1);
  }, [currentSection]);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <AnimatePresence mode="wait">
        {!showResults ? (
          // Google Search Homepage
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
              <h1 className="text-7xl md:text-9xl font-light tracking-tight flex">
                {manifest.personalInfo.name.split('').map((letter, i) => {
                  const colors = ['text-blue-600', 'text-red-600', 'text-yellow-500', 'text-blue-600', 'text-green-600', 'text-red-600'];
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
              <div className="flex items-center gap-4 px-6 py-4 rounded-full border border-gray-300 hover:shadow-lg transition-shadow bg-white">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <div className="flex-1 text-gray-800 text-lg">
                  {searchText}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="inline-block w-0.5 h-5 bg-blue-600 ml-0.5 align-middle"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={() => setShowResults(true)}
                  className="bg-gray-100 text-gray-800 px-6 py-3 rounded hover:shadow-md hover:border hover:border-gray-300 transition-all text-sm"
                >
                  Google Search
                </button>
                <button
                  onClick={() => {
                    setShowResults(true);
                    setTimeout(() => {
                      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                    }, 500);
                  }}
                  className="bg-gray-100 text-gray-800 px-6 py-3 rounded hover:shadow-md hover:border hover:border-gray-300 transition-all text-sm"
                >
                  I'm Feeling Lucky
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          // Google Search Results Page
          <motion.div
            key="search-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen"
          >
            {/* Search Header */}
            <motion.header
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="sticky top-0 bg-white border-b border-gray-200 z-50"
            >
              <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center gap-8">
                  {/* Logo */}
                  <h1 className="text-2xl font-light tracking-tight flex cursor-pointer" onClick={() => setShowResults(false)}>
                    {manifest.personalInfo.name.split('').slice(0, 6).map((letter, i) => {
                      const colors = ['text-blue-600', 'text-red-600', 'text-yellow-500', 'text-blue-600', 'text-green-600', 'text-red-600'];
                      return <span key={i} className={colors[i % colors.length]}>{letter === ' ' ? '\u00A0' : letter}</span>;
                    })}
                  </h1>

                  {/* Mini Search Bar */}
                  <div className="flex-1 max-w-2xl">
                    <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-gray-300 hover:shadow-md transition-shadow bg-white text-sm">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span className="text-gray-700">{searchText}</span>
                    </div>
                  </div>

                  {/* Contact Button */}
                  <a
                    href={`mailto:${manifest.personalInfo.email}`}
                    className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 text-sm font-medium whitespace-nowrap"
                  >
                    Contact
                  </a>
                </div>

                {/* Tabs */}
                <div className="flex gap-6 mt-4 border-b border-gray-200 -mb-px">
                  {sections.map((section, idx) => (
                    <button
                      key={section}
                      onClick={() => setCurrentSection(idx)}
                      className={`pb-3 px-1 text-sm transition-colors relative ${
                        currentSection === idx
                          ? 'text-blue-600 font-medium'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {section}
                      {currentSection === idx && (
                        <motion.div
                          layoutId="activeSection"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.header>

            <div className="max-w-7xl mx-auto px-6 py-6 h-[calc(100vh-200px)] flex">
              <div className="grid lg:grid-cols-3 gap-8 w-full">
                {/* Main Results Column */}
                <div className="lg:col-span-2 flex flex-col h-full">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-gray-600 mb-6"
                  >
                    About {totalItems} results (0.42 seconds)
                  </motion.div>

                  {/* Results Container - Fixed Height */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-6">
                      {/* Projects as Search Results */}
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
                              <div className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                                {project.links?.live || project.links?.github || 'Project'}
                              </div>
                              <h3 className="text-xl text-blue-600 group-hover:underline cursor-pointer mb-2">
                                {project.name}
                              </h3>
                              <p className="text-sm text-gray-700 leading-relaxed max-w-2xl mb-3">
                                {project.description}
                              </p>
                              {project.technologies && project.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-2">
                                  {project.technologies.slice(0, 5).map((tech: string, i: number) => (
                                    <span
                                      key={i}
                                      className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              )}
                              {project.links && (
                                <div className="flex gap-4 text-sm">
                                  {project.links.github && (
                                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                      View Code
                                    </a>
                                  )}
                                  {project.links.live && (
                                    <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
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
                              <div className="text-sm text-gray-600 mb-1">{exp.company}</div>
                              <h3 className="text-xl text-blue-600 group-hover:underline cursor-pointer mb-2">
                                {exp.position}
                              </h3>
                              <div className="text-sm text-gray-500 mb-2">
                                {exp.startDate} - {exp.endDate || 'Present'}
                              </div>
                              <p className="text-sm text-gray-700 leading-relaxed max-w-2xl mb-2">
                                {exp.description}
                              </p>
                              {exp.technologies && exp.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {exp.technologies.slice(0, 5).map((tech: string, i: number) => (
                                    <span
                                      key={i}
                                      className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
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
                              <div className="text-sm text-gray-600 mb-1">Skill Category</div>
                              <h3 className="text-xl text-blue-600 group-hover:underline cursor-pointer mb-3">
                                {skillGroup.category}
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {skillGroup.items.map((skill: string, i: number) => (
                                  <span
                                    key={i}
                                    className="text-sm px-4 py-2 bg-gray-100 text-gray-700 rounded-full"
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
                              <div className="text-sm text-gray-600 mb-1">{edu.institution}</div>
                              <h3 className="text-xl text-blue-600 group-hover:underline cursor-pointer mb-2">
                                {edu.degree} {edu.field && `in ${edu.field}`}
                              </h3>
                              <div className="text-sm text-gray-500 mb-2">
                                {edu.startDate} - {edu.endDate || 'Present'}
                                {edu.gpa && ` • GPA: ${edu.gpa}`}
                              </div>
                              {edu.achievements && edu.achievements.length > 0 && (
                                <ul className="space-y-1">
                                  {edu.achievements.map((achievement: string, i: number) => (
                                    <li key={i} className="text-sm text-gray-700">
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

                    {/* Pagination - Always visible */}
                    {totalPages > 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200"
                      >
                        <div className="flex items-center gap-1">
                          {/* Previous Button */}
                          {currentPage > 1 && (
                            <button
                              onClick={() => setCurrentPage(currentPage - 1)}
                              className="text-blue-600 px-3 hover:underline mr-2"
                            >
                              Previous
                            </button>
                          )}

                          {/* Page Numbers */}
                          {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 10).map((page) => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-colors ${
                                page === currentPage
                                  ? 'bg-blue-600 text-white'
                                  : 'text-blue-600 hover:bg-gray-100'
                              }`}
                            >
                              {page}
                            </button>
                          ))}

                          {/* Next Button */}
                          {currentPage < totalPages && (
                            <button
                              onClick={() => setCurrentPage(currentPage + 1)}
                              className="text-blue-600 px-3 hover:underline ml-2"
                            >
                              Next
                            </button>
                          )}
                        </div>

                        {/* Page Info */}
                        <div className="text-sm text-gray-500">
                          Page {currentPage} of {totalPages}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Knowledge Panel (Right Sidebar) */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="lg:col-span-1 h-full overflow-auto"
                >
                  <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
                    {/* Profile Image Placeholder */}
                    <div className="w-full aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-6xl font-light text-blue-600">
                        {manifest.personalInfo.name.charAt(0)}
                      </span>
                    </div>

                    <h2 className="text-2xl font-normal text-gray-900 mb-1">
                      {manifest.personalInfo.name}
                    </h2>
                    <p className="text-gray-600 mb-4">{manifest.personalInfo.title}</p>

                    <div className="space-y-3 text-sm">
                      <div className="border-t border-gray-200 pt-3">
                        <div className="text-gray-500 mb-1">Email</div>
                        <a href={`mailto:${manifest.personalInfo.email}`} className="text-blue-600 hover:underline">
                          {manifest.personalInfo.email}
                        </a>
                      </div>

                      {manifest.personalInfo.phone && (
                        <div>
                          <div className="text-gray-500 mb-1">Phone</div>
                          <div className="text-gray-900">{manifest.personalInfo.phone}</div>
                        </div>
                      )}

                      {manifest.personalInfo.links && Object.keys(manifest.personalInfo.links).length > 0 && (
                        <div className="border-t border-gray-200 pt-3">
                          <div className="text-gray-500 mb-2">Profiles</div>
                          <div className="space-y-2">
                            {Object.entries(manifest.personalInfo.links).map(([key, url]) =>
                              url ? (
                                <a
                                  key={key}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-blue-600 hover:underline"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                  {key}
                                </a>
                              ) : null
                            )}
                          </div>
                        </div>
                      )}

                      {/* Skills Summary */}
                      {manifest.skills && manifest.skills.length > 0 && (
                        <div className="border-t border-gray-200 pt-3">
                          <div className="text-gray-500 mb-2">Top Skills</div>
                          <div className="flex flex-wrap gap-2">
                            {manifest.skills
                              .flatMap(group => group.items)
                              .slice(0, 6)
                              .map((skill, i) => (
                                <span
                                  key={i}
                                  className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded"
                                >
                                  {skill}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Education Summary */}
                      {manifest.education && manifest.education.length > 0 && (
                        <div className="border-t border-gray-200 pt-3">
                          <div className="text-gray-500 mb-2">Education</div>
                          {manifest.education.slice(0, 2).map((edu, idx) => (
                            <div key={idx} className="mb-2">
                              <div className="text-gray-900 font-medium">{edu.institution}</div>
                              <div className="text-gray-600 text-xs">
                                {edu.degree} {edu.field && `in ${edu.field}`}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
