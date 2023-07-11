'use client';

import CircleButton from '../../common/CircleButton';
import { IoMenuOutline } from 'react-icons/io5';

export default function Drag() {
  return (
    <CircleButton
      className="mt-[-10px]"
      onClick={() => {
        console.log('drag');
      }}
    >
      <IoMenuOutline />
    </CircleButton>
  );
}
