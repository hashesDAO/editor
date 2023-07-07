'use client';

import Button from '../Button';

export default function GenerateButton() {
  return (
    <Button
      text={'GENERATE'}
      onClick={() => {
        console.log('generate!!');
      }}
    />
  );
}
