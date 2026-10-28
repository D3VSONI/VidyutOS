export type SceneId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface SceneMeta {
  id: SceneId;
  number: string;
  shortTitle: string;
  fullTitle: string;
  chapter: string;
  description: string;
}

export interface MissedClassPeriod {
  id: string;
  period: number;
  time: string;
  subject: string;
  room: string;
  teacher: string;
  status: 'missed' | 'excused';
  topic: string;
  recapSummary: string;
  keyConcepts: string[];
  homework: {
    title: string;
    originalDueDate: string;
    adjustedDueDate: string;
    estimatedMinutes: number;
    submitted: boolean;
  };
  announcements: string[];
  materials: {
    title: string;
    type: 'pdf' | 'slides' | 'notes' | 'recording';
    durationOrPages: string;
  }[];
}

export interface RecoveryTask {
  id: string;
  subject: string;
  title: string;
  category: 'read' | 'assignment' | 'review' | 'check';
  estimatedMinutes: number;
  urgency: 'high' | 'medium' | 'low';
  dueDate: string;
  completed: boolean;
  associatedPeriodId: string;
  actionSnippet?: string;
}

export interface QuizQuestion {
  id: string;
  subject: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LostItemReport {
  id: string;
  title: string;
  category: string;
  reportedDate: string;
  locationReported: string;
  description: string;
  image: string;
  color: string;
  reporterName: string;
  reporterGrade: string;
  securityQuestion: string;
  securityAnswerKeyword: string;
}

export interface FoundItemReport {
  id: string;
  title: string;
  category: string;
  foundDate: string;
  foundLocation: string;
  custodian: string;
  image: string;
  status: 'at_security_desk' | 'claimed' | 'pending_verification';
  characteristics: string[];
}

export interface PeerTutor {
  id: string;
  name: string;
  grade: string;
  avatarLetter: string;
  rating: number;
  sessionsCompleted: number;
  strengths: string[];
  availability: string;
  teacherEndorsedBy: string;
  preferredRoom: string;
}

export interface AcademicAlert {
  id: string;
  studentInitials: string;
  grade: string;
  subject: string;
  triggerRuleId: string;
  ruleTitle: string;
  ruleFormula: string;
  observableSignals: {
    signal: string;
    date: string;
    metric: string;
  }[];
  severity: 'advisory' | 'priority';
  reviewStatus: 'pending' | 'review_scheduled' | 'dismissed_exception';
  notes: string;
}

export type SchoolRole = 'student' | 'teacher' | 'parent' | 'admin';

export interface EcosystemNode {
  id: string;
  label: string;
  category: 'core' | 'ai' | 'community' | 'support';
  x: number;
  y: number;
  description: string;
  connectedTo: string[];
  metrics: string;
}
