'use client';

import { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Button from '../common/Button';
import { useTraitsDispatch } from '../../contexts/TraitsContext';

type FallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  console.error(`From ErrorBoundary: ${error.message}`);
  return (
    <div role="alert" className="flex flex-col h-screen mx-[100px] justify-center items-center text-center">
      <p className=" font-bold ">Oops! An error occurred.</p>
      <p className="m-4 font-thin">This project is in alpha, so errors may happen when combining traits.</p>
      <Button text={'UNDO TRAIT SELECTION'} buttonColor={'bg-primaryRed'} onClick={resetErrorBoundary} />
    </div>
  );
}

export default function EditorError({ children }: PropsWithChildren) {
  const { handleRemoveLastTrait } = useTraitsDispatch();
  return (
    <ErrorBoundary fallbackRender={Fallback} onReset={handleRemoveLastTrait}>
      {children}
    </ErrorBoundary>
  );
}
