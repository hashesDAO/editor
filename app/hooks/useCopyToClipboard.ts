import { useEffect, useState } from 'react';
import { copyToClipBoard } from '../util/copy';

type StringOrNumber = string | number;

export default function useCopyToClipboard(): [boolean, (text: StringOrNumber) => void] {
  const [isCopied, setCopied] = useState(false);

  const copy = (text: StringOrNumber) => {
    if (typeof text === 'string' || typeof text == 'number') {
      copyToClipBoard(text.toString());
      setCopied(true);
    } else {
      setCopied(false);
      console.error(`Cannot copy typeof ${typeof text} to clipboard, must be a string or number.`);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCopied) {
      timer = setTimeout(() => setCopied(false), 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isCopied]);

  return [isCopied, copy];
}
