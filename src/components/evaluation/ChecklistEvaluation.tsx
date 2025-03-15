import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChecklistType, ChecklistResult } from "@/types/evaluation";

interface ChecklistEvaluationProps {
  type: ChecklistType;
  onItemEvaluate: (result: ChecklistResult) => void;
}

export const ChecklistEvaluation = ({ type, onItemEvaluate }: ChecklistEvaluationProps) => {
  const [currentItem, setCurrentItem] = useState<string>("");
  const [score, setScore] = useState<0 | 1>(0);
  const [justification, setJustification] = useState<string>("");

  const handleSubmit = () => {
    if (!currentItem || !justification) return;

    onItemEvaluate({
      item: currentItem,
      score,
      justification,
    });

    // Reset form
    setCurrentItem("");
    setScore(0);
    setJustification("");
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <Label>Item do Checklist</Label>
        <Textarea
          value={currentItem}
          onChange={(e) => setCurrentItem(e.target.value)}
          placeholder="Descreva o item avaliado..."
        />
      </div>

      <div className="space-y-2">
        <Label>Avaliação</Label>
        <RadioGroup
          value={String(score)}
          onValueChange={(value) => setScore(Number(value) as 0 | 1)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="incorrect" />
            <Label htmlFor="incorrect">Incorreto</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="correct" />
            <Label htmlFor="correct">Correto</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>Justificativa</Label>
        <Textarea
          value={justification}
          onChange={(e) => setJustification(e.target.value)}
          placeholder="Justifique sua avaliação..."
        />
      </div>

      <Button onClick={handleSubmit} className="w-full">
        Avaliar Item
      </Button>
    </Card>
  );
};
