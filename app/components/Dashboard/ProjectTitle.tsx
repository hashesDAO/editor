'use client';

import { useState } from 'react';

const defaultTitle = 'Project Title';

export default function ProjectTitle({ children }: { children?: React.ReactNode }) {
  const [title, setTitle] = useState(defaultTitle);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value.length ? event.target.value : defaultTitle);
  }

  return (
    <section className="flex items-center justify-between mb-8">
      <input
        type="text"
        value={title}
        onChange={handleChange}
        className="bg-transparent border-none font-bold text-4xl focus-visible:outline-0 w-11/12"
      />
      {children}
    </section>
  );
}
