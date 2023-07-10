'use client';

import CircleButton from '../../CircleButton';
import { IoMenuOutline } from 'react-icons/io5';

export default function Drag() {
  return (
    <CircleButton
      className="bg-transparent"
      onClick={() => {
        console.log('drag');
      }}
    >
      <IoMenuOutline />
    </CircleButton>
  );
}
