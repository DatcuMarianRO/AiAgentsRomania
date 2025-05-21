// 8. Fisier: components/dashboard/PeriodSelector.tsx

'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Asigură-te că ai aceste componente shadcn/ui

interface PeriodSelectorProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  disabled?: boolean;
}
const periods = [
  { value: '7d', label: 'Ultimele 7 zile' },
  { value: '30d', label: 'Ultimele 30 zile' },
  { value: '90d', label: 'Ultimele 90 zile' },
  // { value: 'all', label: 'De la început' }, // Poate fi prea costisitor
];

export default function PeriodSelector({ selectedPeriod, onPeriodChange, disabled }: PeriodSelectorProps) {
  return (
    <Select value={selectedPeriod} onValueChange={onPeriodChange} disabled={disabled}>
      <SelectTrigger className="w-[180px] bg-brand-primary border-brand-light/20 text-brand-light focus:ring-brand-accent">
        <SelectValue placeholder="Selectează perioada" />
      </SelectTrigger>
      <SelectContent className="bg-brand-secondary border-brand-light/20 text-brand-light">
        {periods.map(p => (
          <SelectItem key={p.value} value={p.value} className="hover:!bg-brand-primary/70 focus:!bg-brand-primary/70 cursor-pointer">
            {p.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
