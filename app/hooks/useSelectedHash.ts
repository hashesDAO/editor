import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { SelectedHashData } from '../contexts/HashContext';
import { INITIAL_SELECTED_HASH } from '../util/constants';

const initialData = {
  selectedHash: INITIAL_SELECTED_HASH,
  selectedHashPhrase: '',
};
export default function useSelectedHash() {
  const [selectedHashData, setSelectedHashData] = useState<SelectedHashData>(initialData);
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      setSelectedHashData(initialData);
    }
  }, [isConnected, setSelectedHashData]);

  return { selectedHashData, setSelectedHashData };
}
