'use client';

import { useAccount } from 'wagmi';
import Button from '../../Button';

export default function Mint() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return null;
  }

  return (
    <Button
      text={'UPDATE HASH'}
      buttonColor={'bg-primaryRed'}
      onClick={() => {
        console.log('mint!!');
      }}
    />
  );
}
