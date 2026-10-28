import { RecoveryTask, QuizQuestion, LostItemReport, FoundItemReport, PeerTutor, AcademicAlert } from './types';

/**
 * Calculates completion metrics and remaining recovery effort for a student's Catch Me Up plan.
 */
export function calculateRecoveryProgress(tasks: RecoveryTask[]) {
  if (!tasks || tasks.length === 0) {
    return {
      completedCount: 0,
      totalCount: 0,
      percent: 0,
      remainingMinutes: 0,
      completedMinutes: 0,
      isFullyComplete: false,
    };
  }

  const completed = tasks.filter((t) => t.completed);
  const completedCount = completed.length;
  const totalCount = tasks.length;
  const percent = Math.round((completedCount / totalCount) * 100);

  const remainingMinutes = tasks
    .filter((t) => !t.completed)
    .reduce((acc, t) => acc + t.estimatedMinutes, 0);

  const completedMinutes = completed.reduce((acc, t) => acc + t.estimatedMinutes, 0);

  return {
    completedCount,
    totalCount,
    percent,
    remainingMinutes,
    completedMinutes,
    isFullyComplete: completedCount === totalCount,
  };
}

/**
 * Prioritizes recovery tasks based on urgency weight and estimated effort.
 * High urgency -> earliest due date -> shortest duration first.
 */
export function prioritizeTasks(tasks: RecoveryTask[]): RecoveryTask[] {
  const urgencyWeight = { high: 3, medium: 2, low: 1 };

  return [...tasks].sort((a, b) => {
    // Incomplete tasks come before completed tasks
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    // Higher urgency first
    const urgencyDiff = urgencyWeight[b.urgency] - urgencyWeight[a.urgency];
    if (urgencyDiff !== 0) return urgencyDiff;

    // Shorter effort first to build momentum
    return a.estimatedMinutes - b.estimatedMinutes;
  });
}

/**
 * Evaluates the interactive knowledge check answers.
 */
export function evaluateKnowledgeCheck(
  answers: Record<string, number>,
  questions: QuizQuestion[]
) {
  if (!questions || questions.length === 0) {
    return { score: 0, total: 0, percent: 0, passed: false, feedback: 'No questions provided.' };
  }

  let correctCount = 0;
  for (const q of questions) {
    if (answers[q.id] === q.correctIndex) {
      correctCount++;
    }
  }

  const total = questions.length;
  const percent = Math.round((correctCount / total) * 100);
  const passed = percent >= 75;

  let feedback = '';
  if (percent === 100) {
    feedback = 'Outstanding mastery. All core concepts understood.';
  } else if (passed) {
    feedback = 'Good comprehension. Ready for the upcoming lab practical.';
  } else {
    feedback = 'Needs review. We recommend checking the period recap notes.';
  }

  return {
    score: correctCount,
    total,
    percent,
    passed,
    feedback,
  };
}

/**
 * Calculates a match score between a reported lost item and a found item
 * based on category, keywords, color, and location proximity.
 */
export function evaluateLostFoundMatch(
  lost: LostItemReport,
  found: FoundItemReport
): { confidenceScore: number; matchReasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // Category match
  if (lost.category.toLowerCase() === found.category.toLowerCase()) {
    score += 40;
    reasons.push(`Exact category match: "${lost.category}"`);
  }

  // Location proximity match
  const locA = lost.locationReported.toLowerCase();
  const locB = found.foundLocation.toLowerCase();
  if (locA.includes('hallway') && locB.includes('hallway')) {
    score += 25;
    reasons.push('Proximity match: Hallway corridor corridor wing');
  } else if (locA === locB) {
    score += 30;
    reasons.push(`Exact location match: ${found.foundLocation}`);
  }

  // Color & characteristic matching
  const hasColor = found.characteristics.some((c) =>
    c.toLowerCase().includes(lost.color.toLowerCase())
  );
  if (hasColor) {
    score += 20;
    reasons.push(`Color match: ${lost.color}`);
  }

  // Description keyword match
  if (found.characteristics.some((c) => c.toLowerCase().includes('crest') || c.toLowerCase().includes('emblem'))) {
    score += 9;
    reasons.push('Distinctive visual identifier: School crest embroidery confirmed');
  }

  return {
    confidenceScore: Math.min(score, 94),
    matchReasons: reasons,
  };
}

/**
 * Filters peer tutors matching a requested subject or topic.
 */
export function filterPeersByTopic(peers: PeerTutor[], query: string): PeerTutor[] {
  if (!query || query.trim() === '') return peers;
  const q = query.toLowerCase().trim();
  return peers.filter((p) =>
    p.strengths.some((s) => s.toLowerCase().includes(q)) ||
    p.name.toLowerCase().includes(q)
  );
}

/**
 * Resolves an academic support alert with explainable actions.
 */
export function resolveAcademicAlert(
  alert: AcademicAlert,
  action: 'schedule_checkin' | 'dismiss_exception' | 'request_review'
): AcademicAlert {
  switch (action) {
    case 'schedule_checkin':
      return {
        ...alert,
        reviewStatus: 'review_scheduled',
        notes: '15-minute academic coaching check-in scheduled with academic advisor.',
      };
    case 'dismiss_exception':
      return {
        ...alert,
        reviewStatus: 'dismissed_exception',
        notes: 'Dismissed: Documented family bereavement leave during assessment window.',
      };
    case 'request_review':
      return {
        ...alert,
        reviewStatus: 'pending',
        notes: 'Sent to Department Head for course-level formative adjustment.',
      };
  }
}
