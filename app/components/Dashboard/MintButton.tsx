'use client';

import Button from '../Button';

export default function MintButton() {
  return (
    <Button
      text={'MINT'}
      onClick={() => {
        console.log('mint!!');
      }}
    />
  );
}
