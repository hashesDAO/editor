'use client';

import { useHashDispatch } from '@/app/contexts/HashContext';
import useHashesData from '@/app/hooks/useHashesData';
import { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { Address } from 'viem';
import { useAccount } from 'wagmi';
import type { HashesData } from '../../../util/types';
import Button from '../../common/Button';
import Select from '../../common/Select';
import EditModeSection from './EditModeSection';
import HashPill from './HashPill';

function useNewlyGeneratedHash() {
  const [newlyGeneratedHash, setNewlyGeneratedHash] = useState<Address>();
  const { isConnected } = useAccount();
  const dispatch = useHashDispatch();

  function handleEditModeSubmit(hash: Address) {
    setNewlyGeneratedHash(hash);
    dispatch(hash);
  }

  useEffect(() => {
    if (!isConnected && newlyGeneratedHash) {
      setNewlyGeneratedHash(undefined);
    }
  }, [isConnected, newlyGeneratedHash]);

  return { newlyGeneratedHash, handleEditModeSubmit };
}

function createHashSelectOptions(data: Array<HashesData | { hash_value: Address }>) {
  return data.map(({ hash_value }) => ({
    label: hash_value,
    value: hash_value,
  }));
}

export default function HashSelect() {
  const [isEditing, setIsEditing] = useState(false);
  const { newlyGeneratedHash, handleEditModeSubmit } = useNewlyGeneratedHash();
  const { hashData, isError, isLoading } = useHashesData();
  const { hashes } = hashData || {};

  function handleEnableEditModeClick() {
    setIsEditing(true);
  }

  function handleBackButtonClick() {
    setIsEditing(false);
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
