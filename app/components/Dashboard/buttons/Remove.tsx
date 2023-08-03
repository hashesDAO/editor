'use client';

import { useTraitsDispatch } from '@/app/contexts/TraitsContext';
import type { TraitValue } from '@/app/util/types';
import { FiMinus } from 'react-icons/fi';
import CircleButton from '../../common/CircleButton';

export default function Remove({ value }: { value: TraitValue }) {
  const { handleUpdateTrait } = useTraitsDispatch();

  function handleClick() {
    handleUpdateTrait(false, value.id, value.functionContent);
  }
  return (
    <CircleButton styles="self-start ml-1" onClick={handleClick}>
      <FiMinus />
    </CircleButton>
  );
}
