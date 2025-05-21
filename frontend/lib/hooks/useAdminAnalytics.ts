// 4. Fisier: lib/hooks/useAdminAnalytics.ts

'use client';
import useSWR from 'swr';
import { AdminAnalyticsData } from '@/types/analytics'; // Asigură-te că importul este corect

const fetcher = async (url: string): Promise<AdminAnalyticsData> => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorInfo = await res.json().catch(() => ({ message: res.statusText }));
    const error = new Error(`An error occurred while fetching admin analytics: ${errorInfo.message || res.statusText}`) as any;
    error.info = errorInfo;
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export const useAdminAnalytics = (period: string = '30d') => {
  const { data, error, isLoading, mutate, isValidating } = useSWR<AdminAnalyticsData>(
    `/api/admin/analytics?period=${period}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  return {
    data,
    isLoading: isLoading || isValidating,
    isError: !!error,
    error,
    refreshData: mutate,
  };
};
