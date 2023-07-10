'use client';

import { useState } from 'react';
import Toggle from './Toggle';

type StringOrNumber = string | number;

type TraitOption = {
  label: number | JSX.Element;
  value: StringOrNumber;
};

export default function TraitOptions({ options }: { options?: TraitOption[] }) {
  const [selectedOption, setSelectedOption] = useState<StringOrNumber>();

  function handleClick(option: StringOrNumber) {
    setSelectedOption(option);
  }

  return (
    <>
      {options ? (
        <ul className="flex flex-row">
          {options.map(({ label, value }) => (
            <li
              key={value}
              className={`py-0.5 px-[7px] ml-2.5 text-[10px] cursor-pointer rounded-full border ${
                value === selectedOption ? 'border-white bg-white text-baseBlack' : 'border-baseBlack bg-baseBlack'
              }`}
              onClick={() => handleClick(value)}
            >
              {label}
            </li>
          ))}
        </ul>
      ) : (
        <Toggle />
      )}
    </>
  );
}
