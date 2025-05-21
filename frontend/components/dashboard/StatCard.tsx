// 6. Fisier: components/dashboard/StatCard.tsx

'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Asigură-te că ai aceste componente shadcn/ui
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { KPITrend } from "@/types/analytics"; // Asigură-te că importul este corect
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  kpi: KPITrend;
  icon?: LucideIcon;
  className?: string;
}

export default function StatCard({ title, kpi, icon: Icon, className }: StatCardProps) {
  const hasChange = typeof kpi.changePercentage === 'number';
  const isPositiveChange = hasChange && kpi.changePercentage! > 0;
  const isNegativeChange = hasChange && kpi.changePercentage! < 0;
  const isNeutralChange = hasChange && kpi.changePercentage === 0;

  return (
    <Card className={cn("bg-brand-secondary border-brand-light/10 text-brand-light", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-brand-subtle">{title}</CardTitle>
        {Icon && <Icon className="h-5 w-5 text-brand-accent" />}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-brand-light">
          {/* Verifică dacă kpi.value este un număr înainte de a apela toLocaleString */}
          {typeof kpi.value === 'number' ? kpi.value.toLocaleString('ro-RO') : kpi.value}
          {kpi.unit && <span className="text-xl ml-1">{kpi.unit}</span>}
        </div>
        {hasChange && (
          <p className="text-xs text-brand-subtle mt-1 flex items-center">
            <span
              className={cn(
                "flex items-center mr-1",
                isPositiveChange && "text-green-400",
                isNegativeChange && "text-red-400",
                isNeutralChange && "text-brand-subtle"
              )}
            >
              {isPositiveChange && <TrendingUp className="h-4 w-4 mr-0.5" />}
              {isNegativeChange && <TrendingDown className="h-4 w-4 mr-0.5" />}
              {isNeutralChange && <Minus className="h-4 w-4 mr-0.5" />}
              {kpi.changePercentage?.toFixed(1)}%
            </span>
            {kpi.periodComparison || "față de perioada anterioară"}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
