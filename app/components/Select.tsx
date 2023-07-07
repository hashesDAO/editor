'use client';

import { useCallback, useEffect, useState } from 'react';
import useOutsideClick from '../hooks/useOutsideClick';
import { FaChevronDown } from 'react-icons/fa';

export default function Select({ options }: { options: { label: string; value: string }[] }) {
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number>();
  const [selectedOption, setSelectedOption] = useState<string>();
  const { dropDownRef, isOpen, setIsOpen } = useOutsideClick();

  function handleSelectClick() {
    setIsOpen((prev) => !prev);
  }

  const handleOptionClick = useCallback(
    (val: string) => {
      setSelectedOption(val);
      setIsOpen(false);
    },
    [setSelectedOption, setIsOpen],
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
      const currentIndex = options.findIndex((i) => i.value === selectedOption);
      setFocusedOptionIndex(currentIndex === -1 ? undefined : currentIndex);
    }
  }, [isOpen, options, selectedOption, setFocusedOptionIndex]);

  return (
    <div ref={dropDownRef} className="relative w-full mb-8 cursor-pointer">
      <div
        className="py-4 px-5 flex items-center justify-between bg-traitGray rounded-full"
        onClick={handleSelectClick}
      >
        <p className={'truncate'}>{selectedOption || 'Select'}</p>
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
