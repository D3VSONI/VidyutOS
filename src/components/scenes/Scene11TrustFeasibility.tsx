import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  Layers,
  Database,
  Eye,
  CheckCircle2,
  HelpCircle,
  FileCode,
} from 'lucide-react';

interface Scene11TrustFeasibilityProps {
  onNext: () => void;
}

export const Scene11TrustFeasibility: React.FC<Scene11TrustFeasibilityProps> = ({ onNext }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'demo' | 'sis' | 'future'>('all');

  const capabilities = [
    {
      name: 'Catch Me Up Prioritized Plan & Knowledge Checks',
      tier: 'demo',
      tierLabel: 'Implemented in Demo',
      description: 'Fully functional client-side prioritization logic, dynamic effort calculations, and formative quiz evaluation.',
      integrationReq: 'Operates stand-alone with seed curricula; connects via LTI 1.3 / OneRoster.',
    },
    {
      name: 'Smart Lost & Found Attribute Matcher',
      tier: 'demo',
      tierLabel: 'Implemented in Demo',
      description: 'Attribute clustering, location proximity scoring, and zero-knowledge ownership challenge verification.',
      integrationReq: 'Lightweight cloud asset storage & security desk scanner app.',
    },
    {
      name: 'Peer Help Exchange & Booking Engine',
      tier: 'demo',
      tierLabel: 'Implemented in Demo',
      description: 'Topic-based peer search, teacher endorsement badges, and study pod reservation state.',
      integrationReq: 'Google Calendar / Outlook School Resource Mailboxes.',
    },
    {
      name: 'Invisible Student Alert Framework',
      tier: 'demo',
      tierLabel: 'Implemented in Demo',
      description: 'Deterministic rule formula execution, advisor triage workflows, and ethical non-diagnostic safeguards.',
      integrationReq: 'Gradebook event hooks (Canvas, Schoology, PowerSchool).',
    },
    {
      name: 'Direct SIS Bidirectional Sync',
      tier: 'sis',
      tierLabel: 'Requires School SIS Integration',
      description: 'Automated ingestion of excused medical slips, state reporting attendance compliance, and parent contacts.',
      integrationReq: 'OneRoster v1.2 / Ed-Fi Alliance standard data endpoints.',
    },
    {
      name: 'LMS Automated Assignment Ingestion',
      tier: 'sis',
      tierLabel: 'Requires School SIS Integration',
      description: 'Extracting assignment rubrics, problem sets, and attached files directly from teacher LMS courses.',
      integrationReq: 'Canvas REST API / Google Classroom API OAuth tokens.',
    },
    {
      name: 'Voice-to-Recap Audio Transcription Pipeline',
      tier: 'future',
      tierLabel: 'Proposed Production Pipeline',
      description: 'Teacher dictates 30-second summary on classroom mic; server-side pipeline structures lecture bullet points.',
      integrationReq: 'Enterprise speech-to-text with FERPA-certified privacy boundary.',
    },
  ];

  const filtered =
    activeFilter === 'all'
      ? capabilities
      : capabilities.filter((c) => c.tier === activeFilter);

  return (
    <section className="min-h-[calc(100vh-70px)] flex flex-col justify-between py-8 lg:py-14 px-6 lg:px-16 max-w-7xl mx-auto">
      {/* Chapter kicker */}
      <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-stone-500 font-semibold mb-4">
        <span className="font-mono text-blue-700">11</span>
        <span>·</span>
        <span>Engineering & Ethics</span>
        <span>·</span>
        <span>Honest Feasibility & Compliance Architecture</span>
      </div>

      <div className="space-y-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
            Transparent technology. <br />
            <span className="text-emerald-700">Strict student data safeguards.</span>
          </h2>
          <p className="text-base sm:text-lg text-stone-600 mt-3 leading-relaxed">
            School trust is earned through radical transparency. Here is the exact technical boundary between what is working in this interactive pitch, what is proposed, and what connects to live school infrastructure.
          </p>
        </div>

        {/* 3 Privacy Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
              <Lock className="w-4 h-4 text-emerald-700" />
              <span>FERPA & COPPA Aligned</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Student data is never sold, never used to train public LLM models, and encrypted both in transit and at rest.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
              <Eye className="w-4 h-4 text-blue-700" />
              <span>100% Explainable Logic</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Alerts and priority rankings are based on transparent, inspectable mathematical formulas—never black-box algorithms.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
              <ShieldCheck className="w-4 h-4 text-purple-700" />
              <span>Educator Primacy</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              AI systems advise; human educators decide. No automated disciplinary or permanent academic records without teacher review.
            </p>
          </div>
        </div>

        {/* Technical Implementation Matrix */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
            <div>
              <span className="text-xs font-mono font-semibold text-stone-500 uppercase tracking-wide">
                FEASIBILITY & INTEGRATION MATRIX
              </span>
              <p className="text-xs text-stone-500 mt-0.5">Filter by readiness tier</p>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg self-start sm:self-auto">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeFilter === 'all' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
                }`}
              >
                All (7)
              </button>
              <button
                onClick={() => setActiveFilter('demo')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeFilter === 'demo' ? 'bg-white text-blue-700 shadow-2xs' : 'text-stone-600'
                }`}
              >
                Working in Demo (4)
              </button>
              <button
                onClick={() => setActiveFilter('sis')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeFilter === 'sis' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
                }`}
              >
                Requires Live SIS (2)
              </button>
              <button
                onClick={() => setActiveFilter('future')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeFilter === 'future' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
                }`}
              >
                Proposed Pilot (1)
              </button>
            </div>
          </div>

          {/* Capability table / items */}
          <div className="space-y-2.5">
            {filtered.map((cap, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-stone-50/80 border border-stone-200/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-stone-900">{cap.name}</h4>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                        cap.tier === 'demo'
                          ? 'bg-blue-100 text-blue-800'
                          : cap.tier === 'sis'
                          ? 'bg-stone-200 text-stone-700'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {cap.tierLabel}
                    </span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">{cap.description}</p>
                </div>

                <div className="md:text-right shrink-0">
                  <span className="text-[10px] font-mono text-stone-400 block">
                    INTEGRATION DEPENDENCY
                  </span>
                  <span className="text-stone-700 font-medium">{cap.integrationReq}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation footer */}
      <div className="border-t border-stone-200/80 pt-6 mt-8 flex items-center justify-between">
        <span className="text-xs text-stone-500">Scene 11 of 12</span>
        <button
          onClick={onNext}
          className="text-sm font-semibold text-stone-900 hover:text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Next: Closing Synthesis</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
