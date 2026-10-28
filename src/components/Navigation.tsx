import React, { useState, useEffect } from 'react';
import { SceneId } from '../lib/types';
import { SCENES } from '../lib/demoData';
import { ChevronLeft, ChevronRight, Grid, RotateCcw, Maximize2, Minimize2, Check } from 'lucide-react';

interface NavigationProps {
  currentScene: SceneId;
  onSelectScene: (id: SceneId) => void;
  onResetDemo: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentScene,
  onSelectScene,
  onResetDemo,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentMeta = SCENES.find((s) => s.id === currentScene) || SCENES[0];
  const progressPercent = Math.round((currentScene / SCENES.length) * 100);

  const handleNext = () => {
    if (currentScene < 12) {
      onSelectScene((currentScene + 1) as SceneId);
    }
  };

  const handlePrev = () => {
    if (currentScene > 1) {
      onSelectScene((currentScene - 1) as SceneId);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        setDrawerOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScene]);

  return (
    <>
      {/* Top micro progress line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-stone-200 z-50">
        <div
          className="h-full bg-blue-700 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Floating Bottom Presentation Bar */}
      <nav
        aria-label="Presentation Navigation"
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-stone-900/90 text-white backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-stone-700/60 flex items-center gap-3 sm:gap-4 max-w-[94vw] sm:max-w-2xl"
      >
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentScene === 1}
          aria-label="Previous Scene"
          className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Current scene text indicator */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-stone-800 transition-colors text-left cursor-pointer"
          title="Click to view all 12 scenes"
        >
          <span className="font-mono text-xs text-blue-400 font-bold tabular-nums">
            {currentMeta.number}/12
          </span>
          <span className="text-xs sm:text-sm font-medium text-stone-200 truncate max-w-[120px] sm:max-w-[200px]">
            {currentMeta.shortTitle}
          </span>
          <span className="text-[11px] text-stone-400 hidden md:inline">
            · {currentMeta.chapter}
          </span>
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentScene === 12}
          aria-label="Next Scene"
          className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="w-px h-5 bg-stone-700 mx-0.5 sm:mx-1" />

        {/* Scene index drawer trigger */}
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open Scene Index"
          className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          title="View all scenes (Overview)"
        >
          <Grid className="w-4 h-4" />
        </button>

        {/* Reset Interactive Demo State */}
        <button
          onClick={onResetDemo}
          aria-label="Reset Interactive Demo"
          className="p-1.5 rounded-lg text-stone-300 hover:text-amber-400 hover:bg-stone-800 transition-colors cursor-pointer"
          title="Reset Interactive Demonstrations"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Fullscreen toggle */}
        <button
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors hidden sm:inline-flex cursor-pointer"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </nav>

      {/* Scene Index Drawer Modal */}
      {drawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Presentation Scenes Overview"
          className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="bg-stone-900 text-stone-100 rounded-2xl border border-stone-700 shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Presentation Scenes Index</h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  12 curated scenes detailing the unified school experience
                </p>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-xs text-stone-400 hover:text-white px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 cursor-pointer"
              >
                Close (Esc)
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SCENES.map((scene) => {
                const isActive = scene.id === currentScene;
                return (
                  <button
                    key={scene.id}
                    onClick={() => {
                      onSelectScene(scene.id);
                      setDrawerOpen(false);
                    }}
                    className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? 'border-blue-500 bg-blue-950/40 text-white ring-1 ring-blue-500'
                        : 'border-stone-800 bg-stone-800/40 hover:bg-stone-800 hover:border-stone-700 text-stone-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-mono text-blue-400 font-semibold">{scene.number}</span>
                        <span className="text-[11px] text-stone-400">{scene.chapter}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-stone-100 line-clamp-1">{scene.shortTitle}</h4>
                      <p className="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                        {scene.description}
                      </p>
                    </div>
                    {isActive && (
                      <div className="flex items-center gap-1 text-[11px] text-blue-400 font-medium mt-3">
                        <Check className="w-3.5 h-3.5" /> Currently Viewing
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
