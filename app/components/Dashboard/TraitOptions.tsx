'use client';

import { useState } from 'react';
import Toggle from './Toggle';

type StringOrNumber = string | number;

type TraitOption = {
  label: number | JSX.Element;
  value: StringOrNumber;
};

function isJSXElement(element: unknown): element is JSX.Element {
  return typeof element === 'object' && element !== null && 'type' in element;
}

export default function TraitOptions({ name, options }: { name: string; options?: TraitOption[] }) {
  const [selectedOption, setSelectedOption] = useState<StringOrNumber>();

  function handleClick(option: StringOrNumber) {
    setSelectedOption(option);
  }

  return (
    <>
      {options ? (
        <ul className="flex">
          {options.map(({ label, value }) => (
            <li
              key={value}
              className={`${
                isJSXElement(label) ? '' : 'py-0.5 px-[7px]'
              } ml-2.5 text-[10px] cursor-pointer rounded-full border-2

              ${value === selectedOption ? 'border-white bg-white text-baseBlack' : 'border-baseBlack bg-baseBlack'}`}
              onClick={() => handleClick(value)}
            >
              {label}
            </li>
          ))}
        </ul>
      ) : (
        <Toggle name={name} />
      )}
    </>
  );
}
