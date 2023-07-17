'use client';

import useHashesData from '@/app/hooks/useHashesData';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import type { HashesData } from '../../util/types';
import Button from '../common/Button';
import CircleButton from '../common/CircleButton';
import Select from '../common/Select';
import HashPill from './HashPill';
import Generate from './buttons/Generate';
import { Address } from 'viem';
import { useHashDispatch } from '@/app/contexts/HashContext';
import { useAccount } from 'wagmi';

function createHashSelectOptions(data: Array<HashesData | { hash_value: Address }>) {
  return data.map(({ hash_value }) => ({
    label: hash_value,
    value: hash_value,
  }));
}

type EditModeSectionProps = {
  onBackButtonClick: () => void;
  onSubmit: (hash: Address) => void;
};

function EditModeSection({ onBackButtonClick, onSubmit }: EditModeSectionProps) {
  const [newHashPhrase, setNewHashPhrase] = useState('');

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewHashPhrase(e.target.value);
  }

  return (
    <>
      <div className="w-4/6">
        <div className="flex">
          <CircleButton onClick={onBackButtonClick}>
            <FaArrowLeft />
          </CircleButton>
          <input
            type="text"
            className="w-full py-4 px-5 bg-traitGray rounded-full"
            placeholder="Enter a phrase"
            value={newHashPhrase}
            onChange={handleOnChange}
          />
        </div>
      </div>
      <div className="w-2/6 flex flex-row items-center">
        <Generate value={newHashPhrase} onClick={onSubmit} />
      </div>
    </>
  );
}

export default function HashSelect() {
  const [isEditing, setIsEditing] = useState(false);
  const [newlyGeneratedHash, setNewlyGeneratedHash] = useState<Address>();
  const { hashData, isError, isLoading } = useHashesData();
  const dispatch = useHashDispatch();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected && newlyGeneratedHash) {
      setNewlyGeneratedHash(undefined);
    }
  }, [isConnected, newlyGeneratedHash]);

  const { hashes } = hashData || {};

  function handleEnableEditModeClick() {
    setIsEditing(true);
  }

  function handleBackButtonClick() {
    setIsEditing(false);
  }

  function handleEditModeSubmit(hash: Address) {
    setNewlyGeneratedHash(hash);
    dispatch(hash);
  }

  if (isLoading) {
    return (
      <section className="flex mb-8">
        <p className="w-full py-4 px-5">loading...</p>
      </section>
    );
  }

  return (
    <>
      <section className="flex mb-8">
        {isEditing ? (
          <EditModeSection onBackButtonClick={handleBackButtonClick} onSubmit={handleEditModeSubmit} />
        ) : (
          <>
            {hashes && hashes.length > 0 ? (
              <>
                <div className="w-4/6">
                  <Select
                    options={createHashSelectOptions(
                      newlyGeneratedHash ? [{ hash_value: newlyGeneratedHash }, ...hashes] : hashes,
                    )}
                  />
                </div>
                <div className="w-2/6 flex flex-row items-center">
                  <p className="px-4">OR</p>
                  <Button text="CREATE NEW" onClick={handleEnableEditModeClick} />
                </div>
              </>
            ) : (
              <HashPill value={newlyGeneratedHash || 'Create a Hash'} onClick={handleEnableEditModeClick}>
                <MdEdit />
              </HashPill>
            )}
          </>
        )}
      </section>
      {hashes?.length === 0 && (
        <p className="ml-2 mb-8 text-xs">
          No Hashes found in your wallet. Create and mint your new Hash NFT today. ⚡️
        </p>
      )}
      {isError && (
        <p className="ml-2 mb-8 text-xs">
          Error fetching Hashes from your wallet. You may still generate new hashes using the form above. ⚡️
        </p>
      )}
    </>
  );
}
