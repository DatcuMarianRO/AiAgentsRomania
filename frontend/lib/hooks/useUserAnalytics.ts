// 5. Fisier: lib/hooks/useUserAnalytics.ts

'use client';
import useSWR from 'swr';
import { UserAnalyticsData } from '@/types/analytics'; // Asigură-te că importul este corect

const userAnalyticsFetcher = async (url: string): Promise<UserAnalyticsData> => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorInfo = await res.json().catch(() => ({ message: res.statusText }));
    const error = new Error(`An error occurred while fetching user analytics: ${errorInfo.message || res.statusText}`) as any;
    error.info = errorInfo;
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export const useUserAnalytics = (period: string = '30d') => {
  const { data, error, isLoading, mutate, isValidating } = useSWR<UserAnalyticsData>(
    `/api/user/analytics?period=${period}`,
    userAnalyticsFetcher,
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
