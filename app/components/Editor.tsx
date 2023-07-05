'use client';

import { SandpackCodeEditor, SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

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

export default function Editor() {
  const pathname = usePathname();
  const [isCodeEditorView, setIsCodeEditorView] = useState(false);

  const isCreatePage = pathname === '/create';

  function handleToggle() {
    setIsCodeEditorView(!isCodeEditorView);
  }

  return (
    <div className="w-3/5">
      <SandpackProvider
        theme="dark"
        template="static"
        options={{
          externalResources: ['https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js'],
        }}
        files={files}
      >
        <div className="h-screen">
          {isCreatePage && (
            <>
              <button onClick={handleToggle}>Toggle View</button>
              <SandpackCodeEditor
                showRunButton={false}
                className={`${isCodeEditorView ? 'h-full' : 'invisible w-0'}`}
              />
            </>
          )}
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
            className={`${isCodeEditorView ? 'invisible w-0' : 'h-full'}`}
          />
        </div>
      </SandpackProvider>
    </div>
  );
}
