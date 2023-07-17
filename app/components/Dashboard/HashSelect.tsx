'use client';

import useHashesData from '@/app/hooks/useHashesData';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
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

export default function HashSelect() {
  const [isEditing, setIsEditing] = useState(false);
  const [newHashValue, setNewHashValue] = useState('');
  const { hashData, isError, isLoading } = useHashesData();
  const { hashes } = hashData || {};

  function handleCreateButtonClick() {
    setIsEditing(true);
  }

  function handleBackButtonClick() {
    setIsEditing(false);
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewHashValue(e.target.value);
  }

  if (isError) {
    return (
      <Section>
        <HashPill />
      </Section>
    );
  }

  if (isLoading) {
    return (
      <Section>
        <p className="w-full py-4 px-5">loading...</p>
      </Section>
    );
  }

  return (
    <>
      {hashes && hashes.length > 0 ? (
        <Section>
          {isEditing ? (
            <>
              <div className="w-4/6">
                <div className="flex">
                  <CircleButton onClick={handleBackButtonClick}>
                    <FaArrowLeft />
                  </CircleButton>
                  <input
                    type="text"
                    className="w-full py-4 px-5 bg-traitGray rounded-full"
                    placeholder="Enter a phrase"
                    value={newHashValue}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
              <div className="w-2/6 flex flex-row items-center">
                <Generate onClick={() => {}} value={newHashValue} />
              </div>
            </>
          ) : (
            <>
              <div className="w-4/6">
                <Select options={createHashSelectOptions(hashes)} />
              </div>
              <div className="w-2/6 flex flex-row items-center">
                <p className="px-4">OR</p>
                <Button text="CREATE NEW" onClick={handleCreateButtonClick} />
              </div>
            </>
          )}
        </Section>
      ) : (
        <section className="flex flex-col mb-8">
          <HashPill />
          {hashes?.length === 0 && (
            <p className="ml-2 text-xs">No Hashes found in your wallet. Design and mint your new Hash NFT today. ⚡️</p>
          )}
        </section>
      )}
    </>
  );
}
