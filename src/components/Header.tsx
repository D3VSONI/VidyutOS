import React from 'react';
import { SceneId } from '../lib/types';

interface HeaderProps {
  currentScene: SceneId;
  onSelectScene: (id: SceneId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScene, onSelectScene }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 px-6 lg:px-12 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single line, no subtitle clutter) */}
        <button
          onClick={() => onSelectScene(1)}
          className="text-left font-bold tracking-tight text-stone-900 text-lg hover:text-blue-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5 cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-blue-700 inline-block" />
          <span className="tracking-tight text-xl font-bold font-['Plus_Jakarta_Sans']">Aura</span>
          <span className="text-xs font-normal text-stone-500 hidden sm:inline">Grades 6–12 Portal</span>
        </button>

        {/* Zone 2: 4-5 single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => onSelectScene(1)}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              currentScene === 1 ? 'text-blue-700 font-semibold border-b-2 border-blue-700' : 'hover:text-stone-900'
            }`}
          >
            The Vision
          </button>
          <button
            onClick={() => onSelectScene(2)}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              currentScene === 2 || currentScene === 3 ? 'text-blue-700 font-semibold border-b-2 border-blue-700' : 'hover:text-stone-900'
            }`}
          >
            The Problem
          </button>
          <button
            onClick={() => onSelectScene(4)}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              currentScene === 4 ? 'text-blue-700 font-semibold border-b-2 border-blue-700' : 'hover:text-stone-900'
            }`}
          >
            Ecosystem
          </button>
          <button
            onClick={() => onSelectScene(5)}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              currentScene === 5 || currentScene === 6 ? 'text-blue-700 font-semibold border-b-2 border-blue-700' : 'hover:text-stone-900'
            }`}
          >
            Catch Me Up
          </button>
          <button
            onClick={() => onSelectScene(10)}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              currentScene === 10 ? 'text-blue-700 font-semibold border-b-2 border-blue-700' : 'hover:text-stone-900'
            }`}
          >
            School Roles
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectScene(6)}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          >
            Launch Interactive Demo
          </button>
        </div>
      </div>
    </header>
  );
};
