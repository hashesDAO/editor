'use client';

import { useHashContext, useHashDispatch } from '@/app/contexts/HashContext';
import { useCallback, useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import useOutsideClick from '../../hooks/useOutsideClick';
import { INITIAL_SELECTED_HASH } from '@/app/util/constants';
import { Address } from 'viem';

type Props = {
  options: { label: Address; value: Address }[];
};

export default function Select({ options }: Props) {
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number>();
  const { dropDownRef, isOpen, setIsOpen } = useOutsideClick();
  const dispatch = useHashDispatch();
  const { selectedHash } = useHashContext();

  function handleSelectClick() {
    setIsOpen((prev) => !prev);
  }

  const handleOptionClick = useCallback(
    (val: Address) => {
      dispatch({
        selectedHash: val,
        selectedHashPhrase: '',
      });
      setIsOpen(false);
    },
    [setIsOpen, dispatch],
  );

  const keydownAction = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      function handleArrowUp() {
        setFocusedOptionIndex((prev) => {
          if (prev === undefined) return 0;
          if (prev === 0) return prev;
          return prev - 1;
        });
      }

      function handleArrowDown() {
        setFocusedOptionIndex((prev) => {
          if (prev === undefined) return 0;
          if (prev === options.length - 1) return prev;
          return prev + 1;
        });
      }

      switch (e.key) {
        case 'Enter':
          handleOptionClick(options[focusedOptionIndex as number].value);
          break;
        case 'Escape':
          setIsOpen(false);
          break;
        case 'ArrowUp':
          handleArrowUp();
          break;
        case 'ArrowDown':
          handleArrowDown();
          break;
        default:
          break;
      }
    },
    [isOpen, setIsOpen, handleOptionClick, options, focusedOptionIndex],
  );

  useEffect(() => {
    document.addEventListener('keydown', keydownAction);
    return () => document.removeEventListener('keydown', keydownAction);
  }, [keydownAction]);

  useEffect(() => {
    if (!isOpen) {
      const currentIndex = options.findIndex((i) => i.value === selectedHash);
      setFocusedOptionIndex(currentIndex === -1 ? undefined : currentIndex);
    }
  }, [isOpen, options, selectedHash, setFocusedOptionIndex]);

  return (
    <div ref={dropDownRef} className="relative w-full cursor-pointer">
      <div
        className="py-4 px-5 flex items-center justify-between bg-traitGray rounded-full"
        onClick={handleSelectClick}
      >
        <p className={'truncate'}>{selectedHash !== INITIAL_SELECTED_HASH ? selectedHash : 'Select a Hash'}</p>
        <FaChevronDown />
      </div>

      {isOpen && (
        <ul className="bg-black absolute z-10 w-full">
          {options.map(({ label, value }, i) => (
            <li
              key={value}
              className={`hover:bg-traitGray py-2 px-5 w-full cursor-pointer truncate ${
                i === focusedOptionIndex && 'focused'
              }`}
              onClick={() => handleOptionClick(value)}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
