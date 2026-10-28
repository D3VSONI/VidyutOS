import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Calendar, FileText, HelpCircle } from 'lucide-react';

interface Scene05IntroduceCatchMeUpProps {
  onNext: () => void;
  onLaunchDemo: () => void;
}

export const Scene05IntroduceCatchMeUp: React.FC<Scene05IntroduceCatchMeUpProps> = ({
  onNext,
  onLaunchDemo,
}) => {
  return (
    <section className="min-h-[calc(100vh-70px)] flex flex-col justify-between py-8 lg:py-14 px-6 lg:px-16 max-w-7xl mx-auto">
      {/* Chapter kicker */}
      <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-stone-500 font-semibold mb-4">
        <span className="font-mono text-blue-700">05</span>
        <span>·</span>
        <span>Flagship Innovation</span>
        <span>·</span>
        <span>The Catch Me Up Architecture</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center my-auto">
        {/* Left column: Philosophy & The 4-step mechanism */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Flagship Product Experience
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight text-balance">
            Turning an absence into a{' '}
            <span className="text-blue-700 underline decoration-blue-200 decoration-wavy decoration-2">
              guided recovery plan.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
            Catch Me Up is not a passive list of missed files. It is an active recovery copilot that synthesizes what was missed, protects the student from deadline pile-up, and breaks down academic backlog into digestible, ordered steps.
          </p>

          {/* 4-step mechanism */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-sm">
              <span className="text-xs font-mono font-bold text-blue-700 block mb-1">01. INGESTION</span>
              <h4 className="text-sm font-semibold text-stone-900">Excused Absence Detected</h4>
              <p className="text-xs text-stone-500 mt-1">Identifies missed periods (AP Chemistry, Algebra II, History).</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-sm">
              <span className="text-xs font-mono font-bold text-blue-700 block mb-1">02. SYNTHESIS</span>
              <h4 className="text-sm font-semibold text-stone-900">Audio Recaps & Notes Synced</h4>
              <p className="text-xs text-stone-500 mt-1">Key concepts, lab announcements, and adjusted due dates.</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-sm">
              <span className="text-xs font-mono font-bold text-blue-700 block mb-1">03. PRIORITIZATION</span>
              <h4 className="text-sm font-semibold text-stone-900">Urgency & Effort Ordering</h4>
              <p className="text-xs text-stone-500 mt-1">High-urgency, short-duration tasks first to build momentum.</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-sm">
              <span className="text-xs font-mono font-bold text-blue-700 block mb-1">04. VALIDATION</span>
              <h4 className="text-sm font-semibold text-stone-900">2-Minute Knowledge Check</h4>
              <p className="text-xs text-stone-500 mt-1">Confirms comprehension before upcoming practicals or quizzes.</p>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <button
              onClick={onLaunchDemo}
              className="px-7 py-4 bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3 cursor-pointer group"
            >
              <span>Operate Live Simulation (Scene 06)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right column: Editorial image & Live preview teaser */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200 bg-white">
            <img
              src="/src/assets/images/study_desk_recap_1793131562405.jpg"
              alt="Student study desk with handwritten chemistry notes and laptop"
              className="w-full h-80 sm:h-96 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/30 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-mono text-blue-300 font-semibold mb-1">REAL CLASSROOM DATA</span>
              <h3 className="text-lg font-semibold text-white leading-snug">
                AP Chemistry · Problem Set 4.2 Extended by 24h
              </h3>
              <p className="text-xs text-stone-300 mt-1">
                Teacher policy: 1 excused day = 1 automatic calendar day buffer.
              </p>
            </div>
          </div>

          {/* Micro preview badge */}
          <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl border border-stone-200 shadow-lg text-xs font-semibold text-stone-800 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive Demo Ready</span>
          </div>
        </div>
      </div>

      {/* Navigation footer */}
      <div className="border-t border-stone-200/80 pt-6 mt-8 flex items-center justify-between">
        <span className="text-xs text-stone-500">Scene 05 of 12</span>
        <button
          onClick={onLaunchDemo}
          className="text-sm font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Launch the Catch Me Up Simulation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
