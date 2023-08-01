'use client';

import { forwardRef } from 'react';
import { IoMenuOutline } from 'react-icons/io5';

export const Drag = forwardRef(function Drag(props, ref) {
  return (
    <button ref={ref} className={`rounded-full p-4 flex justify-center items-center mt-[-10px]`} {...props}>
      <IoMenuOutline />
    </button>
  );
});
