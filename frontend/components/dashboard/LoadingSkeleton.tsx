// 9. Fisier: components/dashboard/LoadingSkeleton.tsx

import { Card, CardContent, CardHeader } from "@/components/ui/card"; // Asigură-te că ai aceste componente shadcn/ui
import { Skeleton } from "@/components/ui/skeleton"; // Asigură-te că ai Skeleton de la shadcn/ui

export default function DashboardLoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-1/3 bg-brand-light/10" />
        <div className="flex gap-3">
            <Skeleton className="h-10 w-[180px] bg-brand-light/10" />
            <Skeleton className="h-10 w-10 bg-brand-light/10 rounded-md" />
        </div>
      </div>
      <Skeleton className="h-4 w-1/4 bg-brand-light/10 ml-auto" /> {/* Pentru last updated */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-brand-secondary border-brand-light/10">
            <CardHeader className="pb-2"><Skeleton className="h-4 w-2/3 bg-brand-light/10" /></CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-1/2 mb-2 bg-brand-light/10" />
              <Skeleton className="h-3 w-1/3 bg-brand-light/10" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="bg-brand-secondary border-brand-light/10">
        <CardHeader><Skeleton className="h-6 w-1/4 bg-brand-light/10" /></CardHeader>
        <CardContent className="h-[350px]"><Skeleton className="h-full w-full bg-brand-light/10 rounded-md" /></CardContent>
      </Card>
       <Card className="bg-brand-secondary border-brand-light/10">
        <CardHeader><Skeleton className="h-6 w-1/3 bg-brand-light/10" /></CardHeader>
        <CardContent className="h-[250px]"><Skeleton className="h-full w-full bg-brand-light/10 rounded-md" /></CardContent>
      </Card>
    </div>
  );
}
