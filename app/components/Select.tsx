'use client';

import { useCallback, useEffect, useState } from 'react';
import useOutsideClick from '../hooks/useOutsideClick';

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
    <div ref={dropDownRef}>
      <p className="select mb-8" onClick={handleSelectClick}>
        {selectedOption || 'Select'}
      </p>
      {isOpen && (
        <ul className="select-options">
          {options.map(({ label, value }, i) => (
            <li
              key={value}
              className={`select-option ${i === focusedOptionIndex && 'focused'}`}
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
