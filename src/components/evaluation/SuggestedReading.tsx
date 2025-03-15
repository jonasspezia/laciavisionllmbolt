import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { SuggestedReading as SuggestedReadingType } from "@/types/evaluation";

interface SuggestedReadingProps {
  materials: SuggestedReadingType[];
}

export const SuggestedReading = ({ materials }: SuggestedReadingProps) => {
  if (!materials.length) return null;

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Leitura Sugerida</h3>
      <div className="space-y-2">
        {materials.map((material, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <a
                href={material.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-primary"
              >
                <ExternalLink className="h-4 w-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">{material.title}</h4>
                  <p className="text-sm text-muted-foreground">{material.relevance}</p>
                </div>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
