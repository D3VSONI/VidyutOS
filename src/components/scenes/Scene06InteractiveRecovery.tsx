import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  Play,
  Pause,
  Volume2,
  FileText,
  AlertCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Award,
  ChevronRight,
} from 'lucide-react';
import {
  DEMO_MISSED_PERIODS,
  INITIAL_RECOVERY_TASKS,
  DEMO_QUIZ_QUESTIONS,
} from '../../lib/demoData';
import {
  calculateRecoveryProgress,
  prioritizeTasks,
  evaluateKnowledgeCheck,
} from '../../lib/catchMeUp';
import { RecoveryTask } from '../../lib/types';

interface Scene06InteractiveRecoveryProps {
  onNext: () => void;
  tasks: RecoveryTask[];
  onToggleTask: (taskId: string) => void;
  onResetTasks: () => void;
}

export const Scene06InteractiveRecovery: React.FC<Scene06InteractiveRecoveryProps> = ({
  onNext,
  tasks,
  onToggleTask,
  onResetTasks,
}) => {
  const [selectedPeriodId, setSelectedPeriodId] = useState<string>('chem-101');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const selectedPeriod =
    DEMO_MISSED_PERIODS.find((p) => p.id === selectedPeriodId) || DEMO_MISSED_PERIODS[0];

  const progress = calculateRecoveryProgress(tasks);
  const sortedTasks = prioritizeTasks(tasks);
  const quizResult = evaluateKnowledgeCheck(quizAnswers, DEMO_QUIZ_QUESTIONS);

  const handleSelectQuizAnswer = (questionId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setQuizSubmitted(false);
  };

  const handleVerifyQuiz = () => {
    setQuizSubmitted(true);
    if (quizResult.percent >= 75) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  const handleResetAll = () => {
    onResetTasks();
    setQuizAnswers({});
    setQuizSubmitted(false);
    setIsPlayingAudio(false);
  };

  return (
    <section className="min-h-[calc(100vh-70px)] py-6 lg:py-10 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-6">
      {/* Chapter kicker & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2.5 text-xs uppercase tracking-widest text-stone-500 font-semibold mb-1">
            <span className="font-mono text-blue-700">06</span>
            <span>·</span>
            <span>Interactive Demonstration</span>
            <span>·</span>
            <span>Live Catch Me Up Journey</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
            Wednesday, Oct 22 · Excused Absence Recovery
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleResetAll}
            className="px-3 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-white hover:bg-stone-100 rounded-lg border border-stone-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Reset simulation to initial state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Progress Strip */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-stone-700">Recovery Plan Progress</span>
            <span className="font-mono text-blue-700 font-bold tabular-nums">
              {progress.completedCount} of {progress.totalCount} completed ({progress.percent}%)
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300 ease-out"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-stone-100 pt-3 md:pt-0 md:pl-6">
          <div>
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">
              ESTIMATED EFFORT
            </span>
            <p className="text-sm font-bold text-stone-800 tabular-nums">
              {progress.remainingMinutes} min remaining
            </p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">
              STATUS
            </span>
            <p
              className={`text-sm font-bold ${
                progress.isFullyComplete ? 'text-emerald-600' : 'text-blue-700'
              }`}
            >
              {progress.isFullyComplete ? 'Fully Caught Up!' : 'On Track'}
            </p>
          </div>
        </div>
      </div>

      {/* Main 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Missed Periods & Class Recap Inspector (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Period Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {DEMO_MISSED_PERIODS.map((period) => {
              const isSelected = period.id === selectedPeriodId;
              return (
                <button
                  key={period.id}
                  onClick={() => {
                    setSelectedPeriodId(period.id);
                    setIsPlayingAudio(false);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                      : 'bg-white text-stone-600 hover:text-stone-900 border-stone-200'
                  }`}
                >
                  <span className="font-mono">P{period.period}</span>
                  <span>{period.subject}</span>
                </button>
              );
            })}
          </div>

          {/* Active Period Detail Card */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-5">
            {/* Class Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                  <span className="font-mono text-blue-700 font-bold">
                    Period {selectedPeriod.period}
                  </span>
                  <span>·</span>
                  <span>{selectedPeriod.time}</span>
                  <span>·</span>
                  <span>{selectedPeriod.room}</span>
                </div>
                <h3 className="text-lg font-bold text-stone-900">{selectedPeriod.subject}</h3>
                <p className="text-xs text-stone-500 mt-0.5">Instructor: {selectedPeriod.teacher}</p>
              </div>

              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md self-start sm:self-auto font-medium">
                Excusal Verified
              </span>
            </div>

            {/* Audio Recap Simulation */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-800 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-blue-600" />
                  <span>Dr. Rostova’s 6-Minute Lesson Synthesis</span>
                </span>
                <span className="text-[11px] font-mono text-stone-500">Recorded Yesterday</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-9 h-9 rounded-full bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center shrink-0 shadow-sm transition-colors cursor-pointer"
                  title={isPlayingAudio ? 'Pause Audio Recap' : 'Play Audio Recap'}
                >
                  {isPlayingAudio ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </button>

                {/* Simulated Audio Waveform */}
                <div className="flex-1 flex items-center gap-1 h-6">
                  {[24, 45, 80, 55, 90, 70, 40, 65, 85, 95, 60, 45, 75, 50, 30, 60, 80, 50, 35].map(
                    (height, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 rounded-full transition-all duration-300 ${
                          isPlayingAudio ? 'bg-blue-600 animate-pulse' : 'bg-stone-300'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}
                </div>
                <span className="text-xs font-mono text-stone-600 tabular-nums">
                  {isPlayingAudio ? '01:42' : '06:00'}
                </span>
              </div>
            </div>

            {/* Lesson Summary & Key Concepts */}
            <div className="space-y-3">
              <div>
                <span className="text-xs font-mono font-semibold text-stone-500 uppercase tracking-wide block mb-1">
                  TOPIC & SYNTHESIS
                </span>
                <h4 className="text-sm font-semibold text-stone-900 mb-1">
                  {selectedPeriod.topic}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {selectedPeriod.recapSummary}
                </p>
              </div>

              <div>
                <span className="text-xs font-mono font-semibold text-stone-500 uppercase tracking-wide block mb-1.5">
                  CORE CONCEPTS COVERED
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedPeriod.keyConcepts.map((concept, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-stone-700 p-2.5 rounded-lg bg-stone-50 border border-stone-100 flex items-start gap-2"
                    >
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{concept}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Adjusted Homework & Announcements */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-blue-900 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-700" /> Automated Deadline Adjustment
                </span>
                <span className="font-mono text-blue-700 font-medium">1-Day Grace Buffer</span>
              </div>
              <p className="text-xs font-bold text-stone-900">{selectedPeriod.homework.title}</p>
              <p className="text-xs text-stone-600">
                Adjusted Deadline:{' '}
                <span className="font-semibold text-blue-800">
                  {selectedPeriod.homework.adjustedDueDate}
                </span>{' '}
                (Original was {selectedPeriod.homework.originalDueDate})
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Prioritized Task Checklist & Knowledge Check (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Action Tasks Card */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <span className="text-xs font-mono font-semibold text-stone-500 uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-700" /> PRIORITIZED RECOVERY QUEUE
              </span>
              <span className="text-[11px] text-stone-400">Click to complete</span>
            </div>

            {/* Tasks list */}
            <div className="space-y-2.5">
              {sortedTasks.map((task) => {
                return (
                  <button
                    key={task.id}
                    onClick={() => onToggleTask(task.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      task.completed
                        ? 'bg-stone-50 border-stone-200 text-stone-400 line-through'
                        : 'bg-white hover:bg-stone-50/80 border-stone-200 text-stone-800 shadow-2xs'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0 text-blue-700">
                      {task.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Circle className="w-4 h-4 text-stone-400 hover:text-blue-700" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[11px] mb-0.5">
                        <span className="font-medium text-stone-500">{task.subject}</span>
                        <span className="font-mono text-stone-400">{task.estimatedMinutes}m</span>
                      </div>
                      <p className="text-xs font-semibold text-stone-900 leading-snug line-clamp-2">
                        {task.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Knowledge Check Card */}
          <div className="p-5 rounded-2xl bg-stone-900 text-stone-100 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold text-white">2-Min Comprehension Check</h4>
              </div>
              <span className="text-[10px] font-mono text-blue-300 bg-blue-950 px-2 py-0.5 rounded">
                Formative
              </span>
            </div>

            <p className="text-xs text-stone-300">
              Verify your understanding of today’s Chemistry concepts before Friday’s Lab Practical.
            </p>

            {/* Questions */}
            <div className="space-y-3.5">
              {DEMO_QUIZ_QUESTIONS.map((q, qIdx) => (
                <div key={q.id} className="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700 space-y-2">
                  <p className="text-xs font-medium text-stone-100">
                    <span className="text-blue-400 font-mono font-bold mr-1.5">Q{qIdx + 1}.</span>
                    {q.prompt}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[q.id] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectQuizAnswer(q.id, optIdx)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-blue-600 text-white font-medium'
                              : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                          }`}
                        >
                          <span>{opt}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="pt-2 text-[11px] text-stone-300 border-t border-stone-700">
                      <p
                        className={
                          quizAnswers[q.id] === q.correctIndex
                            ? 'text-emerald-400 font-semibold'
                            : 'text-amber-300'
                        }
                      >
                        {quizAnswers[q.id] === q.correctIndex ? '✓ Correct! ' : 'Note: '}
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Submit Quiz Check Button */}
            <button
              onClick={handleVerifyQuiz}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-md text-center"
            >
              Check My Answers
            </button>

            {quizSubmitted && (
              <div className="p-3 rounded-xl bg-stone-800 border border-stone-700 text-center">
                <p className="text-xs font-bold text-white">
                  Score: {quizResult.score} / {quizResult.total} ({quizResult.percent}%)
                </p>
                <p className="text-[11px] text-blue-300 mt-0.5">{quizResult.feedback}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation footer */}
      <div className="border-t border-stone-200/80 pt-6 mt-8 flex items-center justify-between">
        <span className="text-xs text-stone-500">Scene 06 of 12</span>
        <button
          onClick={onNext}
          className="text-sm font-semibold text-stone-900 hover:text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>Next: Innovation 2 — Smart Lost & Found</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
