import { useEffect, useState } from 'react';
import { INITIAL_SELECTED_HASH } from '../util/constants';
import { useAccount } from 'wagmi';
import { SelectedHash } from '../contexts/HashContext';

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
