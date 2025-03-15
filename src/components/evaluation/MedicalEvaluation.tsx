import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { ChecklistType, EvaluationResult, CriticalMoment, ChecklistResult } from "@/types/evaluation";
import { MetricsDisplay } from "./MetricsDisplay";
import { CriticalMoments } from "./CriticalMoments";
import { ChecklistEvaluation } from "./ChecklistEvaluation";
import { ScoreDisplay } from "./ScoreDisplay";
import { ReflectionQuestions } from "./ReflectionQuestions";
import { SuggestedReading } from "./SuggestedReading";
import type { ReflectionQuestions as ReflectionQuestionsType } from "@/types/evaluation";

interface EvaluationProps {
  videoUrl: string;
  checklistType: ChecklistType;
  studentId: string;
  onComplete: (evaluation: EvaluationResult) => Promise<void>;
}

export const MedicalEvaluation = ({ videoUrl, checklistType, studentId, onComplete }: EvaluationProps) => {
  const [evaluation, setEvaluation] = useState<Partial<EvaluationResult>>({
    studentId,
    checklistResults: [],
    totalScore: 0,
    percentage: 0,
    geminiAnalysis: {
      technicalScore: 0,
      safetyScore: 0,
      efficiencyScore: 0,
      criticalMoments: [],
      recommendations: [],
      reflectionQuestions: {
        feeling: '',
        challenges: '',
        realScenario: '',
        improvement: ''
      }
    },
    suggestedReading: []
  });

  const seekToTimestamp = (timestamp: number) => {
    // Implementar lógica para buscar momento específico no vídeo
    console.log("Seeking to timestamp:", timestamp);
  };

  const handleItemEvaluation = (result: ChecklistResult) => {
    setEvaluation(prev => ({
      ...prev,
      checklistResults: [...(prev.checklistResults || []), result],
    }));
  };

  const handleReflectionChange = (reflectionQuestions: ReflectionQuestionsType) => {
    setEvaluation(prev => ({
      ...prev,
      geminiAnalysis: {
        ...prev.geminiAnalysis!,
        reflectionQuestions,
      },
    }));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coluna Esquerda: Vídeo e Análise IA */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-0">
              <VideoPlayer src={videoUrl} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Análise IA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {evaluation.geminiAnalysis && (
                  <>
                    <MetricsDisplay 
                      technical={evaluation.geminiAnalysis.technicalScore}
                      safety={evaluation.geminiAnalysis.safetyScore}
                      efficiency={evaluation.geminiAnalysis.efficiencyScore}
                    />
                    
                    <CriticalMoments 
                      moments={evaluation.geminiAnalysis.criticalMoments}
                      onMomentClick={seekToTimestamp}
                    />
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna Direita: Checklist e Avaliação */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Avaliação do Procedimento</CardTitle>
              <CardDescription>
                Matrícula: {studentId}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChecklistEvaluation
                type={checklistType}
                onItemEvaluate={handleItemEvaluation}
              />
            </CardContent>
            <CardFooter>
              <ScoreDisplay
                total={evaluation.totalScore || 0}
                percentage={evaluation.percentage || 0}
              />
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feedback e Reflexão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {evaluation.geminiAnalysis && (
                  <>
                    <ReflectionQuestions
                      questions={evaluation.geminiAnalysis.reflectionQuestions}
                      onChange={handleReflectionChange}
                    />
                    
                    <SuggestedReading
                      materials={evaluation.suggestedReading || []}
                    />
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
