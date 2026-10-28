import React, { useState } from 'react';
import {
  ArrowRight,
  User,
  GraduationCap,
  Heart,
  Building2,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { SchoolRole } from '../../lib/types';

interface Scene10MultiRoleProps {
  onNext: () => void;
}

export const Scene10MultiRole: React.FC<Scene10MultiRoleProps> = ({ onNext }) => {
  const [activeRole, setActiveRole] = useState<SchoolRole>('student');

  return (
    <section className="min-h-[calc(100vh-70px)] flex flex-col justify-between py-8 lg:py-14 px-6 lg:px-16 max-w-7xl mx-auto">
      {/* Chapter kicker */}
      <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-stone-500 font-semibold mb-4">
        <span className="font-mono text-blue-700">10</span>
        <span>·</span>
        <span>Stakeholder Architecture</span>
        <span>·</span>
        <span>One Single Truth, Four Calibrated Views</span>
      </div>

      <div className="space-y-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
            Designed for the entire school community.
          </h2>
          <p className="text-base sm:text-lg text-stone-600 mt-3 leading-relaxed">
            A school portal fails if it only serves administration. Aura provides a coherent, synchronized platform where students find daily clarity, teachers regain instructional time, parents feel calm, and administrators maintain safety.
          </p>
        </div>

        {/* Role Switcher Tabs */}
        <div className="inline-flex p-1 bg-stone-200/80 rounded-xl overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveRole('student')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeRole === 'student'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-blue-700" />
            <span>Student View</span>
          </button>

          <button
            onClick={() => setActiveRole('teacher')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeRole === 'teacher'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <User className="w-4 h-4 text-emerald-700" />
            <span>Teacher View</span>
          </button>

          <button
            onClick={() => setActiveRole('parent')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeRole === 'parent'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-700" />
            <span>Parent / Guardian</span>
          </button>

          <button
            onClick={() => setActiveRole('admin')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeRole === 'admin'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-purple-700" />
            <span>Administrator</span>
          </button>
        </div>

        {/* Dynamic Role Dashboard Preview */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200/90 shadow-md">
          {activeRole === 'student' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                <div>
                  <span className="text-[11px] font-mono text-blue-700 uppercase font-semibold">
                    STUDENT DASHBOARD FOCUS
                  </span>
                  <h3 className="text-xl font-bold text-stone-900">
                    "What do I need to accomplish today?"
                  </h3>
                </div>
                <div className="text-xs text-stone-500 font-mono">Student: Julian Chen (Grade 10)</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200">
                  <span className="text-xs font-mono font-bold text-blue-800 block mb-1">CATCH ME UP</span>
                  <h4 className="text-sm font-semibold text-stone-900">3 Missed Classes Synced</h4>
                  <p className="text-xs text-stone-600 mt-1">Wednesday plan: 2 tasks completed, 1 quiz ready.</p>
                </div>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-xs font-mono font-bold text-stone-600 block mb-1">TODAY'S SCHEDULE</span>
                  <h4 className="text-sm font-semibold text-stone-900">Day 4 Rotational Schedule</h4>
                  <p className="text-xs text-stone-600 mt-1">Period 1 Chem Lab · Room 304 · 8:30 AM</p>
                </div>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-xs font-mono font-bold text-stone-600 block mb-1">BALANCED WORKLOAD</span>
                  <h4 className="text-sm font-semibold text-stone-900">1h 15m Homework Load</h4>
                  <p className="text-xs text-stone-600 mt-1">Well within the 90m grade-level recommended cap.</p>
                </div>
              </div>
            </div>
          )}

          {activeRole === 'teacher' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                <div>
                  <span className="text-[11px] font-mono text-emerald-700 uppercase font-semibold">
                    TEACHER WORKFLOW FOCUS
                  </span>
                  <h3 className="text-xl font-bold text-stone-900">
                    "Spend time teaching, not re-explaining missed days."
                  </h3>
                </div>
                <div className="text-xs text-stone-500 font-mono">Dr. Elena Rostova · AP Chemistry</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
                  <span className="text-xs font-mono font-bold text-emerald-800 block mb-1">
                    RAPID RECAP GENERATOR
                  </span>
                  <h4 className="text-sm font-semibold text-stone-900">30-Second Audio Note Synced</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Dr. Rostova dictated 3 bullet points; portal automatically generated Catch Me Up packet.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-xs font-mono font-bold text-stone-600 block mb-1">
                    POLICY-DRIVEN EXTENSIONS
                  </span>
                  <h4 className="text-sm font-semibold text-stone-900">Zero Manual Email Requests</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Excused absences receive automatic 24h grace window per course rules.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-xs font-mono font-bold text-stone-600 block mb-1">
                    FORMATIVE INSIGHTS
                  </span>
                  <h4 className="text-sm font-semibold text-stone-900">Comprehension Checks</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Identifies that 84% of students understand titration inflection before lab.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeRole === 'parent' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                <div>
                  <span className="text-[11px] font-mono text-rose-700 uppercase font-semibold">
                    PARENT DIGEST FOCUS
                  </span>
                  <h3 className="text-xl font-bold text-stone-900">
                    "Clarity without intrusive micro-hovering."
                  </h3>
                </div>
                <div className="text-xs text-stone-500 font-mono">Guardian: Sarah Chen</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200">
                  <span className="text-xs font-mono font-bold text-rose-800 block mb-1">
                    DAILY ATTENDANCE VERIFICATION
                  </span>
                  <h4 className="text-sm font-semibold text-stone-900">Doctor Note Approved</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Excusal recorded by Front Office; zero erroneous automated robocalls sent.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-xs font-mono font-bold text-stone-600 block mb-1">
                    WEEKLY LEARNING DIGEST
                  </span>
                  <h4 className="text-sm font-semibold text-stone-900">Meaningful Highlights</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Julian successfully caught up on Chemistry practical prep on Thursday.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-xs font-mono font-bold text-stone-600 block mb-1">
                    DIGITAL GATE PASS
                  </span>
                  <h4 className="text-sm font-semibold text-stone-900">1-Tap Medical Early Pickup</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Secure QR check-out with school security desk.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeRole === 'admin' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                <div>
                  <span className="text-[11px] font-mono text-purple-700 uppercase font-semibold">
                    ADMINISTRATOR & PRINCIPAL FOCUS
                  </span>
                  <h3 className="text-xl font-bold text-stone-900">
                    "School-wide academic health, safety, and compliance."
                  </h3>
                </div>
                <div className="text-xs text-stone-500 font-mono">St. Andrews Secondary (Grades 6–12)</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200">
                  <span className="text-xs font-mono font-bold text-purple-800 block mb-1">
                    ATTENDANCE INTEGRITY
                  </span>
                  <h4 className="text-sm font-semibold text-stone-900">97.4% Period Accuracy</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    State attendance reporting reconciled daily with audit trail.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-xs font-mono font-bold text-stone-600 block mb-1">
                    EARLY SUPPORT EQUITY
                  </span>
                  <h4 className="text-sm font-semibold text-stone-900">12 Support Alerts Reviewed</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    100% evaluated by faculty advisors; average response time 24h.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-xs font-mono font-bold text-stone-600 block mb-1">
                    FERPA / COPPA AUDITING
                  </span>
                  <h4 className="text-sm font-semibold text-stone-900">Zero Data Leakage</h4>
                  <p className="text-xs text-stone-600 mt-1">
                    Curriculum-only AI boundaries with strict role-based access control.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation footer */}
      <div className="border-t border-stone-200/80 pt-6 mt-8 flex items-center justify-between">
        <span className="text-xs text-stone-500">Scene 10 of 12</span>
        <button
          onClick={onNext}
          className="text-sm font-semibold text-stone-900 hover:text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Next: Trust, Privacy & Feasibility</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
