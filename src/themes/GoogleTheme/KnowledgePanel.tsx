import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PersonalInfo, Skill, Education } from '../../types/manifest';

interface KnowledgePanelProps {
  personalInfo: PersonalInfo;
  skills: Skill[];
  education: Education[];
  darkMode: boolean;
}

export const KnowledgePanel: React.FC<KnowledgePanelProps> = ({
  personalInfo,
  skills,
  education,
  darkMode,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const PanelContent = () => (
    <div className="space-y-2 text-xs overflow-hidden">
      <div className={`border-t pt-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className={`mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Email</div>
        <a href={`mailto:${personalInfo.email}`} className={`text-xs break-all ${
          darkMode ? 'text-blue-400 hover:underline' : 'text-blue-600 hover:underline'
        }`}>
          {personalInfo.email}
        </a>
      </div>

      {personalInfo.phone && (
        <div>
          <div className={`mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Phone</div>
          <div className={darkMode ? 'text-gray-300' : 'text-gray-900'}>{personalInfo.phone}</div>
        </div>
      )}

      {personalInfo.links?.website && (
        <div className={`border-t pt-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Website</div>
          <a
            href={personalInfo.links.website}
            target="_blank"
            rel="noopener noreferrer"
            className={`break-all ${darkMode ? 'text-blue-400 hover:underline' : 'text-blue-600 hover:underline'}`}
          >
            {personalInfo.links.website.replace(/^https?:\/\//, '')}
          </a>
        </div>
      )}

      {personalInfo.links && Object.entries(personalInfo.links).filter(([key]) => key !== 'website').length > 0 && (
        <div className={`border-t pt-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`mb-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Profiles</div>
          <div className="space-y-1">
            {Object.entries(personalInfo.links)
              .filter(([key]) => key !== 'website')
              .slice(0, 3)
              .map(([key, url]) =>
              url ? (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1 ${
                    darkMode ? 'text-blue-400 hover:underline' : 'text-blue-600 hover:underline'
                  }`}
                >
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="truncate capitalize">{key}</span>
                </a>
              ) : null
            )}
          </div>
        </div>
      )}

      {/* Skills Summary */}
      {skills && skills.length > 0 && (
        <div className={`border-t pt-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`mb-1 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Top Skills</div>
          <div className="flex flex-wrap gap-1">
            {skills
              .flatMap(group => group.items)
              .slice(0, 6)
              .map((skill, i) => (
                <span
                  key={i}
                  className={`text-xs px-2 py-0.5 rounded ${
                    darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  {skill}
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Education Summary */}
      {education && education.length > 0 && (
        <div className={`border-t pt-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`mb-1 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Education</div>
          {education.slice(0, 1).map((edu, idx) => (
            <div key={idx} className="mb-1">
              <div className={`font-medium text-xs ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                {edu.institution}
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {edu.degree} {edu.field && `in ${edu.field}`}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 }}
      className="lg:col-span-1 flex flex-col overflow-hidden mb-4 lg:mb-0"
    >
      {/* Mobile Collapsible Version */}
      <div className={`lg:hidden border rounded-lg shadow-sm flex flex-col overflow-hidden ${
        darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      }`}>
        {/* Collapsible Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center justify-between p-3 sm:p-4 w-full text-left transition-colors ${
            darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
              darkMode ? 'bg-gradient-to-br from-blue-800 to-blue-900' : 'bg-gradient-to-br from-blue-100 to-blue-200'
            }`}>
              <span className={`text-xl font-light ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                {personalInfo.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className={`text-base font-normal ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {personalInfo.name}
              </h2>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {personalInfo.title}
              </p>
            </div>
          </div>
          <svg
            className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''} ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-3 sm:p-4 pt-0">
                <PanelContent />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Always-Visible Version */}
      <div className={`hidden lg:block border rounded-lg p-3 sm:p-4 shadow-sm ${
        darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      }`}>
        {/* Profile Header */}
        <div className="flex gap-2 sm:gap-3 mb-3 flex-shrink-0">
          {/* Profile Image Placeholder */}
          <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center flex-shrink-0 ${
            darkMode ? 'bg-gradient-to-br from-blue-800 to-blue-900' : 'bg-gradient-to-br from-blue-100 to-blue-200'
          }`}>
            <span className={`text-3xl font-light ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
              {personalInfo.name.charAt(0)}
            </span>
          </div>

          {/* Name and Title */}
          <div className="flex flex-col justify-center min-w-0">
            <h2 className={`text-lg font-normal mb-0.5 truncate ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {personalInfo.name}
            </h2>
            <p className={`text-xs leading-tight ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {personalInfo.title}
            </p>
          </div>
        </div>

        <PanelContent />
      </div>
    </motion.div>
  );
};
