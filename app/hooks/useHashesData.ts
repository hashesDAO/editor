import useSWR from 'swr';
import { useAccount, useNetwork } from 'wagmi';
//TODO: fix type errors
// @ts-ignore: Unreachable code error
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useHashesData() {
  const { chain } = useNetwork();
  const { address } = useAccount();

  const { data, error, isLoading } = useSWR(
    address && chain?.network ? `http://localhost:3000/api/wallet/${address}?chain=${chain?.network}` : null,
    fetcher,
  );

  return {
    hashData: data,
    isLoading,
    isError: error,
  };
}
