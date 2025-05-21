// 11. Fisier: app/(dashboard)/dashboard/analytics/page.tsx (Actualizat)

'use client';

import { useUserAnalytics } from "@/lib/hooks/useUserAnalytics";
import StatCard from "@/components/dashboard/StatCard";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import PeriodSelector from "@/components/dashboard/PeriodSelector";
import DashboardLoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { RefreshCw, MessageSquare, Zap, Bot, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { format } from 'date-fns';
import { ro } from 'date-fns/locale';
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function UserAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const { data, isLoading, isError, error, refreshData } = useUserAnalytics(selectedPeriod);

  const handleRefresh = async () => {
    toast.info("Se actualizează statisticile personale...");
    try {
      await refreshData();
      toast.success("Statisticile personale au fost actualizate!");
    } catch (e: any) {
      toast.error(`Eroare la actualizarea statisticilor: ${e?.message || 'Necunoscută'}`);
    }
  };

  const lastUpdatedDate = data?.lastUpdatedAt ? format(new Date(data.lastUpdatedAt), 'dd MMMM yyyy, HH:mm', { locale: ro }) : 'N/A';

  if (isLoading) return <DashboardLoadingSkeleton />;

  if (isError) {
    return (
      <div className="text-center py-10 bg-red-900/20 p-8 rounded-lg border border-red-700">
        <AlertTriangle size={48} className="mx-auto mb-4 text-red-400"/>
        <h2 className="text-2xl font-semibold text-red-400 mb-2">Eroare la încărcarea statisticilor</h2>
        <p className="text-red-300/80 mb-6">{(error as Error)?.message || "Nu am putut prelua statisticile tale."}</p>
        <Button onClick={handleRefresh} variant="destructive" size="lg" className="bg-red-600 hover:bg-red-700">
          <RefreshCw className="mr-2 h-4 w-4" /> Încearcă din nou
        </Button>
      </div>
    );
  }
  
  if (!data) return <div className="text-center p-10 text-brand-subtle">Nu sunt statistici disponibile pentru contul tău în perioada selectată.</div>;

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-brand-light">Statisticile Mele de Utilizare</h2>
        <div className="flex items-center gap-3">
          <PeriodSelector selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} disabled={isLoading}/>
          <Button onClick={handleRefresh} variant="outline" size="icon" disabled={isLoading} aria-label="Actualizează datele" className="border-brand-light/20 hover:bg-brand-primary hover:text-brand-accent">
            <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
          </Button>
        </div>
      </div>
      <p className="text-xs text-brand-subtle -mt-4 text-right">Ultima actualizare: {lastUpdatedDate}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {data.summary?.totalConversations && <StatCard title="Total Conversații" kpi={data.summary.totalConversations} icon={MessageSquare} />}
        {data.summary?.tokensUsedThisPeriod && <StatCard title="Tokeni Utilizați" kpi={data.summary.tokensUsedThisPeriod} icon={Zap} />}
        {data.summary?.averageMessagesPerConversation && <StatCard title="Mesaje/Conversație (Medie)" kpi={data.summary.averageMessagesPerConversation} icon={Bot} />}
      </div>

      <AnalyticsChart
        title="Activitatea Ta în Timp"
        data={data.activityOverTime || []}
        dataKeys={[
          { name: 'messagesSent', displayName: 'Mesaje Trimise', color: '#82ca9d', type: 'line' },
          { name: 'conversationsStarted', displayName: 'Conversații Începute', color: 'var(--color-accent, #00E5FF)', type: 'bar' },
        ]}
      />

      <Card className="bg-brand-secondary border-brand-light/10 text-brand-light">
        <CardHeader><CardTitle className="text-lg font-medium text-brand-subtle">Top Agenți Utilizați de Tine</CardTitle></CardHeader>
        <CardContent>
          {data.topAgentsUsed && data.topAgentsUsed.length > 0 ? (
            <ul className="space-y-4">
              {data.topAgentsUsed.map(agent => (
                <li key={agent.agentId || agent.id} className="flex items-center justify-between p-3 rounded-md hover:bg-brand-primary/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-md overflow-hidden bg-brand-primary border border-brand-light/20 flex-shrink-0">
                        <Image 
                            src={agent.agentAvatarUrl || agent.avatarUrl || `https://placehold.co/40x40/1A1A1A/FFFFFF?text=${(agent.agentName || agent.name).charAt(0)}`} 
                            alt={agent.agentName || agent.name} 
                            width={40} height={40} 
                            className="object-cover"
                        />
                    </div>
                    <Link href={agent.slug ? `/agents/${agent.slug}/run` : '#'} className="hover:underline text-brand-light font-medium truncate max-w-[calc(100%-80px)]" title={agent.agentName || agent.name}>
                        {agent.agentName || agent.name}
                    </Link>
                  </div>
                  <span className="font-semibold text-brand-accent whitespace-nowrap">
                    {typeof agent.value === 'number' ? agent.value.toLocaleString('ro-RO') : agent.value} {agent.secondaryValue}
                  </span>
                </li>
              ))}
            </ul>
          ) : <p className="text-brand-subtle text-sm">Nu ai interacționat cu agenți în perioada selectată.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
