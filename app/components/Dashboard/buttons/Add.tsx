'use client';

import CircleButton from '../../CircleButton';
import { FiPlus } from 'react-icons/fi';

export default function Add() {
  return (
    <CircleButton
      onClick={() => {
        console.log('add');
      }}
    >
      <FiPlus />
    </CircleButton>
  );
}
