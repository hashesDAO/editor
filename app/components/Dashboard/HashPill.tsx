'use client';

import { FaShuffle } from 'react-icons/fa6';

export default function HashPill() {
  function handleClick() {
    console.log('clicked');
  }

  return (
    <div className="py-4 px-5 flex items-center justify-between bg-traitGray rounded-full w-full" onClick={handleClick}>
      <p className={'w-4/6 truncate'}>0xgoodmorning0xgoodmorning0xgoodmorning0xgoodmorning0xgoodmorning0xgoodmorning</p>
      <FaShuffle className="cursor-pointer" />
    </div>
  );
}
