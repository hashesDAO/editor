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
              className="ml-2.5 text-[10px] rounded-full py-0.5 px-1.5 bg-baseBlack"
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
