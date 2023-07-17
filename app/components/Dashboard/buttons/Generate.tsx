import { useHashDispatch } from '@/app/contexts/HashContext';
import { generateHash } from '@/app/util/generateHash';
import { ChainNames } from '@/app/util/types';
import { useAccount, useNetwork } from 'wagmi';
import Button from '../../common/Button';

export default function Generate({ value }: { value: string }) {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const dispatch = useHashDispatch();

  async function handleClick() {
    if (!address || !chain?.network) {
      console.error('no linked user address or chain');
      return;
    }
    const hash = await generateHash(value, address, chain.network as ChainNames);
    if (hash instanceof Error) {
      console.error(hash);
    } else {
      console.log(`generated hash: ${hash}`);
      dispatch(hash);
    }
  }

  return <Button disabled={!address || !chain?.network || !value} text={'GENERATE HASH'} onClick={handleClick} />;
}
