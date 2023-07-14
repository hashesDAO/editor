import useSWR from 'swr';
import { useAccount, useNetwork } from 'wagmi';
import type { HashesData } from '../util/types';
//TODO: fix type errors
// @ts-ignore: Unreachable code error
const fetcher = (...args) => fetch(...args).then((res) => res.json());

type HashData = {
  hashes: HashesData[];
};

export default function useHashesData(): {
  hashData: HashData | undefined;
  isLoading: boolean;
  isError: any;
} {
  const { chain } = useNetwork();
  const { address } = useAccount();

  const { data, error, isLoading } = useSWR(
    address && chain?.network ? `/api/wallet/${address}?chain=${chain?.network}` : null,
    fetcher,
  );

  return {
    hashData: data,
    isLoading,
    isError: error,
  };
}
