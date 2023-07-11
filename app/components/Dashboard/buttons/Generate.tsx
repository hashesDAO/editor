'use client';

import Button from '../../common/Button';

export default function Generate() {
  return (
    <Button
      text={'GENERATE'}
      onClick={() => {
        console.log('generate!!');
      }}
    />
  );
}
