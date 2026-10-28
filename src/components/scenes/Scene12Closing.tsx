import React from 'react';
import { ArrowRight, RotateCcw, Sparkles, CheckCircle2, Compass, HeartHandshake } from 'lucide-react';
import { SceneId } from '../../lib/types';

interface Scene12ClosingProps {
  onRestart: () => void;
  onJumpToDemo: () => void;
}

export const Scene12Closing: React.FC<Scene12ClosingProps> = ({ onRestart, onJumpToDemo }) => {
  return (
    <section className="min-h-[calc(100vh-70px)] flex flex-col justify-between py-10 lg:py-16 px-6 lg:px-16 max-w-7xl mx-auto">
      {/* Chapter kicker */}
      <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-stone-500 font-semibold mb-4">
        <span className="font-mono text-blue-700">12</span>
        <span>·</span>
        <span>The Conclusion</span>
        <span>·</span>
        <span>A Platform for What’s Next</span>
      </div>

      <div className="my-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" /> Aura School Portal Experience
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.12] text-balance">
            “Not just a portal that shows students what happened.{' '}
            <span className="text-blue-700 underline decoration-blue-200 decoration-wavy decoration-2">
              A platform that helps them decide what to do next.”
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-stone-600 font-normal leading-relaxed text-balance pt-2">
            By connecting attendance, timetables, coursework, peer tutoring, and intelligent recovery, Aura restores dignity, calm, and agency to middle and high school education.
          </p>
        </div>

        {/* Synthesis Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-2">
            <span className="text-xs font-mono font-bold text-blue-700 block">FOR STUDENTS</span>
            <h4 className="text-sm font-semibold text-stone-900">Zero Absence Panic</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Prioritized recovery plans, adjusted deadlines, and 2-minute knowledge checks replace lost instructional weeks.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-700 block">FOR EDUCATORS</span>
            <h4 className="text-sm font-semibold text-stone-900">Restored Teaching Time</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Automated policy-based deadline extensions and instant audio recap synthesis eliminate repetitive email triage.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-2">
            <span className="text-xs font-mono font-bold text-purple-700 block">FOR SCHOOLS</span>
            <h4 className="text-sm font-semibold text-stone-900">Transparent & Caring</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Ethical early academic support and verified property recovery foster a connected, trust-filled school culture.
            </p>
          </div>
        </div>

        {/* Primary Final Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center gap-4">
          <button
            onClick={onJumpToDemo}
            className="px-7 py-4 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
          >
            <Sparkles className="w-4 h-4" />
            <span>Replay Catch Me Up Simulation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onRestart}
            className="px-6 py-4 bg-white hover:bg-stone-100 text-stone-800 text-sm font-semibold rounded-xl border border-stone-200 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-stone-600" />
            <span>Restart Presentation (Scene 01)</span>
          </button>
        </div>
      </div>

      {/* Quiet Footer */}
      <footer className="border-t border-stone-200/80 pt-6 mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <span className="font-bold text-stone-800 font-['Plus_Jakarta_Sans']">Aura School Portal</span>
          <span>·</span>
          <span>Grades 6–12 Product Experience</span>
        </div>
        <div className="flex items-center gap-4 text-stone-500 font-mono text-[11px]">
          <span>Designed with Rising Wave Motion Principles</span>
          <span>·</span>
          <span>FERPA / COPPA Compliant Architecture</span>
        </div>
      </footer>
    </section>
  );
};
