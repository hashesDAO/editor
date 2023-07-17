import Button from '../../common/Button';
import { generateHash } from '@/app/util/generateHash';
import { ChainNames } from '@/app/util/types';
import { useAccount, useNetwork } from 'wagmi';

export default function Generate({ onClick, value }: { onClick: () => void; value: string }) {
  const { address } = useAccount();
  const { chain } = useNetwork();

  async function handleClick() {
    if (!address || !chain?.network) {
      console.error('no linked user address or chain');
      return;
    }
    const hash = await generateHash(value, address, chain.network as ChainNames);
    console.log(`generated: ${hash}`);
    onClick();
  }

  return <Button disabled={!address || !chain?.network || !value} text={'GENERATE HASH'} onClick={handleClick} />;
}
