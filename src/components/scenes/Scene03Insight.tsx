import React, { useState } from 'react';
import { ArrowRight, Layers, ArrowRightLeft, Sparkles, Database, Check } from 'lucide-react';

interface Scene03InsightProps {
  onNext: () => void;
}

export const Scene03Insight: React.FC<Scene03InsightProps> = ({ onNext }) => {
  const [isUnified, setIsUnified] = useState(false);

  return (
    <section className="min-h-[calc(100vh-70px)] flex flex-col justify-between py-8 lg:py-14 px-6 lg:px-16 max-w-7xl mx-auto">
      {/* Chapter kicker */}
      <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-stone-500 font-semibold mb-4">
        <span className="font-mono text-blue-700">03</span>
        <span>·</span>
        <span>The Insight</span>
        <span>·</span>
        <span>From Siloed Data to Connective Intelligence</span>
      </div>

      <div className="space-y-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
            The data already exists. <br />
            <span className="text-blue-700">The connective tissue does not.</span>
          </h2>
          <p className="text-base sm:text-lg text-stone-600 mt-4 leading-relaxed">
            Schools don't suffer from a lack of digital software. They have student information systems, learning management systems, bell schedules, attendance portals, and chat groups. The missing piece is an intelligent system that joins these inputs around the student's moment of need.
          </p>
        </div>

        {/* Interactive Transformation Stage */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200/90 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
            <div>
              <span className="text-xs font-mono font-semibold text-stone-600 uppercase tracking-wide">
                INTERACTIVE ARCHITECTURAL SHIFT
              </span>
              <p className="text-sm font-semibold text-stone-900 mt-0.5">
                Toggle between Siloed Architecture and Aura’s Unified Graph
              </p>
            </div>
            <button
              onClick={() => setIsUnified(!isUnified)}
              className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>{isUnified ? 'View Disconnected Silos' : 'Activate Connective Tissue'}</span>
            </button>
          </div>

          {/* Visual Canvas Representation */}
          <div className="py-8 transition-all duration-500">
            {!isUnified ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl bg-stone-50 border border-dashed border-stone-300 text-center space-y-2 opacity-80">
                  <div className="w-10 h-10 mx-auto rounded-lg bg-stone-200 text-stone-700 flex items-center justify-center font-mono font-bold text-xs">
                    SIS
                  </div>
                  <h4 className="text-sm font-semibold text-stone-800">Student Info System</h4>
                  <p className="text-xs text-stone-500">Attendance records, guardian contacts, demographics.</p>
                  <span className="inline-block text-[10px] font-mono text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                    Isolated Silo
                  </span>
                </div>

                <div className="p-5 rounded-xl bg-stone-50 border border-dashed border-stone-300 text-center space-y-2 opacity-80">
                  <div className="w-10 h-10 mx-auto rounded-lg bg-stone-200 text-stone-700 flex items-center justify-center font-mono font-bold text-xs">
                    LMS
                  </div>
                  <h4 className="text-sm font-semibold text-stone-800">Learning Management</h4>
                  <p className="text-xs text-stone-500">Assignment submissions, syllabus PDFs, grading rubrics.</p>
                  <span className="inline-block text-[10px] font-mono text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                    Isolated Silo
                  </span>
                </div>

                <div className="p-5 rounded-xl bg-stone-50 border border-dashed border-stone-300 text-center space-y-2 opacity-80">
                  <div className="w-10 h-10 mx-auto rounded-lg bg-stone-200 text-stone-700 flex items-center justify-center font-mono font-bold text-xs">
                    BELL
                  </div>
                  <h4 className="text-sm font-semibold text-stone-800">Schedule & Timetable</h4>
                  <p className="text-xs text-stone-500">Rotational period blocks, room allocations, assemblies.</p>
                  <span className="inline-block text-[10px] font-mono text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                    Isolated Silo
                  </span>
                </div>

                <div className="p-5 rounded-xl bg-stone-50 border border-dashed border-stone-300 text-center space-y-2 opacity-80">
                  <div className="w-10 h-10 mx-auto rounded-lg bg-stone-200 text-stone-700 flex items-center justify-center font-mono font-bold text-xs">
                    CARE
                  </div>
                  <h4 className="text-sm font-semibold text-stone-800">Counseling & Support</h4>
                  <p className="text-xs text-stone-500">Paper notes, email referrals, advisor logs.</p>
                  <span className="inline-block text-[10px] font-mono text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                    Isolated Silo
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white shadow-xl transition-all duration-500">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 max-w-md">
                    <span className="text-xs font-mono text-blue-300 font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> AURA UNIFIED GRAPH
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      The Student-Centered Connective Engine
                    </h3>
                    <p className="text-xs text-blue-100/90 leading-relaxed">
                      Inputs from SIS, LMS, Timetables, and Classrooms fuse into a single directed recovery graph. When absence occurs, the system calculates dependencies immediately.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
                    <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                      <p className="text-xs text-blue-200">Reconciled Due Dates</p>
                      <p className="text-sm font-bold text-white mt-1">Automatic 24h Buffer</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                      <p className="text-xs text-blue-200">Audio Recaps Synthesized</p>
                      <p className="text-sm font-bold text-white mt-1">3 Periods Clustered</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                      <p className="text-xs text-blue-200">Peer Help Routing</p>
                      <p className="text-sm font-bold text-white mt-1">Matches Suggested</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                      <p className="text-xs text-blue-200">Guardian Verification</p>
                      <p className="text-sm font-bold text-white mt-1">Single Daily Digest</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation footer */}
      <div className="border-t border-stone-200/80 pt-6 mt-8 flex items-center justify-between">
        <span className="text-xs text-stone-500">Scene 03 of 12</span>
        <button
          onClick={onNext}
          className="text-sm font-semibold text-stone-900 hover:text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Next: The Connected Ecosystem Map</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
