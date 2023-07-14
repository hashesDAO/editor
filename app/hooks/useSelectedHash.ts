import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { SelectedHash } from '../contexts/HashContext';
import { INITIAL_SELECTED_HASH } from '../util/constants';

export default function useSelectedHash() {
  const [selectedHash, setSelectedHash] = useState<SelectedHash | undefined>(INITIAL_SELECTED_HASH);
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      setSelectedHash(INITIAL_SELECTED_HASH);
    }
  }, [isConnected, setSelectedHash]);

  return { selectedHash, setSelectedHash };
}
