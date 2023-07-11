'use client';

import CircleButton from '../../CircleButton';
import { FiPlus } from 'react-icons/fi';

export default function Add() {
  return (
    <CircleButton
      styles="self-start mt-1"
      onClick={() => {
        console.log('add');
      }}
    >
      <FiPlus />
    </CircleButton>
  );
}
