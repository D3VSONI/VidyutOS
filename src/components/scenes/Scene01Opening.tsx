import React from 'react';
import { ArrowRight, Sparkles, BookOpen, Clock, ShieldCheck, Compass } from 'lucide-react';

interface Scene01OpeningProps {
  onNext: () => void;
  onJumpToDemo: () => void;
}

export const Scene01Opening: React.FC<Scene01OpeningProps> = ({ onNext, onJumpToDemo }) => {
  return (
    <section className="min-h-[calc(100vh-70px)] flex flex-col justify-between py-8 lg:py-14 px-6 lg:px-16 max-w-7xl mx-auto">
      {/* Chapter kicker */}
      <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-stone-500 font-semibold mb-4">
        <span className="font-mono text-blue-700">01</span>
        <span>·</span>
        <span>The Product Vision</span>
        <span>·</span>
        <span>Grades 6–12 Unified School Portal</span>
      </div>

      {/* Main split hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center my-auto">
        {/* Left column: Confident editorial statement */}
        <div className="lg:col-span-7 space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.08] text-balance">
            Missing one school day shouldn’t mean{' '}
            <span className="text-blue-700 underline decoration-blue-200 decoration-wavy decoration-2">
              losing the whole week.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-stone-600 font-normal leading-relaxed max-w-2xl text-balance">
            When a middle or high school student misses a day of classes, critical context shatters across disparate LMS announcements, unrecorded classroom discussions, changed homework deadlines, and missed notes.
          </p>

          <p className="text-base text-stone-600 leading-relaxed max-w-2xl">
            <strong>Aura</strong> transforms fragmented school data into an intelligent, human-centered recovery ecosystem. It gives students immediate clarity, restores teacher time, and gives parents peaceful confidence.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onNext}
              className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>Walk Through the Story</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onJumpToDemo}
              className="px-6 py-3.5 bg-blue-50 hover:bg-blue-100 text-blue-800 text-sm font-semibold rounded-xl border border-blue-200/80 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Jump to Catch Me Up Demo</span>
            </button>
          </div>
        </div>

        {/* Right column: Editorial imagery with convergence metaphor */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200 bg-white">
            <img
              src="/src/assets/images/hero_school_students_1793131561562.jpg"
              alt="High school students collaborating in a sunlit school library"
              className="w-full h-80 sm:h-96 object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Measured scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent flex flex-col justify-end p-6 text-white">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-300 mb-1">
                <Compass className="w-4 h-4" />
                <span>Unified Learning Architecture</span>
              </div>
              <h2 className="text-lg font-semibold text-white leading-snug">
                Where every student knows exactly what to do next.
              </h2>
            </div>
          </div>

          {/* Floating animated card: Converging context */}
          <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-stone-200 shadow-xl hidden sm:flex items-center gap-3.5 max-w-xs animate-pulse-subtle">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-900">Period 1 · AP Chemistry</p>
              <p className="text-[11px] text-stone-500">Audio recap & adjusted deadline synced</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars Strip */}
      <div className="border-t border-stone-200/80 pt-6 mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <span className="text-xs font-mono text-stone-600 block mb-1">AUDIENCE</span>
          <p className="text-sm font-semibold text-stone-800">Grades 6–12 Secondary</p>
          <p className="text-xs text-stone-500 mt-0.5">Students, Teachers, Parents & Admins</p>
        </div>
        <div>
          <span className="text-xs font-mono text-stone-600 block mb-1">FLAGSHIP</span>
          <p className="text-sm font-semibold text-stone-800">Catch Me Up Recovery</p>
          <p className="text-xs text-stone-500 mt-0.5">Prioritized plan for missed days</p>
        </div>
        <div>
          <span className="text-xs font-mono text-stone-600 block mb-1">COMMUNITY</span>
          <p className="text-sm font-semibold text-stone-800">Peer Help & Lost & Found</p>
          <p className="text-xs text-stone-500 mt-0.5">Vetted coaching & verified recovery</p>
        </div>
        <div>
          <span className="text-xs font-mono text-stone-600 block mb-1">ETHICS</span>
          <p className="text-sm font-semibold text-stone-800">100% Explainable Rules</p>
          <p className="text-xs text-stone-500 mt-0.5">FERPA/COPPA safe, human-led</p>
        </div>
      </div>
    </section>
  );
};
