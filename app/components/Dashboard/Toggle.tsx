'use client';

import { useState } from 'react';

export default function Toggle() {
  const [enabled, setEnabled] = useState(false);

  function handleClick() {
    setEnabled(!enabled);
  }

  return (
    <div className="flex">
      <label className="inline-flex relative items-center mr-5 cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={enabled} readOnly />
        <div
          onClick={handleClick}
          className="w-9 h-6 bg-transparent rounded-full border-4 peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-1.5 after:left-[8px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all after:peer-checked:bg-baseBlack after:peer-checked:left-[8px] peer-checked:border-none peer-checked:bg-limeGreen"
        ></div>
        <span className="ml-2 text-sm font-medium text-gray-900">ON</span>
      </label>
    </div>
  );
}
