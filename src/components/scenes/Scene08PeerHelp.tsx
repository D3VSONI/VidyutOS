import React, { useState } from 'react';
import {
  ArrowRight,
  Users,
  Star,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldAlert,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { DEMO_PEER_TUTORS } from '../../lib/demoData';
import { PeerTutor } from '../../lib/types';
import { filterPeersByTopic } from '../../lib/catchMeUp';

interface Scene08PeerHelpProps {
  onNext: () => void;
}

export const Scene08PeerHelp: React.FC<Scene08PeerHelpProps> = ({ onNext }) => {
  const [selectedTopic, setSelectedTopic] = useState('Chemistry');
  const [bookedTutorId, setBookedTutorId] = useState<string | null>(null);

  const filteredPeers = filterPeersByTopic(DEMO_PEER_TUTORS, selectedTopic);

  const topics = ['Chemistry', 'Algebra', 'World History', 'All Subjects'];

  return (
    <section className="min-h-[calc(100vh-70px)] flex flex-col justify-between py-8 lg:py-14 px-6 lg:px-16 max-w-7xl mx-auto">
      {/* Chapter kicker */}
      <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-stone-500 font-semibold mb-4">
        <span className="font-mono text-blue-700">08</span>
        <span>·</span>
        <span>Innovation Three</span>
        <span>·</span>
        <span>Peer Help Exchange</span>
      </div>

      <div className="space-y-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
            Learning from peers who just mastered it.
          </h2>
          <p className="text-base sm:text-lg text-stone-600 mt-3 leading-relaxed">
            Students frequently grasp difficult concepts faster when explained by a peer who took the same exam 6 months ago. Peer Help Exchange matches students for safe, teacher-endorsed study sessions in monitored campus study pods.
          </p>
        </div>

        {/* Topic filter bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-mono text-stone-500 uppercase mr-1">Filter by Subject:</span>
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t === 'All Subjects' ? '' : t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                (selectedTopic === t || (t === 'All Subjects' && selectedTopic === ''))
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Main 2-Column Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Peer Tutors Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-3.5">
            {filteredPeers.map((tutor) => {
              const isBooked = bookedTutorId === tutor.id;

              return (
                <div
                  key={tutor.id}
                  className={`p-5 rounded-2xl bg-white border transition-all shadow-sm ${
                    isBooked
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                      : 'border-stone-200/90 hover:border-stone-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center font-['Plus_Jakarta_Sans']">
                        {tutor.avatarLetter}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-stone-900">{tutor.name}</h4>
                        <p className="text-xs text-stone-500">{tutor.grade}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1 font-mono font-bold text-amber-600">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        {tutor.rating}
                      </span>
                      <span className="text-stone-400">·</span>
                      <span className="text-stone-500">{tutor.sessionsCompleted} sessions</span>
                    </div>
                  </div>

                  <div className="py-3 space-y-2 text-xs text-stone-600">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-stone-400 font-mono text-[11px]">Mastery Topics:</span>
                      {tutor.strengths.map((str, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-stone-100 text-stone-800 font-medium text-[11px]"
                        >
                          {str}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-stone-500 pt-1">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>{tutor.availability}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{tutor.teacherEndorsedBy}</span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-stone-500">
                      Location: <strong>{tutor.preferredRoom}</strong>
                    </span>

                    {isBooked ? (
                      <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Session Requested & Synced
                      </span>
                    ) : (
                      <button
                        onClick={() => setBookedTutorId(tutor.id)}
                        className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        Request Study Session
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Editorial Image & Moderation Safeguards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md">
              <img
                src="/src/assets/images/peer_study_session_1793131562168.jpg"
                alt="High school students working together at library table"
                className="w-full h-56 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-3">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>Safety & Faculty Moderation Protocols</span>
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Peer tutoring operates under strict pedagogical safeguards. Every peer mentor is nominated and endorsed by subject faculty, study sessions occur in visible campus library pods, and session logs automatically sync with academic advisors.
              </p>
              <div className="pt-2 border-t border-stone-100 grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded bg-stone-50">
                  <span className="font-semibold text-stone-800 block">Faculty Vetted</span>
                  <span className="text-stone-500">Min. A- grade in course</span>
                </div>
                <div className="p-2 rounded bg-stone-50">
                  <span className="font-semibold text-stone-800 block">Monitored Space</span>
                  <span className="text-stone-500">Campus library glass pods</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation footer */}
      <div className="border-t border-stone-200/80 pt-6 mt-8 flex items-center justify-between">
        <span className="text-xs text-stone-500">Scene 08 of 12</span>
        <button
          onClick={onNext}
          className="text-sm font-semibold text-stone-900 hover:text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Next: Innovation 4 — Invisible Student Alert</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
