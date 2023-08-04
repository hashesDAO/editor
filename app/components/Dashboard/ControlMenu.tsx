'use client';

import { useTraitsDispatch } from '@/app/contexts/TraitsContext';
import { FaRedo, FaSave, FaUndo } from 'react-icons/fa';
import { FaShuffle } from 'react-icons/fa6';
import CircleButton from '../common/CircleButton';

export default function ControlMenu() {
  const { handleUndo, handleRedo } = useTraitsDispatch();
  const controls = [
    {
      icon: FaShuffle,
      onClick: () => {
        console.log('SHUFFLE');
      },
    },
    {
      icon: FaUndo,
      onClick: () => {
        handleUndo();
      },
    },
    {
      icon: FaRedo,
      onClick: () => {
        handleRedo();
      },
    },
    {
      icon: FaSave,
      onClick: () => {
        console.log('SAVE');
      },
    },
  ];

  return (
    <section className="mb-8">
      <ul className="list-none flex items-center flex-row mb-2.5">
        <li className="font-bold text-2xl">Play</li>
        {controls.map(({ icon: Icon, onClick }) => (
          <li className="pl-3" key={Icon.toString()}>
            <CircleButton onClick={onClick}>
              <Icon fontSize={'1.25rem'} />
            </CircleButton>
          </li>
        ))}
      </ul>
      <p className="text-sm opacity-40">
        Adjust the parameters below to create a bespoke work of art using a unique hash
      </p>
    </section>
  );
}
