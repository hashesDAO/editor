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

function Section({ children }: { children: React.ReactNode }) {
  return <section className="flex mb-8">{children}</section>;
}

function EditModeSection({
  onClick,
  onChange,
  value,
}: {
  onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) {
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
        <Generate onClick={() => {}} value={value} />
      </div>
    </>
  );
}

export default function HashSelect() {
  const [isEditing, setIsEditing] = useState(false);
  const [newHashValue, setNewHashValue] = useState('');
  const { hashData, isError, isLoading } = useHashesData();
  const { hashes } = hashData || {};

  function handleEnableEditModeClick() {
    setIsEditing(true);
  }

  function handleBackButtonClick() {
    setIsEditing(false);
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewHashValue(e.target.value);
  }

  if (isError) {
    return <Section>{/* <HashPill /> */}</Section>;
  }

  if (isLoading) {
    return (
      <Section>
        <p className="w-full py-4 px-5">loading...</p>
      </Section>
    );
  }

  return (
    <Section>
      <>
        {isEditing ? (
          <EditModeSection onClick={handleBackButtonClick} onChange={handleOnChange} value={newHashValue} />
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
              <>
                <HashPill value={newHashValue || 'Create a Hash'} onClick={handleEnableEditModeClick}>
                  <MdEdit className="cursor-pointer" />
                </HashPill>
                {hashes?.length === 0 && (
                  <p className="ml-2 text-xs">
                    No Hashes found in your wallet. Design and mint your new Hash NFT today. ⚡️
                  </p>
                )}
              </>
            )}
          </>
        )}
      </>
    </Section>
  );
}
