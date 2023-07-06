'use client';

import { useState } from 'react';

const defaultTitle = 'Project Title';

export default function ProjectTitle() {
  const [title, setTitle] = useState(defaultTitle);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  return (
    <input
      type="text"
      value={title}
      onChange={handleChange}
      className="bg-transparent border-none font-bold text-4xl focus-visible:outline-0 mb-8"
    />
  );
}
