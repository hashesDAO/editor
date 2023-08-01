'use client';

import { forwardRef } from 'react';
import CircleButton from '../../common/CircleButton';
import { IoMenuOutline } from 'react-icons/io5';

export const Drag = forwardRef(function Drag({ ref }: { ref: React.Ref<HTMLButtonElement> }) {
  return (
    <CircleButton
      ref={ref}
      className="mt-[-10px]"
      onClick={() => {
        console.log('drag');
      }}
    >
      <IoMenuOutline />
    </CircleButton>
  );
});
