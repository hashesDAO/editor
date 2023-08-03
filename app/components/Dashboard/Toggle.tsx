'use client';

import { useTraitsDispatch } from '@/app/contexts/TraitsContext';
import type { TraitValue } from '@/app/util/types';
import { useState } from 'react';

export default function Toggle({ value }: { value: TraitValue }) {
  const [enabled, setEnabled] = useState(false);
  const { handleUpdateTrait } = useTraitsDispatch();

  function handleClick() {
    setEnabled(!enabled);
    handleUpdateTrait(!enabled, value.id, value.functionContent);
  }

  return (
    <div className="flex">
      <label className="inline-flex relative cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={enabled} readOnly />
        <div
          onClick={handleClick}
          className="w-9 h-6 bg-transparent rounded-full border-4 peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-1.5 after:left-[8px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all after:peer-checked:bg-baseBlack after:peer-checked:left-[8px] peer-checked:border-none peer-checked:bg-limeGreen"
        ></div>
      </label>
    </div>
  );
}
