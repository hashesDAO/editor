'use client';

import { useTraitsDispatch } from '@/app/contexts/TraitsContext';
import { FaRedo, FaUndo } from 'react-icons/fa';
import { FaShuffle } from 'react-icons/fa6';
import CircleButton from '../common/CircleButton';
import Save from './buttons/Save';

export default function ControlMenu() {
  const { handleUndo, handleRedo, handleShuffle } = useTraitsDispatch();
  const controls = [
    {
      icon: FaShuffle,
      onClick: () => {
        handleShuffle();
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
        <li className="pl-3">
          <Save />
        </li>
      </ul>
      <p className="text-sm opacity-40">
        Adjust the parameters below to create a bespoke work of art using a unique hash.
      </p>
    </section>
  );
}
