interface VideoStatusProps {
  status: string;
  getVideoStatusColor: (status: string) => string;
}

export function VideoStatus({ status, getVideoStatusColor }: VideoStatusProps) {
  return (
    <div className={`text-sm ${getVideoStatusColor(status)}`}>
      {status === 'analyzing' && 'Analisando...'}
      {status === 'analyzed' && 'Analisado'}
      {status === 'error' && 'Erro na análise'}
      {status === 'uploaded' && 'Aguardando análise'}
    </div>
  );
}
