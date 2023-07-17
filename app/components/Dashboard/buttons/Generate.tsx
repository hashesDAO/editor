import { generateHash } from '@/app/util/generateHash';
import { ChainNames } from '@/app/util/types';
import { Tooltip } from 'react-tooltip';
import { Address, useAccount, useNetwork } from 'wagmi';
import Button from '../../common/Button';

const tooltipId = 'generate-hash';

type Props = {
  value: string;
  onClick: (hash: Address) => void;
};

export default function Generate({ value, onClick }: Props) {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const isDisabled = !address || !chain?.network || !value;

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
      onClick(hash);
    }
  }

  return (
    <>
      <Button
        text={'GENERATE HASH'}
        onClick={() => {
          if (isDisabled) {
            return;
          }
          handleClick();
        }}
        data-tooltip-id={tooltipId}
        data-tooltip-content={'Connect your wallet to generate a Hash.'}
      />
      {isDisabled && <Tooltip id={tooltipId} />}
    </>
  );
}
