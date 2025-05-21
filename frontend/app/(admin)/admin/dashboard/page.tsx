// 10. Fisier: app/(admin)/admin/dashboard/page.tsx (Actualizat)

'use client';

import { useAdminAnalytics } from "@/lib/hooks/useAdminAnalytics";
import StatCard from "@/components/dashboard/StatCard";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import PeriodSelector from "@/components/dashboard/PeriodSelector";
import DashboardLoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import { Button } from "@/components/ui/button"; // Asigură-te că ai Button de la shadcn/ui
import { RefreshCw, Users, Bot, BarChart3, Euro, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"; // Sau useToast de la shadcn/ui
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const { data, isLoading, isError, error, refreshData } = useAdminAnalytics(selectedPeriod);

  const handleRefresh = async () => {
    toast.info("Se actualizează datele de analytics...");
    try {
      await refreshData();
      toast.success("Datele de analytics au fost actualizate!");
    } catch (e: any) {
      toast.error(`Eroare la actualizarea datelor: ${e?.message || 'Necunoscută'}`);
    }
  };
  
  const lastUpdatedDate = data?.lastUpdatedAt ? format(new Date(data.lastUpdatedAt), 'dd MMMM yyyy, HH:mm', { locale: ro }) : 'N/A';

  if (isLoading) return <DashboardLoadingSkeleton />;

  if (isError) {
    return (
      <div className="text-center py-10 bg-red-900/20 p-8 rounded-lg border border-red-700">
        <AlertTriangle size={48} className="mx-auto mb-4 text-red-400"/>
        <h2 className="text-2xl font-semibold text-red-400 mb-2">Eroare la încărcarea datelor</h2>
        <p className="text-red-300/80 mb-6">{(error as Error)?.message || "Nu am putut prelua statisticile pentru admin."}</p>
        <Button onClick={handleRefresh} variant="destructive" size="lg" className="bg-red-600 hover:bg-red-700">
          <RefreshCw className="mr-2 h-4 w-4" /> Încearcă din nou
        </Button>
      </div>
    );
  }
  
  if (!data) return <div className="text-center p-10 text-brand-subtle">Nu sunt date de analytics disponibile. Încearcă să selectezi altă perioadă sau să reîmprospătezi.</div>;

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-brand-light">Panou Analytics Admin</h2>
        <div className="flex items-center gap-3">
          <PeriodSelector selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} disabled={isLoading}/>
          <Button onClick={handleRefresh} variant="outline" size="icon" disabled={isLoading} aria-label="Actualizează datele" className="border-brand-light/20 hover:bg-brand-primary hover:text-brand-accent">
            <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
          </Button>
        </div>
      </div>
       <p className="text-xs text-brand-subtle -mt-4 text-right">Ultima actualizare: {lastUpdatedDate}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {data.summary?.totalUsers && <StatCard title="Utilizatori Totali" kpi={data.summary.totalUsers} icon={Users} />}
        {data.summary?.totalAgents && <StatCard title="Agenți Creați" kpi={data.summary.totalAgents} icon={Bot} />}
        {data.summary?.activeSubscriptions && <StatCard title="Abonamente Active" kpi={data.summary.activeSubscriptions} icon={BarChart3} />}
        {data.summary?.totalRevenue && <StatCard title="Venituri Totale" kpi={data.summary.totalRevenue} icon={Euro} />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <AnalyticsChart
          title="Trend Utilizatori (Noi vs Activi)"
          data={data.userTrends || []}
          dataKeys={[
            { name: 'newUsers', displayName: 'Utilizatori Noi', color: '#8884d8', type: 'line' },
            { name: 'activeUsers', displayName: 'Utilizatori Activi', color: '#82ca9d', type: 'line' },
          ]}
        />
        <AnalyticsChart
          title="Trend Venituri"
          data={data.revenueTrends || []}
          dataKeys={[{ name: 'revenue', displayName: 'Venit (€)', color: '#ffc658', type: 'area' }]}
          chartType="area"
        />
      </div>
       <AnalyticsChart
          title="Trend Creare Agenți & Apeluri API"
          data={data.agentTrends || []}
          dataKeys={[
            { name: 'createdAgents', displayName: 'Agenți Creați', color: 'var(--color-accent, #00E5FF)', type: 'bar' },
            { name: 'executedCalls', displayName: 'Apeluri Executate', color: '#FA5252', type: 'bar' },
          ]}
          chartType="bar"
        />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <Card className="bg-brand-secondary border-brand-light/10 text-brand-light">
          <CardHeader><CardTitle className="text-lg font-medium text-brand-subtle">Top Agenți Performanți</CardTitle></CardHeader>
          <CardContent>
            {data.topPerformingAgents && data.topPerformingAgents.length > 0 ? (
              <ul className="space-y-3">
                {data.topPerformingAgents.map(agent => (
                  <li key={agent.id} className="flex items-center justify-between text-sm p-2 rounded-md hover:bg-brand-primary/50">
                    <Link href={agent.slug ? `/agents/${agent.slug}` : '#'} target="_blank" className="hover:underline text-brand-light truncate max-w-[70%]" title={agent.name}>{agent.name}</Link>
                    <span className="font-semibold text-brand-accent whitespace-nowrap">
                        {typeof agent.value === 'number' ? agent.value.toLocaleString('ro-RO') : agent.value} {agent.secondaryValue}
                    </span>
                  </li>
                ))}
              </ul>
            ) : <p className="text-brand-subtle text-sm">Nu sunt date despre performanța agenților.</p>}
          </CardContent>
        </Card>
        <AnalyticsChart
          title="Distribuție Abonamente"
          data={data.subscriptionDistribution || []}
          dataKeys={[{ name: 'value', displayName: 'Număr Abonamente', color: '#8884d8' /* Culoarea va fi luată din `fill` din data */ }]}
          xAxisKey="name"
          chartType="bar"
        />
      </div>
    </div>
  );
}
