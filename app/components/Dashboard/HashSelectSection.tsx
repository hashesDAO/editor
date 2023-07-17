'use client';

import useHashesData from '@/app/hooks/useHashesData';
import { useState } from 'react';
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

function createHashSelectOptions(data: HashesData[]) {
  return data.map(({ hash_value }) => ({
    label: hash_value,
    value: hash_value,
  }));
}

type EditModeSectionProps = {
  onClick: () => void;
  input: JSX.Element;
  submitButton: JSX.Element;
};

function EditModeSection({ onClick, input, submitButton }: EditModeSectionProps) {
  return (
    <>
      <div className="w-4/6">
        <div className="flex">
          <CircleButton onClick={onClick}>
            <FaArrowLeft />
          </CircleButton>
          {input}
        </div>
      </div>
      <div className="w-2/6 flex flex-row items-center">{submitButton}</div>
    </>
  );
}

export default function HashSelect() {
  const [isEditing, setIsEditing] = useState(false);
  const [newHashPhrase, setNewHashPhrase] = useState('');
  const [newlyGeneratedHash, setNewlyGeneratedHash] = useState('');
  const { hashData, isError, isLoading } = useHashesData();
  const dispatch = useHashDispatch();
  const { hashes } = hashData || {};

  function handleEnableEditModeClick() {
    setIsEditing(true);
  }

  function handleBackButtonClick() {
    setIsEditing(false);
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewHashPhrase(e.target.value);
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
          <EditModeSection
            onClick={handleBackButtonClick}
            input={
              <input
                type="text"
                className="w-full py-4 px-5 bg-traitGray rounded-full"
                placeholder="Enter a phrase"
                value={newHashPhrase}
                onChange={handleOnChange}
              />
            }
            submitButton={<Generate value={newHashPhrase} onClick={handleEditModeSubmit} />}
          />
        ) : (
          <>
            {hashes && hashes.length > 0 ? (
              <>
                <div className="w-4/6">
                  <Select options={createHashSelectOptions(hashes)} />
                </div>
                <div className="w-2/6 flex flex-row items-center">
                  <p className="px-4">OR</p>
                  <Button text="CREATE NEW" onClick={handleEnableEditModeClick} />
                </div>
              </>
            ) : (
              <HashPill
                value={newlyGeneratedHash.length > 0 ? newlyGeneratedHash : 'Create a Hash'}
                onClick={handleEnableEditModeClick}
              >
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
