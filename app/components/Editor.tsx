'use client';

import { SandpackCodeEditor, SandpackLayout, SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';
import { useState } from 'react';

const p5Boilerplate = `
var fr = 60;
function setup() {
  createCanvas(500, 500);
  frameRate(fr);
}

function draw() {
  frameRate(fr);
  background(1);
}
`;

const htmlBoilerplate = `
<html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <script src="sketch.js"></script>
  </body>
</html>
`;

export default function Editor() {
  const [isCodeEditorView, setIsCodeEditorView] = useState(false);

  const files = {
    'sketch.js': {
      code: p5Boilerplate,
      active: true,
    },
    'index.html': {
      code: htmlBoilerplate,
      hidden: true,
    },
  };

  function handleToggle() {
    setIsCodeEditorView(!isCodeEditorView);
  }

  return (
    <div className="w-3/5">
      <button onClick={handleToggle}>Toggle View</button>
      <SandpackProvider
        theme="dark"
        template="static"
        options={{
          externalResources: ['https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js'],
        }}
        files={files}
      >
        {/* <SandpackCodeEditor showRunButton={false} className={`h-screen ${isCodeEditorView ? '' : 'invisible'}`} /> */}
        <SandpackPreview
          showOpenInCodeSandbox={false}
          showRefreshButton={false}
          className={`h-screen ${isCodeEditorView ? 'invisible' : ''}`}
        />
      </SandpackProvider>
    </div>
  );
}
