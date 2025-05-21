// 7. Fisier: components/dashboard/AnalyticsChart.tsx

'use client';
import { ResponsiveContainer, LineChart, BarChart, XAxis, YAxis, Tooltip, Legend, Line, Bar, CartesianGrid, AreaChart, Area } from 'recharts';
import { TimeSeriesData } from '@/types/analytics'; // Asigură-te că importul este corect
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Asigură-te că ai aceste componente shadcn/ui
import { cn } from '@/lib/utils';

interface AnalyticsChartProps {
  title: string;
  data: TimeSeriesData[];
  dataKeys: { name: string; color: string; type?: 'line' | 'bar' | 'area', displayName?: string }[];
  xAxisKey?: string;
  className?: string;
  chartType?: 'line' | 'bar' | 'area';
}

export default function AnalyticsChart({ title, data, dataKeys, xAxisKey = 'date', className, chartType = 'line' }: AnalyticsChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card className={cn("bg-brand-secondary border-brand-light/10 text-brand-light", className)}>
        <CardHeader><CardTitle className="text-lg font-medium text-brand-subtle">{title}</CardTitle></CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-brand-subtle">Nu sunt date disponibile pentru acest grafic.</p>
        </CardContent>
      </Card>
    );
  }

  const ChartComponent = chartType === 'bar' ? BarChart : (chartType === 'area' ? AreaChart : LineChart);

  return (
    <Card className={cn("bg-brand-secondary border-brand-light/10 text-brand-light", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-medium text-brand-subtle">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] md:h-[350px] -ml-4 pr-2">
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(204, 204, 204, 0.1)" />
            <XAxis dataKey={xAxisKey} stroke="var(--color-subtle, #CCCCCC)" fontSize={12} tickLine={false} axisLine={{ stroke: 'rgba(204, 204, 204, 0.2)'}} />
            <YAxis stroke="var(--color-subtle, #CCCCCC)" fontSize={12} tickLine={false} axisLine={{ stroke: 'rgba(204, 204, 204, 0.2)'}} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-secondary, #1A1A1A)',
                borderColor: 'var(--color-accent, #00E5FF)',
                borderRadius: '0.5rem',
                color: 'var(--color-light, #F0F0F0)',
                opacity: 0.95,
              }}
              itemStyle={{ color: 'var(--color-subtle, #CCCCCC)' }}
              cursor={{ fill: 'rgba(0, 229, 255, 0.05)' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            {dataKeys.map(keyInfo => {
              const SpecificChartElement = keyInfo.type === 'bar' ? Bar : (keyInfo.type === 'area' ? Area : Line);
              return (
                <SpecificChartElement
                  key={keyInfo.name}
                  type="monotone"
                  dataKey={keyInfo.name}
                  name={keyInfo.displayName || keyInfo.name} // Pentru Legend
                  stroke={keyInfo.color}
                  fill={keyInfo.type === 'area' || keyInfo.type === 'bar' ? keyInfo.color : undefined}
                  fillOpacity={keyInfo.type === 'area' ? 0.3 : (keyInfo.type === 'bar' ? 0.7 : undefined)}
                  strokeWidth={2}
                  dot={{ r: 3, fill: keyInfo.color, strokeWidth: 1, stroke: 'var(--color-secondary, #1A1A1A)'}}
                  activeDot={{ r: 5, strokeWidth: 2, stroke: keyInfo.color, fill: 'var(--color-secondary, #1A1A1A)' }}
                />
              );
            })}
          </ChartComponent>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
