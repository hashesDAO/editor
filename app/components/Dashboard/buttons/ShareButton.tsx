'use client';

import useCopyToClipboard from '@/app/hooks/useCopyToClipboard';
import CircleButton from '../../CircleButton';
import { LuShare2 } from 'react-icons/lu';

export default function ShareButton() {
  const [isCopied, copy] = useCopyToClipboard();
  return (
    <CircleButton
      onClick={() => {
        copy(window.location.href);
      }}
    >
      {isCopied ? <p className="text-xs">Copied! </p> : <LuShare2 />}
    </CircleButton>
  );
}
