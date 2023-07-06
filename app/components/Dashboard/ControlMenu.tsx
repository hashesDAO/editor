'use client';

import CircleButton from '../CircleButton';
import { FaShuffle } from 'react-icons/fa6';
import { FaUndo, FaRedo, FaSave } from 'react-icons/fa';

const SHUFFLE = 'shuffle';
const UNDO = 'undo';
const REDO = 'redo';
const SAVE = 'save';

const controls = [
  {
    icon: FaShuffle,
    onClick: () => {
      console.log(SHUFFLE);
    },
  },
  {
    icon: FaUndo,
    onClick: () => {
      console.log(UNDO);
    },
  },
  {
    icon: FaRedo,
    onClick: () => {
      console.log(REDO);
    },
  },
  {
    icon: FaSave,
    onClick: () => {
      console.log(SAVE);
    },
  },
];

export default function ControlMenu() {
  return (
    <section>
      <div className="flex items-center">
        <ul className="list-none flex items-center flex-row mb-2.5">
          <li className="font-bold text-2xl">Play</li>
          {controls.map(({ icon: Icon, onClick }) => (
            <li className="pl-3" key={Icon.toString()}>
              <CircleButton content={<Icon fontSize={'1.25rem'} />} onClick={onClick} />
            </li>
          ))}
        </ul>
      </div>
      <p className="text-sm opacity-40">
        Adjust the parameters below to create a bespoke work of art using a unique hash
      </p>
    </section>
  );
}
