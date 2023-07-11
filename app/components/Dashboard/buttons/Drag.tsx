'use client';

import CircleButton from '../../CircleButton';
import { IoMenuOutline } from 'react-icons/io5';

export default function Drag() {
  return (
    <CircleButton
      className="bg-transparent mt-[-10px]"
      onClick={() => {
        console.log('drag');
      }}
    >
      <IoMenuOutline />
    </CircleButton>
  );
}
