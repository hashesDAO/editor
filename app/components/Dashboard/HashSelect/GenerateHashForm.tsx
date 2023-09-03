'use client';

import { generateHash } from '@/app/util/hashActions';
import { ChainNames } from '@/app/util/types';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { Address } from 'viem';
import { useAccount, useNetwork } from 'wagmi';
import Button from '../../common/Button';

type Props = {
  onSubmit: (hash: Address, phrase: string) => void;
};

const tooltipId = 'generate-hash';

export default function GenerateHashForm({ onSubmit }: Props) {
  const [newHashPhrase, setNewHashPhrase] = useState('');
  const { address } = useAccount();
  const { chain } = useNetwork();
  const isDisabled = !address || !chain?.network || !newHashPhrase;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isDisabled) {
      return;
    }
    if (!address || !chain?.network) {
      console.error('no linked user address or chain');
      return;
    }

    const hash = await generateHash(newHashPhrase, address, chain.network as ChainNames);

    if (hash instanceof Error) {
      console.error(hash);
    } else {
      onSubmit(hash, newHashPhrase);
    }
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewHashPhrase(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <div className="w-4/6">
        <input
          type="text"
          className="w-full py-4 px-5 bg-traitGray rounded-full"
          placeholder="Enter a phrase"
          autoComplete="off"
          value={newHashPhrase}
          onChange={handleOnChange}
        />
      </div>
      <div className="w-2/6">
        <Button
          text={'GENERATE HASH'}
          disabled={isDisabled}
          type="submit"
          data-tooltip-id={tooltipId}
          data-tooltip-content={
            newHashPhrase.length === 0 ? 'Enter a phrase' : 'Connect your wallet to generate a Hash.'
          }
        />
        {isDisabled && <Tooltip id={tooltipId} />}
      </div>
    </form>
  );
}
