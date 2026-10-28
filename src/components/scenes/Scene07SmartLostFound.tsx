import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  Search,
  Key,
  HelpCircle,
  FileBadge,
} from 'lucide-react';
import { DEMO_LOST_ITEM, DEMO_FOUND_ITEM } from '../../lib/demoData';
import { evaluateLostFoundMatch } from '../../lib/catchMeUp';

interface Scene07SmartLostFoundProps {
  onNext: () => void;
}

export const Scene07SmartLostFound: React.FC<Scene07SmartLostFoundProps> = ({ onNext }) => {
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [verificationError, setVerificationError] = useState(false);

  const matchData = evaluateLostFoundMatch(DEMO_LOST_ITEM, DEMO_FOUND_ITEM);

  const handleVerifyClaim = () => {
    if (securityAnswer.toLowerCase().includes('compass') || securityAnswer.toLowerCase().includes('brass')) {
      setIsVerified(true);
      setVerificationError(false);
    } else {
      setVerificationError(true);
    }
  };

  return (
    <section className="min-h-[calc(100vh-70px)] flex flex-col justify-between py-8 lg:py-14 px-6 lg:px-16 max-w-7xl mx-auto">
      {/* Chapter kicker */}
      <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-stone-500 font-semibold mb-4">
        <span className="font-mono text-blue-700">07</span>
        <span>·</span>
        <span>Innovation Two</span>
        <span>·</span>
        <span>Smart Lost & Found with Verified Recovery</span>
      </div>

      <div className="space-y-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
            Recovering lost items without campus chaos.
          </h2>
          <p className="text-base sm:text-lg text-stone-600 mt-3 leading-relaxed">
            School hallways lose hundreds of water bottles, calculators, and backpacks every semester. Smart Lost & Found matches reports via attribute clustering and location heuristics, then protects student property through a privacy-preserving ownership verification challenge.
          </p>
        </div>

        {/* Side by side comparison & match verification */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Reported Lost Item (4 cols) */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between text-xs pb-3 border-b border-stone-100">
              <span className="font-mono text-stone-500 uppercase font-semibold">
                REPORTED LOST BY STUDENT
              </span>
              <span className="text-stone-400 font-mono text-[11px]">{DEMO_LOST_ITEM.id}</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-stone-900">{DEMO_LOST_ITEM.title}</h3>
              <div className="space-y-1 text-xs text-stone-600">
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>Reported Location: {DEMO_LOST_ITEM.locationReported}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>Reported: {DEMO_LOST_ITEM.reportedDate}</span>
                </p>
              </div>
              <p className="text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-100 leading-relaxed">
                "{DEMO_LOST_ITEM.description}"
              </p>
              <div className="text-[11px] text-stone-500 pt-1">
                Reporter: <strong>{DEMO_LOST_ITEM.reporterName}</strong> ({DEMO_LOST_ITEM.reporterGrade})
              </div>
            </div>
          </div>

          {/* Center: Match Heuristic & Confidence (4 cols) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-blue-300 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> ATTRIBUTE CLUSTER MATCH
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/20 text-blue-300 font-bold">
                {matchData.confidenceScore}% MATCH
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">High-Confidence Item Match</h3>

            <div className="space-y-2 text-xs">
              {matchData.matchReasons.map((reason, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-white/10 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-stone-200">{reason}</span>
                </div>
              ))}
            </div>

            {/* Ownership Challenge Card */}
            <div className="pt-3 border-t border-white/15 space-y-3">
              <div className="flex items-center gap-1.5 text-xs text-blue-200 font-semibold">
                <Key className="w-3.5 h-3.5" />
                <span>Zero-Knowledge Ownership Challenge</span>
              </div>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                {DEMO_LOST_ITEM.securityQuestion}
              </p>

              {!isVerified ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    placeholder="Enter charm identifier (e.g. compass)..."
                    className="w-full px-3 py-2 text-xs rounded-lg bg-stone-800 border border-stone-700 text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleVerifyClaim}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Verify Ownership
                    </button>
                    <button
                      onClick={() => {
                        setSecurityAnswer('Antique brass compass');
                        setIsVerified(true);
                        setVerificationError(false);
                      }}
                      className="text-[11px] text-blue-300 hover:text-white underline cursor-pointer"
                    >
                      Autofill Correct Answer
                    </button>
                  </div>
                  {verificationError && (
                    <p className="text-[11px] text-rose-300">
                      Answer does not match custodian record. Try "compass".
                    </p>
                  )}
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Ownership Confirmed!</strong>
                    <span>Claim ticket generated: #TCK-882. Present to Desk Officer Miller at Campus Security.</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Found Item at Security Desk (4 cols) */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between text-xs pb-3 border-b border-stone-100">
              <span className="font-mono text-stone-500 uppercase font-semibold">
                FOUND ITEM IN INVENTORY
              </span>
              <span className="text-stone-400 font-mono text-[11px]">{DEMO_FOUND_ITEM.id}</span>
            </div>

            <div className="rounded-xl overflow-hidden border border-stone-200">
              <img
                src={DEMO_FOUND_ITEM.image}
                alt="Found navy backpack on school bench"
                className="w-full h-44 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-1.5 text-xs text-stone-600">
              <h4 className="text-sm font-bold text-stone-900">{DEMO_FOUND_ITEM.title}</h4>
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>Found: {DEMO_FOUND_ITEM.foundLocation}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Custodian: {DEMO_FOUND_ITEM.custodian}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation footer */}
      <div className="border-t border-stone-200/80 pt-6 mt-8 flex items-center justify-between">
        <span className="text-xs text-stone-500">Scene 07 of 12</span>
        <button
          onClick={onNext}
          className="text-sm font-semibold text-stone-900 hover:text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Next: Innovation 3 — Peer Help Exchange</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
