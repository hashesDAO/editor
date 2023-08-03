'use client';

import { useTraitsDispatch } from '@/app/contexts/TraitsContext';
import { FiMinus } from 'react-icons/fi';
import CircleButton from '../../common/CircleButton';

export default function Remove({ id }: { id: string }) {
  const { handleRemoveTrait } = useTraitsDispatch();

  function handleClick() {
    handleRemoveTrait(id);
  }
  return (
    <CircleButton styles="self-start ml-1" onClick={handleClick}>
      <FiMinus />
    </CircleButton>
  );
}
