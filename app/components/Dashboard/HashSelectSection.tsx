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

function createHashSelectOptions(data: HashesData[]) {
  return data.map(({ hash_value }) => ({
    label: hash_value,
    value: hash_value,
  }));
}

type EditModeSectionProps = {
  onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

function EditModeSection({ onClick, onChange, value }: EditModeSectionProps) {
  return (
    <>
      <div className="w-4/6">
        <div className="flex">
          <CircleButton onClick={onClick}>
            <FaArrowLeft />
          </CircleButton>
          <input
            type="text"
            className="w-full py-4 px-5 bg-traitGray rounded-full"
            placeholder="Enter a phrase"
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="w-2/6 flex flex-row items-center">
        <Generate value={value} />
      </div>
    </>
  );
}

export default function HashSelect() {
  const [isEditing, setIsEditing] = useState(false);
  const [newHashPhrase, setNewHashPhrase] = useState('');
  const { hashData, isError, isLoading } = useHashesData();
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
          <EditModeSection onClick={handleBackButtonClick} onChange={handleOnChange} value={newHashPhrase} />
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
              <HashPill value={newHashPhrase || 'Create a Hash'} onClick={handleEnableEditModeClick}>
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