import type { DatabaseAnalysis } from './database';

export type ChecklistType = 'cricotireoidostomia' | 'antropometria' | 'ausculta';

export type CriticalMomentType = 'positive' | 'improvement';

export interface ReflectionQuestions {
  feeling: string;
  challenges: string;
  realScenario: string;
  improvement: string;
}

export interface CriticalMoment {
  timestamp: number;
  observation: string;
  type: CriticalMomentType;
}

export interface SuggestedReading {
  title: string;
  link: string;
  relevance: string;
}

export interface ChecklistResult {
  item: string;
  score: 0 | 1;
  justification: string;
}

export interface GeminiAnalysis {
  technicalScore: number;
  safetyScore: number;
  efficiencyScore: number;
  criticalMoments: CriticalMoment[];
  recommendations: string[];
  reflectionQuestions: ReflectionQuestions;
}

export interface EvaluationResult {
  studentId: string;
  checklistResults: ChecklistResult[];
  totalScore: number;
  percentage: number;
  geminiAnalysis: GeminiAnalysis;
  suggestedReading: SuggestedReading[];
}
