'use client';

import Button from '../Button';

export default function MintButton() {
  return (
    <Button
      text={'MINT'}
      buttonColor={'bg-primaryRed'}
      onClick={() => {
        console.log('mint!!');
      }}
    />
  );
}
