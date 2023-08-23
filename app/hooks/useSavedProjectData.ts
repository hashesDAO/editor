'use client';

import useSWR from 'swr';
import { usePathname } from 'next/navigation';

export default function useSavedProjectData() {
  const pathname = usePathname();
  const id = pathname.split('/').pop(); //TODO: rethink this, it's brittle
  if (id === 'new') {
    return {
      data: null,
      isLoading: false,
      isError: null,
    };
  }
  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data: projectData, error, isLoading } = useSWR(`/api/traits/${id}`, fetcher);
  console.log('zzz inside deep', projectData);
  return {
    data: projectData?.data,
    isLoading,
    isError: error,
  };
}
