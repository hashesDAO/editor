import { useHashContext } from '@/app/contexts/HashContext';
import useHashesData from '@/app/hooks/useHashesData';
import { mintHash } from '@/app/util/hashActions';
import { ChainNames } from '@/app/util/types';
import { useNetwork } from 'wagmi';

export default function useMintNewHash() {
  const { selectedHash, selectedHashPhrase } = useHashContext();
  const { chain } = useNetwork();
  const { hashData } = useHashesData();
  const { hashes } = hashData || {};
  const parsedHashes = hashes?.map(({ hash_value }) => hash_value);

  function handleMint() {
    if (!parsedHashes || !parsedHashes.includes(selectedHash)) {
      if (!chain?.network) {
        console.error('no chain network found');
        return;
      }
      mintHash(selectedHashPhrase, chain.network as ChainNames);
    }
  }

  return { handleMint };
}
