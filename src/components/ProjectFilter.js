'use client';

import { useState } from 'react';

export default function ProjectFilter({ projects, onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState('All');

  // Extract all unique project types
  const allTypes = ['All', ...new Set(projects.flatMap(p => p.type || []))];

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {allTypes.map((type) => (
        <button
          key={type}
          onClick={() => handleFilterClick(type)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeFilter === type
              ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-brand-100 dark:hover:bg-brand-900/50 hover:text-brand-700 dark:hover:text-brand-300'
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
