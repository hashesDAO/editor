'use client';

import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Address } from 'viem';
import CircleButton from '../../common/CircleButton';
import Generate from '../buttons/Generate';

type EditModeSectionProps = {
  onBackButtonClick: () => void;
  onSubmit: (hash: Address) => void;
};

export default function EditModeSection({ onBackButtonClick, onSubmit }: EditModeSectionProps) {
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
