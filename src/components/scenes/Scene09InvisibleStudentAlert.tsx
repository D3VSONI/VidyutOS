import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  FileText,
  UserCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { DEMO_ACADEMIC_ALERT } from '../../lib/demoData';
import { resolveAcademicAlert } from '../../lib/catchMeUp';
import { AcademicAlert } from '../../lib/types';

interface Scene09InvisibleStudentAlertProps {
  onNext: () => void;
}

export const Scene09InvisibleStudentAlert: React.FC<Scene09InvisibleStudentAlertProps> = ({
  onNext,
}) => {
  const [alertState, setAlertState] = useState<AcademicAlert>(DEMO_ACADEMIC_ALERT);

  const handleAction = (action: 'schedule_checkin' | 'dismiss_exception' | 'request_review') => {
    setAlertState(resolveAcademicAlert(alertState, action));
  };

  return (
    <section className="min-h-[calc(100vh-70px)] flex flex-col justify-between py-8 lg:py-14 px-6 lg:px-16 max-w-7xl mx-auto">
      {/* Chapter kicker */}
      <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-stone-500 font-semibold mb-4">
        <span className="font-mono text-blue-700">09</span>
        <span>·</span>
        <span>Innovation Four</span>
        <span>·</span>
        <span>Transparent Academic Support Alert</span>
      </div>

      <div className="space-y-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
            Spotting academic friction before a student quietly slips behind.
          </h2>
          <p className="text-base sm:text-lg text-stone-600 mt-3 leading-relaxed">
            Quiet students often slip through the cracks when consecutive formative assignments go unsubmitted. <strong>Invisible Student Alert</strong> uses transparent, deterministic academic rules to notify advisors early—without mental-health profiling or black-box labels.
          </p>
        </div>

        {/* Ethics & Non-Diagnostic Guarantee Banner */}
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <strong className="font-bold">Strict Ethical & Pedagogical Boundary:</strong> This system is strictly an academic support tool tracking observable assignment completion. It does <em>not</em> perform psychological profiling, emotional surveillance, sentiment scraping, or automated student classification.
          </div>
        </div>

        {/* Alert Card & Rule Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Triggered Alert & Observable Signals (7 cols) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="font-mono text-xs font-bold text-stone-900">
                  CONFIDENTIAL ADVISOR BRIEF · {alertState.id}
                </span>
              </div>
              <span className="text-xs font-mono text-stone-500">
                Student {alertState.studentInitials} · {alertState.grade}
              </span>
            </div>

            {/* Rule Definition */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-semibold text-blue-700 uppercase tracking-wide">
                EXPLAINABLE RULE #{alertState.triggerRuleId}
              </span>
              <h3 className="text-base font-bold text-stone-900">{alertState.ruleTitle}</h3>
              <p className="font-mono text-xs text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-200/60">
                Formula: {alertState.ruleFormula}
              </p>
            </div>

            {/* Observable Data Signals */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-stone-500 uppercase tracking-wide block">
                OBSERVABLE CLASSROOM SIGNALS
              </span>
              <div className="space-y-2">
                {alertState.observableSignals.map((sig, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-semibold text-stone-800">{sig.signal}</p>
                      <p className="text-[11px] text-stone-400 mt-0.5">{sig.date} · Physics Honors</p>
                    </div>
                    <span className="font-mono text-[11px] text-rose-700 font-medium bg-rose-50 px-2 py-0.5 rounded">
                      {sig.metric}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Review Status */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
              <span className="text-[10px] font-mono text-stone-500 block mb-1">
                ADVISOR AUDIT TRAIL
              </span>
              <p className="text-xs text-stone-800 font-medium">{alertState.notes}</p>
              <div className="mt-2 text-[11px] text-stone-500 flex items-center gap-2">
                <span>Current Status:</span>
                <span
                  className={`font-semibold capitalize px-2 py-0.5 rounded ${
                    alertState.reviewStatus === 'review_scheduled'
                      ? 'bg-emerald-100 text-emerald-800'
                      : alertState.reviewStatus === 'dismissed_exception'
                      ? 'bg-stone-200 text-stone-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {alertState.reviewStatus.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Human Advisor Actions (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-stone-900 text-white shadow-xl space-y-5">
            <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider font-semibold block">
              ADVISOR WORKFLOW DECISION
            </span>

            <h3 className="text-lg font-bold text-white">Choose Supportive Next Step</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Every alert requires direct human educator judgment. The algorithm cannot take disciplinary or permanent record actions.
            </p>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => handleAction('schedule_checkin')}
                className="w-full text-left p-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 transition-colors cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                    1. Schedule 15-Min Academic Check-in
                  </h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Offers a quiet, positive conversation with student advisor.
                  </p>
                </div>
                <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              </button>

              <button
                onClick={() => handleAction('request_review')}
                className="w-full text-left p-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 transition-colors cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                    2. Request Dept Head Review
                  </h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Checks if whole class experienced difficulty with Unit 3.
                  </p>
                </div>
                <FileText className="w-4 h-4 text-blue-400 shrink-0" />
              </button>

              <button
                onClick={() => handleAction('dismiss_exception')}
                className="w-full text-left p-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 transition-colors cursor-pointer flex items-center justify-between group"
              >
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                    3. Dismiss / Note Known Exemption
                  </h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Document family medical leave or excused absence exception.
                  </p>
                </div>
                <XCircle className="w-4 h-4 text-amber-400 shrink-0" />
              </button>
            </div>

            <button
              onClick={() => setAlertState(DEMO_ACADEMIC_ALERT)}
              className="text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1.5 pt-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset alert state</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation footer */}
      <div className="border-t border-stone-200/80 pt-6 mt-8 flex items-center justify-between">
        <span className="text-xs text-stone-500">Scene 09 of 12</span>
        <button
          onClick={onNext}
          className="text-sm font-semibold text-stone-900 hover:text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Next: Multi-Role Experience</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
