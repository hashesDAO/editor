'use client';

import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

type ProjectTitleDispatch = Dispatch<SetStateAction<string>>;

const ProjectTitleContext = createContext<string | undefined>(undefined);
const ProjectTitleDispatchContext = createContext<ProjectTitleDispatch | undefined>(undefined);

export function ProjectTitleContextProvider({ children }: { children: React.ReactNode }) {
  const [projectTitle, setProjectTitle] = useState('');

  return (
    <ProjectTitleContext.Provider value={projectTitle}>
      <ProjectTitleDispatchContext.Provider value={setProjectTitle}>{children}</ProjectTitleDispatchContext.Provider>
    </ProjectTitleContext.Provider>
  );
}

export function useProjectTitleContext() {
  const context = useContext(ProjectTitleContext);
  if (context === undefined) {
    throw new Error('useProjectTitleContext must be used within a ProjectTitleContextProvider');
  }
  return context;
}

export function useProjectTitleDispatch() {
  const context = useContext(ProjectTitleDispatchContext);
  if (context === undefined) {
    throw new Error('useProjectTitleDispatch must be used within a ProjectTitleContextProvider');
  }
  return context;
}
