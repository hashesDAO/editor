'use client';

import { usePathname } from 'next/navigation';
import useSWR from 'swr';

export default function useSavedProjectData() {
  const pathname = usePathname();
  const id = pathname.split('/').pop(); //TODO: rethink this, it's brittle
  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/traits/${id}`, fetcher);
  return {
    data,
    isLoading,
    isError: error,
  };
}
