'use client';

import CircleButton from '../../CircleButton';
import { FiPlus } from 'react-icons/fi';

export default function Add() {
  return (
    <CircleButton
      className="bg-transparent"
      onClick={() => {
        console.log('add');
      }}
    >
      <FiPlus />
    </CircleButton>
  );
}
