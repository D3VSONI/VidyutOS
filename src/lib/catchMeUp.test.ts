import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateRecoveryProgress,
  prioritizeTasks,
  evaluateKnowledgeCheck,
  evaluateLostFoundMatch,
  filterPeersByTopic,
  resolveAcademicAlert,
} from './catchMeUp';
import { RecoveryTask, QuizQuestion, LostItemReport, FoundItemReport, AcademicAlert } from './types';

test('calculateRecoveryProgress computes correct percentages and remaining minutes', () => {
  const tasks: RecoveryTask[] = [
    {
      id: '1',
      subject: 'AP Chemistry',
      title: 'Review notes',
      category: 'read',
      estimatedMinutes: 20,
      urgency: 'high',
      dueDate: 'Today',
      completed: true,
      associatedPeriodId: 'p1',
    },
    {
      id: '2',
      subject: 'AP Chemistry',
      title: 'Titration problem set',
      category: 'assignment',
      estimatedMinutes: 30,
      urgency: 'high',
      dueDate: 'Tomorrow',
      completed: false,
      associatedPeriodId: 'p1',
    },
    {
      id: '3',
      subject: 'Algebra II',
      title: 'Quadratic quiz recap',
      category: 'review',
      estimatedMinutes: 15,
      urgency: 'medium',
      dueDate: 'Friday',
      completed: false,
      associatedPeriodId: 'p2',
    },
  ];

  const result = calculateRecoveryProgress(tasks);
  assert.equal(result.completedCount, 1);
  assert.equal(result.totalCount, 3);
  assert.equal(result.percent, 33);
  assert.equal(result.remainingMinutes, 45);
  assert.equal(result.completedMinutes, 20);
  assert.equal(result.isFullyComplete, false);
});

test('calculateRecoveryProgress handles empty tasks array', () => {
  const result = calculateRecoveryProgress([]);
  assert.equal(result.completedCount, 0);
  assert.equal(result.percent, 0);
  assert.equal(result.remainingMinutes, 0);
  assert.equal(result.isFullyComplete, false);
});

test('prioritizeTasks sorts high urgency first, then shorter durations', () => {
  const tasks: RecoveryTask[] = [
    {
      id: '1',
      subject: 'History',
      title: 'Long essay',
      category: 'assignment',
      estimatedMinutes: 60,
      urgency: 'low',
      dueDate: 'Next Week',
      completed: false,
      associatedPeriodId: 'p4',
    },
    {
      id: '2',
      subject: 'AP Chem',
      title: 'Lab safety recap',
      category: 'review',
      estimatedMinutes: 10,
      urgency: 'high',
      dueDate: 'Today',
      completed: false,
      associatedPeriodId: 'p1',
    },
    {
      id: '3',
      subject: 'AP Chem',
      title: 'Stoichiometry set',
      category: 'assignment',
      estimatedMinutes: 25,
      urgency: 'high',
      dueDate: 'Today',
      completed: false,
      associatedPeriodId: 'p1',
    },
  ];

  const sorted = prioritizeTasks(tasks);
  assert.equal(sorted[0].id, '2'); // High urgency, 10 min
  assert.equal(sorted[1].id, '3'); // High urgency, 25 min
  assert.equal(sorted[2].id, '1'); // Low urgency
});

test('evaluateKnowledgeCheck correctly calculates scores and feedback', () => {
  const questions: QuizQuestion[] = [
    {
      id: 'q1',
      subject: 'Chemistry',
      prompt: 'What indicator is used for strong acid-strong base titration?',
      options: ['Phenolphthalein', 'Methyl orange', 'Litmus', 'Bromothymol blue'],
      correctIndex: 0,
      explanation: 'Phenolphthalein transitions sharply around pH 8.2–10.0.',
    },
    {
      id: 'q2',
      subject: 'Chemistry',
      prompt: 'At the equivalence point of a strong acid/strong base, the pH is:',
      options: ['3.0', '7.0', '9.0', '14.0'],
      correctIndex: 1,
      explanation: 'Equivalence point yields neutral water and salt.',
    },
  ];

  // 100% correct
  const resultAllCorrect = evaluateKnowledgeCheck({ q1: 0, q2: 1 }, questions);
  assert.equal(resultAllCorrect.score, 2);
  assert.equal(resultAllCorrect.percent, 100);
  assert.equal(resultAllCorrect.passed, true);

  // 50% correct
  const resultPartial = evaluateKnowledgeCheck({ q1: 0, q2: 0 }, questions);
  assert.equal(resultPartial.score, 1);
  assert.equal(resultPartial.percent, 50);
  assert.equal(resultPartial.passed, false);
});

test('evaluateLostFoundMatch computes confidence based on category, location, and characteristics', () => {
  const lost: LostItemReport = {
    id: 'l1',
    title: 'Navy Blue Canvas Backpack',
    category: 'Backpack',
    reportedDate: 'Oct 22, 2026',
    locationReported: 'Hallway B Lockers',
    description: 'Navy blue canvas pack with school crest embroidery',
    image: '',
    color: 'Navy',
    reporterName: 'Leo Vance',
    reporterGrade: 'Grade 10',
    securityQuestion: 'What keychain is attached?',
    securityAnswerKeyword: 'brass',
  };

  const found: FoundItemReport = {
    id: 'f1',
    title: 'Navy Canvas School Bag',
    category: 'Backpack',
    foundDate: 'Oct 22, 2026',
    foundLocation: 'Hallway B locker bench',
    custodian: 'Campus Security Office',
    image: '',
    status: 'at_security_desk',
    characteristics: ['Navy blue canvas', 'Brass zippers', 'St. Andrews crest'],
  };

  const match = evaluateLostFoundMatch(lost, found);
  assert.ok(match.confidenceScore >= 80);
  assert.ok(match.matchReasons.length >= 3);
});

test('resolveAcademicAlert updates reviewStatus and notes properly', () => {
  const alert: AcademicAlert = {
    id: 'alt-1',
    studentInitials: 'T. R.',
    grade: 'Grade 11',
    subject: 'Physics Honors',
    triggerRuleId: 'AR-104',
    ruleTitle: '3+ consecutive unsubmitted formative assignments in 14-day window',
    ruleFormula: 'unsubmitted_count >= 3 && window_days <= 14',
    observableSignals: [
      { signal: 'Unsubmitted: Kinematics Problem Set 3', date: 'Oct 14', metric: '0% submitted' },
      { signal: 'Unsubmitted: Vector Addition Quiz Lab', date: 'Oct 18', metric: '0% submitted' },
      { signal: 'Unsubmitted: Projectile Motion Worksheet', date: 'Oct 21', metric: '0% submitted' },
    ],
    severity: 'priority',
    reviewStatus: 'pending',
    notes: 'Awaiting advisor review.',
  };

  const resolved = resolveAcademicAlert(alert, 'schedule_checkin');
  assert.equal(resolved.reviewStatus, 'review_scheduled');
  assert.match(resolved.notes, /check-in scheduled/i);
});
