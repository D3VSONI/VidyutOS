import React, { useState } from 'react';
import { AlertCircle, Bell, MessageSquare, Clock, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Scene02ProblemProps {
  onNext: () => void;
}

export const Scene02Problem: React.FC<Scene02ProblemProps> = ({ onNext }) => {
  const [activeTab, setActiveTab] = useState<'chaos' | 'clarity'>('chaos');

  return (
    <section className="min-h-[calc(100vh-70px)] flex flex-col justify-between py-8 lg:py-14 px-6 lg:px-16 max-w-7xl mx-auto">
      {/* Chapter kicker */}
      <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-stone-500 font-semibold mb-4">
        <span className="font-mono text-blue-700">02</span>
        <span>·</span>
        <span>The Problem</span>
        <span>·</span>
        <span>Cognitive Overload After Absence</span>
      </div>

      <div className="space-y-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
            5 different platforms. 8 unread notices. <br className="hidden sm:inline" />
            <span className="text-rose-700">Zero clear starting points.</span>
          </h2>
          <p className="text-base sm:text-lg text-stone-600 mt-4 leading-relaxed">
            When a 10th-grade student returns after 24 hours out sick with the flu, they don't find a coordinated welcome back. They enter a maze of scattered notification channels with conflicting urgency.
          </p>
        </div>

        {/* Interactive Comparison Switcher */}
        <div className="inline-flex p-1 bg-stone-200/80 rounded-xl">
          <button
            onClick={() => setActiveTab('chaos')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'chaos'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            The Fragmented Reality (Current)
          </button>
          <button
            onClick={() => setActiveTab('clarity')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'clarity'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            What the Student Actually Needs
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'chaos' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Fragment 1: LMS Missed Assignment */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm relative overflow-hidden group hover:border-rose-300 transition-colors">
              <div className="flex items-center justify-between text-xs text-rose-600 font-mono mb-3">
                <span className="flex items-center gap-1.5 font-semibold">
                  <AlertCircle className="w-4 h-4" /> LMS Notification
                </span>
                <span>Yesterday 09:15 AM</span>
              </div>
              <h3 className="text-base font-semibold text-stone-900 mb-1.5">
                New Assignment: Problem Set 4.2
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                "Due Thursday 8:30 AM. Strict late penalties apply unless excusal slip filed in front office."
              </p>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span>AP Chemistry</span>
                <span className="text-rose-600 font-medium">Overdue in 14h</span>
              </div>
            </div>

            {/* Fragment 2: Class Chat / Group Thread */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm relative overflow-hidden group hover:border-amber-300 transition-colors">
              <div className="flex items-center justify-between text-xs text-amber-600 font-mono mb-3">
                <span className="flex items-center gap-1.5 font-semibold">
                  <MessageSquare className="w-4 h-4" /> Student Group Chat
                </span>
                <span>Yesterday 01:20 PM</span>
              </div>
              <h3 className="text-base font-semibold text-stone-900 mb-1.5">
                "Did she move the lab practical?"
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                "Wait did Rostova say Group B does titrations on Friday or Monday? Someone send the notes from whiteboard please!"
              </p>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span>Unverified Student Rumor</span>
                <span className="text-amber-600 font-medium">Conflicting Info</span>
              </div>
            </div>

            {/* Fragment 3: Email Bulletin / Portal Notice */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between text-xs text-blue-600 font-mono mb-3">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Bell className="w-4 h-4" /> Principal Bulletin
                </span>
                <span>Yesterday 04:00 PM</span>
              </div>
              <h3 className="text-base font-semibold text-stone-900 mb-1.5">
                Bell Schedule Revision for Friday
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                "Assembly schedule in effect. Period 1 shortened to 35 minutes. Period 4 relocated to Auditorium."
              </p>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span>School-Wide Notice</span>
                <span className="text-stone-500">Buries Lab Impact</span>
              </div>
            </div>

            {/* Fragment 4: Locker / Physical World */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm relative overflow-hidden group hover:border-purple-300 transition-colors">
              <div className="flex items-center justify-between text-xs text-purple-600 font-mono mb-3">
                <span className="flex items-center gap-1.5 font-semibold">
                  <FileText className="w-4 h-4" /> Physical Handout
                </span>
                <span>Period 2 Algebra II</span>
              </div>
              <h3 className="text-base font-semibold text-stone-900 mb-1.5">
                Printed Worksheet Sitting in Wire Bin
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                The worksheet with worked parabola transformations is a paper copy left on Mr. Thorne’s desk. Not uploaded to LMS.
              </p>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span>Physical Silo</span>
                <span className="text-purple-600 font-medium">Inaccessible from Home</span>
              </div>
            </div>

            {/* Fragment 5: Attendance Slip */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm relative overflow-hidden group hover:border-stone-400 transition-colors">
              <div className="flex items-center justify-between text-xs text-stone-600 font-mono mb-3">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Clock className="w-4 h-4" /> SIS System
                </span>
                <span>Recorded 08:35 AM</span>
              </div>
              <h3 className="text-base font-semibold text-stone-900 mb-1.5">
                Unexcused Absence Flagged
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Automated phone robocall triggered to parents, despite doctor’s note submitted via email 2 hours prior.
              </p>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span>SIS Disconnect</span>
                <span className="text-stone-600 font-medium">Administrative Friction</span>
              </div>
            </div>

            {/* Summary card */}
            <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-semibold text-rose-700 block mb-2">THE OUTCOME</span>
                <h3 className="text-lg font-bold text-rose-950 mb-2">
                  Academic Anxiety & Lost Instructional Hours
                </h3>
                <p className="text-xs text-rose-900 leading-relaxed">
                  Students spend their first 2 hours back asking peers what was missed, sorting conflicting deadlines, and apologizing to teachers rather than learning.
                </p>
              </div>
              <div className="pt-4 border-t border-rose-200/60 text-xs text-rose-800 font-medium">
                4.2 hours average time spent hunting for missed materials per absence.
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white border border-blue-200 shadow-lg space-y-6">
            <div className="flex items-center gap-3 text-blue-700">
              <CheckCircle2 className="w-6 h-6" />
              <h3 className="text-xl font-bold text-stone-900">
                The Single Prioritized Catch-Up Feed
              </h3>
            </div>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl">
              Instead of navigating 5 disjointed platforms, the student opens one screen that has already reconciled attendance, collected available audio recaps, correlated notes, updated due dates automatically with approved teacher policies, and arranged tasks by urgent priority.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-xs font-mono text-blue-700 font-semibold block mb-1">01. SYNTHESIS</span>
                <p className="text-sm font-semibold text-stone-900">All 3 Missed Classes Grouped</p>
                <p className="text-xs text-stone-500 mt-1">Chemistry, Algebra II, and World History recaps in one card.</p>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-xs font-mono text-blue-700 font-semibold block mb-1">02. EXTENSIONS</span>
                <p className="text-sm font-semibold text-stone-900">Automatic Deadline Adjustments</p>
                <p className="text-xs text-stone-500 mt-1">1-day grace period applied automatically with teacher visibility.</p>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-xs font-mono text-blue-700 font-semibold block mb-1">03. MOMENTUM</span>
                <p className="text-sm font-semibold text-stone-900">Prioritized Action Queue</p>
                <p className="text-xs text-stone-500 mt-1">Shortest, most foundational tasks first to prevent paralysis.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation footer */}
      <div className="border-t border-stone-200/80 pt-6 mt-8 flex items-center justify-between">
        <span className="text-xs text-stone-500">Scene 02 of 12</span>
        <button
          onClick={onNext}
          className="text-sm font-semibold text-stone-900 hover:text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Next: The Core Product Insight</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
