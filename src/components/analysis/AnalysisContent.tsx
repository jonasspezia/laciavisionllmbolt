import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronDown, AlertTriangle, CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { VideoAnalysis } from "@/types/supabase";
import { useToast } from "@/components/ui/use-toast";
import ReactMarkdown from 'react-markdown';

interface ChecklistItem {
  item: string;
  status: 'correto' | 'incorreto' | 'anulado';
  justificativa: string;
  tempo: string;
}

interface StructuredAnalysis {
  checklistAnalysis: {
    items: ChecklistItem[];
  };
  resumoGeral: string;
  raw_response?: string;
}

export const AnalysisContent = ({ analise }: { analise: VideoAnalysis }) => {
  const { toast } = useToast();
  
  console.log("[AnalysisContent] Renderizando análise:", {
    id: analise.id,
    status: analise.status,
    hasResult: !!analise.analysis_result,
    resultType: typeof analise.analysis_result,
    rawResponse: analise.analysis_result?.raw_response
  });

  if (analise.status === 'erro') {
    return (
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-red-400">
          <AlertTriangle className="h-4 w-4" />
          <p className="text-sm">
            {analise.error_message || "Ocorreu um erro durante a análise"}
          </p>
        </div>
      </div>
    );
  }

  if (!analise.analysis_result) {
    console.error("[AnalysisContent] Análise sem resultado:", {
      status: analise.status,
      hasResult: false
    });
    return null;
  }

  const result = analise.analysis_result as StructuredAnalysis;
  
  if (!result || typeof result !== 'object' || !result.checklistAnalysis) {
    console.error("[AnalysisContent] Formato inválido do resultado:", result);
    toast({
      variant: "destructive",
      title: "Erro na análise",
      description: "O formato do resultado da análise é inválido."
    });
    return null;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'correto':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'incorreto':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'anulado':
        return <HelpCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'correto':
        return 'bg-green-500/10 text-green-500 border-green-500/30';
      case 'incorreto':
        return 'bg-red-500/10 text-red-500 border-red-500/30';
      case 'anulado':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30';
      default:
        return '';
    }
  };

  const previewText = result.resumoGeral ? 
    `${result.resumoGeral.substring(0, 150)}${result.resumoGeral.length > 150 ? '...' : ''}` 
    : 'Análise disponível';

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-300">
            {previewText}
          </p>
          <Button variant="outline" className="w-full bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20">
            Ver Análise Completa
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 text-white border-gray-800 max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Análise Detalhada</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          {result.raw_response && (
            <div className="border-t border-white/10 pt-4">
              <h4 className="font-medium text-[#46c68f] mb-2 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#46c68f]" />
                Resposta Completa
              </h4>
              <div className="prose prose-invert max-w-none bg-white/5 p-4 rounded-lg prose-headings:text-white prose-p:text-gray-300 prose-a:text-[#46c68f] prose-strong:text-white prose-code:text-gray-300 prose-pre:bg-black/30">
                <ReactMarkdown>
                  {result.raw_response}
                </ReactMarkdown>
              </div>
            </div>
          )}

          <div className="border-t border-white/10 pt-4">
            <h4 className="font-medium text-[#46c68f] mb-2 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#46c68f]" />
              Resumo Geral
            </h4>
            <div className="pl-3 prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-[#46c68f] prose-strong:text-white">
              <ReactMarkdown>
                {result.resumoGeral}
              </ReactMarkdown>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <h4 className="font-medium text-[#46c68f] mb-4 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-[#46c68f]" />
              Análise do Checklist
            </h4>
            <div className="space-y-4">
              {result.checklistAnalysis.items.map((item, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(item.status)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-sm font-medium text-white">
                        {item.item}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                        {item.tempo !== "N/A" && (
                          <span className="px-2 py-1 rounded-full text-xs border border-white/10 bg-white/5">
                            {item.tempo}
                          </span>
                        )}
                      </div>
                      <div className="prose prose-invert max-w-none text-sm text-gray-300 prose-p:text-sm prose-headings:text-sm">
                        <ReactMarkdown>
                          {item.justificativa}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {analise.analysis_metadata && (
            <div className="mt-8 pt-4 border-t border-white/10 text-xs text-gray-500">
              <p>Análise realizada em: {new Date(analise.analysis_metadata.timestamp).toLocaleString()}</p>
              <p>Modelo: {analise.analysis_metadata.model}</p>
              <p>Prompt utilizado:</p>
              <pre className="mt-2 p-2 bg-black/30 rounded text-xs overflow-x-auto">
                {analise.analysis_metadata.prompt_used}
              </pre>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
