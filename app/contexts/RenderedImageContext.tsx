'use client';

import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';

type RenderedImageDispatch = Dispatch<SetStateAction<string>>;

const RenderedImageContext = createContext<string | undefined>(undefined);
const RenderedImageDispatchContext = createContext<RenderedImageDispatch | undefined>(undefined);

export function RenderedImageContextProvider({ children }: { children: React.ReactNode }) {
  const [renderedbase64Image, setRenderedbase64Image] = useState('');

  return (
    <RenderedImageContext.Provider value={renderedbase64Image}>
      <RenderedImageDispatchContext.Provider value={setRenderedbase64Image}>
        {children}
      </RenderedImageDispatchContext.Provider>
    </RenderedImageContext.Provider>
  );
}

export function useRenderedImageContext() {
  const context = useContext(RenderedImageContext);
  if (context === undefined) {
    throw new Error('useRenderedImageContext must be used within a RenderedImageContextProvider');
  }
  return context;
}

export function useRenderedImageDispatch() {
  const context = useContext(RenderedImageDispatchContext);
  if (context === undefined) {
    throw new Error('useRenderedImageDispatch must be used within a RenderedImageContextProvider');
  }
  return context;
}
