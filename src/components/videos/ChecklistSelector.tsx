import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ChecklistTemplate } from "@/types/checklist";

interface ChecklistSelectorProps {
  checklists: ChecklistTemplate[];
  selectedChecklist: string;
  onChecklistChange: (value: string) => void;
}

export function ChecklistSelector({ 
  checklists, 
  selectedChecklist, 
  onChecklistChange 
}: ChecklistSelectorProps) {
  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader className="border-b border-white/10 px-6">
        <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
          <svg
            className="h-5 w-5 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2m-6 9l2 2 4-4"
            />
          </svg>
          Selecione o Checklist
        </CardTitle>
        <CardDescription className="text-white/60">
          Escolha um checklist para avaliar seu vídeo
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Select
          value={selectedChecklist}
          onValueChange={onChecklistChange}
        >
          <SelectTrigger 
            className="w-full bg-white/5 border-white/20 text-white h-12"
          >
            <SelectValue placeholder="Selecione um checklist para análise" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-white/10">
            {checklists.map((checklist) => (
              <SelectItem 
                key={checklist.id} 
                value={checklist.id}
                className="text-white hover:bg-white/10"
              >
                {checklist.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
