import { Search, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface VideoSearchFiltersProps {
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (range: { from: Date | undefined; to: Date | undefined }) => void;
}

export function VideoSearchFilters({
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  startDate,
  endDate,
  onDateChange,
}: VideoSearchFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
        <Input
          placeholder="Buscar vídeos..."
          onChange={onSearchChange}
          className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/40"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Select 
          value={statusFilter} 
          onValueChange={onStatusFilterChange}
        >
          <SelectTrigger className="w-[180px] bg-white/5 border-white/20 text-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-white/10">
            <SelectItem value="all" className="text-white hover:bg-white/10">
              Todos
            </SelectItem>
            <SelectItem value="uploaded" className="text-white hover:bg-white/10">
              Enviado
            </SelectItem>
            <SelectItem value="processing" className="text-white hover:bg-white/10">
              Processando
            </SelectItem>
            <SelectItem value="completed" className="text-white hover:bg-white/10">
              Completo
            </SelectItem>
            <SelectItem value="error" className="text-white hover:bg-white/10">
              Erro
            </SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[240px] justify-start text-left font-normal bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              <Calendar className="mr-2 h-4 w-4" />
              {startDate && endDate ? (
                format(startDate, "dd/MM/yyyy") + " - " + format(endDate, "dd/MM/yyyy")
              ) : (
                <span>Selecione o período</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <CalendarComponent
              initialFocus
              mode="range"
              defaultMonth={startDate ?? new Date()}
              selected={{
                from: startDate ?? undefined,
                to: endDate ?? undefined,
              }}
              onSelect={(range: any) => onDateChange(range)}
              numberOfMonths={2}
              locale={ptBR}
              className="bg-gray-800 border-white/10"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
