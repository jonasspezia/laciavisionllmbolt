import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ReflectionQuestions as ReflectionQuestionsType } from "@/types/evaluation";

interface ReflectionQuestionsProps {
  questions: ReflectionQuestionsType;
  onChange: (questions: ReflectionQuestionsType) => void;
}

export const ReflectionQuestions = ({ questions, onChange }: ReflectionQuestionsProps) => {
  const handleChange = (key: keyof ReflectionQuestionsType, value: string) => {
    onChange({
      ...questions,
      [key]: value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Como você se sentiu durante o procedimento?</Label>
        <Textarea
          value={questions.feeling}
          onChange={(e) => handleChange('feeling', e.target.value)}
          placeholder="Descreva seus sentimentos..."
        />
      </div>

      <div className="space-y-2">
        <Label>Quais foram os principais desafios?</Label>
        <Textarea
          value={questions.challenges}
          onChange={(e) => handleChange('challenges', e.target.value)}
          placeholder="Liste os desafios encontrados..."
        />
      </div>

      <div className="space-y-2">
        <Label>Como seria diferente em um cenário real?</Label>
        <Textarea
          value={questions.realScenario}
          onChange={(e) => handleChange('realScenario', e.target.value)}
          placeholder="Compare com um cenário real..."
        />
      </div>

      <div className="space-y-2">
        <Label>O que você planeja melhorar?</Label>
        <Textarea
          value={questions.improvement}
          onChange={(e) => handleChange('improvement', e.target.value)}
          placeholder="Descreva seu plano de melhoria..."
        />
      </div>
    </div>
  );
};
