'use client';

import { useTraitsDispatch } from '@/app/contexts/TraitsContext';
import CircleButton from '../../common/CircleButton';
import { FiMinus } from 'react-icons/fi';
import { TraitValue } from '@/app/util/types';

export default function Remove({ value }: { value: TraitValue }) {
  const { handleUpdateTrait } = useTraitsDispatch();

  function handleClick() {
    console.log('Remove');
    handleUpdateTrait(false, value.id, value.content);
  }
  return (
    <CircleButton styles="self-start ml-1" onClick={handleClick}>
      <FiMinus />
    </CircleButton>
  );
}
